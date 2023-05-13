export function setActionOccurred(bool) {
    return { 
        type : 'SET_ACTION_OCCURRED',
        bool,
    }
}