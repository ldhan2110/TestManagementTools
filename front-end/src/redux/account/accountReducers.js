import * as types from './constants';

var initialState = {
  accountInfo: {
    username:"My Name is An",
    password:"dsadsadasd",
    isLogin: true,
    showPassword: false
  }
}


export default function reducer(state = initialState, actions) {
  switch (actions.type) {

    case types.LOGIN_REQ:
      return {
        ...state,
        accountInfo: actions.payload
      }
    case types.LOGIN_SUCESS:{
      return {
        ...state,
        accountInfo:{
          username: actions.payload.username,
          password: actions.payload.password,
          ...state.accountInfo
        }
      }
    }

    default:
      return state
  }
}