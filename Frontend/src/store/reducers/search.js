const INITIAL_STATE = {

    searchData: [],
    activeIndex: 0,
    activeSong: {}
}

export default function search(state = INITIAL_STATE, action) {
    
    if (action.type === 'SET_SEARCH_DATA') {
        return {
            ...state,
            searchData: action.data
        }
    }
    
    else if (action.type === 'CLEAR_OLD_REQUESTS') {
        return {
            ...state,
            searchData: []
        }
    }

    else if (action.type === 'SET_ACTIVE_INDEX') {
        return {
            ...state,
            activeIndex: action.index
        }
    }

    else if (action.type === 'SET_ACTIVE_SONG') {

        return {
            ...state,
            activeSong: action.status
        }
    }
    
    return state 
}