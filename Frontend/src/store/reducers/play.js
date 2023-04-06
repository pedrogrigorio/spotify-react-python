const INITIAL_STATE = {

    isPlaying: false,
    settingSong: false,
    songData : {
        title     : "", 
        artist    : "", 
        img       : "", 
        trackData : ""
    }
} 

export default function play(state = INITIAL_STATE, action) {

    if (action.type === 'SET_SONG_DATA') {
        return {
            ...state,
            settingSong: true,
            songData: {
                title : action.title, 
                artist : action.artist,
                img : action.image, 
                trackData : action.trackData
            }
        }
    }
    
    else if (action.type === 'SET_IS_PLAYING') {
        return {
            ...state,
            isPlaying: action.status,
        }
    }

    else if (action.type === 'CLEAR_SETTING_SONG') {
        return {
            ...state,
            settingSong: false
        }
    }

    return state 
}