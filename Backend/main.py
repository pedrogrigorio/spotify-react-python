
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
import random



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


music_playing_now = "https://youtu.be/ENtj0Rew1uM?list=RDENtj0Rew1uM"

@app.get("/")
async def main():
    return {"message": "Work"}


@app.get("/read_music")
async def music():
    buffer = BytesIO()
    url = YouTube(music_playing_now)
    url.streams.filter(only_audio=True).order_by("abr").desc().first().stream_to_buffer(buffer)
    buffer.seek(0)
    return StreamingResponse(buffer,media_type="audio/mp3")


# Fazer uma verificação no procedimento de ID para auxiliar o react 
@app.get("/read_title")
async def get_info_music():
    url = YouTube(music_playing_now)
    title    = url.title
    img      = url.thumbnail_url
    artist   = url.author
    return {"title"   : title, 
            "img"     : img, 
            "artist"  : artist,
           }



class Mensage(BaseModel):
    search_content: str


# Transformar essa troca de dados para JSON 
@app.post("/search")  
async def search_for_music(search : Mensage):
    search_ytb = Search(search.search_content)
    result = []
    for v in search_ytb.results:
        result.append({ "title" : v.title, 
                        "link"  : v.watch_url,
                        "img"   : v.thumbnail_url,       
                        "key"   : random.randint(1,100000)
                        })
        
    return  result