import * as types from './constants';

export function getAllTestplan(value) {
  return {
    type: types.GET_ALL_TESTPLAN_REQ,
    payload: value
  }
}

export function getAllActiveTestplan(value) {
  return {
    type: types.GET_ALL_ACTIVE_TESTPLAN_REQ,
    payload: value
  }
}

export function addNewTestplan(value){
  return{
    type: types.ADD_NEW_TESTPLAN_REQ,
    payload: value
  }
}


export function selectTestplan(value){

  return {
    type: types.SELECT_TESTPLAN,
    payload: value
  }
}

export function updateTestplan(value){

  return {
    type: types.UPDATE_TESTPLAN_REQ,
    payload: value
  }
}