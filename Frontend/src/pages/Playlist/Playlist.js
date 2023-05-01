import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { get_one_playlist } from '../../services/mongodb'
import styles from './Playlist.module.css'
import test_img from '../../assets/img/baixados.jpg'

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
        <div className={styles.playlist_container}>
            <div className={styles.playlist_info_container}>
                <div className={styles.playlist_cover}>
                    <img src={test_img}/>
                </div>
                <div className={styles.playlist_details}>
                    <span>Playlist</span>
                    <span>{playlist.name}</span>
                    <div>
                        <span>Usuário</span>
                        <span>93 músicas, cerca de 5h</span>
                    </div>
                </div>
            </div>
            <div className={styles.songs_list_container}>

            </div>
        </div>
    )
}

export default Playlist