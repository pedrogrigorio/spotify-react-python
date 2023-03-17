import { useState } from "react"
import * as Icons from '../icons';
import IconButton from '../buttons/ButtonIconSelect';
import RangeSlider from './Slider';

import styles from "./Styles/FooterRight.module.css";


export default function FooterRigth(props){
    return(
        <div  className={styles.footerRight}>
            <IconButton icon={<Icons.Mix />} activeicon={<Icons.Mix />}/>
            <IconButton icon={<Icons.DownloadApp />} activeicon={<Icons.DownloadApp />}/>
            <MuteSound volume={props.volume} setVolume={props.setVolume}/>
        </div>
    )

}

function MuteSound(props) {
    const[onOffMute, setOnOffMute]  = useState(1)

    const muteBtn = () => {
        if(props.volume == 0) {
            props.setVolume(onOffMute)
        }else {
            setOnOffMute(props.volume)
            props.setVolume(0)
        }
    }

    return (
        <div className={styles.soundBar}>
            <div tabIndex="0" role="button" onClick={muteBtn}>
                <IconButton icon={<Icons.Sound />} activeicon={<Icons.SoundClose />}/>
            </div>
            <RangeSlider minvalue={0} maxvalue={1} value={props.volume} handleChange={props.setVolume}/>
        </div>
    )
}