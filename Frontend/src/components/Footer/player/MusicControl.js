import * as Icons from '../../icons';
import IconButton from '../../buttons/ButtonIconSelect';
import PlayButton from '../../buttons/PlayButton'

import styles from "./Styles/music-control-box.module.css";

export default function MusicControl(props) {

    // adicionar lógica para controle de música (player e pause). PLAYBUTTON NÃO ESTÁ PRONTO


    // Adicionar função para passar as músicas em Icons.prev e Icons.next
    return (
        <div className={styles.musicControl}>
            <IconButton icon={<Icons.Mix/>} activeicon={<Icons.Mix/>}/>
            <button className={styles.button} >
                <Icons.Prev />
            </button>
            <PlayButton changePlay={props.setIsPlaying} isPlaying={props.isPlaying}/>
            <button className={styles.button} >
                <Icons.Next />
            </button>
            <IconButton icon={<Icons.Loop/>} activeicon={<Icons.Loop/>}/>
        </div>
    )

}