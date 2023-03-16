import { useState } from "react"
import styles from './Styles/icon-button.module.css';
export default function ButtonIconSelect(props) {
    const [select, setSelect] = useState(false)

    return (
        <>
            <button 
            className={`${styles.iconButton} ${select ? "activeIcon" : ""}`}
            onClick={() => setSelect(!select)}
            >
            {select ? props.activeicon : props.icon}
            </button>
        
        </>
    )
}