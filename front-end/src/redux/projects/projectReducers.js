import * as types from './constants';

var initialState = {
  error: "",
  errorMsg:"",
  currentSelectedProject: "",
  insProjects: [],
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
      state.insProjects.push(payload);
      return {
        ...state
      };
    }

    case types.ADD_NEW_PROJECT_SUCCESS:{
      state.insProjects.pop(payload);
      return {
        ...state,
        error: false,
        errorMsg:"",
      }
    }

    case types.ADD_NEW_PROJECT_FAILED: {
      return{
        ...state,
        error: true,
        errorMsg: payload
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