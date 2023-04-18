import { useEffect } from "react"
import { connect } from 'react-redux'
import * as PlayActions from '../../store/actions/play'

function Home({searchResult, setSongMetaData, setSongTrackData, isPlaying, setIsPlaying}){

    useEffect(() => {
        console.log(searchResult)
    }, [])

    return(
        <div>
            <h1>Home</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    isPlaying: state.play.isPlaying,
    searchResult: state.search.searchData
})

const mapDispatchToProps = dispatch => ({
    setSongMetaData: (title, artist, img) => dispatch(PlayActions.setSongMetaData(title, artist, img)),
    setSongTrackData:(trackData) => dispatch(PlayActions.setSongTrackData(trackData)),
    setIsPlaying: (status) => dispatch(PlayActions.setIsPlaying(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)