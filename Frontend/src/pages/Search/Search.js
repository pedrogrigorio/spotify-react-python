import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CardContent from './components/CardContent/CardContent';
import styles from "./Search.module.css";


function Search({SearchInfo}) {
    return ( 
        <div className={styles.SearchPage}>
            <div className={styles.Search}>
                <p>Search Result</p>
                <div className={styles.SearchCardGrid}>
                    {SearchInfo.map((music) => {
                        return (
                            <CardContent
                                link={music.link}
                                title={music.title}
                                imgurl={music.img}
                            />
                        )
                    })}
                </div>      
            </div>
        </div>
    )
}

export default connect(state => ({SearchInfo : state.SEARCH_CONTENT}))(Search)