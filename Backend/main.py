
"""
    End point that suport backend for Music App aplication 

"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import request_models
from engine_api import api_requests
from typing import Optional

from db.mongo import (
    create_user_playlist,
    fetch_all_playlists,
    fetch_one_playlist,
    delete_playlist,
    rename_playlist,
    add_song,
    remove_song,
    like_song,
    fetch_liked_songs_playlist,
    unlike_song,
    fetch_one_liked_song_id
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
def get_music_direct_link(search : request_models.MusicRequest):
    return api_requests.get_song_by_id(search.index_request)

@app.get('/get_top_trends')
def get_top_trends():
    return api_requests.get_top_content()

@app.get('/get_recents_search')
def get_recents_search():
    return api_requests.get_recents_search_content()

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

@app.put('/playlist/{id}')
async def put_song(id: str, playlist_update: request_models.PlaylistUpdate):
    response = None
    if playlist_update.song_to_be_added:
        response = await add_song(id, playlist_update.song_to_be_added)
    if playlist_update.song_to_be_removed != None:
        response = await remove_song(id, playlist_update.song_to_be_removed)
    if playlist_update.name:
        response = await rename_playlist(id, playlist_update.name)
    if response:
        return "Succesfully updated playlist"
    raise HTTPException(404, f"There is no playlist with the id {id}")

@app.get('/liked-songs')
async def get_liked_songs_playlist():
    response = await fetch_liked_songs_playlist()
    return response

@app.post('/liked-songs')
async def post_like_song(song: request_models.Song):
    response = await like_song(song)
    return response
    
@app.delete('/liked-songs/{id}')
async def delete_song(id: str):
    response = await unlike_song(id)
    if response:
        return "Succesfully unliked song"
    raise HTTPException(404, f"There is no playlist with the id {id}")

@app.get('/liked-song-id')
async def get_one_liked_song_id(id):
    print(id, "\n\n\n\n\n")
    response = await fetch_one_liked_song_id(id)
    return response