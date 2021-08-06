import * as types from './constants';

var initialState = {
  success: null,
  successActive: null,
  error: "",
  errorMsg:"",
  currentSelectedTestplan: "",
  insTestplan: {
    sucess: null,
    errMsg: null
  },
  insTestplanDelete: {
    sucess: null,
    errMsg: null
  },
  listTestplan: [],
  listActiveTestplan: []
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_TESTPLAN_REQ:
      return {
        ...state, success: ""
    }

    case types.GET_ALL_TESTPLAN_FAILED:
      return {
        ...state,
        success: null,
        error: true,
        errorMsg: payload,
    }
    
    case types.GET_ALL_TESTPLAN_SUCESS:
        return {
          ...state,
          success: true,
          error: "",
          errorMsg:"",
          currentSelectedTestplan: "",
          insTestplan: [],
          listTestplan: payload,
    }

    case types.GET_ALL_ACTIVE_TESTPLAN_REQ:
      return {
        ...state, successActive: "",
    }

    case types.GET_ALL_ACTIVE_TESTPLAN_FAILED:
      return {
        ...state,
        successActive: null,
        error: true,
        errorMsg: payload,
    }
    
    case types.GET_ALL_ACTIVE_TESTPLAN_SUCESS:
        return {
          ...state,
          successActive: true,
          error: "",
          errorMsg:"",
          listActiveTestplan: payload
    }

    case types.ADD_NEW_TESTPLAN_REQ:{      
      return {
        ...state,
        insTestplan: initialState.insTestplan
      };
    }

    case types.ADD_NEW_TESTPLAN_SUCCESS:{
      return {
        ...state,
        insTestplan: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.ADD_NEW_TESTPLAN_FAILED: {
      return{
        ...state,
        insTestplan:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_ADD_NEW_TESTPLAN: {
      return{
        ...state,
        insTestplan:{
          sucess: null,
          errMsg: null
        }
      }    
    }

    case types.SELECT_TESTPLAN: 
      return {
        ...state,
        currentSelectedTestplan: actions.value
    }

    case types.UPDATE_TESTPLAN_REQ:{      
      return {
        ...state,
        insTestplan: initialState.insTestplan
      };
    }

    case types.UPDATE_TESTPLAN_SUCCESS:{
      return {
        ...state,
        insTestplan: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.UPDATE_TESTPLAN_FAILED: {
      return{
        ...state,
        insTestplan:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_UPDATE_TESTPLAN:{
      return {
        ...state,
        insTestplan: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.DELETE_TESTPLAN_REQ:{      
      return {
        ...state,
        insTestplanDelete: initialState.insTestplanDelete
      };
    }

    case types.DELETE_TESTPLAN_SUCCESS:{
      return {
        ...state,
        insTestplanDelete: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.DELETE_TESTPLAN_FAILED: {
      return{
        ...state,
        insTestplanDelete:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_DELETE_TESTPLAN:{
      return {
        ...state,
        insTestplanDelete: {
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