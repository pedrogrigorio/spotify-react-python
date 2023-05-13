import React from 'react'
import styles from './ContextMenu.module.css'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useRef } from 'react'
import { create_playlist, delete_playlist } from '../../../services/mongodb'
import { connect } from 'react-redux'
import * as PlaylistActions from '../../../store/actions/playlist'

function ContextMenu({x, y, playlist_id, contextMenuClose, setActionOccurred}) {
  
  const contextMenuRef = useRef(null)
  useOnClickOutside(contextMenuRef, contextMenuClose)

  async function handleCreatePlaylist() {
    const data = await create_playlist()
    contextMenuClose()
    setActionOccurred(true)
  }

  async function handleDeletePlaylist() {
    await delete_playlist(playlist_id)
    contextMenuClose()
    setActionOccurred(true)
  }

  async function handleUpdatePlaylist() {
    await delete_playlist(playlist_id)
    contextMenuClose()
    setActionOccurred(true)
  }

  return (
    <div className={styles.context_menu_container} ref={contextMenuRef} style={{top: `${y}px`, left: `${x}px`}}>
        <ul className={styles.context_menu}>
          {playlist_id != '' && (
            <>
              <li>
                <button>
                  <span>Editar os detalhes</span>
                </button>
              </li>
              <li>
                <button onClick={handleDeletePlaylist}>
                  <span>Apagar</span>
                </button>
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
  setActionOccurred: (bool) => dispatch(PlaylistActions.setActionOccurred())
})

export default connect(null, mapDispatchToProps)(ContextMenu)