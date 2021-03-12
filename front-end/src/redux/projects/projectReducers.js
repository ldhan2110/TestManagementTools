import * as types from './constants';

var initialState = {
  error: "",
  errorMsg:"",
  currentSelectedProject: "",
  insProjects: {
    sucess: null,
    errMsg: null
  },
  listProjects: [],
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_PROJECTS_REQ:
      return {
        ...state,
      }

    case types.GET_ALL_PROJECTS_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_PROJECTS_SUCESS:
        return {
          error: "",
          errorMsg:"",
          currentSelectedProject: "",
          insProjects: [],
          listProjects: payload,
        }
    
    case types.ADD_NEW_PROJECT_REQ:{      
      return {
        ...state,
        insProjects: initialState.insProjects
      };
    }

    case types.ADD_NEW_PROJECT_SUCCESS:{
      return {
        ...state,
        insProjects: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.ADD_NEW_PROJECT_FAILED: {
      return{
        ...state,
        insProjects:{
          sucess: false,
          errMsg: payload
        }
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

export default reducer;