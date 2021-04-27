import * as types from './constants';

var initialState = {
  error: "",
  errorMsg:"",
  insTestcase: {
    sucess: null,
    errMsg: null
  },

  insTestsuite:{
    sucess: null,
    errMsg: null
  },
  listTestcase: [],
  listTestsuite: [],
  listTestsuiteNoTree: [],
  listTestcaseSelect: [],

  insTestcaseDelete: {
    sucess: null,
    errMsg: null
  },
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    case types.GET_ALL_TESTCASE_REQ:
      return {
        ...state,
      };

    case types.GET_ALL_TESTCASE_SUCESS:
        return {
          ...state,
          listTestcase: payload            
        };

    case types.GET_ALL_TESTCASE_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      };

      case types.ADD_TEST_SUITE_REQ:
        return {
          ...state,
        };
  
      case types.ADD_TEST_SUITE_SUCCESS:
          return {
            ...state,
            insTestsuite: {
              sucess: true,
              errMsg: null
            }      
          };
  
      case types.ADD_TEST_SUITE_FAILED:
        return {
          ...state,
        insTestsuite:{
          sucess: false,
          errMsg: payload
        }
      };

      case types.ADD_TEST_CASE_REQ:
        return {
          ...state,
        };
  
      case types.ADD_TEST_CASE_SUCCESS:
          return {
            ...state,
            insTestcase: {
              sucess: true,
              errMsg: null
            }      
          };
  
      case types.ADD_TEST_CASE_FAILED:
        return {
          ...state,
        insTestcase:{
          sucess: false,
          errMsg: payload
        }
      };

    case types.GET_ALL_TESTSUITE_REQ:
      return {
        ...state,
      };

    case types.GET_ALL_TESTSUITE_SUCESS:
      console.log(payload);
        return {
          ...state,
          listTestsuite: payload.children            
        };

    case types.GET_ALL_TESTSUITE_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      };

      case types.GET_ALL_TESTSUITE_NO_TREE_REQ:
        return {
          ...state,
        };
  
      case types.GET_ALL_TESTSUITE_NO_TREE_SUCESS:
        console.log(payload);
          return {
            ...state,
            listTestsuiteNoTree: payload            
          };
  
      case types.GET_ALL_TESTSUITE_NO_TREE_FAILED:
        return {
          ...state,
          error: true,
          errorMsg: payload,
        };
        
        case types.UPDATE_TESTCASE_REQ:{      
          return {
            ...state,
            //insTestcase: initialState.insTestcase
            insTestcase: {
              sucess: null,
              errMsg: null
            }
          };
        }
      
        case types.UPDATE_TESTCASE_SUCCESS:{
          //console.log('AAAAAA SUCCESS')
          return {
            ...state,
            insTestcase: {
              sucess: true,
              errMsg: null
            }
          }
        }
      
        case types.UPDATE_TESTCASE_FAILED: {
          //console.log('AAAAAA FAILED')
          return{
            ...state,
            insTestcase: {
              sucess: false,
              errMsg: payload
            }
          }    
        }
      
      
        case types.DELETE_TESTCASE_REQ:{      
          return {
            ...state,
            //insTestcaseDelete: initialState.insTestcaseDelete
            insTestcaseDelete: {
              sucess: null,
              errMsg: null
            }
          };
        }
      
        case types.DELETE_TESTCASE_SUCCESS:{
          return {
            ...state,
            insTestcaseDelete: {
              sucess: true,
              errMsg: null
            }
          }
        }
      
        case types.DELETE_TESTCASE_FAILED: {
          return{
            ...state,
            insTestcaseDelete:{
              sucess: false,
              errMsg: payload
            }
          }    
        }

        case types.GET_LIST_TESTCASE_SELECT_REQ:{      
          return {
            ...state,
          };
        }
      
        case types.GET_LIST_TESTCASE_SELECT_SUCCESS:{
          return {
            ...state,
            listTestcaseSelect: payload
          }
        }
      
        case types.GET_LIST_TESTCASE_SELECT_FAILED: {
          return{
            ...state,
            error: true,
            errorMsg: payload,
          }    
        }
    
    default:
      return state;
    }

}

export default reducer;