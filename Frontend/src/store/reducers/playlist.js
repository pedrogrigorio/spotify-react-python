const INITIAL_STATE = {
    actionOccurred: false,
    modal: false,
}

export default function playlist(state = INITIAL_STATE, action){

    
    if (action.type === 'SET_ACTION_OCCURRED') {
        return {
            ...state,
            actionOccurred: action.bool
        };
    }

    else if (action.type === 'SET_MODAL') {
        return {
            ...state,
            modal: action.bool
        };
    }

    return state
} 