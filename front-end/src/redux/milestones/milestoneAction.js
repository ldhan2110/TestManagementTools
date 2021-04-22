import * as types from './constants';

export function getAllMilestone(value) {
  return {
    type: types.GET_ALL_MILESTONES_REQ,
    payload: value
  }
}

export function addNewMilestone(value){
  console.log(value);
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