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
import Like from "../../icons/Like"
import * as PlayActions from '../../../store/actions/play'
import * as SearchActions from '../../../store/actions/search'
import { getSong } from "../../../services/deezer"
import Youtube from './YoutubeEngine'
import { get_liked_songs_playlist, get_one_liked_song, like_song, unlike_song } from "../../../services/mongodb"

function Footer({isPlaying, settingSong, clearSettingSong, setSettingSong, setIsPlaying, songData, songMetaData, activeSong, setActiveSong, activeIndex, songIndex, playlist, setSongMetaData, setSongTrackData, setActiveIndex, setSongIndex}) {

    const [youtubeRef, setYotubeRef] = useState(null)
    const [volume, setVolume] = useState(100)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const [shuffleActive, setShuffleActive] = useState(false)
    const [loopActive, setLoopActive] = useState(false)

    const [likedSongsPlaylist, setLikedSongsPlaylist] = useState([])
    const [isLiked, setIsLiked] = useState()

    const loadAudio = async (newSongIndex) => {
        const newSong = playlist[newSongIndex]

        const audio = (await getSong(newSong.id)).audio
        setSongTrackData(audio)
        setSongMetaData(newSong.title, newSong.artist, newSong.cover, newSong.id)
        setActiveIndex(newSong.id)
        setActiveSong({[newSong.id]: true})
        setIsPlaying(true)
        setSongIndex(newSongIndex)
    }

    useEffect(() => {
        const loadLikeSongs = async () => {
            const data = await get_liked_songs_playlist()
            setLikedSongsPlaylist(data)
            setIsLiked(likedSongsPlaylist.some(obj => obj.song.id === songMetaData.id))
        }

        loadLikeSongs()
    }, [songMetaData])

    useEffect(() => {
        if (!playlist) {
            return
        }
        if (currentTime !== duration) {
            return
        }
        if (songIndex === (playlist.length - 1) && !loopActive && !shuffleActive) {
            setCurrentTime(0)
            setIsPlaying(false)
            setActiveSong({[songIndex]: !activeSong[songIndex]})
            return
        }
        if (songIndex === (playlist.length - 1) && loopActive) {
            loadAudio(0)
            return
        }
        if (shuffleActive) {
            const randomIndex = Math.floor(Math.random() * playlist.length)
            console.log(randomIndex)
            loadAudio(randomIndex)
            return
        }
        loadAudio(songIndex+1)
        
    }, [currentTime])

    const handleControls = (type) => {
        if (type === 'shuffle') {
            setShuffleActive(!shuffleActive)
            setLoopActive(false)
            console.log(shuffleActive)
        }
        if (type === 'loop') {
            setLoopActive(!loopActive)
            setShuffleActive(false)
            console.log(loopActive)
        }
        if (!playlist) {
            return
        }
        if (type === 'next' && songIndex === (playlist.length - 1)) {
            return
        }
        if (type === 'next') {
            loadAudio(songIndex+1)
        }
        if (type === 'prev' && currentTime > 1) {
            youtubeRef.seekTo(0)
            return
        }
        if (type === 'prev' && songIndex === 0) {
            return
        }
        if (type === 'prev') {
            loadAudio(songIndex-1)
        }
    }

    const handleTrackClick = (position) => {
        youtubeRef.seekTo(position)
    }

    useEffect(() => {
        clearSettingSong()
        if(youtubeRef !== null) {
            console.log(youtubeRef)
            if(isPlaying) {
                youtubeRef.playVideo()
            }
            else {
                youtubeRef.pauseVideo()
            }
        }
        
    }, [youtubeRef, isPlaying, settingSong])
    
    useEffect(() => {
        if(youtubeRef !== null) {
            youtubeRef.setVolume(volume)
        }
    }, [youtubeRef, volume])


    useEffect(() => {
        setActiveSong({[activeIndex]: isPlaying})
    }, [isPlaying])

    function toggle() {
        setIsPlaying(!isPlaying)
        setSettingSong(true)
    }

    return (
        <footer className={styles.playbar_container}>
            <div className={styles.footerLeft}>
                {songMetaData.title != "" && 
                    <>
                        <img src={songMetaData.img} alt="Song"/>
                        <div className={styles.songDetails}>
                            <p id={styles.title}>{songMetaData.title}</p>
                            <p id={styles.artist}>{songMetaData.artist}</p> 
                        </div>
                        <div id={styles.like}>
                            <Like size={20} active={isLiked}/>
                        </div>
                    </>
                }
            </div>

            <div className={styles.footerMid}>
                <ul className={styles.icons}>
                    <div 
                        className={styles.shuffle} 
                        id={shuffleActive ? `${styles.active}` : ""}
                        onClick={() => handleControls('shuffle')}
                    >
                        <Shuffle size="17" fill="#bababa" active={shuffleActive}/>
                    </div>
                    <div id={styles.previous} onClick={() => handleControls('prev')}><Previous size="14"/></div>
                    {songMetaData.title !== '' ? (
                        <div id={styles.play} onClick={toggle}><PlayButton size="47" active={isPlaying}/></div>
                    ) : (
                        <div id={styles.play_inactive}><PlayButton size="47" active={true} fill='#B3B3B3'/></div>
                    )}
                    <div id={styles.next} onClick={() => handleControls('next')}><Next size="14"/></div>
                    <div 
                        className={styles.repeat} 
                        id={loopActive ? `${styles.active}` : ""}
                        onClick={() => handleControls('loop')}
                    >
                        <Repeat size="16" fill="#bababa" active={loopActive}/>
                    </div>
                </ul>
                <PlayerSlider currentTime={currentTime} duration={duration} handleTrackClick={handleTrackClick} songData={songMetaData}/>
            </div>

            <div className={styles.footerRight}>
                <div id={styles.queue}><Queue size="16" fill="white" /></div>
                <div id={styles.connect_device}><ConnectDevice size="16" fill="white" /></div>
                <div id={styles.volume_control}><VolumeSlider volume={volume} setVolume={setVolume}/></div>
                <div id={styles.fullscren}><FullScreen size="14" fill="white" /></div>
                <Youtube youtubeRef={setYotubeRef} handleDuration={setDuration} handleCurrentTime={setCurrentTime} trackData={songData.trackData}/>
            </div>
        </footer>
    )
}

const mapStateToProps = state => ({
    settingSong: state.play.settingSong,
    isPlaying: state.play.isPlaying,
    songData: state.play.songData,
    songMetaData: state.play.songMetaData,
    activeSong: state.search.activeSong,
    activeIndex: state.search.activeIndex,
    playlist: state.play.playlist,
    songIndex: state.play.songIndex
})

const mapDispatchToProps = dispatch => ({
    setIsPlaying: (status) => dispatch(PlayActions.setIsPlaying(status)),
    clearSettingSong: (bool) => dispatch(PlayActions.clearSettingSong(bool)),
    setActiveSong: (status) => dispatch(SearchActions.setActiveSong(status)),
    setActiveIndex: (index) => dispatch(SearchActions.setActiveIndex(index)),
    setSongMetaData: (title, artist, img, index) => dispatch(PlayActions.setSongMetaData(title, artist, img, index)),
    setSongTrackData:(trackData) => dispatch(PlayActions.setSongTrackData(trackData)),
    setSettingSong: (status) => dispatch(PlayActions.setSettingSong(status)),
    setSongIndex: (index) => dispatch(PlayActions.setSongIndex(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
