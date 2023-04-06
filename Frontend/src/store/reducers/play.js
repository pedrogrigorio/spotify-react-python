const INITIAL_STATE = {

    SONG_DATA : {
    title     : "", 
    artist    : "", 
    img       : "", 
    trackData : ""
    },

} 

export default function play(state = INITIAL_STATE, action) {

    if (action.type === 'SET_SONG_DATA') {
        return {
            SONG_DATA: {
                title : action.title, 
                artist : action.artist,
                img : action.image, 
                trackData : action.trackData
            }
        }
    }
    
    return state 
}