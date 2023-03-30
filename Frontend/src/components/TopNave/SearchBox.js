import { useState } from 'react';
import * as Icons from '../icons';
import styles from './Styles/search.module.css';
import SearchAPIRequest from '../../backend/SearchEngine'


export default function Search() {

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
            <Icons.Search />
            <input placeholder="Search Here" maxLength="80" onChange={(event) => {setSearchContent(event.target.value)}}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
           />
            <SearchAPIRequest searchContent={searchContent} callSearchApi={callSearchApi}/> 
        </div>
    )

}

