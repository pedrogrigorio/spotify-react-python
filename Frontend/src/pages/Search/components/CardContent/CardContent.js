import MusicConect from '../../../../services/MusicConect'
import { useState } from 'react'
import Play from '../../../../components/icons/Play'
import styles from "../../Search.module.css";
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import * as PlayActions from '../../../../store/actions/play';

function MusicCardBox({index, title, artist, img, duration, album}) {
    
    const dispatch = useDispatch()
    const[Connect, setConnect] = useState(false)

    const onClickAction = () => {
        setConnect(!Connect)   
        dispatch(PlayActions.setMusicMetaData(img,artist,title))

    }

    return (
        <li key={index} onClick={() => onClickAction()}>
        <div className={styles.id}>
            <p>{index}</p>
            <div><Play size={12} active={Connect}/></div> 
            <MusicConect index={index} request={Connect}/>
        </div>
        <div>
            <img src={img} alt="cover"/>
            <span>
                <p id={styles.title}>{title}</p>
                <p id={styles.artist}>{artist}</p>
            </span>
        </div>
        <p>{album}</p>
        <p id={styles.duration}>{(duration/60).toFixed(2)}</p>
    </li>
    )
}
export default connect()(MusicCardBox)