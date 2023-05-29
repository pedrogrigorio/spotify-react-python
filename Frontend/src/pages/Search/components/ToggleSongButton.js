import { connect } from 'react-redux'
import { getSong } from '../../../services/deezer'
import * as PlayActions from '../../../store/actions/play'
import * as SearchActions from '../../../store/actions/search'
import Play from '../../../components/icons/Play'

function ToggleSongButton(props) { 

    async function play(index, title, artist, img) {
        if (index != props.activeIndex) {
            const audio = (await getSong(index)).audio
            props.setSongTrackData(audio)
            props.setSongMetaData(title, artist, img, index)

            props.setActiveIndex(index)
            props.setActiveSong({[index]: true})
            props.setIsPlaying(true)

            if (props.isPlaylist) {
                props.setPlaylist(props.playlistSongs)
                props.setSongIndex(props.listIndex)
            }
            if (props.isSearch) {
                props.setPlaylist(props.searchResult)
                props.setSongIndex(props.listIndex)
            }
        }
        else {
            props.setActiveSong({[index]: !props.activeSong[index]})
            props.setIsPlaying(!props.isPlaying)
        }
    }

    return (
        <button onClick={() => play(props.index, props.title, props.artist, props.img)}>
            <Play size='12' active={props.activeSong[props.index]}/>
        </button>
    )
}

const mapStateToProps = state => ({
    isPlaying: state.play.isPlaying,
    activeSong: state.search.activeSong,
    activeIndex: state.search.activeIndex,
    searchResult: state.search.searchData
})

const mapDispatchToProps = dispatch => ({
    setSongMetaData: (title, artist, img, index) => dispatch(PlayActions.setSongMetaData(title, artist, img, index)),
    setSongTrackData:(trackData) => dispatch(PlayActions.setSongTrackData(trackData)),
    setIsPlaying: (status) => dispatch(PlayActions.setIsPlaying(status)),
    setActiveSong: (status) => dispatch(SearchActions.setActiveSong(status)),
    setActiveIndex: (index) => dispatch(SearchActions.setActiveIndex(index)),
    setPlaylist: (playlist) => dispatch(PlayActions.setPlaylist(playlist)),
    setSongIndex: (index) => dispatch(PlayActions.setSongIndex(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleSongButton)