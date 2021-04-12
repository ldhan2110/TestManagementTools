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
      }
        

    
    default:
      return state;
    }

}

export default reducer;