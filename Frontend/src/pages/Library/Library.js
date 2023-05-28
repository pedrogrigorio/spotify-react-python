import styles from "./Library.module.css"
import { Link } from 'react-router-dom'
import Card from "./components/Card"
import { get_all_playlists } from '../../services/mongodb'
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Play2 from "../../components/icons/Play2"
import * as PlayActions from '../../store/actions/play'
import * as SearchActions from '../../store/actions/search'
import { getSong } from '../../services/pytube'

function Library({actionOccurred, songMetaData, isPlaying, setIsPlaying, setSongMetaData, setSongTrackData, setActiveIndex, setActiveSong}){

  const [playlists, setPlaylists] = useState()
  
  useEffect(() => {
    const loadPlaylists = async () => {
      const data = await get_all_playlists()
      console.log(data)
      setPlaylists(data)
    }

    loadPlaylists()
  }, [actionOccurred])

  const handlePlay = async (playlist) => {

    if (playlist.songs.some(song => song.id === songMetaData.id)) {
      setIsPlaying(!isPlaying)
    }
    else {
      if (playlist.songs.length > 0) {
        console.log("teste")
        const audio = (await getSong(playlist.songs[0].id)).audio
        console.log(audio)
        setSongTrackData(audio)
        setSongMetaData(playlist.songs[0].title, playlist.songs[0].artist, playlist.songs[0].cover, playlist.songs[0].id)

        setActiveIndex(playlist.songs[0].id)
        setActiveSong({[playlist.songs[0].id]: true})
        setIsPlaying(true)
      }
    }
  }

  if(!playlists) {
    return <div>Loading</div>
  }

  return (
    <>
      <div className={styles.navbar_view}></div>
      <div className={styles.container}>
        <div className={styles.presentation}>
          <h2>Sua Biblioteca</h2>
          <ul className={styles.playlists}>
            {playlists.map(playlist => {
              return (
                <li>
                  <Link to={`/playlist/${playlist._id}`}>
                    <Card title={playlist.name} cover={playlist.cover}/>
                  </Link>
                  <div className={styles.play}>
                    <button className={styles.play_button} onClick={() => handlePlay(playlist)}>
                      <Play2 size='16' fill='black' active={playlist.songs.some(song => song.id === songMetaData.id) ? isPlaying : false}/>
                    </button>
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
  actionOccurred: state.playlist.actionOccurred,
  songMetaData: state.play.songMetaData,
  isPlaying: state.play.isPlaying
})

const mapDispatchToProps = dispatch => ({
  setIsPlaying: (status) => dispatch(PlayActions.setIsPlaying(status)),
  setSongMetaData: (title, artist, img, index) => dispatch(PlayActions.setSongMetaData(title, artist, img, index)),
  setSongTrackData:(trackData) => dispatch(PlayActions.setSongTrackData(trackData)),
  setActiveSong: (status) => dispatch(SearchActions.setActiveSong(status)),
  setActiveIndex: (index) => dispatch(SearchActions.setActiveIndex(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(Library)