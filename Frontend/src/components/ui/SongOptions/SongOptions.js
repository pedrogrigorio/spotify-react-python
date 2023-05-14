import React, { useEffect } from 'react'
import styles from './SongOptions.module.css'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PlaylistActions from '../../../store/actions/playlist'
import ArrowDown from '../../icons/ArrowDown'
import { add_song, create_playlist, remove_song } from '../../../services/mongodb'
import Search from '../../icons/Search'
import Close from '../../icons/Close'

function SongOptions({x, y, song, index, current_playlist, playlists, songOptionsClose, setActionOccurred}) {

	const [cordY, setCordY] = useState(0)
	const [subMenuCordY, setSubMenuCordY] = useState(0)
	const [showPlaylists, setShowPlaylists] = useState(false)
	const [playlistFilter, setplaylistFilter] = useState('');
	const songOptionsRef = useRef(null)
	const subMenu = useRef(null)
	const {pathname} = useLocation()

	useOnClickOutside(songOptionsRef, songOptionsClose)

	useEffect(() => {
		const windowHeight = window.innerHeight;
		const menuHeight = songOptionsRef.current.getBoundingClientRect().height;
		const subMenuHeight = 80 + (44*playlists.length)
		setSubMenuCordY(subMenuHeight-45);
		if (y + menuHeight + 40 > windowHeight) {
			setCordY(y-menuHeight+10)
		}
		else {
			setCordY(y+40)
		}

		if (y + menuHeight + 40 + subMenuHeight > windowHeight) {
			setSubMenuCordY(subMenuHeight - 35)
		}
		else {
			setSubMenuCordY(0)
		}

		console.log(pathname)
	}, [])

	const createPlaylist = async () => {
		const new_playlist = await create_playlist()
		await add_song(new_playlist._id, song)
		setActionOccurred(true)
		songOptionsClose()
	}

	const addSong = (id) => {
		add_song(id, song)
		setActionOccurred()
		songOptionsClose()
	}

	const deleteSong = async () => {
		console.log(current_playlist._id)
		console.log(index)
		await remove_song(current_playlist._id, index)
		setActionOccurred()
		songOptionsClose()
	}

  return (
		<div className={styles.song_options_container} ref={songOptionsRef} style={{top: `${cordY}px`, left: `${x-190}px`, opacity:`${cordY != 0 ? "1" : "0"}`}}>
      <ul className={styles.song_options}>
        <li>
          {pathname != '/search' && (
						<button onClick={deleteSong}>
          	  <span>Remover desta playlist</span>
          	</button>
					)}
        </li>
				<li 
					className={styles.add_to_playlist} 
					onMouseEnter={() => setShowPlaylists(true)} 
					onMouseLeave={() => setShowPlaylists(false)}
				>
          <button className={showPlaylists ? `${styles.active}` : ''}>
            <span>Adicionar à playlist</span>
						<ArrowDown size='16'/>
          </button>
					<div className={styles.playlists_container} ref={subMenu} style={{transform: `translate(-200px, -${subMenuCordY}px)`}}>
						<ul className={styles.playlists}>
							<li>
								<div className={styles.search_box}>
									<input placeholder='Procurar uma playlist' value={playlistFilter} onChange={(e) => setplaylistFilter(e.target.value)}/>
									<div className={styles.search_icon}>
										<span><Search size='16'/></span>
									</div>
									{playlistFilter.length > 0 && (
										<div className={styles.close_icon} onClick={() => setplaylistFilter('')}>
											<Close size='16'/>
										</div>
									)}
								</div>
							</li>
							<li>
								<button onClick={createPlaylist}>
									<span>Criar playlist</span>
								</button>
							</li>
							<hr />
							{playlists.filter(playlist => playlist.name.toLowerCase().includes(playlistFilter.toLowerCase())).map(playlist => {
								return (
									<li key={playlist._id}>
										<button onClick={() => addSong(playlist._id)}>
											<span>{playlist.name}</span>
										</button>
									</li>
								);
							})}
						</ul>
					</div>
        </li>
      </ul>
    </div>
  )
	
}

const mapDispatchToProps = dispatch => ({
  setActionOccurred: (bool) => dispatch(PlaylistActions.setActionOccurred(bool))
})

export default connect(null, mapDispatchToProps)(SongOptions)