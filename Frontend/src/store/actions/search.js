export function setSearchData(title,artist,cover,index,duration,album) {
    return { 
        type : 'SET_CONTENT_SEARCH',
        title,
        artist,
        cover,
        index,
        duration,
        album
    }
}

export function ClearOldRequests() {
    return {
        type : 'CLEAR_OLD_REQUESTS'
    }
}
