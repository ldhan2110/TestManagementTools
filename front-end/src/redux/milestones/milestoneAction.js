import * as types from './constants';

export function getAllMilestone(value) {
  return {
    type: types.GET_ALL_MILESTONES_REQ,
    payload: value
  }
}

export function addNewMilestone(value){

  return{
    type: types.ADD_NEW_MILESTONE_REQ,
    payload: value
  }
}


export function selectMilestone(value){

  return {
    type: types.SELECT_MILESTONE,
    payload: value
  }
}

export function updateMilestone(value){

  return {
    type: types.UPDATE_MILESTONE_REQ,
    payload: value
  }
}

export function deleteMilestone(value){

  return {
    type: types.DELETE_MILESTONE_REQ,
    payload: value
  }
}

export function getMilestoneById(value) {
  return {
    type: types.GET_MILESTONE_BYID_REQ,
    payload: value
  }
}

export function resetAddMilestone(value){

  return {
    type: types.RESET_ADD_NEW_MILESTONE,
    payload: value
  }
}

export function resetUpdateMilestone(value){

  return {
    type: types.RESET_UPDATE_MILESTONE,
    payload: value
  }
}

export function resetDeleteMilestone(value){

  return {
    type: types.RESET_DELETE_MILESTONE,
    payload: value
  }
}