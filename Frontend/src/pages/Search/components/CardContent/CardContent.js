import styles from './CardContent.module.css'
import PlayButton from '../../../../components/icons/PlayButton'
import MusicConect from '../../../../services/MusicConect'
import { useState } from 'react'
  

export default function MusicCardBox({title, artist, imgurl, link, isthisplay}) {

    const[Connect, setConnect] = useState(false)

    return (
        <div className={styles.PlaylistCardSBox}>
            <div className={styles.PlaylistCardS}>
                <div className={styles.ImgBox}>
                    <img src={imgurl} alt={title} />
                </div>
                <div className={styles.Title}>
                    <p>{title}</p>
                    <p>{artist}</p>
                </div>
                <div className={`${styles.IconBox} ${isthisplay ? styles.ActiveIconBox : ''}`}>
                    <div onClick={() => setConnect(!Connect)}><PlayButton size="47" active={Connect}/></div>
                    <MusicConect link={link} request={Connect}/>
                </div>
        </div>
    </div>
    )
}