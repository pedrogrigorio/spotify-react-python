import { useState } from 'react';
import { SearchEngine } from "../../../services/SearchEngine";
import { connect } from 'react-redux';
import styles from './SearchBox.module.css';
import Search from '../../icons/Search';
import * as SearchActions from '../../../store/actions/search'


function SearchBox({dispatch}) {

    const[searchContent, setSearchContent] = useState('')
    const[callSearchApi, setCallSearchApi] = useState(false)

    async function handleKeyDown(event){
        if(event.key === "Enter"){
            const response = await SearchEngine(searchContent)
            console.log(response.data)
            response.data.map((song) => {
                dispatch(SearchActions.setSearchData(song.img, song.link, song.title))
            })
        }
    }

    const handleKeyUp = (event) => {
        if(event.key === "Enter") {
            setCallSearchApi(false)
        }
    }

    return (
        <div className={styles.SeachBox}>
            <Search size={22} searchBox={true} />
            <input 
            placeholder="O que você quer ouvir?" 
            maxLength="80" 
            onChange={(event) => {setSearchContent(event.target.value)}}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        />
        </div>
    )

}

export default connect()(SearchBox);

