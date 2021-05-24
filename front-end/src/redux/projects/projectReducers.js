import * as types from './constants';

var initialState = {
  error: "",
  errorMsg:"",
  currentSelectedProject: "",
  currentSelectedProjectName: '',
  insProjects: {
    sucess: null,
    errMsg: null
  },
  insProjectsDelete: {
    sucess: null,
    errMsg: null
  },
  listProjects: [],
  projectInfo: ""
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
          ...state,
          error: "",
          errorMsg:"",
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

    case types.RESET_ADD_NEW_PROJECT: {
      return{
        ...state,
        insProjects:{
          sucess: null,
          errMsg: null
        }
      }    
    }
    
    case types.SELECT_PROJECT:
      localStorage.setItem("selectProject",actions.value);
      return {
        ...state,
        currentSelectedProject: actions.value.id,
        currentSelectedProjectName: actions.value.name
    }

    case types.UPDATE_PROJECT_REQ:{      
      return {
        ...state,
        insProjects: initialState.insProjects
      };
    }

    case types.UPDATE_PROJECT_SUCCESS:{
      return {
        ...state,
        insProjects: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.UPDATE_PROJECT_FAILED: {
      return{
        ...state,
        insProjects:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_UPDATE_PROJECT:{
      return {
        ...state,
        insProjects: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.DELETE_PROJECT_REQ:{      
      return {
        ...state,
        insProjectsDelete: initialState.insProjectsDelete
      };
    }

    case types.DELETE_PROJECT_SUCCESS:{
      return {
        ...state,
        insProjectsDelete: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.DELETE_PROJECT_FAILED: {
      return{
        ...state,
        insProjectsDelete:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_DELETE_PROJECT:{
      return {
        ...state,
        insProjectsDelete: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.GET_PROJECTS_BY_ID_REQ:
      return {
        ...state,
      }

    case types.GET_PROJECTS_BY_ID_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_PROJECTS_BY_ID_SUCESS:
        return {
          ...state,
          error: "",
          errorMsg:"",
          projectInfo: payload,
        }

    default:
      return state
  }
}

export default reducer;