import styles from './Styles/SideMenu.module.css'
import {SidebarData} from './SideMenuData'
import {SidebarData2} from './SideMenuData2'
import menu_logo from '../../imgs/spotify_menu_logo.png'

function Sidebar(){

    return(
        <div className={styles.sidebar}>
            <img src={menu_logo} alt="spotify"/>
            <ul className={styles.sidebar_list}>
                {SidebarData.map((val,key) => {
                    return(
                        <li 
                            key={key} 
                            className={styles.row} 
                            id={window.location.pathname == val.link ? `${styles.active}` : ""}
                            onClick={() => {window.location.pathname = val.link}}>
                            <div id={styles.icon}>{val.icon}</div>
                            <div id={styles.title}>{val.title}</div>
                        </li>
                    );
                })}
            </ul>
            <ul className={styles.sidebar_list2}>
                {SidebarData2.map((val,key) => {
                    return(
                        <li 
                            key={key} 
                            className={styles.row} 
                            id={window.location.pathname == val.link ? `${styles.active}` : ""}
                            onClick={() => {window.location.pathname = val.link}}>
                            <div id={styles.icon}>{val.icon}</div>
                            <div id={styles.title}>{val.title}</div>
                        </li>
                    );
                })}
            </ul>
            <hr id={styles.horizontal_line}/>
        </div>
    )
}

export default Sidebar