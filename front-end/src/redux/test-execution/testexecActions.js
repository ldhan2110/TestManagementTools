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

export function execTestcase(value) {
  return {
    type: types.EXECUTE_TEST_CASE_REQ,
    payload: value
  }
}

export function updateTestExec(value) {
  return {
    type: types.UPDATE_TEST_EXEC_REQ,
    payload: value
  }
}

export function selectTestExec(value){
  return{
    type: types.SELECT_TEST_EXEC_REQ,
    payload: value
  }
}

export function selectTestcase(value){
  return{
    type: types.SELECT_TEST_CASE_REQ,
    payload: value
  }
}

export function resetAddTestExec(){
  return{
    type: types.RESET_ADD_TEST_EXEC,
  }
}


export function resetExecuteTestCase(){
  return{
    type: types.RESET_EXECUTE_TEST_CASE,
  }
}


export function resetUpdateTestExec(){
  return{
    type: types.RESET_UPDATE_TEST_EXEC,
  }
}

export function resetDeleteTestExec(){
  return {
    type: types.RESET_DELETE_TEST_EXEC
  }
}

export function deleteTestExec(value){
  return {
    type: types.DELETE_TEST_EXEC_REQ,
    payload: value
  }
}

export function updateTestExecDetail(value){
  return {
    type: types.UPDATE_TEST_EXEC_DETAIL_REQ,
    payload: value
  }
}