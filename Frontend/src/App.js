import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import SideMenu from './components/layout/SideMenu/SideMenu';
import NavBar from './components/layout/NavBar/NavBar';
import Container from './components/layout/Container/Container';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Library from './pages/Library/Library';
import LikedSongs from './pages/LikedSongs/LikedSongs';
import Playlist from './pages/Playlist/Playlist';
import ShowAll from './pages/Home/components/ShowAll';

function App() {

  return (
    <div className="App" onContextMenu={(e) => e.preventDefault()}>
      <Router>
        <Provider store={store}>
          <SideMenu />
          <NavBar />
          <Container>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/search' element={<Search />}></Route>
              <Route path='/library' element={<Library />}></Route>
              <Route path='/liked-songs' element={<LikedSongs />}></Route>
              <Route path='/playlist/:id' element={<Playlist />}></Route>
              <Route path='/showall/:type' element={<ShowAll/>}></Route>
            </Routes>
          </Container>
          <Footer />
        </Provider>
      </Router>
    </div>
  );
}

export default App;