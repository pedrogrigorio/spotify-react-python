import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"
import { get_one_playlist, get_all_playlists, get_liked_songs_playlist, unlike_song, like_song, get_one_liked_song } from '../../services/mongodb'
import { getSong } from '../../services/deezer'
import styles from './Playlist.module.css'
import MusicNote from "../../components/icons/MusicNote"
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
import PlaylistOptions from "./components/PlaylistOptions"
import * as PlayActions from '../../store/actions/play'
import * as SearchActions from '../../store/actions/search'
import convertDate from "../../helpers/convertDate"

function Playlist({activeSong, songMetaData, actionOccurred, isPlaying, setIsPlaying, setSongMetaData, setSongTrackData, setActiveSong, setActiveIndex}) {

    const {id} = useParams()
    const width = useWindowWidth()
    const [playlist, setPlaylist] = useState()
    const [totalSongs, setTotalSongs] = useState(0)
    const [totalDuration, setTotalDuration] = useState("")

    const songOptionsRefs = useRef({});
    const initialSongOptions = {show: false, x: 0, y: 0, song: {}, index: 0}
    const [songOptions, setSongOptions] = useState(initialSongOptions)
    const [playlists, setPlaylists] = useState([])
    
    const initialPlaylistOptions = {show: false, x: 0, y: 0}
    const playlistOptionsRef = useRef(null)
    const [playlistOptions, setPlaylistOptions] = useState(initialPlaylistOptions)

    const [likedSongsPlaylist, setLikedSongsPlaylist] = useState([])
    const [songsLiked, setSongsLike] = useState({})

    useEffect(() => {
        const loadPlaylist = async () => {
            const data = await get_one_playlist(id)
            setPlaylist(data)
            setTotalSongs(data.songs.length)
            setTotalDuration(getMeanDuration(data))

            const updatedLikes = {}
            data.songs.forEach((song, index) => {
                const isLiked = likedSongsPlaylist.some(obj => obj.song.id === song.id)
                if (isLiked) {
                    updatedLikes[song.id] = isLiked
                }
            })
            console.log(updatedLikes)
            setSongsLike(updatedLikes)
        }

        loadPlaylist()
    }, [id, actionOccurred, likedSongsPlaylist])

    useEffect(() => {
        setSongsLike({})

        const loadPlaylists = async () => {
            const data = await get_all_playlists();
            setPlaylists(data)
        }

        const loadLikeSongs = async () => {
            const data = await get_liked_songs_playlist()
            setLikedSongsPlaylist(data)
        }

        loadPlaylists()
        loadLikeSongs()
    }, [])

    const handleToggleLikeSong = async (index, status, song) => {
        const updatedLikes = { ...songsLiked}
        updatedLikes[song.id] = status
        setSongsLike(updatedLikes)

        if (status) {
            try {
                await like_song(song)
            }
            catch {
                console.log("some error that I don't know how to solve")
            }
        }
        else {
            const data = await get_one_liked_song(song.id)
            console.log(data)
            await unlike_song(data)
        }
    }

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

    const handlePlaylistOptions = () => {
        const cordX = playlistOptionsRef.current.getBoundingClientRect().left
        const cordY = playlistOptionsRef.current.getBoundingClientRect().top
        setPlaylistOptions({show: true, x: cordX, y: cordY})
    }

    const playlistOptionsClose = () => setPlaylistOptions(initialPlaylistOptions)

    const handlePlay = async (songs) => {
        if (songs.some(song => song.id === songMetaData.id)) {
            setIsPlaying(!isPlaying)
        }
        else {
            if (songs.length > 0) {
                const audio = (await getSong(songs[0].id)).audio
                console.log(audio)
                setSongTrackData(audio)
                setSongMetaData(songs[0].title, songs[0].artist, songs[0].cover, songs[0].id)
                
                setActiveIndex(songs[0].id)
                setActiveSong({[songs[0].id]: true})
                setIsPlaying(true)
            }
        }
    }

    if (!playlist) {
        return <div className={styles.container}>Playlist not found</div>;
    }

    return(
        <div className={styles.container}>
            {playlistOptions.show && <PlaylistOptions x={playlistOptions.x} y={playlistOptions.y} playlist={playlist} playlistOptionsClose={playlistOptionsClose}/>}
            {songOptions.show && <SongOptions x={songOptions.x} y={songOptions.y} song={songOptions.song} index={songOptions.index} current_playlist={playlist} playlists={playlists} songOptionsClose={songOptionsClose}/>}
            <div className={styles.playlist_details_container}>
                <div className={styles.background} style={{ backgroundColor: `rgb(${playlist.color_theme[0]}, ${playlist.color_theme[1]}, ${playlist.color_theme[2]})`}}></div>
                <div className={styles.background_gradient}></div>
                <div className={styles.playlist_cover} id={totalSongs >= 4 ? `${styles.active}` : ""}>
                    {totalSongs === 0 && <MusicNote size='48'/>}
                    {totalSongs >= 1 && totalSongs < 4 && <img src={playlist.cover[0]} id={styles.img0} alt=''/>}
                    {totalSongs >= 4 && (
                        <>
                            <img src={playlist.cover[0]} id={styles.img1} alt=''/>
                            <img src={playlist.cover[1]} id={styles.img2} alt=''/>
                            <img src={playlist.cover[2]} id={styles.img3} alt=''/>
                            <img src={playlist.cover[3]} id={styles.img4} alt=''/>
                        </>
                    )}
                </div>
                <div className={styles.playlist_details}>
                    <span className={styles.category}>Playlist</span>
                    <span className={styles.title}>
                        <h1>{playlist.name}</h1>
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
                <div className={styles.content_background_gradient} style={{ backgroundColor: `rgb(${playlist.color_theme[0]}, ${playlist.color_theme[1]}, ${playlist.color_theme[2]})`}}></div>
                <div className={styles.playlist_interaction_container}>
                    <div className={styles.playlist_interactions}>
                        <button className={styles.play_button} onClick={() => handlePlay(playlist.songs)}>
                            <Play2 size='28' fill='black' active={playlist.songs.some(song => song.id === songMetaData.id) ? isPlaying : false}/>
                        </button>
                        <button onClick={handlePlaylistOptions} ref={playlistOptionsRef}>
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
                                    {width > 1040 && (
                                        <div className={styles.song_date}>
                                            <span>{convertDate(playlist.songs_add_date[index])}</span>
                                        </div>
                                    )}
                                    <div className={styles.song_duration}>
                                        {songsLiked[song.id] ? (
                                            <button className={styles.like} id={styles.active} onClick={() => handleToggleLikeSong(index, false, song)}>
                                                <Like size='18' active={true}/>
                                            </button>
                                        ) : (
                                            <button className={styles.like} onClick={() => handleToggleLikeSong(index, true, song)}>
                                                <Like size='18'/>
                                            </button> 
                                        )}
                                        <span id={styles.time}>{convertTime(song.duration)}</span>
                                        <button id={styles.options} onClick={() => handleSongOptions(song, index)} ref={handleRef(index)}>
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
    setIsPlaying: (status) => dispatch(PlayActions.setIsPlaying(status)),
    setSongMetaData: (title, artist, img, index) => dispatch(PlayActions.setSongMetaData(title, artist, img, index)),
    setSongTrackData:(trackData) => dispatch(PlayActions.setSongTrackData(trackData)),
    setActiveSong: (status) => dispatch(SearchActions.setActiveSong(status)),
    setActiveIndex: (index) => dispatch(SearchActions.setActiveIndex(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)