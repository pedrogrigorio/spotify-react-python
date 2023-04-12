const INITIAL_STATE = {

    MUSIC_DATA : { 
        trackData : null
    },

    MUSIC_META_DATA : {
    title     : "", 
    artist    : "", 
    img       : null, 
    },



} 

export default function play(state = INITIAL_STATE, action) {

    if (action.type === 'SET_MUSIC_META_DATA') {
        return {
            ...state, 
            MUSIC_META_DATA: {
                title : action.title, 
                artist : action.artist,
                img : action.image, 
            }
        }
    }

    else if (action.type === 'SET_MUSIC_DATA') {
        return {
            ...state, 
            MUSIC_DATA: {
                trackData : action.trackData
            }
        }
    }
    
    return state 
}