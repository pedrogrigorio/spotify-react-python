import { useState, useEffect } from "react"

const useToggleSong = (initialState = {}) => {
    
    const [active, setActive] = useState(initialState)

    const toggle = (index) => setActive(state => ({
        ...initialState,
        [index]: !state[index]
    }))

    const setToggleOn = (index) => setActive(() => ({
        ...initialState,
        [index]: true
    }))
        
    return [ active, toggle, setToggleOn ]
}

export default useToggleSong;