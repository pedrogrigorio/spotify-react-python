import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { get_one_playlist } from '../../services/mongodb'
import styles from './Playlist.module.css'
import test_img from '../../assets/img/baixados.jpg'
import MusicNote from "../../components/icons/MusicNote"

function Playlist() {
    const {id} = useParams()

    const [playlist, setPlaylist] = useState(null)

    useEffect(() => {
        const loadPlaylist = async () => {
            const data = await get_one_playlist(id)
            setPlaylist(data)
            console.log(data)
        }

        loadPlaylist()
    }, [id])

    if (!playlist) {
        return <div>Playlist not found</div>;
    }

    return(
        <div className={styles.container}>
            <div className={styles.playlist_details_container}>
                <div className={styles.background}></div>
                <div className={styles.background_gradient}></div>
                <div className={styles.playlist_cover}>
                    <MusicNote size='48'/>
                </div>
                <div className={styles.playlist_details}>
                    <span className={styles.category}>Playlist</span>
                    <span className={styles.title}>
                        <h1>{playlist.name}</h1>
                    </span>
                    <div>
                        <span className={styles.user}>Usuário</span>
                        <div className={styles.separator}>•</div>
                        <span>{'93 músicas'}, &nbsp;</span>
                        <span className={styles.total_duration}>cerca de {'5'}h</span>
                    </div>
                </div>
            </div>
            <div className={styles.playlist_content}>
                <div className={styles.content_background_gradient}></div>
            </div>
        </div>
    )
}

export default Playlist