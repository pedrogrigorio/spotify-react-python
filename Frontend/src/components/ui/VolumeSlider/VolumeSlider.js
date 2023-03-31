import React from 'react'
import Volume from '../../icons/Volume'
import { useState } from "react"
import Slider from '../Slider/Slider'
import styles from './VolumeSlider.module.css'

function VolumeSlider({volume, setVolume, size}) {

    const[mute, setMute]  = useState(false)

    const muteBtn = () => {
        if(volume == 0) {
            setMute(false)
            setVolume(1)
        } else {
            setMute(true)
            setVolume(0)
        }
    }

    return (
        <div className={styles.soundBar}>
            <div id={styles.volume} onClick={muteBtn}>
                <Volume size="16" active={mute} />
            </div>
            <Slider minvalue={0} maxvalue={1} value={volume} handleChange={setVolume}/>
        </div>
    )
}

export default VolumeSlider