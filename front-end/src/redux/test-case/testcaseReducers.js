import * as types from './constants';

var initialState = {
  success: null,
  successNoTree: null,
  searchSuccess: null,
  error: "",
  errorMsg:"",
  insTestcase: {
    sucess: null,
    errMsg: null
  },

  insTestcaseUpl: {
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
  insTestsuiteDelete:{
    sucess: null,
    errMsg: null
  },

  insTestsuiteCreate:{
    sucess: null,
    errMsg: null
  },

}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    case types.GET_ALL_TESTCASE_REQ:
      return {
        ...state, success: ""
      };

    case types.GET_ALL_TESTCASE_SUCESS:
        return {
          ...state, success: true,
          listTestcase: payload            
        };

    case types.GET_ALL_TESTCASE_FAILED:
      return {
        ...state, success: null,
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
          insTestsuiteCreate: {
            sucess: true,
            errMsg: null
          }      
        };

    case types.ADD_TEST_SUITE_FAILED:
      return {
        ...state,
        insTestsuiteCreate:{
        sucess: false,
        errMsg: payload
      }
    };

    case types.RESET_ADD_TEST_SUITE:
      return {
        ...state,
        insTestsuiteCreate:{
        sucess: null,
        errMsg: null
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

      case types.UPLOAD_TESTCASE_REQ:
        return {
          ...state,
        };
  
      case types.UPLOAD_TESTCASE_SUCCESS:
          return {
            ...state,
            insTestcaseUpl: {
              sucess: true,
              errMsg: null
            }      
          };
  
      case types.UPLOAD_TESTCASE_FAILED:
          return {
            ...state,
          insTestcaseUpl:{
            sucess: false,
            errMsg: payload
          }
        };

      case types.RESET_UPLOAD_TESTCASE:{
        return {
          ...state,
          insTestcaseUpl:{
            sucess: null,
            errMsg: null
          }
        }
      }

    case types.RESET_ADD_TEST_CASE:
      return {
        ...state,
        insTestcase: {
          sucess: null,
          errMsg: null
        }      
      };

    case types.GET_ALL_TESTSUITE_REQ:
      return {
        ...state,
      };

    case types.GET_ALL_TESTSUITE_SUCESS:
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
        ...state, successNoTree: ""
      };

    case types.GET_ALL_TESTSUITE_NO_TREE_SUCESS:
        return {
          ...state, successNoTree: true,
          listTestsuiteNoTree: payload            
        };

    case types.GET_ALL_TESTSUITE_NO_TREE_FAILED:
        return {
          ...state, successNoTree: null,
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
      return {
        ...state,
        insTestcase: {
          sucess: true,
          errMsg: null
        }
      }
    }
  
    case types.UPDATE_TESTCASE_FAILED: {
      return{
        ...state,
        insTestcase: {
          sucess: false,
          errMsg: payload
        }
      }    
    }
 
    case types.RESET_UPDATE_TESTCASE: {
      return{
        ...state,
        insTestcase: {
          sucess: null,
          errMsg: null
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

    case types.RESET_DELETE_TESTCASE: {
      return{
        ...state,
        insTestcaseDelete:{
          sucess: null,
          errMsg: null
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

    case types.UPDATE_TESTSUITE_REQ:{      
      return {
        ...state,
        //insTestcase: initialState.insTestcase
        insTestsuite: {
          sucess: null,
          errMsg: null
        }
      };
    }
  
    case types.UPDATE_TESTSUITE_SUCCESS:{
      return {
        ...state,
        insTestsuite: {
          sucess: true,
          errMsg: null
        }
      }
    }
  
    case types.UPDATE_TESTSUITE_FAILED: {
      return{
        ...state,
        insTestsuite: {
          sucess: false,
          errMsg: payload
        }
      }    
    }
 
    case types.RESET_UPDATE_TESTSUITE:{
      return {
        ...state,
        insTestsuite: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.RESET_LIST_TESTCASE_SELECT: {
      return{
        ...state,
        listTestcaseSelect:[]
      }    
    }

    case types.DELETE_TESTSUITE_REQ:{      
      return {
        ...state,
        insTestsuiteDelete: {
          sucess: null,
          errMsg: null
        }
      };
    }
  
    case types.DELETE_TESTSUITE_SUCCESS:{
      return {
        ...state,
        insTestsuiteDelete: {
          sucess: true,
          errMsg: null
        }
      }
    }
  
    case types.DELETE_TESTSUITE_FAILED: {
      return{
        ...state,
        insTestsuiteDelete:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_DELETE_TESTSUITE:{
      return {
        ...state,
        insTestsuiteDelete: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.SEARCH_TESTCASE_REQ:{
      return {
        ...state, searchSuccess: ""
      };
    }

    case types.SEARCH_TESTCASE_SUCCESS:{
      return {
        ...state, searchSuccess: true,
        listTestcase: payload            
      };
    }

    case types.SEARCH_TESTCASE_FAILED:{
      return {
        ...state, searchSuccess: null,
        error: true,
        errorMsg: payload,
      };
    }

    // case types.RESET_SEARCH_TESTCASE:{
    //   return {
    //     ...state,
    //     insTestcase: {
    //       sucess: null,
    //       errMsg: null
    //     }      
    //   };
    // }
   




    // case types.DELETE_TESTSUITE_REQ:{      
    //   return {
    //     ...state,
    //     //insTestcaseDelete: initialState.insTestcaseDelete
    //     insTestsuiteDelete: {
    //       sucess: null,
    //       errMsg: null
    //     }
    //   };
    // }
  
    // case types.DELETE_TESTSUITE_SUCCESS:{
    //   return {
    //     ...state,
    //     insTestsuiteDelete: {
    //       sucess: true,
    //       errMsg: null
    //     }
    //   }
    // }
  
    // case types.DELETE_TESTSUITE_FAILED: {
    //   return{
    //     ...state,
    //     insTestsuiteDelete:{
    //       sucess: false,
    //       errMsg: payload
    //     }
    //   }    
    // }
    
    default:
      return state;
    }

}

export default reducer;