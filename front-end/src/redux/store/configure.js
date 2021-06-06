import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../reducers/index';
import rootEpic from '../reducers/epics';
//import { persistStore, persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage'
//import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


//Epic middleware
const epicMiddleware = createEpicMiddleware();

//Persist Config

export default function configureStore(preloadedState) {
  const middlewares = [epicMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  //const persistedReducer = persistReducer({key: 'root', storage, timeout: null, stateReconciler: autoMergeLevel1}, rootReducer);

  const store = createStore(rootReducer,preloadedState,composedEnhancers);

  //const persistor = persistStore(store);

  epicMiddleware.run(rootEpic);

  return store;
}