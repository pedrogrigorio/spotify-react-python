import styles from './Home.module.css'
import PlayButton from '../../components/icons/PlayButton'
import musiclogo from '../../assets/img/baixados.jpg'

function Home(){

    

    return(
        <div className={styles.container}>
            <section className={styles.section}>
                <div className={styles.sectiontext}> 
                    <h2>Músicas que estão bombando</h2>
                    <button onClick={() => console.log("working fine")} className={styles.showall}><h4>Mostrar tudo</h4></button>
                </div>
                <div className={styles.gridcontainer}>
                    <div className={styles.card}>
                        <div className={styles.cover}>
                            <img src={musiclogo} alt='cover'/>
                            <button className={styles.playbtn}><PlayButton size={60}/></button>
                        </div>
                        <div className={styles.text}>
                            <h2>Rap old School</h2>
                            <h3>Escute suas músicas prefiridas no spotify</h3>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cover}>
                            <img src={musiclogo} alt='cover'/>
                            <button className={styles.playbtn}><PlayButton size={48}/></button>
                        </div>
                        <div className={styles.text}>
                            <h2>Rap old School</h2>
                            <h3>Escute suas músicas prefiridas no spotify</h3>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cover}>
                            <img src={musiclogo} alt='cover'/>
                            <button className={styles.playbtn}><PlayButton size={48}/></button>
                        </div>
                        <div className={styles.text}>
                            <h2>Rap old School</h2>
                            <h3>Escute suas músicas prefiridas no spotify</h3>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cover}>
                            <img src={musiclogo} alt='cover'/>
                            <button className={styles.playbtn}><PlayButton size={48}/></button>
                        </div>
                        <div className={styles.text}>
                            <h2>Rap old School</h2>
                            <h3>Escute suas músicas prefiridas no spotify</h3>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cover}>
                            <img src={musiclogo} alt='cover'/>
                            <button className={styles.playbtn}><PlayButton size={48}/></button>
                        </div>
                        <div className={styles.text}>
                            <h2>Rap old School</h2>
                            <h3>Escute suas músicas prefiridas no spotify</h3>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cover}>
                            <img src={musiclogo} alt='cover'/>
                            <button className={styles.playbtn}><PlayButton size={48}/></button>
                        </div>
                        <div className={styles.text}>
                            <h2>Rap old School</h2>
                            <h3>Escute suas músicas prefiridas no spotify</h3>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cover}>
                            <img src={musiclogo} alt='cover'/>
                            <button className={styles.playbtn}><PlayButton size={48}/></button>
                        </div>
                        <div className={styles.text}>
                            <h2>Rap old School</h2>
                            <h3>Escute suas músicas prefiridas no spotify</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home