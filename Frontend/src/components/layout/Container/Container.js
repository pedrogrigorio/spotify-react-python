import styles from './Container.module.css'

function Container(props) {
  return (
    // <div className={`${styles.container} ${styles[props.customClass]}`}>
    <div className={styles.container}>
      {props.children}
    </div>
  )
}

export default Container