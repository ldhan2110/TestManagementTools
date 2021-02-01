import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../reducers/index';
import rootEpic from '../reducers/epics';


//Epic middleware
const epicMiddleware = createEpicMiddleware();


export default function configureStore(preloadedState) {
  const middlewares = [epicMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  epicMiddleware.run(rootEpic);

  return store
}