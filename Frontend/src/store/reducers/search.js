const INITIAL_STATE = {

    previousData: [],
    searchData: []
}

export default function search(state = INITIAL_STATE, action) {
    // console.log(state);

    if (action.type === 'SET_SEARCH_DATA') {
        return {
            searchData: action.data
        }
    }
    
    else if (action.type === 'CLEAR_OLD_REQUESTS') {
        return INITIAL_STATE
    }

    return state 
}