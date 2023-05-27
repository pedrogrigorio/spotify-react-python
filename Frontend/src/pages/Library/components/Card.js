import styles from "./Card.module.css"
import MusicNote from "../../../components/icons/MusicNote"

function Card(props){

  return (
    <div className={styles.card_container}>
      <div className={styles.cover} id={props.cover.length >= 4 ? `${styles.active}` : ""}>
        {props.cover.length === 0 && (<div className={styles.note}><MusicNote/></div>)}
        {props.cover.length >= 1 && props.cover.length < 4 && <img src={props.cover[0]} id={styles.img0} alt=''/>}
        {props.cover.length >= 4 && (
          <>
            <img src={props.cover[0]} id={styles.img1} alt=''/>
            <img src={props.cover[1]} id={styles.img2} alt=''/>
            <img src={props.cover[2]} id={styles.img3} alt=''/>
            <img src={props.cover[3]} id={styles.img4} alt=''/>
          </>
        )}
      </div>

      <div className={styles.details}>
        <p className={styles.title}>{props.title}</p>
        <p className={styles.description}>Description</p>
      </div>
    </div>
  )
}

export default Card