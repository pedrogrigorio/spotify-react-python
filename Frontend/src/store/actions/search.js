export function setSearchData(image, link, title) {
    return { 
        type : 'SET_CONTENT_SEARCH',
        image,
        link,
        title
    }
}

export function ClearOldRequests() {
    return {
        type : 'CLEAR_OLD_REQUESTS'
    }
}