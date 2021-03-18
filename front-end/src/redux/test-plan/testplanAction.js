import * as types from './constants';

export function getAllTestplan(value) {
  return {
    type: types.GET_ALL_TESTPLAN_REQ,
    payload: value
  }
}

export function addNewTestplan(value){
  console.log(value);
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