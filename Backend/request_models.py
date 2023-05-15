from pydantic import BaseModel
from typing import Optional

class MusicRequest(BaseModel):
    index_request : int

class SearchContent(BaseModel):
    search_content: str

class PlaylistUpdate(BaseModel):
    song_to_be_added: Optional[object] = None
    song_to_be_removed: Optional[int] = None
    name: Optional[str] = None

class ExcludeSong(BaseModel):
    song: object
    