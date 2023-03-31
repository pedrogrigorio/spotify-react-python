import ForwardNav from '../../icons/ForwardNav'
import BackwardNav from '../../icons/BackwardNav'
import SearchBox from '../../ui/SearchBox/SearchBox';
import styles from './NavBar.module.css' 
 

export default function NavBar(props) {
    return ( 
        <nav className={styles.navbar}>
            <div className={styles.nav_button}>
                <div id={styles.backward}><BackwardNav size={32} /></div>
                <div id={styles.forward}><ForwardNav size={32} /></div>
            </div>
            <div className={styles.page_header}>
                <SearchBox/>
            </div>
            <div className={styles.profile}>
                {/* <Profile /> */}
            </div>
        </nav>
    )
}