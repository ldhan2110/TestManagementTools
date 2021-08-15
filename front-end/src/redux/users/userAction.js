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

export function resetAddUserToProject(value){
  return {
    type: types.RESET_ADD_USERS_TO_PROJECT,
    payload: value
  }
}

export function deleteUserOfProject(value) {
  return {
    type: types.DELETE_USER_OF_PROJECT_REQ,
    payload: value
  }
}

export function resetDelUserOfProject(value) {
  return {
    type: types.RESET_DELETE_USER_OF_PROJECT,
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

export function verifyUserToProject(value) {
  return {
    type: types.VERIFY_USERS_TO_PROJECT_REQ,
    payload: value
  }
}

export function updateAvatar(value){
  return {
    type: types.UPDATE_AVATAR_REQ,
    payload: value
  }
}

export function getAllMemberMantis(value) {
  return {
    type: types.GET_ALL_MEMBERMANTIS_REQ,
    payload: value
  }
}

export function addMemberMantis(value) {
  return {
    type: types.ADD_MEMBERMANTIS_REQ,
    payload: value
  }
}

export function resetAddMemberMantis(value){
  return {
    type: types.RESET_ADD_MEMBERMANTIS,
    payload: value
  }
}

export function deleteMemberMantis(value) {
  return {
    type: types.DELETE_MEMBERMANTIS_REQ,
    payload: value
  }
}

export function resetDelMemberMantis(value) {
  return {
    type: types.RESET_DELETE_MEMBERMANTIS,
    payload: value
  }
}

export function selectMemberMantis(value){

  return {
    type: types.SELECT_MEMBERMANTIS,
    payload: value
  }
}

export function changeRoleMemberMantis(value){

  return {
    type: types.CHANGE_ROLE_MEMBER_MANTIS_REQ,
    payload: value
  }
}

export function resetChangeRoleMemberMantis(value) {
  return {
    type: types.RESET_CHANGE_ROLE_MEMBER_MANTIS,
    payload: value
  }
}