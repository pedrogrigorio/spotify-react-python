import * as Icons from '../icons';
import IconButton from './ButtonIconSelect';
import styles from './Styles/play-button.module.css'


export default function PlayButton(props) {

    return (
        <div className={styles.playBtn} tabIndex="0" role="button" onClick={() => props.changePlay(!props.isPlaying)}>
            <IconButton icon={<Icons.Play/>} activeicon={<Icons.Pause/>}/> 
        </div>
    )
}