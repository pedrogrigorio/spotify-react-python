import React from "react";
import { connect } from 'react-redux'
import styles from './ShowAll.module.css'
import ToggleSongButton from './ToggleSongHomeButton'

function ShowAll(props) {

  
    return (
      <div className={styles.container} >
        <section className={styles.section}>
        <div className={styles.sectiontext} >
          <h2>{props.typeNameShowAll}</h2>
        </div>

        <div className={styles.gridcontainer}>
        {Object.keys(props.updateHomeContent[props.typeShowAll]).map(item => {
          return props.updateHomeContent[props.typeShowAll][item].content.map(content => {
            return (
              
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
              
            );
          });
        })}
        </div>
        </section>
        
      </div>
    );
  }
  
  

 
const mapStateToProps = state => ({
    typeShowAll : state.home.typeShowAll,
    updateHomeContent : state.home.updateHomeContent,
    typeNameShowAll : state.home.typeNameShowAll
})

export default connect(mapStateToProps)(ShowAll)
