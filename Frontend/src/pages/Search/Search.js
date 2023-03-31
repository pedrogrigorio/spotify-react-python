import { useEffect, useState } from 'react';
import Topnav from '../TopNave/TopNav'
import styles from "./Styles/search.module.css";
import BasicText from '../text/BasicTextManager'
import MusicCardBox from '../CardContent/MusicCardBox';
import { connect } from 'react-redux';


function Search({SearchInfo}) {
    return ( 
        <div className={styles.SearchPage}>
            <Topnav />
            <div className={styles.Search}>
                <BasicText text={'Search Result'}/>
                <div className={styles.SearchCardGrid}>
                    {SearchInfo.map((music) => {
                        return (
                            <MusicCardBox
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