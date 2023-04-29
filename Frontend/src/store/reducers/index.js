import { combineReducers } from 'redux';
import search from './search';
import play from './play';
import home from './home'; 

export default combineReducers({
    search,
    play,
    home,
})