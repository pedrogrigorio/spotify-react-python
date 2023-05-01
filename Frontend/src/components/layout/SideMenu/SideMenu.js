import styles from './SideMenu.module.css'
import {SidebarData} from './SideMenuData'
import spotify_menu_logo from '../../../assets/img/spotify_menu_logo.png'
import {BsPlusSquareFill} from 'react-icons/bs'
import LikedSongs from '../../icons/LikedSongs'
import DownloadApp from '../../icons/DownloadApp'
import { Link, NavLink } from 'react-router-dom'
import { create_playlist, get_all_playlists, delete_playlist, get_one_playlist} from '../../../services/mongodb'
import { useState, useEffect } from 'react'

function SideMenu(){

    const [playlists, setPlaylists] = useState([])
    const [actionOcurred, setActionOcurred] = useState(false)

    useEffect(() => {
        async function get_playlists() {
            const data = await get_all_playlists()
            setPlaylists(data)
        }
        
        get_playlists()
        setActionOcurred(false)
    }, [actionOcurred])

    useEffect(() => {
        console.log(playlists)
    }, [playlists])

    async function handleCreatePlaylist() {
        const data = await create_playlist()
        console.log("playlist criada")

        setActionOcurred(true)
    }

    async function getPlaylistData(id) {
        const data = await get_one_playlist(id)
        console.log(data)
    }

    async function handleDeletePlaylist(id) {
        await delete_playlist(id)
        setActionOcurred(true)
    }

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
                            <li key={key}>
                                <NavLink to={val.link} className={({ isActive }) => (isActive ? `${styles.active}` : '')}>
                                    {({isActive}) => (
                                        <>
                                            <val.icon active={isActive} size='24'/>
                                            <span id={styles.title}>{val.title}</span>
                                        </>                                        
                                    )}                     
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <div className={styles.playlists_root_container}>
                    <div className={styles.content}>
                        <div className={styles.create_playlist}>
                            <button onClick={handleCreatePlaylist}>
                                <div><BsPlusSquareFill /></div>
                                <span>Criar playlist</span>
                            </button>
                        </div>
                        <div className={styles.liked_songs}>
                            <NavLink to='/liked-songs' className={({ isActive }) => (isActive ? `${styles.active}` : '')}>
                                <div><LikedSongs size='24'/></div>
                                <span>Músicas Curtidas</span>
                            </NavLink>
                        </div>
                        <div className={styles.horizontal_line}>
                            <hr/>
                            <div />
                        </div>
                        <div className={styles.playlists_container}>
                            <div>
                                <ul className={styles.playlists}>
                                    {playlists.map(playlist => {
                                        return (
                                            <li key={playlist._id}>
                                                <Link to={`/playlist/${playlist._id}`}>{playlist.name}</Link>
                                                <button onClick={() => handleDeletePlaylist(playlist._id)}>delete</button>
                                            </li>
                                        );
                                    })}
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