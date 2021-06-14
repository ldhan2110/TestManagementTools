import * as types from './constants';

var initialState = {
  error: "",
  errorMsg:"",
  currentSelectedUser: "",
  insDeleteMember: {
    sucess: null,
    errMsg: null
  },
  insUsers: {
    sucess: null,
    errMsg: null
  },
  listUsers: [],
  listUsersOfProject: [],
  inforUser: [],  

  insPassword: {
    sucess: null,
    errMsg: null
  },
  insProfile: {
    sucess: null,
    errMsg: null
  },
  inforProfile: "",
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_USERS_REQ:
      return {
        ...state, listUsers: []
    }

    case types.GET_ALL_USERS_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
    }
    
    case types.GET_ALL_USERS_SUCCESS:
        return {
          error: "",
          errorMsg:"",
          currentSelectedUser: "",
          insUsers: [],
          listUsers: payload,
    }
    
    case types.ADD_NEW_USER_REQ:{      
      return {
        ...state,
        insUsers: initialState.insUsers
      };
    }

    case types.ADD_NEW_USER_SUCCESS:{
      return {
        ...state,
        insUsers: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.ADD_NEW_USER_FAILED: {
      return{
        ...state,
        insUsers:{
          sucess: false,
          errMsg: payload
        }
      }    
    }
   
    case types.SELECT_USER:
      localStorage.setItem("selectUser",actions.value); 
      return {
        ...state,
        currentSelectedUser: actions.value
    }

    case types.UPDATE_USER_REQ:{      
      return {
        ...state,
        insUsers: initialState.insUsers
      };
    }

    case types.UPDATE_USER_SUCCESS:{
      return {
        ...state,
        insUsers: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.UPDATE_USER_FAILED: {
      return{
        ...state,
        insUsers:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.DELETE_USER_REQ:{      
      return {
        ...state,
        insUsers: initialState.insUsers
      };
    }

    case types.DELETE_USER_SUCCESS:{
      return {
        ...state,
        insUsers: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.DELETE_USER_FAILED: {
      return{
        ...state,
        insUsers:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.GET_USER_BYID_REQ:
        return {
          ...state, listUsers: []
    }

    case types.GET_USER_BYID_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
    }
    
    case types.GET_USER_BYID_SUCCESS:
        return {
          error: "",
          errorMsg:"",
          currentSelectedUser: "",
          insUsers: [],
          listUsers: payload,
    }

    case types.ADD_USERS_TO_PROJECT_REQ:
            return {
              ...state, inforUser: []
    }
      
    case types.ADD_USERS_TO_PROJECT_FAILED:
            return {
              ...state,
              insUsers:{
                sucess: false,
                errMsg: payload
              }
    }
          
    case types.ADD_USERS_TO_PROJECT_SUCCESS:
              return {
                ...state,
                insUsers: {
                  sucess: true,
                  errMsg: null
                }
    }

    case types.GET_ALL_USERS_OF_PROJECT_REQ:
                return {
                  ...state, listUsersOfProject: []
    }
          
    case types.GET_ALL_USERS_OF_PROJECT_FAILED:
                return {
                  ...state,
                  error: true,
                  errorMsg: payload,
    }
              
    case types.GET_ALL_USERS_OF_PROJECT_SUCCESS:
                  return {
                    ...state,
                    listUsersOfProject: payload,
    }

    case types.DELETE_USER_OF_PROJECT_REQ:
                    return {
                      ...state, listUsersOfProject: []
    }
              
    case types.DELETE_USER_OF_PROJECT_FAILED:
                  return {
                    ...state,
                    insDeleteMember: {
                      sucess: false,
                      errMsg: payload,
                    }
    }
                
    case types.DELETE_USER_OF_PROJECT_SUCCESS:
                  return {
                      ...state,
                      insDeleteMember: {
                        sucess: true,
                        errMsg: null
                    }
    }

    case types.RESET_DELETE_USER_OF_PROJECT:
                  return {
                      ...state,
                      insDeleteMember: {
                        sucess: null,
                        errMsg: null
                    }
    }

    case types.UPDATE_PASSWORD_REQ:{      
      return {
        ...state,
        insPassword: initialState.insPassword
      };
    }

    case types.UPDATE_PASSWORD_SUCCESS:{
      return {
        ...state,
        insPassword: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.UPDATE_PASSWORD_FAILED: {
      return{
        ...state,
        insPassword:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.UPDATE_PROFILE_REQ:{      
      return {
        ...state,
        insProfile: initialState.insProfile
      };
    }

    case types.UPDATE_PROFILE_SUCCESS:{
      return {
        ...state,
        insProfile: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.UPDATE_PROFILE_FAILED: {
      return{
        ...state,
        insProfile:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.GET_CURRENT_USER_REQ:
      return {
        ...state, inforProfile: []
  }

  case types.GET_CURRENT_USER_FAILED:
    return {
      ...state,
      error: true,
      errorMsg: payload,
  }
  
  case types.GET_CURRENT_USER_SUCCESS:
      return {
        error: "",
        errorMsg:"",
        currentSelectedUser: "",
        insUsers: [],
        inforProfile: payload,
  }

    default:
      return state

    
  }
}

export default reducer;