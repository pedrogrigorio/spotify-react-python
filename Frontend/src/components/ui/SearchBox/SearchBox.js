import { useState } from 'react';
import styles from './SearchBox.module.css';
import SearchAPIRequest from '../../../services/SearchEngine';
import Search from '../../icons/Search';


export default function SearchBox() {

    const[searchContent, setSearchContent] = useState('')
    const[callSearchApi, setCallSearchApi] = useState(false)

    const handleKeyDown = (event) => {
        if(event.key === "Enter") {
            setCallSearchApi(true)
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
            <SearchAPIRequest searchContent={searchContent} callSearchApi={callSearchApi}/> 
        </div>
    )

}

