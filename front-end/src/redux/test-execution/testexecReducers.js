//import { SignalCellularNull } from '@material-ui/icons';
import * as types from './constants';

var initialState = {
  error: "",
  errorMsg:"",
  success: null,
  insTestexec:{
    sucess: null,
    errMsg: null
  },

  execTest:{
    testExecId: null,
    selectTestCaseIdx: -1,
    listTestCase: [],
  },

  updTestExec: {
    sucess: null,
    errMsg: null
  },

  updTestExecDetail: {
    sucess: null,
    errMsg: null
  },


  delTestExec: {
    sucess: null,
    errMsg: null
  },

  updTestCaseExec: {
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
        ...state, success: ""
      };

    case types.GET_ALL_TESTEXEC_SUCESS:
        return {
          ...state,
          success: true,
          listTestExec: payload            
        };

    case types.GET_ALL_TESTEXEC_FAILED:
      return {
        ...state,
        success: null,
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

    case types.RESET_ADD_TEST_EXEC:
      return{
        ...state,
        insTestexec:{
          sucess: null,
          errMsg: null
        }
      }

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

      
      case types.RESET_UPDATE_TEST_EXEC:
        return {
          ...state,
          updTestExec:{
            sucess: null,
            errMsg: null
          }
        };


        case types.EXECUTE_TEST_CASE_REQ:
          return {
           ...state,
          };
  
      case types.EXECUTE_TEST_CASE_SUCCESS:
          return {
            ...state,
            updTestCaseExec:{
             sucess: true,
             errMsg: null
            },
          };
  
      case types.EXECUTE_TEST_CASE_FAILED:
        return {
          ...state,
          updTestCaseExec:{
            sucess: false,
            errMsg: payload
          },
        };


      case types.RESET_EXECUTE_TEST_CASE:
          return {
            ...state,
            updTestCaseExec:{
              sucess: null,
              errMsg: null
            },
          };



      case types.DELETE_TEST_EXEC_REQ:
            return {
             ...state,
            };
    
      case types.DELETE_TEST_EXEC_SUCCESS:
            return {
              ...state,
              delTestExec:{
               sucess: true,
               errMsg: null
              },
            };
    
      case types.DELETE_TEST_EXEC_FAILED:
          return {
            ...state,
            delTestExec:{
              sucess: false,
              errMsg: payload
            },
          };
      
      case types.RESET_DELETE_TEST_EXEC:
          return {
            ...state,
            delTestExec: {
              sucess: null,
              errMsg: null
            },
          };

          case types.UPDATE_TEST_EXEC_DETAIL_REQ:
            return {
             ...state,
            };
    
      case types.UPDATE_TEST_EXEC_DETAIL_SUCCESS:
            return {
              ...state,
              updTestExecDetail:{
               sucess: true,
               errMsg: null
              },
            };
    
      case types.UPDATE_TEST_EXEC_DETAIL_FAILED:
          return {
            ...state,
            updTestExecDetail:{
              sucess: false,
              errMsg: payload
            },
          };

      case types.RESET_UPDATE_TEST_EXEC_DETAIL:
            return {
              ...state,
              updTestExecDetail: {
                sucess: null,
                errMsg: null
              },
            };
      
        
  


      case types.SELECT_TEST_EXEC_REQ:
        return {
          ...state,
          execTest:{
            testExecId: payload.id,
            selectTestCaseIdx: -1,
            listTestCase: payload.listTestcase,
          },
        }

      case types.SELECT_TEST_CASE_REQ:
        return{
          ...state,
          execTest: {
            testExecId: state.execTest.testExecId,
            selectTestCaseIdx: payload,
            listTestCase: state.execTest.listTestCase,
          }
        }

      default: 
      return state;
    }
  }

  export default reducer;