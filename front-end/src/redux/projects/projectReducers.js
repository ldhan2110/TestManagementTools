import * as types from './constants';

var initialState = {
  success: null,
  byIDsuccess: null,
  error: "",
  errorMsg:"",
  currentSelectedProject: "",
  currentSelectedProjectName: '',
  currentRole: '',
  insProjects: {
    sucess: null,
    errMsg: null
  },
  insProjectsDelete: {
    sucess: null,
    errMsg: null
  },
  listProjects: [],
  projectInfo: "",
  projectName: "",
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_PROJECTS_REQ:
      return {
        ...state, success: "",
      }

    case types.GET_ALL_PROJECTS_FAILED:
      return {
        ...state, success: null,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_PROJECTS_SUCESS:
        return {
          ...state, success: true,
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
      localStorage.setItem("selectProject",actions.value.id);
      return {
        ...state,
        currentSelectedProject: actions.value.id,
        currentSelectedProjectName: actions.value.name,
        currentRole: actions.value.role
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
        ...state, byIDsuccess: ""
      }

    case types.GET_PROJECTS_BY_ID_FAILED:
      return {
        ...state, byIDsuccess: null,
        error: true,
        errorMsg: payload,
        projectInfo: ""
      }
    
    case types.GET_PROJECTS_BY_ID_SUCESS:
        return {
          ...state, byIDsuccess: true,
          error: "",
          errorMsg:"",
          projectInfo: payload,
        }

        case types.GET_PROJECT_BY_ID_VERIFY_REQ:
          return {
            ...state,
          }
    
        case types.GET_PROJECT_BY_ID_VERIFY_FAIL:
          return {
            ...state,
            error: true,
            errorMsg: payload,
            projectName: ""
          }
        
        case types.GET_PROJECT_BY_ID_VERIFY_SUCCESS:
            return {
              ...state,
              error: "",
              errorMsg:"",
              projectName: payload,
            }

    case types.CHANGE_ROLE_MEMBER_REQ:{      
      return {
        ...state,
        insProjects: initialState.insProjects
      };
    }

    case types.CHANGE_ROLE_MEMBER_SUCCESS:{
      return {
        ...state,
        insProjects: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.CHANGE_ROLE_MEMBER_FAILED: {
      return{
        ...state,
        insProjects:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_CHANGE_ROLE_MEMBER:{
      return {
        ...state,
        insProjects: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.RESET_SELECT_PROJECT:{
      return {
        ...state,
        currentSelectedProject: "",
        currentSelectedProjectName: '',
        currentRole: '',
      }
    }

    default:
      return state
  }
}

export default reducer;