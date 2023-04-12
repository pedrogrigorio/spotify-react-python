import deezer
from pytube import YouTube
from pytube import Search
from pytube import exceptions
import redis
import json
from io import BytesIO

 

class ApiRequests():

    def __init__(self) -> None:
        self.music_index = 0
        self.client = deezer.Client()
        self.dw_index = ""
        self.query = ""
        self.redis_client =  redis.Redis(host='localhost', port=6379, db=0)
 
    async def api_is_works():
        return {"message": "Up and running"}
    
    
    def search_engine(self, search : str) -> json:
        results = self.client.search(search)
        self.index = 0
        self.clear_redis_cache()
        data_package = []
        for result in results:
            self.index +=1
            data = { 
                "title"     : result.title, 
                "duration"  : result.duration,
                "cover"     : result.album.cover,
                "artist"    : result.artist.name, 
                "album"     : result.album.title,
                "index"     : self.index
            }
            self.set_storing_cache(result.title, result.artist.name)

            data_package.append(data)

        return data_package
    
    def set_storing_cache(self, title : str, artist : str):
        self.music_index += 1
        self.redis_client.set(self.music_index,f"{title} {artist}")
        if (self.music_index <=3): 
            self.music_storing_cache()

         
    async def music_storing_cache(self) -> None:
        buffer = BytesIO()
        while(True):
            try:
                self.query = self.redis_client.get(self.music_index).decode()
                sh_results = Search(self.query)
                yt = YouTube(sh_results.results[0].watch_url)
                yt.streams.filter(only_audio=True).order_by("abr").desc().first().stream_to_buffer(buffer)
                buffer.seek(0)
                self.dw_index = f"{self.music_index} + dw"
                self.redis_client.set(self.dw_index, buffer.getvalue())
                return None
            except exceptions.VideoUnavailable:
                print(f'Content {self.query} is unavaialable, retrying.')  
                break
    
    def get_music_by_id(self, music_id : int) -> BytesIO:
        return BytesIO(self.redis_client.get(f"{music_id} + dw"))
    
    def clear_redis_cache(self) -> None:
        self.music_index = 0 
        self.redis_client.flushall()

    

    

