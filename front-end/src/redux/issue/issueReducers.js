import * as types from './constants';

var initialState = {
  success: "",
  error: "",
  errorMsg:"",
  currentSelectedIssue: "",
  insIssue: {
    sucess: null,
    errMsg: null
  },
  insIssueDelete: {
    sucess: null,
    errMsg: null
  },
  listIssue: [],
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_ISSUE_REQ:
      return {
        ...state, success: ""
    }

    case types.GET_ALL_ISSUE_FAILED:
      return {
        ...state,
        success: "",
        error: true,
        errorMsg: payload,
    }
    
    case types.GET_ALL_ISSUE_SUCESS:
        return {
          ...state,
          success: true,
          error: "",
          errorMsg:"",
          currentSelectedIssue: "",
          insIssue: [],
          listIssue: payload,
    }

    case types.SELECT_ISSUE: 
      return {
        ...state,
        currentSelectedIssue: actions.value
    }

    case types.UPDATE_ISSUE_REQ:{      
      return {
        ...state,
        insIssue: initialState.insIssue
      };
    }

    case types.UPDATE_ISSUE_SUCCESS:{
      return {
        ...state,
        insIssue: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.UPDATE_ISSUE_FAILED: {
      return{
        ...state,
        insIssue:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_UPDATE_ISSUE:{
      return {
        ...state,
        insIssue: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.DELETE_ISSUE_REQ:{      
      return {
        ...state,
        insIssueDelete: initialState.insIssueDelete
      };
    }

    case types.DELETE_ISSUE_SUCCESS:{
      return {
        ...state,
        insIssueDelete: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.DELETE_ISSUE_FAILED: {
      return{
        ...state,
        insIssueDelete:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_DELETE_ISSUE:{
      return {
        ...state,
        insIssueDelete: {
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