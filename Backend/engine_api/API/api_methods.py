import deezer
from pytube import YouTube
from pytube import Search
from pytube import exceptions
import redis
import json
from io import BytesIO
import asyncio

 

class ApiRequests():

    def __init__(self) -> None:
        self.music_index = 0
        self.client = deezer.Client()
        self.redis_client =  redis.Redis(host='localhost', port=6379, db=0)
 
    async def api_is_works():
        return {"message": "Up and running"}
    
    
    def search_engine(self, search : str):
        results = self.client.search(search)
        self.clear_redis_cache()
        data_package = []
        
        for result in results:
            data = { 
                "title"     : result.title, 
                "duration"  : result.duration,
                "cover"     : result.album.cover,
                "artist"    : result.artist.name, 
                "album"     : result.album.title,
            }
            self.set_metadata_cache(result.title, result.artist.name) 
            data_package.append(data)
        
        return data_package
    
    def set_metadata_cache(self, title : str, artist : str):
        self.music_index += 1
        self.redis_client.set(self.music_index,f"{title} {artist}")

         
    async def download_song_to_cache(self, song_id : int) -> None:
        if song_id is not None:
            buffer = BytesIO()
            while(True):
                try:
                    query = self.redis_client.get(song_id).decode()
                    print(f"downloding..." + query)
                    sh_results = Search(query)
                    yt = YouTube(sh_results.results[0].watch_url)
                    yt.streams.filter(only_audio=True).order_by("abr").desc().first().stream_to_buffer(buffer)
                    buffer.seek(0)
                    dw_index = f"{song_id} + dw"
                    self.redis_client.set(dw_index, buffer.getvalue())
                    return None
                except exceptions.VideoUnavailable:
                    print(f'Content {self.query} is unavaialable, retrying.')  
                    
        
    def get_music_by_id(self, song_id : int) -> BytesIO:
        song_cache = self.redis_client.get(f"{song_id} + dw")
        if song_cache is None: 
            asyncio.run(self.index_control_redis(song_id))
            return BytesIO(self.redis_client.get(f"{song_id} + dw"))

        return BytesIO(song_cache)
        

    async def index_control_redis(self, song_id : int):
        tasks = [
            asyncio.create_task(self.download_song_to_cache(song_id-1 if song_id-1 > 0 else None)),
            asyncio.create_task(self.download_song_to_cache(song_id)),
            asyncio.create_task(self.download_song_to_cache(song_id+1 if song_id+1 <= self.music_index else None))
        ]
        await asyncio.gather(*tasks)        
    
    def clear_redis_cache(self) -> None:
        self.music_index = 0 
        self.redis_client.flushall()

    

    

