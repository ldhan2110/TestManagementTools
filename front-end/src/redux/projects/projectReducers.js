import * as types from './constants';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

var initialState = {
  success:"",
  error: "",
  errorMsg:"",
  currentSelectedProject: "",
  listProjects: {
    originProjects: [],
    insProjects: [],
    delProjects: [],
    updProjects: [],
  }
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
        ...state
      }

    case types.GET_ALL_PROJECTS_FAILED:
      return {
        ...state,
        success: false,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_PROJECTS_SUCESS:
        return {
          success: true,
          error: "",
          errorMsg:"",
          currentSelectedProject: "",
          listProjects: {
            originProjects: payload,
            insProjects: [],
            delProjects: [],
            updProjects: [],
          }
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