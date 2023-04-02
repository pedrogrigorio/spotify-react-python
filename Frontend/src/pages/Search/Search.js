import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Play from '../../components/icons/Play';
import styles from "./Search.module.css";
import MusicConect from '../../services/MusicConect';
import CardContent from './components/CardContent/CardContent';

function Search({SearchInfo}) {

    const [isPlaying, setIsPlaying] = useState(false)
    useEffect(() => {

    })

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
                    {SearchInfo.map((song) => {
                        return(
                            <li key={key}>
                                <div className={styles.id}>
                                    <p>1</p>
                                    <div onClick={() => setIsPlaying(!isPlaying)}><Play size={12} active={isPlaying}/></div>
                                    {/* MusicConect request all songs */}
                                    <MusicConect link={song.link} request={isPlaying}/>
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
                    {/* <li>
                        <div id={styles.id}>
                            <p>1</p>
                            <Play size={12} />
                        </div>
                        <div>
                            <img src={teste} alt="cover"/>
                            <span>
                                <p id={styles.title}>Billie Jean</p>
                                <p id={styles.artist}>Alexandr Misko</p>
                            </span>
                        </div>
                        <p>Beyond the Box</p>
                        <p id={styles.duration}>3:55</p>
                    </li> */}
                </ul>
            </div>
        </div>
    )
}

export default connect(state => ({SearchInfo : state.SEARCH_CONTENT}))(Search)