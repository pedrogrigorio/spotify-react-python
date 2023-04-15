import { useEffect, useState, useRef } from "react"
import styles from './Slider.module.css'

export default function Slider(props) {

    const inputRef = useRef(null)
    // const inputRefWidth = useRef(null)
    const [decimalValue, setDecimalValue] = useState()
    const [inputRefWidth, setInputRefWidth] = useState(0)

    useEffect(() => {
        const inputWidth = window.getComputedStyle(inputRef.current).width
        setInputRefWidth(parseInt(inputWidth.replace('px','')))
    })

    useEffect(() => {
        if(props.maxvalue > 1) {
            setDecimalValue((props.value * 1)/props.maxvalue)
        }else {
            setDecimalValue(props.value)
        }
    })

    const InputChange = (e) => {
        props.handleChange(parseFloat(e.target.value))
    }


    return (
        <div className={styles.progressBar}>
            <input ref={inputRef}
                type="range" 
                onChange={InputChange} 
                className={styles.range__slider} 
                min={props.minvalue}
                max={props.maxvalue}
                step="0.01"
                value={props.value}
            />

            <span className={styles.spanThumb}
                style={{left:`${(decimalValue * inputRefWidth) - 3}px`}}
            ></span>
        </div>
    )
}