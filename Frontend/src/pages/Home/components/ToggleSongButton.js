import { connect } from 'react-redux'
import { getSong } from '../../../services/pytube'
import * as PlayActions from '../../../store/actions/play'
import * as SearchActions from '../../../store/actions/search'
import PlayButton from '../../../components/icons/PlayButton'

function ToggleSongButton(props) { 

    async function play(index, title, artist, img){
        
        if(index != props.activeIndex) {
            console.log(props)
            const audio = (await getSong(index)).audio
            props.setSongTrackData(audio)
            props.setSongMetaData(title, artist, img)
            
            props.setActiveIndex(index)
            props.setActiveSong({[index]: true})
            props.setIsPlaying(true)
        }
        else {
            props.setActiveSong({[index]: !props.activeSong[index]})
            props.setIsPlaying(!props.isPlaying)
        }
    }

    return (
        <button onClick={() => play(props.index, props.title, props.artist, props.img)}>
            <PlayButton size='60' active={props.activeSong[props.index]}/>
        </button>
    )
}

const mapStateToProps = state => ({
    isPlaying: state.play.isPlaying,
    activeSong: state.search.activeSong,
    activeIndex: state.search.activeIndex
})

const mapDispatchToProps = dispatch => ({
    setSongMetaData: (title, artist, img) => dispatch(PlayActions.setSongMetaData(title, artist, img)),
    setSongTrackData:(trackData) => dispatch(PlayActions.setSongTrackData(trackData)),
    setIsPlaying: (status) => dispatch(PlayActions.setIsPlaying(status)),
    setActiveSong: (status) => dispatch(SearchActions.setActiveSong(status)),
    setActiveIndex: (index) => dispatch(SearchActions.setActiveIndex(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleSongButton)