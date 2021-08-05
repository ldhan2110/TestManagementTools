import * as types from './constants';

export function getAllIssue(value) {
  return {
    type: types.GET_ALL_ISSUE_REQ,
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