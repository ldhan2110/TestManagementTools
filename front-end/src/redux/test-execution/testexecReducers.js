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

  updTestExec: {
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

      case types.UPDATE_TEST_EXEC_REQ:
        return {
          ...state,
        };
  
      case types.UPDATE_TEST_EXEC_SUCCESS:
          return {
            ...state,
            updTestExec:{
              sucess: true,
              errMsg: payload
            }           
          };
  
      case types.UPDATE_TEST_EXEC_FAILED:
        return {
          ...state,
          updTestExec:{
            sucess: false,
            errMsg: payload
          }
        };


        case types.EXECUTE_TEST_CASE_REQ:
          return {
           ...state,
          };
  
      case types.EXECUTE_TEST_CASE_SUCCESS:
          return {
            ...state,
            execTest:{
              currentIdx: 0,
              listExec: [],
              sucess: true,
              errMsg: null
            },
          };
  
      case types.EXECUTE_TEST_CASE_FAILED:
        return {
          ...state,
          execTest:{
            currentIdx: 0,
            listExec: [],
            sucess: false,
            errMsg: payload
          },
        };


      default: 
      return state;
    }
  }

  export default reducer;