import * as types from './constants';

export function getAllRequirements(value) {
  return {
    type: types.GET_ALL_REQUIREMENTS_REQ,
    payload: value
  }
}

export function getAllActiveRequirements(value) {
  return {
    type: types.GET_ALL_ACTIVE_REQUIREMENTS_REQ,
    payload: value
  }
}

export function addNewRequirements(value){
  return{
    type: types.ADD_NEW_REQUIREMENTS_REQ,
    payload: value
  }
}


export function selectRequirements(value){

  return {
    type: types.SELECT_REQUIREMENTS,
    payload: value
  }
}

export function updateRequirements(value){

  return {
    type: types.UPDATE_REQUIREMENTS_REQ,
    payload: value
  }
}

export function deleteRequirements(value){

  return {
    type: types.DELETE_REQUIREMENTS_REQ,
    payload: value
  }
}

export function resetAddRequirements(value){

  return {
    type: types.RESET_ADD_NEW_REQUIREMENTS,
    payload: value
  }
}

export function resetUpdateRequirements(value){

  return {
    type: types.RESET_UPDATE_REQUIREMENTS,
    payload: value
  }
}

export function resetDeleteRequirements(value){

  return {
    type: types.RESET_DELETE_REQUIREMENTS,
    payload: value
  }
}