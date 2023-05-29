export function setSearchData(data) {
    return {
        type: 'SET_SEARCH_DATA',
        data
    }
}

export function clearOldRequests() {
    return {
        type: 'CLEAR_OLD_REQUESTS'
    }
}

export function setActiveIndex(index) {
    return {
        type: 'SET_ACTIVE_INDEX',
        index
    }
}

export function setActiveSong(status) {
    return {
        type: 'SET_ACTIVE_SONG',
        status
    }
}