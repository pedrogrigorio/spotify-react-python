/*const INITIAL_STATE = {

    MUSIC_CONTENT : {
    title     : "", 
    artist    : "", 
    img       : "", 
    trackData : ""
    },

    SEARCH_CONTENT : []
} */

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
                    link: action.link,
                    img: action.image
                }
            ]
        }
    }
    
    else if (action.type === 'CLEAR_OLD_REQUESTS') {
        return {
            SEARCH_CONTENT : []
        }
    }

    /*
    if (action.type === 'SET_MUSIC_DATA') {
        return {
            ...state,
            MUSIC_CONTENT: {
                title : action.title, 
                artist : action.artist,
                img : action.image, 
                trackData : action.trackData
            }
        }
    }
    
    else if (action.type === 'SET_CONTENT_SEARCH') {
        return {
            ...state,
            SEARCH_CONTENT: [
                ...state.SEARCH_CONTENT,
                {
                    title: action.title,
                    link: action.link,
                    img: action.image
                }
            ]
        }
    }
    
    else if (action.type === 'CLEAR_OLD_REQUESTS') {
        return {
            ...state,
            SEARCH_CONTENT : []
        }
    }
    */
    
    return state 
}