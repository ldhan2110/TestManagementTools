import * as types from './constants';

export function getAllBuild(value) {
  return {
    type: types.GET_ALL_BUILDS_REQ,
    payload: value
  }
}

export function getBuildReport(value) {
  return {
    type: types.GET_BUILD_REPORT_REQ,
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

export function getAllBuildActive(value) {
  return {
    type: types.GET_ALL_BUILD_ACTIVE_REQ,
    payload: value
  }
}

export function resetAddNewBuild(value) {
  return {
    type: types.RESET_ADD_NEW_BUILD,
    payload: value
  }
}

export function resetUpdateBuild(value) {
  return {
    type: types.RESET_UPDATE_BUILD,
    payload: value
  }
}

export function resetDeleteBuild(value) {
  return {
    type: types.RESET_DELETE_BUILD,
    payload: value
  }
}

export function getAllBuildByTestplan(value) {
  return {
    type: types.GET_ALL_BUILD_TESTPLAN_REQ,
    payload: value
  }
}

export function resetBuildActive() {
  return {
    type: types.RESET_BUILD_ACTIVE
  }
}

export function resetBuildTestPlan() {
  return {
    type: types.RESET_BUILD_TESTPLAN
  }
}