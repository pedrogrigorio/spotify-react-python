import React from 'react'
import Slider from '../Slider/Slider'
import convertTime from '../../../helpers/convertTime'
import styles from './PlayerSlider.module.css'

export default function ProgressBar(props) {

    return (
        <div className={styles.progress_bar_container}>
            <p className={styles.timer_start}>{props.songData.title === '' ? "--:--" : convertTime(props.currentTime)}</p>
            <div className={styles.slider}><Slider value={props.currentTime} minvalue={0} maxvalue={props.duration} handleChange={props.handleTrackClick}/></div>
            <p className={styles.timer_end}>{props.songData.title === '' ? "--:--" : convertTime(props.duration)}</p>
        </div>
    )
}