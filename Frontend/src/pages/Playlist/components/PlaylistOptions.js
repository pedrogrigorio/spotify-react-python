import React from 'react'
import styles from './PlaylistOptions.module.css'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useRef, useState } from 'react'
import { create_playlist, delete_playlist, get_one_playlist } from '../../../services/mongodb'
import { connect } from 'react-redux'
import * as PlaylistActions from '../../../store/actions/playlist'

function PlaylistOptions({x, y, playlist, playlistOptionsClose, setActionOccurred, setModal, setPlaylist}) {

  const contextMenuRef = useRef(null)
  useOnClickOutside(contextMenuRef, playlistOptionsClose)

  async function handleDeletePlaylist() {
    await delete_playlist(playlist._id)
    playlistOptionsClose()
    setActionOccurred(true)
  }

  async function handleUpdatePlaylist() {
    setPlaylist(playlist)
    setModal(true)
    playlistOptionsClose()
    setActionOccurred(true)
  }

  return (
    <div className={styles.context_menu_container} ref={contextMenuRef} style={{top: `${y+50}px`, left: `${x}px`}}>
      <ul className={styles.context_menu}>
        <li>
          <button onClick={handleUpdatePlaylist}>
            <span>Editar os detalhes</span>
          </button>
        </li>
        <li>
          <button onClick={handleDeletePlaylist}>
            <span>Apagar</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setActionOccurred: (bool) => dispatch(PlaylistActions.setActionOccurred(bool)),
  setModal: (bool) => dispatch(PlaylistActions.setModal(bool)),
  setPlaylist: (playlist) => dispatch(PlaylistActions.setPlaylist(playlist))
})

export default connect(null, mapDispatchToProps)(PlaylistOptions)