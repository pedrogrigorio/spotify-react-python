import React, { useEffect, useState } from 'react'
import styles from './Genres.module.css'
import { getGenres } from '../../../services/deezer'

export default function Genres() {

  const [genres, setGenres] = useState([])

  useEffect(() => {
    const loadGenres = async () => {
      const data = await getGenres()
      setGenres(data)
    }

    loadGenres()
  }, [])

  if (genres.length === 0) {
    return null
  }
  
  return (
    <div className={styles.container}>
      <section className={styles.presentation}>
        <div className={styles.title}>
          <h2>Navegar por todas as seções</h2>
        </div>

        <div className={styles.genres}>
          {genres.map((genre) => {
            return (
              <div key={genre.id} className={styles.genre_card} style={{backgroundColor: `rgb(${genre.backgroundColor[0]}, ${genre.backgroundColor[1]}, ${genre.backgroundColor[2]})`}}>
                <img src={genre.coverUrl} alt=''/>
                <span>{genre.name}</span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}