import * as types from './constants';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

var initialState = {
  success:"",
  error: "",
  errorMsg:"",
  currentSelectedProject: "",
}


const persistConfig = {
  key: 'project',
  storage: storage,
  timeout: null,
  stateReconciler: autoMergeLevel1 ,
};

const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_PROJECTS_REQ:
      return {
        ...state,
        accountInfo: actions.payload
      }

    
    case types.SELECT_PROJECT: 
      return {
        ...state,
        currentSelectedProject: actions.value
      }
    
   
    
    
    default:
      return state
  }
}

export default persistReducer(persistConfig, reducer);