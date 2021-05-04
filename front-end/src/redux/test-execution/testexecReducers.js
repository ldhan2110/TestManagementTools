import * as types from './constants';

var initialState = {
  error: "",
  errorMsg:"",

  insTestexec:{
    sucess: null,
    errMsg: null
  },

  execTest:{
    currentIdx: 0,
    listExec: [],
    sucess: null,
    errMsg: null
  },
 
  listTestExec: [],
}



const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    case types.GET_ALL_TESTEXEC_REQ:
      return {
        ...state,
      };

    case types.GET_ALL_TESTEXEC_SUCESS:
        return {
          ...state,
          listTestExec: payload            
        };

    case types.GET_ALL_TESTEXEC_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      };
    


      case types.ADD_TESTEXEC_REQ:
      return {
        ...state,
      };

    case types.ADD_TESTEXEC_SUCCESS:
        return {
          ...state,
          insTestexec:{
            sucess: true,
            errMsg: payload
          }           
        };

    case types.ADD_TESTEXEC_FAILED:
      return {
        ...state,
        insTestexec:{
          sucess: false,
          errMsg: payload
        }
      };


      default: 
      return state;
    }
  }

  export default reducer;