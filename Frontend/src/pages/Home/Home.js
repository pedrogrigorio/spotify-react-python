import styles from './Home.module.css'
import PlayButton from '../../components/icons/PlayButton'
import * as homeActions from '../../store/actions/home'
import musiclogo from '../../assets/img/baixados.jpg'
import { getTopContent, getRecentSearch } from '../../services/pytube'
import { useEffect } from 'react'
import { connect } from 'react-redux'

function Home(props){

    useEffect(() => {
        const updatePage = async () => {
            const content = (await getTopContent()).content
            console.log(content)
            props.setTopContent(content)
        }

        updatePage() 
    },[])

    return(
    <div className={styles.container}>  
        { 
            Object.keys(props.updateHomeContent).map(category => {
                return (
                <section className={styles.section}>
                    <div className={styles.sectiontext}> 
                        <h2>Principais albums da semana</h2>
                        <button onClick={() => console.log("working fine")} className={styles.showall}><h4>Mostrar tudo</h4></button>
                    </div> 
                    <div className={styles.gridcontainer}>
                    {  Object.keys(props.updateHomeContent[category]).map(item => {
                            return (
                                <div className={styles.card}>
                                    <div className={styles.cover}>
                                        <img src={props.updateHomeContent[category][item].cover} alt='cover'/>
                                        <button className={styles.playbtn}><PlayButton size={60}/></button>
                                    </div>
                                    <div className={styles.text}>
                                        <h2>{props.updateHomeContent[category][item].title}</h2>
                                        <h3>{props.updateHomeContent[category][item].artist}</h3>
                                    </div>
                                </div>
                            )    
                        })
                    }
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
    setTopContent: (updateSongData) => dispatch(homeActions.setTopContent(updateSongData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)