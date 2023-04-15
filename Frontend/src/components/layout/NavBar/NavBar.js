import { useEffect, useState } from 'react';
import styles from './NavBar.module.css' 
import Forward from '../../icons/Forward'
import Backward from '../../icons/Backward';
import SearchBox from '../../ui/SearchBox/SearchBox';
import ArrowDown from '../../icons/ArrowDown';
import User from '../../icons/User';

export default function NavBar(props) {

    const[width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, [])

    return ( 
        <nav className={styles.navbar}>
            <header>
                <div className={styles.nav_control}>
                    <button><Backward size='16'/></button>
                    <button><Forward size='16'/></button>
                </div>
                <div className={styles.page_top_bar_content}>
                    <div>
                        <SearchBox/>
                    </div>
                </div>
                <button className={styles.user}>
                    <div className={styles.figure_container}>
                        <div><User size='16'/></div>
                    </div>
                    <span>Pedro Grigorio</span>
                    <ArrowDown size='16'/>
                </button>
            </header>
        </nav>
    )
}