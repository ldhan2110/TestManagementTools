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

    
    default:
      return state;
    }

}

export default reducer;