
"""
    End point that suport backend for Music App aplication 

"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import request_models
from engine_api import api_requests
from asyncio import run

from request_models import Playlist

from db.mongo import (
    create_user_playlist,
    fetch_all_playlists,
    fetch_one_playlist,
    delete_playlist
)

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
 
 
@app.get('/status')
async def get_status_api():
    return api_requests.api_is_works()


@app.post('/search_music')
def get_search_content(search : request_models.SearchContent):
    return api_requests.search_engine(search.search_content)
  

@app.post('/read_music')
def get_music_bytes(search : request_models.MusicRequest):
    return api_requests.get_song_by_id(search.index_request)
  

@app.get('/playlists')
async def get_playlists():
    response = await fetch_all_playlists()
    return response


@app.get('/playlist/{id}')
async def get_playlist_by_id(id: str):
    response = await fetch_one_playlist(id)
    return response


@app.post('/playlists')
async def create_playlist():
    response = await create_user_playlist()
    return response


@app.delete('/playlist/{id}')
async def delete_playlist_by_id(id: str):
    response = await delete_playlist(id)
    if response:
        return "Succesfully deleted playlist"
    raise HTTPException(404, f"There is no playlist with the id {id}")