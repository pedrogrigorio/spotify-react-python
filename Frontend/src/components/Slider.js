import styles from './Slider.module.css'

function Slider(){

    return(
        <div className={styles.progress_bar_conteiner}>
            <p className={styles.timer_start}>0:00</p>
            <input type="range" min="1" max="100" value="50" className={styles.slider}/>
            <p className={styles.timer_end}>3:45</p>
        </div>
    )
}

export default Slider