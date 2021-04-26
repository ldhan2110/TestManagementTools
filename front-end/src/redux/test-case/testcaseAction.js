import * as types from './constants';

export function getAllTestcase(value) {
  return {
    type: types.GET_ALL_TESTCASE_REQ,
    payload: value
  }
}

export function getAllTestsuite(value) {
  return {
    type: types.GET_ALL_TESTSUITE_REQ,
    payload: value
  }
}

export function addTestSuite(value) {
  return {
    type: types.ADD_TEST_SUITE_REQ,
    payload: value
  }
}

export function addTestCase(value){
  return {
    type: types.ADD_TEST_CASE_REQ,
    payload: value
  }
}

export function getAllTestsuiteNoTree(value){
  return {
    type: types.GET_ALL_TESTSUITE_NO_TREE_REQ,
    payload: value
  }
}

export function updateTestCase(value){
  return {
    type: types.UPDATE_TESTCASE_REQ,
    payload: value
  }
}

export function deleteTestCase(value){
  return {
    type: types.DELETE_TESTCASE_REQ,
    payload: value
  }
}
