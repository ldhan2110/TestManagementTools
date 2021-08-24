import * as types from './constants';

// ISSUE
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

export function deleteIssueFromExec(value){

  return {
    type: types.DELETE_ISSUE_FROM_EXEC_REQ,
    payload: value
  }
}

export function resetDeleteIssueFromExec(value){

  return {
    type: types.RESET_DELETE_ISSUE_FROM_EXEC,
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

// ISSUE FROM URL
export function addIssueToExec(value){

  return {
    type: types.ADD_ISSUE_REQ,
    payload: value
  }
}

export function resetAddIssueToExec(value){

  return {
    type: types.RESET_ADD_ISSUE,
    payload: value
  }
}

//==============* MANTIS *==============//

export function CreateMantis(value) {
  return {
    type: types.CREATE_NEW_MANTIS_REQ,
    payload: value
  }
}

export function resetCreateMantis(value){

  return {
    type: types.RESET_CREATE_NEW_MANTIS,
    payload: value
  }
}


export function getInfoMantis(value) {
  return {
    type: types.GET_INFO_MANTIS_REQ,
    payload: value
  }
}

export function resetGetInfoMantis(value){

  return {
    type: types.RESET_GET_INFO_MANTIS,
    payload: value
  }
}


export function getAllMantisOfProject(value) {
  return {
    type: types.GET_ALL_MANTIS_OF_PROJECT_REQ,
    payload: value
  }
}

export function getAllConnectedMantis(value) {
  return {
    type: types.GET_ALL_CONNECTED_MANTIS_REQ,
    payload: value
  }
}


export function switchConnectedMantis(value) {
  return {
    type: types.SWITCH_CONNECTED_MANTIS_REQ,
    payload: value
  }
}

export function resetSwitchConnectedMantis(value){

  return {
    type: types.RESET_SWITCH_CONNECTED_MANTIS,
    payload: value
  }
}


export function createAndSwitchMantis(value) {
  return {
    type: types.CREATE_AND_SWITCH_MANTIS_REQ,
    payload: value
  }
}

export function resetCreateAndSwitchMantis(value){

  return {
    type: types.RESET_CREATE_AND_SWITCH_MANTIS,
    payload: value
  }
}


export function switchMantis(value) {
  return {
    type: types.SWITCH_MANTIS_REQ,
    payload: value
  }
}

export function resetSwitchMantis(value){

  return {
    type: types.RESET_SWITCH_MANTIS,
    payload: value
  }
}


export function changeAPIkey(value) {
  return {
    type: types.CHANGE_API_KEY_REQ,
    payload: value
  }
}

export function resetChangeAPIkey(value){

  return {
    type: types.RESET_CHANGE_API_KEY,
    payload: value
  }
}