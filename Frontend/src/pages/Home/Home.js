import styles from './Home.module.css'
import ToggleSongButton from './components/ToggleSongHomeButton'
import { Link } from "react-router-dom";
import * as homeActions from '../../store/actions/home'
import {getTopAlbums, getTopSongs , getRecentSearch } from '../../services/deezer'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
  

function Home(props){

    useEffect(() => {
        const updatePage = async () => {
            const songs   = (await getTopSongs()).content
            const albums  = (await getTopAlbums()).content
            const recent  = (await getRecentSearch()).content
            props.setRecentsSearch(recent)
            props.setTopSongs(songs)
            props.setTopAlbums(albums)
        }

        updatePage() 
    },[])

    const handleTypeContent = (category, type) => {
        props.typeShowAll(category)
        props.typeNameShowAll(type)
    }


    let contentList = []; 
    return(
    <div className={styles.container}>  
        {    
            Object.keys(props.updateHomeContent).map(category => {
                {Object.keys(props.updateHomeContent[category]).map(item => {
                    if(props.updateHomeContent[category][0].title !== null) {
                        contentList = props.updateHomeContent[category][item].content.map(content => (
                            <div className={styles.card}>
                                <div className={styles.cover}>
                                    <img src={content.cover} alt='cover' />
                                    <ToggleSongButton artist={content.artist} title={content.title} cover={content.cover} id={content.id} />
                                </div>
                                <div className={styles.text}>
                                    <h2>{content.title}</h2>
                                    <h3>{content.artist}</h3>
                                </div>
                            </div>
                        ));
                    }
                })}
                return (
                <section className={styles.section}>
                    <div className={styles.sectiontext}> 
                    {contentList.length > 0 && (
                        <>
                            <h2>{props.updateHomeContent[category][0].title}</h2>
                            {props.updateHomeContent[category][0].title && (
                            <Link to={`/showall/${props.updateHomeContent[category][0].title}`}>
                            <button onClick= { () => {handleTypeContent(category,props.updateHomeContent[category][0].title)} }className={styles.showall}>
                                <h4>Mostrar tudo</h4>
                            </button>
                            </Link> 
                            )}
                        </>
                        )}
                    </div> 
                    <div className={styles.gridcontainer}>
                        {contentList}
                    </div>
                </section> 
                )
            })       
        }
    </div>
    )
}



const mapStateToProps = state => ({
    updateHomeContent : state.home.updateHomeContent
})

const mapDispatchToProps = dispatch => ({
    setTopSongs: (updateSongData) => dispatch(homeActions.setTopSongs(updateSongData)),
    setTopAlbums: (updateAlbumData) => dispatch(homeActions.setTopAlbums(updateAlbumData)),
    setRecentsSearch: (updateRecentData) => dispatch(homeActions.setRecentSearch(updateRecentData)),
    typeShowAll: (typeShowAll) => dispatch(homeActions.typeShowAll(typeShowAll)),
    typeNameShowAll: (typeNameShowAll) => dispatch(homeActions.typeNameShow(typeNameShowAll))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)