import './App.css';
import Container from './components/layout/Container';
import PlayerBar from './components/layout/PlayerBar';
import Sidebar from './components/layout/Sidebar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Library from './components/pages/Library';
import LikedSongs from './components/pages/LikedSongs';

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Container>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/search' element={<Library />}></Route>
            <Route path='/library' element={<Search />}></Route>
            <Route path='/library' element={<Search />}></Route>
            <Route path='/liked-songs' element={<LikedSongs />}></Route>
          </Routes>
        </Container>
        <PlayerBar />
      </Router>
      
    </div>
  );
}

export default App;
