import React from 'react'
import styles from './ContextMenu.module.css'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useRef, useState } from 'react'
import { create_playlist, delete_playlist, get_one_playlist } from '../../../services/mongodb'
import { connect } from 'react-redux'
import * as PlaylistActions from '../../../store/actions/playlist'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function ContextMenu({x, y, playlist, contextMenuClose, setActionOccurred, setModal, setPlaylist}) {

  const contextMenuRef = useRef(null)
  const location = useLocation();
  useOnClickOutside(contextMenuRef, contextMenuClose)

  async function handleCreatePlaylist() {
    const data = await create_playlist()
    contextMenuClose()
    setActionOccurred(true)
  }

  async function handleDeletePlaylist() {
    await delete_playlist(playlist._id)
    contextMenuClose()
    setActionOccurred(true)
  }

  async function handleUpdatePlaylist() {
    setPlaylist(playlist)
    setModal(true)
    contextMenuClose()
    setActionOccurred(true)
  }

  return (
    <div className={styles.context_menu_container} ref={contextMenuRef} style={{top: `${y}px`, left: `${x}px`}}>
      <ul className={styles.context_menu}>
        {Object.keys(playlist).length > 0 && (
          <>
            <li>
              <button onClick={handleUpdatePlaylist}>
                <span>Editar os detalhes</span>
              </button>
            </li>
            <li>
              {location.pathname === `/playlist/${playlist._id}` ? (
                <Link to='/' className={styles.redirect}>
                  <button onClick={handleDeletePlaylist}>
                    <span>Apagar</span>
                  </button>
                </Link>
              ) : (
                <Link className={styles.redirect}>
                  <button onClick={handleDeletePlaylist}>
                    <span>Apagar</span>
                  </button>
                </Link>
              )}
            </li>
            <hr />
          </>
        )}
        <li>
          <button onClick={handleCreatePlaylist}>
            <span>Criar playlist</span>
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

export default connect(null, mapDispatchToProps)(ContextMenu)