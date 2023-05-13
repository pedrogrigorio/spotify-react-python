const INITIAL_STATE = {
    actionOccurred: false
}

export default function playlist(state = INITIAL_STATE, action){

    
    if (action.type === 'SET_ACTION_OCCURRED') {
        return {
            actionOccurred: action.bool
        };
    }

    return state
} 