
"""
    End point that suport backend for Music App aplication 

"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pytube import YouTube
from pytube import Search
from io import BytesIO
from pydantic import BaseModel




app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000"
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
 


class MusicRequest(BaseModel):
    link_request : str

@app.get("/")
async def main():
    return {"message": "Work"}


@app.post("/read_music")
def music(link :MusicRequest):
    buffer = BytesIO()
    url = YouTube(link.link_request)
    url.streams.filter(only_audio=True).order_by("abr").desc().first().stream_to_buffer(buffer)
    buffer.seek(0)
    return StreamingResponse(buffer,
                            media_type="audio/mp3",
                            headers={"Content-Length": str(buffer.getbuffer().nbytes)}
                            )


@app.post("/read_meta_data")
def get_info_music(link :MusicRequest):
    url = YouTube(link.link_request)
    return {"title"   : url.title, 
            "img"     : url.thumbnail_url, 
            "artist"  : url.author,
           }



class SearchContent(BaseModel):
    search_content: str


# Transformar essa troca de dados para JSON 
@app.post("/search")  
async def search_for_music(search : SearchContent):
    search_ytb = Search(search.search_content)
    result = []
    for v in search_ytb.results:
        result.append({ "title" : v.title, 
                        "link"  : v.watch_url,
                        "img"   : v.thumbnail_url,       
                        })
        
    return  result