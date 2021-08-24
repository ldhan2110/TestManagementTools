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

export function resetRegisterReq (value){
  return{
    type: types.RESET_REGISTER,
    payload: value
  }
}

export function sendMailResetPasswordReq (value){
  return{
    type: types.SEND_MAIL_RESET_PASSWORD_REQ,
    payload: value
  }
}

export function resetSendMailResetPasswordReq (value){
  return{
    type: types.RESET_SEND_MAIL_RESET_PASSWORD,
    payload: value
  }
}

export function confirmResetPasswordReq (value){
  return{
    type: types.CONFIRM_RESET_PASSWORD_REQ,
    payload: value
  }
}

export function resetConfirmResetPasswordReq (value){
  return{
    type: types.RESET_CONFIRM_RESET_PASSWORD,
    payload: value
  }
}