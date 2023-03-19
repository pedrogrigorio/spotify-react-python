import './App.css';
import Container from './components/layout/Container/Container';
import Footer from './components/layout/Footer/Footer';
import SideMenu from './components/layout/SideMenu/SideMenu';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Library from './pages/Library/Library';
import LikedSongs from './pages/LikedSongs/LikedSongs';
import teste from './img/teste.jpg'

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
    <div className="App">
      <Router>
        <SideMenu />
        <Container>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/search' element={<Library />}></Route>
            <Route path='/library' element={<Search />}></Route>
            <Route path='/library' element={<Search />}></Route>
            <Route path='/liked-songs' element={<LikedSongs />}></Route>
          </Routes>
        </Container>
        <Footer img={teste} title="Billie Jean" artist="Alexandr Misko"/>
      </Router>
      
    </div>
  );
}

export default App;
