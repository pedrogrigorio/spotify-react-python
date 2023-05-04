import { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import * as SearchActions from '../../store/actions/search'
import ToggleSongButton from './components/ToggleSongButton'
import styles from "./Search.module.css"
import Duration from '../../components/icons/Duration'
import Like from '../../components/icons/Like'
import Options from '../../components/icons/Options'
import convertTime from '../../helpers/convertTime'
import equalizer from '../../assets/gif/equalizer.gif'
import { add_song } from '../../services/mongodb'

function Search({activeSong, songMetaData, searchResult, clearOldRequests}) {
    useEffect(() => {
        clearOldRequests()
    }, [])

    const[width, setWidth] = useState(window.innerWidth) 

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, [])

    function addSong(song) {
        console.log(song)
        const id = '6453a4f94a4a3632458590a6'
        add_song(id, song)
    }
    
    return (
        <>
            <div className={styles.navbar_view}></div>
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
                                        <button id={styles.options} onClick={() => addSong(song)}><Options size='18'/></button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    searchResult: state.search.searchData,
    activeSong: state.search.activeSong,
    songMetaData: state.play.songMetaData
})

const mapDispatchToProps = dispatch => ({
    clearOldRequests: () => dispatch(SearchActions.clearOldRequests()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
