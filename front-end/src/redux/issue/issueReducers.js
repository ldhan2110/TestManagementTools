import * as types from './constants';

var initialState = {
  success: null,
  successCategory: null,
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
  insCategory: {
    sucess: null,
    errMsg: null
  },
  insCategoryDelete: {
    sucess: null,
    errMsg: null
  },
  //for info of current mantis in project
  insMantis: {
    sucess: null,
    errMsg: null
  },  
  mantisInfo: [],

  insCreateMantis: {
    sucess: null,
    errMsg: null
  },//

  insAllMantis: {
    sucess: null,
    errMsg: null
  },
  listAllMantis: [],

  insCreateAndSwitchMantis: {
    sucess: null,
    errMsg: null
  },

  insSwitchMantis: {
    sucess: null,
    errMsg: null
  },
  insAPI: {
    sucess: null,
    errMsg: null
  },
  listIssue: [],
  listCategory: [],  
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_ISSUE_REQ:
      return {
        ...state, success: "", error: "",
        errorMsg: "",
    }

    case types.GET_ALL_ISSUE_FAILED:
      return {
        ...state,
        success: null,
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

    case types.CREATE_ISSUE_REQ:{      
      return {
        ...state,
        insIssue: initialState.insIssue
      };
    }

    case types.CREATE_ISSUE_SUCCESS:{
      return {
        ...state,
        insIssue: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.CREATE_ISSUE_FAILED: {
      return{
        ...state,
        insIssue:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_CREATE_ISSUE:{
      return {
        ...state,
        insIssue: {
          sucess: null,
          errMsg: null
        }
      }
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

    // CATEGORY
    case types.GET_ALL_CATEGORY_REQ:
      return {
        ...state, successCategory: ""
    }

    case types.GET_ALL_CATEGORY_FAILED:
      return {
        ...state,
        successCategory: null,
        error: true,
        errorMsg: payload,
    }
    
    case types.GET_ALL_CATEGORY_SUCCESS:
        return {
          ...state,
          successCategory: true,
          listCategory: payload,
    }

    case types.ADD_CATEGORY_REQ:{      
      return {
        ...state,
        insCategory: initialState.insCategory,
      };
    }

    case types.ADD_CATEGORY_SUCCESS:{
      return {
        ...state,
        insCategory: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.ADD_CATEGORY_FAILED: {
      return{
        ...state,
        insCategory:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_ADD_CATEGORY:{
      return {
        ...state,
        insCategory: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.REMOVE_CATEGORY_REQ:{      
      return {
        ...state,
        insCategoryDelete: initialState.insCategoryDelete
      };
    }

    case types.REMOVE_CATEGORY_SUCCESS:{
      return {
        ...state,
        insCategoryDelete: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.REMOVE_CATEGORY_FAILED: {
      return{
        ...state,
        insCategoryDelete:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_REMOVE_CATEGORY:{
      return {
        ...state,
        insCategoryDelete: {
          sucess: null,
          errMsg: null
        }
      }
    }

    // MANTIS
    // GET INFO MANTIS
    case types.GET_INFO_MANTIS_REQ:
      return {
        ...state, insMantis: {
          sucess: "",
          errMsg: null,
        }
        , mantisInfo: []
    }

    case types.GET_INFO_MANTIS_FAILED:
      return {
        ...state,
        insMantis: {
          sucess: false,
          errMsg: payload
        }
    }
    
    case types.GET_INFO_MANTIS_SUCCESS:
        return {
          ...state,
          insMantis: {
            sucess: true,
            errMsg: null,
          },
          mantisInfo: payload
    }


    // CREATE_NEW_MANTIS_REQ
    case types.CREATE_NEW_MANTIS_REQ:{      
      return {
        ...state,
        insCreateMantis: initialState.insCreateMantis
      };
    }

    case types.CREATE_NEW_MANTIS_SUCCESS:{
      return {
        ...state,
        insCreateMantis: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.CREATE_NEW_MANTIS_FAILED: {
      return{
        ...state,
        insCreateMantis:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_CREATE_NEW_MANTIS:{
      return {
        ...state,
        insCreateMantis: {
          sucess: null,
          errMsg: null
        }
      }
    }

    // GET ALL MANTIS OF PROJECT
    case types.GET_ALL_MANTIS_OF_PROJECT_REQ:
      return {
        ...state, insAllMantis: initialState.insAllMantis, listAllMantis: []
    }

    case types.GET_ALL_MANTIS_OF_PROJECT_FAILED:
      return {
        ...state,
        insAllMantis: {
          sucess: false,
          errMsg: payload
        }
    }
    
    case types.GET_ALL_MANTIS_OF_PROJECT_SUCCESS:
        return {
          ...state,
          insAllMantis: {
            sucess: true,
            errMsg: null,
          },
          listAllMantis: payload
    }

        // CREATE AND SWITCH MANTIS
        case types.CREATE_AND_SWITCH_MANTIS_REQ:{      
          return {
            ...state,
            insCreateAndSwitchMantis: initialState.insCreateAndSwitchMantis
          };
        }
    
        case types.CREATE_AND_SWITCH_MANTIS_SUCCESS:{
          return {
            ...state,
            insCreateAndSwitchMantis: {
              sucess: true,
              errMsg: null
            }
          }
        }
    
        case types.CREATE_AND_SWITCH_MANTIS_FAILED: {
          return{
            ...state,
            insCreateAndSwitchMantis:{
              sucess: false,
              errMsg: payload
            }
          }    
        }
    
        case types.RESET_CREATE_AND_SWITCH_MANTIS:{
          return {
            ...state,
            insCreateAndSwitchMantis: {
              sucess: null,
              errMsg: null
            }
          }
        }

        // SWITCH MANTIS
        case types.SWITCH_MANTIS_REQ:{      
          return {
            ...state,
            insSwitchMantis: initialState.insSwitchMantis
          };
        }
    
        case types.SWITCH_MANTIS_SUCCESS:{
          return {
            ...state,
            insSwitchMantis: {
              sucess: true,
              errMsg: null
            }
          }
        }
    
        case types.SWITCH_MANTIS_FAILED: {
          return{
            ...state,
            insSwitchMantis:{
              sucess: false,
              errMsg: payload
            }
          }    
        }
    
        case types.RESET_SWITCH_MANTIS:{
          return {
            ...state,
            insSwitchMantis: {
              sucess: null,
              errMsg: null
            }
          }
        }

        // CHANGE API KEY
        case types.CHANGE_API_KEY_REQ:{      
          return {
            ...state,
            insAPI: initialState.insAPI
          };
        }
    
        case types.CHANGE_API_KEY_SUCCESS:{
          return {
            ...state,
            insAPI: {
              sucess: true,
              errMsg: null
            }
          }
        }
    
        case types.CHANGE_API_KEY_FAILED: {
          return{
            ...state,
            insAPI:{
              sucess: false,
              errMsg: payload
            }
          }    
        }
    
        case types.RESET_CHANGE_API_KEY:{
          return {
            ...state,
            insAPI: {
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