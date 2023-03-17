import styles from './Styles/BasicTextManager.module.css'
 


export default function BasicTextManager(props) {
    return (
        < p className={styles.text} >
            {props.text}
        </p>
    )
}