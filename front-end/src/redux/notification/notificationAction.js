import * as types from './constants';

export function getAllNotification(value) {
  return {
    type: types.GET_ALL_NOTIFICATIONS_REQ,
    payload: value
  }
}

export function addNewNotification(value){

  return{
    type: types.ADD_NEW_NOTIFICATION_REQ,
    payload: value
  }
}


export function selectNotification(value){

  return {
    type: types.SELECT_NOTIFICATION,
    payload: value
  }
}

export function updateNotification(value){

  return {
    type: types.UPDATE_NOTIFICATION_REQ,
    payload: value
  }
}

export function deleteNotification(value){

  return {
    type: types.DELETE_NOTIFICATION_REQ,
    payload: value
  }
}

export function getNotificationById(value) {
  return {
    type: types.GET_NOTIFICATION_BYID_REQ,
    payload: value
  }
}

export function resetAddNotification(value){

  return {
    type: types.RESET_ADD_NEW_NOTIFICATION,
    payload: value
  }
}

export function resetUpdateNotification(value){

  return {
    type: types.RESET_UPDATE_NOTIFICATION,
    payload: value
  }
}

export function resetDeleteNotification(value){

  return {
    type: types.RESET_DELETE_NOTIFICATION,
    payload: value
  }
}