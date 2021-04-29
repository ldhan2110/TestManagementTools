import * as types from './constants';

var initialState = {
  error: "",
  errorMsg:"",
  currentSelectedTestplan: "",
  insTestplan: {
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
        ...state,
      }

    case types.GET_ALL_TESTPLAN_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_TESTPLAN_SUCESS:
        return {
          ...state,
          error: "",
          errorMsg:"",
          currentSelectedTestplan: "",
          insTestplan: [],
          listTestplan: payload,
        }



        case types.GET_ALL_ACTIVE_TESTPLAN_REQ:
          return {
            ...state,
          }
    
        case types.GET_ALL_ACTIVE_TESTPLAN_FAILED:
          return {
            ...state,
            error: true,
            errorMsg: payload,
          }
        
        case types.GET_ALL_ACTIVE_TESTPLAN_SUCESS:
            return {
              ...state,
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

    default:
      return state
  }
}

export default reducer;