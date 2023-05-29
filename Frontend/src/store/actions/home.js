export function setTopSongs(updateSongs) {
    return { 
        type : 'SET_SONG_UPDATE_DATA',
        updateSongs
    }
}

export function setTopAlbums(updateAlbums) {
    return { 
        type : 'SET_ALBUM_UPDATE_DATA',
        updateAlbums
    }
}

export function setRecentSearch(recentsSearch) {
    return { 
        type : 'SET_RECENTS_UPDATE_DATA',
        recentsSearch
    }
}

export function typeShowAll(typeShowAll) {
    return { 
        type : 'TYPE_SHOW_ALL_CONTENT',
        typeShowAll
    }
}

export function typeNameShow(typeNameShowAll) {
    return { 
        type : 'TYPE_NAME_SHOW_ALL_CONTENT',
        typeNameShowAll
    }
}


