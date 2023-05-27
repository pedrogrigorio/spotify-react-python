import { useLocation } from 'react-router-dom';
import styles from './NavBar.module.css' 
import Forward from '../../icons/Forward'
import Backward from '../../icons/Backward';
import SearchBox from '../../ui/SearchBox/SearchBox';
import LibrarySection from '../../ui/LibrarySection/LibrarySection';
import ArrowDown from '../../icons/ArrowDown';
import User from '../../icons/User';
import useWindowWidth from '../../../hooks/useWindowWidth';

export default function NavBar() {

    const width = useWindowWidth()
    const location = useLocation();

    return ( 
        <nav className={styles.navbar}>
            <header>
                <div className={styles.nav_control}>
                    <button><Backward size='16'/></button>
                    {width > 1023 && <button><Forward size='16'/></button>}
                </div>
                <div className={styles.page_top_bar_content}>
                    <div>
                        {location.pathname === "/search" && <SearchBox/>}
                        {location.pathname === "/library" && <LibrarySection />}
                    </div>
                </div>
                <button className={styles.user}>
                    <div className={styles.figure_container}>
                        <div><User size='16'/></div>
                    </div>
                    <span>Usuário</span>
                    <div className={styles.arrow_down}>
                        <ArrowDown size='16'/>
                    </div>
                </button>
            </header>
        </nav>
    )
}