import * as types from './constants';

export function getEffortReq() {
  return {
    type: types.GET_EFFORT_REQ
  }
}

export function getExecOverview() {
  return {
    type: types.GET_EXEC_OVERVIEW_REQ
  }
}