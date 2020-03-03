import {combineReducers} from 'redux';

import homeReducer from './redux-home/home.reducer';

export default combineReducers({
    home: homeReducer
});