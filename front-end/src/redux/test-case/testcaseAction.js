import * as types from './constants';

export function getAllTestcase(value) {
  return {
    type: types.GET_ALL_TESTCASE_REQ,
    payload: value
  }
}

export function addTestSuite(value) {
  return {
    type: types.ADD_TEST_SUITE_REQ,
    payload: value
  }
}
