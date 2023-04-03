const INITIAL_STATE = {

    MUSIC_CONTENT : {
    title     : "", 
    artist    : "", 
    img       : "", 
    trackData : ""
    },

} 

export default function play(state = INITIAL_STATE, action) {

    if (action.type === 'SET_MUSIC_DATA') {
        return {
            MUSIC_CONTENT: {
                title : action.title, 
                artist : action.artist,
                img : action.image, 
                trackData : action.trackData
            }
        }
    }
    
    return state 
}