import { useState } from 'react';
import Footer from './components/Footer/Footer';
import SideBar from './components/SideBar/SideBar'
import styles from './App.module.css';

 

function App() {

  const [songs, setSongs] = useState({})

  async function searchMusic() {
    
    let url_music = 'http://127.0.0.1:8000/read_music'
    let url_info  = 'http://127.0.0.1:8000/read_title'
    fetch(url_music)
            .then((res) => { return res.blob(); })
            .then((data) => {
            var a = document.createElement("a");
            a.href = window.URL.createObjectURL(data);

            fetch(url_info).then((response) => response.json())
            .then((data) => { 

            setSongs(
              {
               title   : data.title,
               artist  : data.artist,
               img_src : data.img,
               src     : a
              }
          )

        });  
    });
}

  function readInfo() { 
    console.log(songs.img_src)
  }


  return (
    <div className={styles.layout}>
        {/* <button onClick={() => searchMusic()}>Aperte aqui</button>
        <button onClick={() => readInfo()}>Ver informações</button> */}
        <SideBar />
        <Footer img={songs.img_src} title={songs.title} artist={songs.artist} trackData={songs.src}/>  
    </div>
  );
}

export default App;
