import * as types from './constants';

var initialState = {
  error: "",
  errorMsg:"",
  insTestcase: {
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
      }

    case types.GET_ALL_TESTCASE_SUCESS:
        return {
          error: "",
          errorMsg:"",
          currentSelectedTestplan: "",
          insTestplan: [],
          listTestcase: payload            
        }

    case types.GET_ALL_TESTCASE_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      }

    default:
      return state;
    }

}

export default reducer;