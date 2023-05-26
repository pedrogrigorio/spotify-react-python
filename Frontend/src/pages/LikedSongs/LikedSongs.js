import { useEffect, useState, useRef } from "react"
import { connect } from "react-redux"
import { get_liked_songs_playlist, get_all_playlists, unlike_song } from '../../services/mongodb'
import styles from './LikedSongs.module.css'
import Play2 from "../../components/icons/Play2"
import Options from "../../components/icons/Options"
import Duration from '../../components/icons/Duration'
import equalizer from '../../assets/gif/equalizer.gif'
import convertTime from '../../helpers/convertTime'
import ToggleSongButton from '../Search/components/ToggleSongButton'
import Like from '../../components/icons/Like'
import getMeanDuration from '../../helpers/getMeanDuration'
import useWindowWidth from "../../hooks/useWindowWidth"
import SongOptions from "../../components/ui/SongOptions/SongOptions"
import * as PlayActions from '../../store/actions/play'
import convertDate from "../../helpers/convertDate"

function LikedSongs({activeSong, songMetaData, actionOccurred, isPlaying, setIsPlaying}) {

    const width = useWindowWidth()
    const [playlist, setPlaylist] = useState()
    const [totalSongs, setTotalSongs] = useState(0)
    const [totalDuration, setTotalDuration] = useState("")

    const songOptionsRefs = useRef({});
    const initialSongOptions = {show: false, x: 0, y: 0, song: {}, index: 0}
    const [songOptions, setSongOptions] = useState(initialSongOptions)
    const [playlists, setPlaylists] = useState([])

    const loadPlaylist = async () => {
        const data = await get_liked_songs_playlist()
        setPlaylist(data)
        setTotalSongs(data.length)
        setTotalDuration(getMeanDuration(data))
    }

    useEffect(() => {
        loadPlaylist()

    }, [actionOccurred])

    useEffect(() => {
        const loadPlaylists = async () => {
            const data = await get_all_playlists();
            setPlaylists(data)
        }

        loadPlaylists()
    }, [actionOccurred])
    
    const handleRef = (index) => (ref) => {
        songOptionsRefs.current[index] = ref;
    };

    const handleSongOptions = (song, index) => {
        const element = songOptionsRefs.current[index]
        const cordX = element.getBoundingClientRect().left
        const cordY = element.getBoundingClientRect().top
        setSongOptions({show: true, x: cordX, y: cordY, song: song, index: index})
    }

    const songOptionsClose = () => setSongOptions(initialSongOptions);

    const handleUnlike = async (id) => {
        await unlike_song(id)
        loadPlaylist()
    }

    if (!playlist) {
        return <div className={styles.container}>Playlist not found</div>;
    }

    return(
        <div className={styles.container}>
            {songOptions.show && <SongOptions x={songOptions.x} y={songOptions.y} song={songOptions.song} index={songOptions.index} current_playlist={playlist} playlists={playlists} songOptionsClose={songOptionsClose}/>}
            <div className={styles.playlist_details_container}>
                <div className={styles.background}></div>
                <div className={styles.background_gradient}></div>
                <div className={styles.playlist_cover}>
                    <img src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' id={styles.img0} alt=''/>
                </div>
                <div className={styles.playlist_details}>
                    <span className={styles.category}>Playlist</span>
                    <span className={styles.title}>
                        <h1>Músicas Curtidas</h1>
                    </span>
                    <div>
                        <span className={styles.user}>Usuário</span>
                        {totalSongs > 0 && <>
                            <div className={styles.separator}>•</div>
                            <span>{totalSongs} músicas,&nbsp;</span>
                            <span className={styles.total_duration}>{totalDuration}</span>
                        </>}
                    </div>
                </div>
            </div>
            <div className={styles.playlist_content}>
                <div className={styles.content_background_gradient}></div>
                <div className={styles.playlist_interaction_container}>
                    <div className={styles.playlist_interactions}>
                        <button className={styles.play_button} onClick={() => setIsPlaying(!isPlaying)}>
                            <Play2 size='28' fill='black' active={playlist.some(song => song.song.id === songMetaData.id) ? isPlaying : false}/>
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
                            {width > 1040 && (
                                <div className={styles.date}>
                                    <span>Adiconada em</span>
                                </div> 
                            )}
                            <div className={styles.duration}>
                                <span><Duration size='16' /></span>
                            </div>
                        </div>
                    </div>
                    <ul className={styles.song_list}>
                        {playlist.map((song, index) => {
                            return (
                                <li className={styles.list_item} key={index}>
                                    <div className={styles.song_index}>
                                        <div id={activeSong[song.song.id] ? `${styles.active}` : ""}>
                                            <span id={songMetaData.id === song.song.id ? `${styles.active}` : ""}>{index+1}</span>
                                            <img src={equalizer} width='14' height='20' alt=''></img>
                                            <ToggleSongButton index={song.song.id} title={song.song.title} artist={song.song.artist} img={song.song.cover}/>
                                        </div>
                                    </div>
                                    <div className={styles.song_details}>
                                        <img src={song.song.cover} alt='cover'/>
                                        <div>
                                            <div className={styles.title} id={songMetaData.id === song.song.id ? `${styles.active}` : ""}>{song.song.title}</div>
                                            <span id={styles.artist}>{song.song.artist}</span>
                                        </div>
                                    </div>
                                    {width > 776 && (
                                        <div className={styles.song_album}>
                                            <span>{song.song.album}</span>
                                        </div>
                                    )}
                                    {width > 1040 && (
                                        <div className={styles.song_date}>
                                            <span>{convertDate(song.date)}</span>
                                        </div>
                                    )}
                                    <div className={styles.song_duration}>
                                        <button id={styles.like} onClick={() => handleUnlike(song._id)}>
                                            <Like size='18' active={true}/>
                                        </button>
                                        <span id={styles.time}>{convertTime(song.song.duration)}</span>
                                        <button id={styles.options} onClick={() => handleSongOptions(song.song, index)} ref={handleRef(index)}>
                                            <Options size='18'/>
                                        </button>
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
    songMetaData: state.play.songMetaData,
    isPlaying: state.play.isPlaying,
    actionOccurred: state.playlist.actionOccurred
})

const mapDispatchToProps = dispatch => ({
    setIsPlaying: (status) => dispatch(PlayActions.setIsPlaying(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(LikedSongs)