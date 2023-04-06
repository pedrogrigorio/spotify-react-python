import { getMetadata, getSong } from '../../services/pytube'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as PlayActions from '../../store/actions/play'
import Play from '../../components/icons/Play'
import styles from "./Search.module.css"

function Search({searchResult, setSongData, isPlaying, setIsPlaying}) {

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

    async function play(link, index){
        
        setIndex(index)
        if(!active[index] && !ready[index]){
            const data = (await getMetadata(link)).data
            const audio = (await getSong(link)).audio
            setSongData(data.title, data.artist, data.img, audio)

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
                            <li key={song.title}>
                                <div className={styles.id}>
                                    <p>1</p>
                                    <div onClick={() => play(song.link, index)}><Play size={12} active={active[index]}/></div>
                                </div>
                                <div>
                                    <img src={song.img} alt="cover"/>
                                    <span>
                                        <p id={styles.title}>{song.title}</p>
                                        <p id={styles.artist}>Alexandr Misko</p>
                                    </span>
                                </div>
                                <p>Beyond the Box</p>
                                <p id={styles.duration}>3:55</p>
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
    setSongData: (title, artist, img, audio) => dispatch(PlayActions.setSongData(title, artist, img, audio)),
    setIsPlaying: (status) => dispatch(PlayActions.setIsPlaying(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)