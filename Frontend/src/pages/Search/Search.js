import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Play from '../../components/icons/Play';
import styles from "./Search.module.css";
import MusicConect from '../../services/MusicConect';
import CardContent from './components/CardContent/CardContent';

function Search({SearchInfo}) {

    const [isPlaying, setIsPlaying] = useState(false)

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
                           <CardContent index={song.index} title={song.title} artist={song.artist} img={song.img} duration={song.duration} album={song.album} />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default connect(state => ({SearchInfo : state.search.SEARCH_CONTENT}))(Search)