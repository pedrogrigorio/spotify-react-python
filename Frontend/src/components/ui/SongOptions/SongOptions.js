import React, { useEffect } from 'react'
import styles from './SongOptions.module.css'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useRef, useState } from 'react'
import { create_playlist, delete_playlist, get_one_playlist } from '../../../services/mongodb'
import { connect } from 'react-redux'
import * as PlaylistActions from '../../../store/actions/playlist'

function SongOptions({x, y, songOptionsClose, setActionOccurred}) {

	const [cordY, setCordY] = useState(0)
	const songOptionsRef = useRef(null)
	useOnClickOutside(songOptionsRef, songOptionsClose)

	useEffect(() => {
		const windowHeight = window.innerHeight;
		const menuHeight = songOptionsRef.current.getBoundingClientRect().height;
		
		if (y + menuHeight + 40 > windowHeight) {
			setCordY(y-menuHeight+10)
		}
		else {
			setCordY(y+40)
		}
	}, [])

  return (
		<div className={styles.song_options_container} ref={songOptionsRef} style={{top: `${cordY}px`, left: `${x-150}px`, opacity:`${cordY != 0 ? "1" : "0"}`}}>
      <ul className={styles.song_options}>
        <li>
          <button>
            <span>Remover desta playlist</span>
          </button>
        </li>
				<li>
          <button>
            <span>Adicionar à playlist</span>
          </button>
        </li>
				<li>
          <button>
            <span>Adicionar à playlist</span>
          </button>
        </li>
				<li>
          <button>
            <span>Adicionar à playlist</span>
          </button>
        </li>
      </ul>
    </div>
  )
	
}

const mapDispatchToProps = dispatch => ({
  setActionOccurred: (bool) => dispatch(PlaylistActions.setActionOccurred(bool))
})

export default connect(null, mapDispatchToProps)(SongOptions)