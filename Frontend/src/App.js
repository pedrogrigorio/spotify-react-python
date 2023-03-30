import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './components/Store/index'
import Footer from './components/Footer/Footer';
import SideBar from './components/SideBar/SideBar'
import styles from './App.module.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Library from './components/pages/Library';
import LikedSongs from './components/pages/LikedSongs';
import Container from './components/pages/Container';


function App() {

  return (
    <div className={styles.layout}>
        <Router>
        <Provider store={store}>
        <SideBar />
        <Container>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/search' element={<Search />}></Route>
            <Route path='/library' element={<Library />}></Route>
            <Route path='/liked-songs' element={<LikedSongs />}></Route>
          </Routes>
        </Container>
        <Footer/>  
        </Provider>
      </Router>
    </div>
  );
}

export default App;
