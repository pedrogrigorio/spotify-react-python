// import { connect } from 'react-redux'
// import { getSong } from '../../../services/pytube'
// import * as PlayActions from '../../../store/actions/play'
// import * as SearchActions from '../../../store/actions/search'
import PlayButton from '../../../components/icons/PlayButton'
import Play2 from '../../../components/icons/Play'
import Styles from '../Home.module.css'

function ToggleSongButton(props) { 

    return (
        <button className={Styles.playbtn} >
            <PlayButton size='60'/>
        </button>
    )


}

export default ToggleSongButton