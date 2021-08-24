import * as types from './constants';

export function displayMessage(value) {
  return {
    type: types.DISPLAY_MESSAGE,
    payload: value
  }
}


export function clearMsg() {
  return {
    type: types.RESET_MESSAGE
  }
}