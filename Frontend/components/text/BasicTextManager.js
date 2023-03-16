import styles from './Styles/text-resgular-m.module.css'
 


export default function BasicTextManager(props) {
    return (
        < p className={styles.text} >
            {props.text}
        </p>
    )
}