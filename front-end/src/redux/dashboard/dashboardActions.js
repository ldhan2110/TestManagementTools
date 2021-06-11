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

export function getMultiChart() {
  return {
    type: types.GET_MULTI_CHART_REQ
  }
}

export function getSixExecution() {
  return {
    type: types.GET_SIX_EXECUTION_REQ
  }
}