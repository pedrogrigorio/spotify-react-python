import React, { useRef } from 'react'
import styles from './PlaylistDatailsUpdate.module.css'
import Close from '../../icons/Close'
import baixados from '../../../assets/img/baixados.jpg'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import * as PlaylistActions from '../../../store/actions/playlist'
import { get_one_playlist, rename_playlist} from '../../../services/mongodb'
import MusicNote from '../../icons/MusicNote'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'

function PlaylistDatailsUpdate({playlist = {}, setModal, setActionOccurred}) {

  
  const playlistDetailModal = useRef(null)
  const [message, setMessage] = useState('');

  useOnClickOutside(playlistDetailModal, () => setModal(false))

  const handleChange = (e) => setMessage(e.target.value);

  const handleClick = async () => {
    if (message.length > 0) {
      await rename_playlist(playlist._id, message)
      setActionOccurred(true)
    }
    setModal(false)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal_container} ref={playlistDetailModal}>
        <div className={styles.header}>
          <h1>Editar detalhes</h1>
          <button onClick={() => setModal(false)}>
            <Close size='16'/>
          </button>
        </div>
        <div className={styles.fields}>
          <div className={styles.cover} id={playlist.cover.length == 4 ? `${styles.active}` : ""}>
            {playlist.cover.length == 0 && <MusicNote size='48'/>}
            {playlist.cover.length >= 1 && playlist.cover.length < 4 && <img src={playlist.cover[0]} id={styles.img0}/>}
            {playlist.cover.length == 4 && (
                <>
                    <img src={playlist.cover[0]} id={styles.img1}/>
                    <img src={playlist.cover[1]} id={styles.img2}/>
                    <img src={playlist.cover[2]} id={styles.img3}/>
                    <img src={playlist.cover[3]} id={styles.img4}/>
                </>
            )}
          </div>
          <div className={styles.title}>
            <input placeholder='Adicione um nome' defaultValue={playlist.name} onChange={handleChange}/>
          </div>
          <div className={styles.description}>
            <textarea placeholder='Adicione uma descrição opcional'/>
          </div>
          <button className={styles.save_button} onClick={handleClick}>
            <span>Salvar</span>
          </button>
          <p className={styles.disclaimer}>Ao continuar, você autoriza o Spotify a acessar a imagem enviada. Certifique-se de que você tem o direito de fazer o upload dessa imagem.</p>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setActionOccurred: (bool) => dispatch(PlaylistActions.setActionOccurred(bool)),
  setModal: (bool) => dispatch(PlaylistActions.setModal(bool))
})

export default connect(null, mapDispatchToProps)(PlaylistDatailsUpdate)