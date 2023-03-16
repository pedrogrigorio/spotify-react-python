import {AiFillPlayCircle} from 'react-icons/ai'
import {IoPlaySkipBack, IoPlaySkipForward} from 'react-icons/io5'
import {FaRandom} from 'react-icons/fa'
import {FiRepeat} from 'react-icons/fi'
import styles from './PlayerBar.module.css'
import Slider from '../Slider'
import Shuffle from '../icons/Shuffle'
import Previous from '../icons/Previous'
import PlayButton from '../icons/PlayButton'
import Next from '../icons/Next'
import Repeat from '../icons/Repeat'

function PlayerBar(){

    return(
        <footer className={styles.playbar_container}>
            <ul className={styles.icons}>
                <div id={styles.shuffle}><Shuffle size="17" fill="#bababa"/></div>
                <div id={styles.previous}><Previous size="14"/></div>
                <div id={styles.play}><PlayButton size="50"/></div>
                <div id={styles.next}><Next size="14"/></div>
                <div id={styles.repeat}><Repeat size="16" fill="#bababa"/></div>
            </ul>
            <Slider />
        </footer>
    )
}

export default PlayerBar