import * as types from './constants';

export function loginReq(value) {
  return {
    type: types.LOGIN_REQ,
    payload: value
  }
}
