const INITIAL_STATE = {
    updateHomeContent : {
        album: {},
        songs : {}, 
        recentSearchs : {}
    }, 
}


export default function home(state = INITIAL_STATE, action){

    
    if (action.type === 'SET_SONG_UPDATE_DATA') {
        return {
            updateHomeContent : {
                ...state.updateHomeContent,
                songs : action.updateSongData.songs,
                album : action.updateSongData.album
            }
        }
    }

    else if (action.type === 'SET_RECENTS_SEARCHS') {
        return { 
            updateHomeContent : {
                ...state.updateHomeContent,
                recentSearchs : action.recentsSearch
            }
        }
    }


    return state

} 