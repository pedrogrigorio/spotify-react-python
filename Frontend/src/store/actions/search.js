export function setSearchData(data) {
    return {
        type: 'SET_SEARCH_DATA',
        data
    }
}

export function clearOldRequests() {
    return {
        type : 'CLEAR_OLD_REQUESTS'
    }
}
