import * as types from './constants';

export function getAllBuild(value) {
  return {
    type: types.GET_ALL_BUILD_REQ,
    payload: value
  }
}

export function addNewBuild(value){
  console.log(value);
  return{
    type: types.ADD_NEW_BUILD_REQ,
    payload: value
  }
}


export function selectBuild(value){

  return {
    type: types.SELECT_BUILD,
    payload: value
  }
}