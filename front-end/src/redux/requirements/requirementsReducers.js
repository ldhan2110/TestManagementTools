import * as types from './constants';

var initialState = {
  success: null,
  successActive: null,
  error: "",
  errorMsg:"",
  currentSelectedRequirements: "",
  insRequirements: {
    sucess: null,
    errMsg: null
  },
  insRequirementsDelete: {
    sucess: null,
    errMsg: null
  },
  listRequirements: [],
  listActiveRequirements: []
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_REQUIREMENTS_REQ:
      return {
        ...state, success: ""
    }

    case types.GET_ALL_REQUIREMENTS_FAILED:
      return {
        ...state,
        success: null,
        error: true,
        errorMsg: payload,
    }
    
    case types.GET_ALL_REQUIREMENTS_SUCESS:
        return {
          ...state,
          success: true,
          error: "",
          errorMsg:"",
          currentSelectedRequirements: "",
          insRequirements: [],
          listRequirements: payload,
    }

    case types.GET_ALL_ACTIVE_REQUIREMENTS_REQ:
      return {
        ...state, successActive: ""
    }

    case types.GET_ALL_ACTIVE_REQUIREMENTS_FAILED:
      return {
        ...state,
        successActive: null,
        error: true,
        errorMsg: payload,
    }
    
    case types.GET_ALL_ACTIVE_REQUIREMENTS_SUCESS:
        return {
          ...state,
          successActive: true,
          error: "",
          errorMsg:"",
          listActiveRequirements: payload
    }

    case types.ADD_NEW_REQUIREMENTS_REQ:{      
      return {
        ...state,
        insRequirements: initialState.insRequirements
      };
    }

    case types.ADD_NEW_REQUIREMENTS_SUCCESS:{
      return {
        ...state,
        insRequirements: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.ADD_NEW_REQUIREMENTS_FAILED: {
      return{
        ...state,
        insRequirements:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_ADD_NEW_REQUIREMENTS: {
      return{
        ...state,
        insRequirements:{
          sucess: null,
          errMsg: null
        }
      }    
    }

    case types.SELECT_REQUIREMENTS: 
      return {
        ...state,
        currentSelectedRequirements: actions.value
    }

    case types.UPDATE_REQUIREMENTS_REQ:{      
      return {
        ...state,
        insRequirements: initialState.insRequirements
      };
    }

    case types.UPDATE_REQUIREMENTS_SUCCESS:{
      return {
        ...state,
        insRequirements: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.UPDATE_REQUIREMENTS_FAILED: {
      return{
        ...state,
        insRequirements:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_UPDATE_REQUIREMENTS:{
      return {
        ...state,
        insRequirements: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.DELETE_REQUIREMENTS_REQ:{      
      return {
        ...state,
        insRequirementsDelete: initialState.insRequirementsDelete
      };
    }

    case types.DELETE_REQUIREMENTS_SUCCESS:{
      return {
        ...state,
        insRequirementsDelete: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.DELETE_REQUIREMENTS_FAILED: {
      return{
        ...state,
        insRequirementsDelete:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_DELETE_REQUIREMENTS:{
      return {
        ...state,
        insRequirementsDelete: {
          sucess: null,
          errMsg: null
        }
      }
    }

    default:
      return state
  }
}

export default reducer;