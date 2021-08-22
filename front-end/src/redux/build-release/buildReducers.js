import * as types from './constants';

var initialState = {
  success: null,
  successActive: null,
  error: "",
  errorMsg:"",
  currentSelectedBuild: "",
  insBuilds: {
    sucess: null,
    errMsg: null
  },
  insBuildsDelete: {
    sucess: null,
    errMsg: null
  },
  listBuilds: [],
  listBuildsByTestplan: [],
  listBuildActive: [],

  insBuildReport: {
    sucess: null,
    errMsg: null
  },
  buildReport: [],
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_BUILDS_REQ:
      return {
        ...state, success: "", listBuilds: []
      }

    case types.GET_ALL_BUILDS_FAILED:
      return {
        ...state,
        success: null,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_BUILDS_SUCCESS:
        return {
          ...state,
          listBuilds: payload,
          success: true
      }

      case types.GET_BUILD_REPORT_REQ:
        return {
          ...state, insBuildReport: initialState.insBuildReport, buildReport: []
        }
  
      case types.GET_BUILD_REPORT_FAILED:
        return {
          ...state,
          insBuildReport: {
            sucess: false,
            errMsg: payload
          }
        }
      
      case types.GET_BUILD_REPORT_SUCCESS:
          return {
            ...state,
            insBuildReport: {
              sucess: true,
              errMsg: null
            },
            buildReport: payload
        }

    
    case types.ADD_NEW_BUILD_REQ:    
      return {
        ...state,
      };
    

    case types.ADD_NEW_BUILD_SUCCESS:
      return {
        ...state,
        insBuilds: {
          sucess: true,
          errMsg: null
        }
      }
    
    case types.ADD_NEW_BUILD_FAILED: 
      return{
        ...state,
        insBuilds:{
          sucess: false,
          errMsg: payload
        }
      }    
      

    case types.RESET_ADD_NEW_BUILD:
      return {
        ...state,
        insBuilds: {
          sucess: null,
          errMsg: null
        }
      }
      
    
    case types.SELECT_BUILD:
      localStorage.setItem("selectBuild",actions.value); 
      return {
        ...state,
        currentSelectedBuild: actions.value
      }
 
    case types.UPDATE_BUILD_REQ:      
      return {
        ...state,
        insBuilds: initialState.insBuilds
      };
      

    case types.UPDATE_BUILD_SUCCESS:
      return {
        ...state,
        insBuilds: {
          sucess: true,
          errMsg: null
        }
      }
      

    case types.UPDATE_BUILD_FAILED: 
      return{
        ...state,
        insBuilds:{
          sucess: false,
          errMsg: payload
        }
      }    
      

    case types.RESET_UPDATE_BUILD:
      return {
        ...state,
        insBuilds: {
          sucess: null,
          errMsg: null
        }
      }
      

    case types.DELETE_BUILD_REQ:   
      return {
        ...state,
      };
      

    case types.DELETE_BUILD_SUCCESS:
      return {
        ...state,
        insBuildsDelete: {
          sucess: true,
          errMsg: null
        }
      }
      

    case types.DELETE_BUILD_FAILED: 
      return{
        ...state,
        insBuildsDelete:{
          sucess: false,
          errMsg: payload
        }
      }  
      

    case types.RESET_DELETE_BUILD:
      return {
        ...state,
        insBuildsDelete: {
          sucess: null,
          errMsg: null
        }
      }
      

    case types.GET_BUILD_BYID_REQ:
        return {
          ...state, listBuilds: []
      }

    case types.GET_BUILD_BYID_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_BUILD_BYID_SUCCESS:
        return {
          error: "",
          errorMsg:"",
          currentSelectedBuild: "",
          insBuilds: [],
          listBuilds: payload,
      }

    case types.GET_ALL_BUILD_ACTIVE_REQ:
      return {
        ...state, successActive: ""
      }

    case types.GET_ALL_BUILD_ACTIVE_FAILED:
      return {
        ...state,
        successActive: null,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_BUILD_ACTIVE_SUCCESS:
        return {
          ...state,
          successActive: true,
          error: "",
          errorMsg:"",
          currentSelectedBuild: "",
          insBuilds: [],
          listBuilds: payload,
          listBuildActive: payload
      }

    case types.RESET_BUILD_ACTIVE: 
      return {
        ...state,
        listBuilds: []
      }
    

      case types.GET_ALL_BUILD_TESTPLAN_REQ:
      return {
        ...state
      }

    case types.GET_ALL_BUILD_TESTPLAN_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_BUILD_TESTPLAN_SUCCESS:
        return {
          ...state,
          listBuildsByTestplan: payload
      }

      case types.RESET_BUILD_TESTPLAN: 
      return {
        ...state,
        listBuildsByTestplan: []
      }


    default:
      return state

    
  }
}

export default reducer;