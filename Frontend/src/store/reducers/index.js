import { combineReducers } from 'redux';
import search from './search';
import play from './play';

export default combineReducers({
    search,
    play,
})