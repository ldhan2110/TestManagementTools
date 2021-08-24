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

export function getListTestcaseSelect(value){
  return {
    type: types.GET_LIST_TESTCASE_SELECT_REQ,
    payload: value
  }
}

export function updateTestSuite(value){
  return {
    type: types.UPDATE_TESTSUITE_REQ,
    payload: value
  }
}

export function deleteTestSuite(value){
  return {
    type: types.DELETE_TESTSUITE_REQ,
    payload: value
  }
}

export function resetAddTestSuite(value){
  return {
    type: types.RESET_ADD_TEST_SUITE,
    payload: value
  }
}

export function resetAddTestCase(value){
  return {
    type: types.RESET_ADD_TEST_CASE,
    payload: value
  }
}

export function resetUpdateTestCase(value){
  return {
    type: types.RESET_UPDATE_TESTCASE,
    payload: value
  }
}

export function resetDeleteTestCase(value){
  return {
    type: types.RESET_DELETE_TESTCASE,
    payload: value
  }
}

export function resetUpdateTestSuite(value){
  return {
    type: types.RESET_UPDATE_TESTSUITE,
    payload: value
  }
}

export function resetDeleteTestSuite(value){
  return {
    type: types.RESET_DELETE_TESTSUITE,
    payload: value
  }
}

export function searchTestCase(value) {
  return {
    type: types.SEARCH_TESTCASE_REQ,
    payload: value
  }
}

export function uploadTestCase(value){
  return {
    type: types.UPLOAD_TESTCASE_REQ,
    payload: value
  }
}

export function resetUploadTestCase(value){
  return {
    type: types.RESET_UPLOAD_TESTCASE,
    payload: value
  }
}

export function resetSelectTestcase(){
  return {
    type: types.RESET_LIST_TESTCASE_SELECT,
  }
}