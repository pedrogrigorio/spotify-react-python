import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { get_one_playlist } from '../../services/mongodb'
import styles from './Playlist.module.css'
import MusicNote from "../../components/icons/MusicNote"
import Play2 from "../../components/icons/Play2"
import Options from "../../components/icons/Options"
import Duration from '../../components/icons/Duration'
import equalizer from '../../assets/gif/equalizer.gif'
import convertTime from '../../helpers/convertTime'
import ToggleSongButton from '../Search/components/ToggleSongButton'
import Like from '../../components/icons/Like'
import { connect } from "react-redux"
import getMeanDuration from '../../helpers/getMeanDuration'

function Playlist({activeSong, songMetaData}) {

    const {id} = useParams()
    const [playlist, setPlaylist] = useState(null)
    const [width, setWidth] = useState(window.innerWidth) 
    const [totalSongs, setTotalSongs] = useState(0)
    const [totalDuration, setTotalDuration] = useState("")

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, [])

    useEffect(() => {
        const loadPlaylist = async () => {
            const data = await get_one_playlist(id)
            setPlaylist(data)
            setTotalSongs(data.songs.length)
            setTotalDuration(getMeanDuration(data))
        }

        loadPlaylist()
    }, [id])

    if (!playlist) {
        return <div className={styles.container}>Playlist not found</div>;
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
                        <span>{totalSongs} músicas,&nbsp;</span>
                        <span className={styles.total_duration}>{totalDuration}</span>
                    </div>
                </div>
            </div>
            <div className={styles.playlist_content}>
                <div className={styles.content_background_gradient}></div>
                <div className={styles.playlist_interaction_container}>
                    <div className={styles.playlist_interactions}>
                        <button className={styles.play_button}>
                            <Play2 size='28' fill='black'/>
                        </button>
                        <button>
                            <Options size='32'/>
                        </button>
                    </div>
                </div>
                <div className={styles.search_result_container}>
                    <div className={styles.list_header}>
                        <div className={styles.grid}>
                            <div className={styles.index}>#</div>
                            <div className={styles.title}>
                                <span>Título</span>
                            </div>
                            {width > 776 && (
                                <div className={styles.album}>
                                    <span>Álbum</span>
                                </div>
                            )}
                            <div className={styles.duration}>
                                <span><Duration size='16' /></span>
                            </div>
                        </div>
                    </div>
                    <ul className={styles.song_list}>
                        {playlist.songs.map((song, index) => {
                            return(
                                <li className={styles.list_item} key={index}>
                                    <div className={styles.song_index}>
                                        <div id={activeSong[song.id] ? `${styles.active}` : ""}>
                                            <span id={songMetaData.id == song.id ? `${styles.active}` : ""}>{index+1}</span>
                                            <img src={equalizer} width='14' height='20'></img>
                                            <ToggleSongButton index={song.id} title={song.title} artist={song.artist} img={song.cover}/>
                                        </div>
                                    </div>
                                    <div className={styles.song_details}>
                                        <img src={song.cover} alt='cover'/>
                                        <div>
                                            <div className={styles.title} id={songMetaData.id == song.id ? `${styles.active}` : ""}>{song.title}</div>
                                            <span id={styles.artist}>{song.artist}</span>
                                        </div>
                                    </div>
                                    {width > 776 && (
                                        <div className={styles.song_album}>
                                            <span>{song.album}</span>
                                        </div>
                                    )}
                                    <div className={styles.song_duration}>
                                        <button id={styles.like}><Like size='18'/></button>
                                        <span id={styles.time}>{convertTime(song.duration)}</span>
                                        <button id={styles.options}><Options size='18'/></button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    activeSong: state.search.activeSong,
    songMetaData: state.play.songMetaData
})

export default connect(mapStateToProps)(Playlist)