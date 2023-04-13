import { getMetadata, getSong } from '../../services/pytube'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as PlayActions from '../../store/actions/play'
import Play from '../../components/icons/Play'
import styles from "./Search.module.css"

function Search({searchResult, setSongMetaData, setSongTrackData, isPlaying, setIsPlaying}) {

    const initialState = {}
    const[active, setActive] = useState(initialState)
    const[ready, setReady] = useState(initialState)
    const[index, setIndex] = useState()

    useEffect(() => {
        setIsPlaying(active[index])
    }, [active])

    useEffect(() => {
        setActive(state => ({
            ...initialState,
            [index]: isPlaying
        }))
    }, [isPlaying])

    async function play(index,title,artist,img){
        
        setIndex(index)
        if(!active[index] && !ready[index]){
            // const data = (await getMetadata(link)).data
            const audio = (await getSong(index)).audio
            setSongTrackData(audio)
            setSongMetaData(title, artist, img)

            setActive(state => ({
                ...initialState,
                [index]: true
            }))
            
            setReady(state => ({
                ...initialState,
                [index]: true
            }))

            setIsPlaying(true)
        }
        else{
            setActive(state => ({
                ...initialState,
                [index]: !state[index]
            }))
        }
    }

    return ( 
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.category}>
                    <div><p>Tudo</p></div>
                    <div id={styles.songs}><p>Músicas</p></div>
                    <div><p>Álbuns</p></div>
                    <div><p>Artistas</p></div>
                    <div><p>Playlists</p></div>
                    <div><p>Podcasts e programas</p></div>
                </div>
                <div className={styles.song_info}>
                    <p id={styles.id}>#</p>
                    <p>Título</p>
                    <p id={styles.album}>Álbum</p>
                    <div>Icon</div>
                </div>
            </header>
            <div className={styles.search_result}>
                <ul>
                    {searchResult.map((song, index) => {
                        return(
                            <li key={index}>
                                <div className={styles.id}>
                                    <p>{index}</p>
                                    <div onClick={() => play(index, song.title, song.artist, song.img)}><Play size={12} active={active[index]}/></div>
                                </div>
                                <div>
                                    <img src={song.img} alt="cover"/>
                                    <span>
                                        <p id={styles.title}>{song.title}</p>
                                        <p id={styles.artist}>{song.artist}</p>
                                    </span>
                                </div>
                                <p>{song.album}</p>
                                <p id={styles.duration}>{song.duration}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isPlaying: state.play.isPlaying,
    searchResult: state.search.searchData
})

const mapDispatchToProps = dispatch => ({
    setSongMetaData: (title, artist, img) => dispatch(PlayActions.setSongMetaData(title, artist, img)),
    setSongTrackData:(trackData) => dispatch(PlayActions.setSongTrackData(trackData)),
    setIsPlaying: (status) => dispatch(PlayActions.setIsPlaying(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
