import React from 'react'
import styles from './PlaylistDatailsUpdate.module.css'
import Close from '../../icons/Close'
import baixados from '../../../assets/img/baixados.jpg'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import * as PlaylistActions from '../../../store/actions/playlist'
import { get_one_playlist } from '../../../services/mongodb'

function PlaylistDatailsUpdate({playlist = {}, setModal}) {

  useEffect(() => {
    console.log(playlist)
  }, [playlist])

  if (!playlist) {
    return <div className={styles.overlay}></div>
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal_container}>
        <div className={styles.header}>
          <h1>Editar detalhes</h1>
          <button onClick={() => setModal(false)}>
            <Close size='16'/>
          </button>
        </div>
        <div className={styles.fields}>
          <div className={styles.cover}>
            <img src={baixados}/>
          </div>
          <div className={styles.title}>
            <input placeholder='Adicione um nome' defaultValue={playlist.name}/>
          </div>
          <div className={styles.description}>
            <textarea placeholder='Adicione uma descrição opcional'/>
          </div>
          <button className={styles.save_button}>
            <span>Salvar</span>
          </button>
          <p className={styles.disclaimer}>Ao continuar, você autoriza o Spotify a acessar a imagem enviada. Certifique-se de que você tem o direito de fazer o upload dessa imagem.</p>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setModal: (bool) => dispatch(PlaylistActions.setModal(bool))
})

export default connect(null, mapDispatchToProps)(PlaylistDatailsUpdate)