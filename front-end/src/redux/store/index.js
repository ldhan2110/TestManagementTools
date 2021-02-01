import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import { createEpicMiddleware } from 'redux-observable';
import configureStore from '../store/configure';


const store = configureStore();

export default store;
