import * as types from './constants';

var initialState = {
  success:"",
  error: "",
  errorMsg:"",
  accountInfo: {
    username:"",
    password:"",
    isKeepedLogin: false,
    showPassword: false,
    isLogin: false
  }
}


export default function reducer(state = initialState, actions) {

  const {payload} = actions;

  switch (actions.type) {

    //LOGIN
    case types.LOGIN_REQ:
      return {
        ...state,
        accountInfo: actions.payload
      }

    case types.LOGIN_SUCESS:
      return {
        ...state,
        accountInfo:{
          username:"My Name is An",
          password:"dsadsadasd",
          isKeepedLogin: false,
          showPassword: false,
          isLogin: true
        }
      }
    
    case types.LOGIN_FAILED:
      return {
        ...state,
        accountInfo: {
          username:"My Name is An",
          password:"dsadsadasd",
          isKeepedLogin: false,
          showPassword: false,
          isLogin: false
        }
      }

    case types.LOGOUT_REQ:
      return {
        ...state
      }

    case types.LOGOUT_SUCESS:
      return{
        ...state,
        accountInfo:{
          ...state.accountInfo,
          isLogin: payload.isLogin,
        }
      }
    
    
    default:
      return state
  }
}