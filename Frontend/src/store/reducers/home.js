const INITIAL_STATE = {
    updateHomeContent: {
        recents: [{title:null, content:[{title:null, artist:null, cover:null, id:null}]}],
        songs: [{title:null, content:[{title:null, artist:null, cover:null, id:null}]}],
        albums: [{title:null, content:[{title:null, artist:null, cover:null, id:null}]}],
    },

    typeShowAll: null,

    typeNameShowAll: null

}


export default function home(state = INITIAL_STATE, action){

    
    if (action.type === 'SET_SONG_UPDATE_DATA') {
        return {
            ...state, 
            updateHomeContent : { 
                ...state.updateHomeContent,
                songs : action.updateSongs
            }
        }
    }

    else if (action.type === 'SET_ALBUM_UPDATE_DATA') {
        return {
            ...state,
            updateHomeContent : {
                ...state.updateHomeContent,
                albums : action.updateAlbums
            }
        }
    }

    else if (action.type === 'SET_RECENTS_UPDATE_DATA') {
        return { 
            ...state,
            updateHomeContent : {
                ...state.updateHomeContent,
                recents : action.recentsSearch
            }
        }
    }

    else if (action.type === 'TYPE_SHOW_ALL_CONTENT') {
        return { 
            ...state,
            typeShowAll : action.typeShowAll
        }
    }

    else if (action.type === 'TYPE_NAME_SHOW_ALL_CONTENT') {
        return { 
            ...state,
            typeNameShowAll : action.typeNameShowAll
        }
    }


    return state

} 