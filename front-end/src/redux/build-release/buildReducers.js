import * as types from './constants';

var initialState = {
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
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_BUILDS_REQ:
      return {
        ...state, listBuilds: []
      }

    case types.GET_ALL_BUILDS_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_BUILDS_SUCCESS:
        return {
          error: "",
          errorMsg:"",
          currentSelectedBuild: "",
          insBuilds: [],
          listBuilds: payload,
      }
    
    case types.ADD_NEW_BUILD_REQ:{      
      return {
        ...state,
        insBuilds: initialState.insBuilds
      };
      }

    case types.ADD_NEW_BUILD_SUCCESS:{
      return {
        ...state,
        insBuilds: {
          sucess: true,
          errMsg: null
        }
      }
      }

    case types.ADD_NEW_BUILD_FAILED: {
      return{
        ...state,
        insBuilds:{
          sucess: false,
          errMsg: payload
        }
      }    
      }

    case types.RESET_ADD_NEW_BUILD:{
      return {
        ...state,
        insBuilds: {
          sucess: null,
          errMsg: null
        }
      }
      }
    
    case types.SELECT_BUILD:
      localStorage.setItem("selectBuild",actions.value); 
      return {
        ...state,
        currentSelectedBuild: actions.value
      }
 
    case types.UPDATE_BUILD_REQ:{      
      return {
        ...state,
        insBuilds: initialState.insBuilds
      };
      }

    case types.UPDATE_BUILD_SUCCESS:{
      return {
        ...state,
        insBuilds: {
          sucess: true,
          errMsg: null
        }
      }
      }

    case types.UPDATE_BUILD_FAILED: {
      return{
        ...state,
        insBuilds:{
          sucess: false,
          errMsg: payload
        }
      }    
      }

    case types.RESET_UPDATE_BUILD:{
      return {
        ...state,
        insBuilds: {
          sucess: null,
          errMsg: null
        }
      }
      }

    case types.DELETE_BUILD_REQ:{      
      return {
        ...state,
        insBuildsDelete: initialState.insBuildsDelete
      };
      }

    case types.DELETE_BUILD_SUCCESS:{
      return {
        ...state,
        insBuildsDelete: {
          sucess: true,
          errMsg: null
        }
      }
      }

    case types.DELETE_BUILD_FAILED: {
      return{
        ...state,
        insBuildsDelete:{
          sucess: false,
          errMsg: payload
        }
      }    
      }

    case types.RESET_DELETE_BUILD:{
      return {
        ...state,
        insBuildsDelete: {
          sucess: null,
          errMsg: null
        }
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
        ...state, listBuilds: []
      }

    case types.GET_ALL_BUILD_ACTIVE_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_BUILD_ACTIVE_SUCCESS:
        return {
          error: "",
          errorMsg:"",
          currentSelectedBuild: "",
          insBuilds: [],
          listBuilds: payload,
      }

    default:
      return state

    
  }
}

export default reducer;