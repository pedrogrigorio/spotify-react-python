import deezer
from deezer import exceptions as deezer_exceptions
from youtubesearchpython import VideosSearch
import redis

class ApiRequests():

    def __init__(self) -> None:
        self.song_index = 0
        self.client = deezer.Client()
        self.redis_client =  redis.Redis(host='redis', port=6379, db=0)
        self.recent_searchs = []
 
    async def api_is_works():
        return {"message": "Up and running"}
    
    
    def search_engine(self, search : str):
        while(True):
            try:
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
                        'id'        : result.id
                    }
                    self.set_metadata_cache(result.title,result.artist.name, result.id)
                    data_package.append(data)
                    
                return data_package

            except deezer_exceptions.requests.ConnectionError:
                print(f'Content {search} have a conection error for deezer search, retrying')   


    def set_metadata_cache(self, title: str, artist: str, id: str):
        self.redis_client.set(id,f"{title} {artist}")


    def song_engine_link(self, request : str, index : int):
        self.recent_searchs.append(request)
        videosSearch = VideosSearch(request, limit = 1)
        id = videosSearch.result().get('result')[0].get('id')
        return id
        
    def get_song_by_id(self, song_id : int):
        track = self.client.get_track(song_id)
        request = f"{track.title} {track.artist.name}"
        return self.song_engine_link(request, song_id)
    
    def clear_redis_cache(self) -> None:
        self.song_index = 0 
        self.redis_client.flushall()

     
    def get_top_albums(self,):
        top_albums = self.client.get_albums_chart(genre_id=0)
        top_albums_data_package = []
        for album in top_albums:
            data = {
                'title' : album.title,
                'cover' : album.cover_medium,
                'id'    : album.id,
                'artist' : album.get_artist().name,
            }
            top_albums_data_package.append(data)

        return [
            {'title' : 'Principais albums da semana',
             'content' : top_albums_data_package
            }
        ]

    def get_top_songs(self,):
        top_tracks = self.client.get_tracks_chart(genre_id=0)
        top_tracks_data_package = []
        for track in top_tracks:
            data = {
                'title' : track.title,
                'artist' : track.artist.name,
                'cover' : track.album.cover_medium,
                'id'    : track.id
            }
            top_tracks_data_package.append(data)

        return [
            {'title' : 'Músicas que estão bombando',
             'content' : top_tracks_data_package
            }
        ]
    
    def get_recents_search_content(self,):
        recently_data = []
        for search in list(set(self.recent_searchs)):
            track = self.client.search(search)[0]
            data = {  
                "title" : track.title, 
                "artist": track.artist.name, 
                "cover" :track.album.cover_medium,
                "id"    : track.id 
                }
 
            recently_data.append(data)

        return [
            {'title' : 'Tocadas recentemente',
             'content' : recently_data
            }
        ]



    def get_cover_by_id(self, id):
        img = self.client.get_track(id).album.cover_medium
        return img
        
   

    # Deprecated for now 
    # async def download_song_to_cache(self, song_id : int) -> None:
    #     if song_id is not None:
    #         buffer = BytesIO()
    #         while(True):
    #             try:
    #                 query = self.redis_client.get(song_id).decode()
    #                 print(f"downloding..." + query)
    #                 sh_results = Search(query)
    #                 yt = YouTube(sh_results.results[0].watch_url)
    #                 yt.streams.filter(only_audio=True).order_by("abr").asc().first().stream_to_buffer(buffer)
    #                 buffer.seek(0)
    #                 dw_index = f"{song_id} + dw"
    #                 self.redis_client.set(dw_index, buffer.getvalue())
    #                 return None
    #             except exceptions.VideoUnavailable:
    #                 print(f'Content {query} is unavaialable, retrying.')  
    #             except KeyError:
    #                 print(f'Content {query} video keyError, retrying')
               
        


    