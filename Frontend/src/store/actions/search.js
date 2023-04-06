export function setSearchData(title, image, link) {
    return { 
        type : 'SET_SEARCH_DATA',
        title,
        image,
        link
    }
}

export function clearOldRequests() {
    return {
        type : 'CLEAR_OLD_REQUESTS'
    }
}