import React from 'react'
import styles from './LibrarySection.module.css'

export default function LibrarySection(props) {
  return (
    <nav className={styles.container}>
      <div className={styles.playlist}>
        <p>Playlists</p>
      </div>
      <div className={styles.podcast}>
        <p>Podcasts</p>
      </div>
      <div className={styles.artist}>
        <p>Artistas</p>
      </div>
      <div className={styles.album}>
        <p>Álbuns</p>
      </div>
    </nav>
  )
}