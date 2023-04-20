import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { searchEngine } from "../../../services/pytube"
import * as SearchActions from '../../../store/actions/search'
import Search from '../../icons/Search'
import styles from './SearchBox.module.css'

function SearchBox({setSearchData, clearOldRequests, setActiveIndex, setActiveSong, songMetaData, isPlaying}) {

    const[searchContent, setSearchContent] = useState('')

    async function handleKeyDown(event){
        if(event.key === "Enter"){
            clearOldRequests()
            const data = (await searchEngine(searchContent)).data
            setSearchData(data)

            setActiveIndex(0)
            setActiveSong({})

            /*
            *   \/ check if any song in the new search is playing. \/
            */
            
            // data.map((song, index) => {
            //     if(song.id_deezer == songMetaData.id_deezer) {
            //         setActiveIndex(index+1)
            //         setActiveSong({[index+1]: isPlaying})
            //     }
            // }) 
        }
    }

    return (
        <div className={styles.SeachBox}>
            <Search size={24} searchBox={true} />
            <input 
            placeholder="O que você quer ouvir?" 
            maxLength="80" 
            onChange={(event) => {setSearchContent(event.target.value)}}
            onKeyDown={handleKeyDown}
        />
        </div>
    )
}

const mapStateToProps = state => ({
    isPlaying: state.play.isPlaying,
    songMetaData: state.play.songMetaData
})

const mapDispatchToProps = dispatch => ({
    setSearchData: (title, img, duration, artist, album) => dispatch(SearchActions.setSearchData(title, img, duration, artist, album)),
    clearOldRequests: () => dispatch(SearchActions.clearOldRequests()),
    setActiveSong: (status) => dispatch(SearchActions.setActiveSong(status)),
    setActiveIndex: (index) => dispatch(SearchActions.setActiveIndex(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

