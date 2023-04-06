import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Play from '../../components/icons/Play';
import styles from "./Search.module.css";
import {GetMetadata, GetSong} from '../../services/MusicConect';
import * as PlayActions from '../../store/actions/play'

function Search({SearchInfo, dispatch}) {

    async function play(link){
        const data = await GetMetadata(link)
        const song = await GetSong(link)
        console.log(data)
        console.log(song)
        dispatch(PlayActions.setDataMusic(data.data.img, data.data.artist, data.data.title, song.audio))
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
                    {SearchInfo.map((song) => {
                        return(
                            <li key={song.title}>
                                <div className={styles.id}>
                                    <p>1</p>
                                    <div onClick={() => play(song.link)}><Play size={12}/></div>
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

export default connect(state => ({SearchInfo : state.search.SEARCH_CONTENT}))(Search)