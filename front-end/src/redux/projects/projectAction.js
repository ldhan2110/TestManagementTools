import * as types from './constants';

export function getAllProject(value) {
  return {
    type: types.GET_ALL_PROJECTS_REQ,
    payload: value
  }
}

export function addNewProject(value){
  return{
    type: types.ADD_NEW_PROJECT_REQ,
    payload: value
  }
}


export function selectProject(value){

  return {
    type: types.SELECT_PROJECT,
    payload: value
  }
}

export function updateProject(value){

  return {
    type: types.DELETE_PROJECT_REQ,
    payload: value
  }
}

export function deleteProject(value){

  return {
    type: types.UPDATE_PROJECT_REQ,
    payload: value
  }
}

export function getProjectById(value){

  return {
    type: types.GET_PROJECTS_BY_ID_REQ,
    payload: value
  }
}

export function changeRoleMember(value){

  return {
    type: types.CHANGE_ROLE_MEMBER_REQ,
    payload: value
  }
}

export function resetSelectProject(value){
  return {
    type: types.RESET_SELECT_PROJECT,
    payload: value
  }
}

export function getNameVerify(value){
  return {
    type: types.GET_PROJECT_BY_ID_VERIFY_REQ,
    payload: value
  }
}