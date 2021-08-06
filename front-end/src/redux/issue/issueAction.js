import * as types from './constants';

export function getAllIssue(value) {
  return {
    type: types.GET_ALL_ISSUE_REQ,
    payload: value
  }
}

export function createIssue(value) {
  return {
    type: types.CREATE_ISSUE_REQ,
    payload: value
  }
}

export function resetCreateIssue(value){

  return {
    type: types.RESET_CREATE_ISSUE,
    payload: value
  }
}

export function selectIssue(value){

  return {
    type: types.SELECT_ISSUE,
    payload: value
  }
}

export function updateIssue(value){

  return {
    type: types.UPDATE_ISSUE_REQ,
    payload: value
  }
}

export function deleteIssue(value){

  return {
    type: types.DELETE_ISSUE_REQ,
    payload: value
  }
}

export function resetUpdateIssue(value){

  return {
    type: types.RESET_UPDATE_ISSUE,
    payload: value
  }
}

export function resetDeleteIssue(value){

  return {
    type: types.RESET_DELETE_ISSUE,
    payload: value
  }
}

// CATEGORY
export function getAllCategory(value) {
  return {
    type: types.GET_ALL_CATEGORY_REQ,
    payload: value
  }
}

export function addCategory(value){

  return {
    type: types.ADD_CATEGORY_REQ,
    payload: value
  }
}

export function removeCategory(value){

  return {
    type: types.REMOVE_CATEGORY_REQ,
    payload: value
  }
}

export function resetAddCategory(value){

  return {
    type: types.RESET_ADD_CATEGORY,
    payload: value
  }
}

export function resetRemoveCategory(value){

  return {
    type: types.RESET_REMOVE_CATEGORY,
    payload: value
  }
}