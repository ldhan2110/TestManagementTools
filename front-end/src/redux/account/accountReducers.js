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
        currentTheme: actions.payload
      }

    default:
      return state
  }
}