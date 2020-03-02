import {combineReducers} from 'redux';

import homeReducer from './home-reducer/home.reducer';

export default combineReducers({
    home: homeReducer
});