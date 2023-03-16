import TextRegularM from '../../text/BasicTextManager'
import convertTime from '../../AuxiliarFuctions/convertTime'
import RangeSlider from '../Slider'
import styles from "./Styles/music-progress-bar.module.css";

export default function ProgressBar(props) {
    return (
        <div className={styles.musicProgress}>
            <span>
                <TextRegularM text={convertTime(props.currentTime)}/>
            </span>
            <RangeSlider value={props.currentTime} minvalue={0} maxvalue={props.duration} handleChange={props.handleTrackClick}/>
            <span>
                <TextRegularM text={convertTime(props.duration)}/>
            </span>
        </div>
    )
    
    
}