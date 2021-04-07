import * as types from './constants';

var initialState = {
  error: "",
  errorMsg:"",
  currentSelectedBuild: "",
  insBuild: {
    sucess: null,
    errMsg: null
  },
  listBuild: [],
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_BUILD_REQ:
      return {
        ...state,
      }

    case types.GET_ALL_BUILD_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_BUILD_SUCESS:
        return {
          error: "",
          errorMsg:"",
          currentSelectedBuild: "",
          insBuild: [],
          listBuild: payload,
        }
    
    case types.ADD_NEW_BUILD_REQ:{      
      return {
        ...state,
        insBuild: initialState.insBuild
      };
    }

    case types.ADD_NEW_BUILD_SUCCESS:{
      return {
        ...state,
        insBuild: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.ADD_NEW_BUILD_FAILED: {
      return{
        ...state,
        insBuild:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    
    case types.SELECT_BUILD: 
      return {
        ...state,
        currentSelectedBuild: actions.value
      }

    default:
      return state
  }
}

export default reducer;