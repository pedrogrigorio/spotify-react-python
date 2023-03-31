import BasicText from '../text/BasicTextManager'
import styles from './Styles/MusicCardBox.module.css'
import PlayButton from '../buttons/PlayButton'
import MusicConect from '../../backend/MusicConect'
import { useState } from 'react'
  

export default function MusicCardBox(props) {

     
    const[Connect, setConnect] = useState(false)

    return (
        <div className={styles.PlaylistCardSBox}>
            <div className={styles.PlaylistCardS}>
                <div className={styles.ImgBox}>
                    <img src={props.imgurl} alt={props.title} />
                </div>
                <div className={styles.Title}>
                    <BasicText text={props.title}></BasicText>
                    <BasicText text={props.artist}></BasicText>
                </div>
                <div
                    className={`${styles.IconBox} ${props.isthisplay ? styles.ActiveIconBox : ''}`}
                    >
                    <MusicConect link={props.link} request={Connect}/>
                    <PlayButton changePlay={setConnect} isPlaying={Connect}/>
                </div>
                 
        </div>
    </div>
    )
}