const INITIAL_STATE = { 
    SEARCH_CONTENT : []
}



export default function search(state = INITIAL_STATE, action) {

    if (action.type === 'SET_CONTENT_SEARCH') {
        return {
            SEARCH_CONTENT: [
                ...state.SEARCH_CONTENT,
                {
                    title: action.title,
                    artist: action.artist,
                    img: action.cover,
                    index: action.index,
                    duration: action.duration,
                    album : action.album
                }
            ]
        }
    }
    
    else if (action.type === 'CLEAR_OLD_REQUESTS') {
        return {
            SEARCH_CONTENT : []
        }
    }


    return state 

}