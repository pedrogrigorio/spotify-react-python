import ForwardNav from '../../icons/ForwardNav'
import BackwardNav from '../../icons/BackwardNav'
import SearchBox from '../../ui/SearchBox/SearchBox';
import styles from './TopNav.module.css' 
 

export default function TopNav(props) {
    return ( 
        <nav className={styles.topnav}>
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