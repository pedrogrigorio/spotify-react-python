export function setActionOccurred(bool) {
    return { 
        type : 'SET_ACTION_OCCURRED',
        bool,
    }
}

export function setModal(bool) {
    return { 
        type : 'SET_MODAL',
        bool,
    }
}