import * as types from './constants';

export function getAllBuild(value) {
  return {
    type: types.GET_ALL_BUILDS_REQ,
    payload: value
  }
}

export function addNewBuild(value){
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

export function updateBuild(value){

  return {
    type: types.UPDATE_BUILD_REQ,
    payload: value
  }
}

export function deleteBuild(value){

  return {
    type: types.DELETE_BUILD_REQ,
    payload: value
  }
}

export function getBuildById(value) {
  return {
    type: types.GET_BUILD_BYID_REQ,
    payload: value
  }
}