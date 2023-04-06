const INITIAL_STATE = {

    MUSIC_CONTENT : {
    title     : "", 
    artist    : "", 
    img       : "", 
    trackData : ""
    },

} 

export default function play(state = INITIAL_STATE, action) {

    console.log("teste2")
    if (action.type === 'SET_MUSIC_DATA') {
        console.log("setei a musica")
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