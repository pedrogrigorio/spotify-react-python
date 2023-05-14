import styles from './SideMenu.module.css'
import {SidebarData} from '../../../data/SideMenuData'
import spotify_menu_logo from '../../../assets/img/spotify_menu_logo.png'
import {BsPlusSquareFill} from 'react-icons/bs'
import LikedSongs from '../../icons/LikedSongs'
import DownloadApp from '../../icons/DownloadApp'
import { Link, NavLink } from 'react-router-dom'
import { create_playlist, get_all_playlists, delete_playlist, get_one_playlist} from '../../../services/mongodb'
import { useState, useEffect } from 'react'
import ContextMenu from '../../ui/ContextMenu/ContextMenu'
import { connect } from 'react-redux'
import * as PlaylistActions from '../../../store/actions/playlist'
import PlaylistDatailsUpdate from '../../ui/PlaylistDetailsUpdate/PlaylistDatailsUpdate'

function SideMenu({actionOccurred, setActionOccurred, modal}){

    const initialContextMenu = {
        show: false,
        x: 0,
        y: 0,
        playlist: {},
    }

    const [playlists, setPlaylists] = useState([])
    const [contextMenu, setContextMenu] = useState(initialContextMenu)

    useEffect(() => {
        console.log(contextMenu)    
    }, [contextMenu])

    useEffect(() => {
        async function load_playlists() {
            const data = await get_all_playlists()
            setPlaylists(data)
        }
        
        load_playlists()
        setActionOccurred(false)
    }, [actionOccurred])

    const handleCreatePlaylist = async () => {
        const data = await create_playlist()
        setActionOccurred(true)
    }

    const handleContextMenu = (e, playlist = {}) => {
        e.preventDefault()
        if (playlist != {}) {
            e.stopPropagation()
        }
        setContextMenu({ show: true, x: e.pageX, y: e.pageY, playlist: playlist})
    }

    const contextMenuClose = () => {
        setContextMenu({
            ...contextMenu,
            show: false, 
        })
    }

    return (
        <nav className={styles.sidemenu}>
            {contextMenu.show && (<ContextMenu x={contextMenu.x} y={contextMenu.y} playlist={contextMenu.playlist} contextMenuClose={contextMenuClose}/>)}
            {modal && <PlaylistDatailsUpdate playlist={contextMenu.playlist}/>}
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
                        <div className={styles.playlists_container} onContextMenu={(e) => handleContextMenu(e)}>
                            <div>
                                <ul className={styles.playlists}>
                                    {playlists.map(playlist => {
                                        return (
                                            <li key={playlist._id} onContextMenu={(e) => handleContextMenu(e, playlist)}>
                                                <Link to={`/playlist/${playlist._id}`}>{playlist.name}</Link>
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

const mapStateToProps = state => ({
    actionOccurred: state.playlist.actionOccurred,
    modal: state.playlist.modal
})

const mapDispatchToProps = dispatch => ({
    setActionOccurred: (bool) => dispatch(PlaylistActions.setActionOccurred(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)