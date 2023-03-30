import SearchBox from './SearchBox';
import styles from './Styles/topnav.module.css' 
import NextBtn from '../buttons/TopNavNextBtn'
import BackBtn from '../buttons/TopNavPrevBtn'
 

export default function TopNav(props) {
    return ( 
        <nav className={styles.Topnav}>
            <div>
                <span>
                    <BackBtn/>
                    <NextBtn/>
                    <SearchBox/>
                </span>
            </div>
        </nav>
    )
}