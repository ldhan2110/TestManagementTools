import * as types from './constants';

export function getAllUser(value) {
  return {
    type: types.GET_ALL_USERS_REQ,
    payload: value
  }
}

export function addNewUser(value){
  return{
    type: types.ADD_NEW_USER_REQ,
    payload: value
  }
}


export function selectUser(value){

  return {
    type: types.SELECT_USER,
    payload: value
  }
}

export function updateUser(value){

  return {
    type: types.UPDATE_USER_REQ,
    payload: value
  }
}

export function deleteUser(value){

  return {
    type: types.DELETE_USER_REQ,
    payload: value
  }
}

export function getUserById(value) {
  return {
    type: types.GET_USER_BYID_REQ,
    payload: value
  }
}

export function getAllUserOfProject(value) {
  return {
    type: types.GET_ALL_USERS_OF_PROJECT_REQ,
    payload: value
  }
}

export function addUserToProject(value) {
  return {
    type: types.ADD_USERS_TO_PROJECT_REQ,
    payload: value
  }
}

export function deleteUserOfProject(value) {
  return {
    type: types.DELETE_USER_OF_PROJECT_REQ,
    payload: value
  }
}

export function updatePassword(value){

  return {
    type: types.UPDATE_PASSWORD_REQ,
    payload: value
  }
}

export function updateProfile(value){

  return {
    type: types.UPDATE_PROFILE_REQ,
    payload: value
  }
}

export function getCurentUser(value) {
  return {
    type: types.GET_CURRENT_USER_REQ,
    payload: value
  }
}