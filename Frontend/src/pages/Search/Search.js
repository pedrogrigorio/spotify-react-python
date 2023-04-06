import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Play from '../../components/icons/Play';
import styles from "./Search.module.css";
import {getMetadata, getSong} from '../../services/pytube';
import * as PlayActions from '../../store/actions/play'

function Search({searchResult, setSongData}) {

    async function play(link){
        const data = (await getMetadata(link)).data
        const audio = (await getSong(link)).audio
        console.log(data)
        console.log(audio)
        setSongData(data.title, data.artist, data.img, audio)
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
                    {searchResult.map((song) => {
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

const mapStateToProps = state => ({
    searchResult : state.search.SEARCH_DATA
})

const mapDispatchToProps = dispatch => ({
    setSongData: (title, artist, img, audio) => dispatch(PlayActions.setSongData(title, artist, img, audio))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)