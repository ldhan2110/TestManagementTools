import * as types from './constants';

export function getAllTestexec(value) {
  return {
    type: types.GET_ALL_TESTEXEC_REQ,
    payload: value
  }
}

export function addNewTestexec(value) {
  return {
    type: types.ADD_TESTEXEC_REQ,
    payload: value
  }
}