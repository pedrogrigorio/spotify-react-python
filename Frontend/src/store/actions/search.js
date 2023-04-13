export function setSearchData(title, image, duration, artist, album) {
    return { 
        type : 'SET_SEARCH_DATA',
        title,
        image,
        duration,
        artist,
        album,
    }
}

export function clearOldRequests() {
    return {
        type : 'CLEAR_OLD_REQUESTS'
    }
}
