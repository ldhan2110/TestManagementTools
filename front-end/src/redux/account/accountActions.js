import * as types from './constants';

export function loginReq(value) {
  return {
    type: types.LOGIN_REQ,
    payload: value
  }
}

export function logoutReq(value){
  return {
    type: types.LOGOUT_REQ,
    payload: value
  }
}

export function registerReq (value){
  return{
    type: types.REGISTER_REQ,
    payload: value
  }
}