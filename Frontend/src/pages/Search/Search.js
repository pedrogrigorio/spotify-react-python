import { getMetadata, getSong } from '../../services/pytube'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as PlayActions from '../../store/actions/play'
import Play from '../../components/icons/Play'
import styles from "./Search.module.css"
import Duration from '../../components/icons/Duration'
import Like from '../../components/icons/Like'
import Options from '../../components/icons/Options'
import Forward from '../../components/icons/Forward'
import teste from '../../assets/img/teste.jpg'

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

    const[width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, [])

    return ( 
        <div className={styles.container}>
            <div className={styles.categories_container}>
                <div className={styles.categories}>
                    <button>
                        <span>Tudo</span>
                    </button>
                    <button id={styles.highlight}>
                        <span>Músicas</span>
                    </button>
                    <button>
                        <span>Álbuns</span>
                    </button>
                    <button>
                        <span>Artistas</span>
                    </button>
                    <button>
                        <span>Playlists</span>
                    </button>
                    <button>
                        <span>Podcasts e programas</span>
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
                    {searchResult.map((song, index) => {
                        return(
                            <li className={styles.list_item}>
                                <div className={styles.song_index}>
                                    <div>
                                        <span>{index+1}</span>
                                        <button onClick={() => play(song.link, index)}><Play size='12'/></button>
                                    </div>
                                </div>
                                <div className={styles.song_details}>
                                    <img src={song.img} alt='cover'/>
                                    <div>
                                        <div id={styles.title}>{song.title}</div>
                                        <span id={styles.artist}>Alexandr Misko</span>
                                    </div>
                                </div>
                                {width > 776 && (
                                    <div className={styles.song_album}>
                                        <span>Beyond the Box</span>
                                    </div>
                                )}
                                <div className={styles.song_duration}>
                                    <button id={styles.like}><Like size='18'/></button>
                                    <span id={styles.time}>3:55</span>
                                    <button id={styles.options}><Options size='18'/></button>
                                </div>
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