import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middleWares = [logger, promiseMiddleware, thunk];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;