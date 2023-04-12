import { useEffect, useState, useRef } from "react"
import { connect } from "react-redux"
import styles from './Footer.module.css'
import Shuffle from '../../icons/Shuffle'
import Previous from '../../icons/Previous'
import PlayButton from '../../icons/PlayButton'
import Next from '../../icons/Next'
import Repeat from '../../icons/Repeat'
import Queue from '../../icons/Queue'
import ConnectDevice from '../../icons/ConnectDevice'
import FullScreen from '../../icons/FullScreen'
import VolumeSlider from '../../ui/VolumeSlider/VolumeSlider'
import PlayerSlider from '../../ui/PlayerSlider/PlayerSlider'
import Audio from "./Audio"

function Footer({songInfo, songTrack}){

    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const handleTrackClick = (position) => {
        audioRef.current.currentTime = position
    }

    useEffect(() => {
        if(isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [audioRef, isPlaying])
    
    useEffect(() => {
        audioRef.current.volume = volume
    }, [audioRef,volume])

    return (
        <footer className={styles.playbar_container}>
            <div className={styles.footerLeft}>
                <div className={styles.imgBox}>
                    <img src={songInfo.img} alt="Song"/>
                </div>
                <div className={styles.songDetails}>
                    <p id={styles.title}>{songInfo.title}</p>
                    <p id={styles.artist}>{songInfo.artist}</p> 
                </div>
            </div>

            <div className={styles.footerMid}>
                <ul className={styles.icons}>
                    <div id={styles.shuffle}><Shuffle size="17" fill="#bababa"/></div>
                    <div id={styles.previous}><Previous size="14"/></div>
                    <div id={styles.play} onClick={() => setIsPlaying(!isPlaying)}><PlayButton size="47" active={isPlaying}/></div>
                    <div id={styles.next}><Next size="14"/></div>
                    <div id={styles.repeat}><Repeat size="16" fill="#bababa"/></div>
                </ul>
                <PlayerSlider currentTime={currentTime} duration={duration} handleTrackClick={handleTrackClick} />
            </div>

            <div className={styles.footerRight}>
                <div id={styles.queue}><Queue size="16" fill="white" /></div>
                <div id={styles.connect_device}><ConnectDevice size="16" fill="white" /></div>
                <div id={styles.volume_control}><VolumeSlider volume={volume} setVolume={setVolume}/></div>
                <div id={styles.fullscren}><FullScreen size="14" fill="white" /></div>
                <Audio
                    ref={audioRef}
                    handleDuration={setDuration}
                    handleCurrentTime={setCurrentTime}
                    trackData={songTrack.trackData}
                />
            </div>
        </footer>
    )
}

// export default connect(state => ({songInfo: state.play.MUSIC_META_DATA}, {songTrack: state.play.MUSIC_DATA}))(Footer)

const mapStateToProps = state => {
    return {
        songInfo: state.play.MUSIC_META_DATA,
        songTrack: state.play.MUSIC_DATA
    }
}

export default connect(mapStateToProps)(Footer)
  