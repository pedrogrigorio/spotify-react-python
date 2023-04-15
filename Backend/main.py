
"""
    End point that suport backend for Music App aplication 

"""

from fastapi import FastAPI  
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import request_models
import asyncio
from engine_api import api_requests

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
    return StreamingResponse(api_requests.get_music_by_id(search.index_request), media_type="audio/mp3")

  