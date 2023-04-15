import styles from './SideMenu.module.css'
import {SidebarData} from './SideMenuData'
import spotify_menu_logo from '../../../assets/img/spotify_menu_logo.png'
import {BsPlusSquareFill} from 'react-icons/bs'
import LikedSongs from '../../icons/LikedSongs'
import DownloadApp from '../../icons/DownloadApp'

function SideMenu(){

    return (
        <nav className={styles.sidemenu}>
            <div className={styles.principal}>
                <div className={styles.logo}>
                    <a href='http://localhost:3000/'>
                        <img src={spotify_menu_logo} alt="spotify_logo"/>
                    </a>
                </div>
                <ul className={styles.pages_list}>
                    {SidebarData.map((val,key) => {
                        return(
                            <li key={key} className={styles.row} id={window.location.pathname == val.link ? `${styles.active}` : ""}>
                                <a href={val.link}>
                                    {val.icon}
                                    <span id={styles.title}>{val.title}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <div className={styles.playlists_root_container}>
                    <div className={styles.content}>
                        <div className={styles.create_playlist}>
                            <button>
                                <div><BsPlusSquareFill /></div>
                                <span>Criar playlist</span>
                            </button>
                        </div>
                        <div className={styles.liked_songs}>
                            <button id={window.location.pathname == "/liked-songs" ? `${styles.active}` : ""} onClick={() => {window.location.pathname = "/liked-songs"}}>
                                <div><LikedSongs size='24'/></div>
                                <span>Músicas Curtidas</span>
                            </button>
                        </div>
                        <div className={styles.horizontal_line}>
                            <hr/>
                            <div />
                        </div>
                        <div className={styles.playlists_container}>
                            <div>
                                <ul className={styles.playlists}>
                                    <li>Minha playlist nº 1</li>
                                    <li>Minha playlist nº 2</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.install_app}>
                            <div>
                                <a>
                                    <DownloadApp size='24'/>
                                    <span>Instalar aplicativo</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.layout_resizer}>
                <input></input>
            </div>
        </nav>
    )
}

export default SideMenu