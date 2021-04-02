import * as types from './constants';

export function getAllTestcase(value) {
  return {
    type: types.GET_ALL_TESTCASE_REQ,
    payload: value
  }
}