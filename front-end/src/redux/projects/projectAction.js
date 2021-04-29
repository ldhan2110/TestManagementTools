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