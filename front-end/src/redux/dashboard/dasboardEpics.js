import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError, } from 'rxjs/operators';
import { //Observable,
  from, of} from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';

//EFFORT
export  const getEffortEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_EFFORT_REQ),
  mergeMap(() =>  from(axios.get(API_ADDR+'/project/'+localStorage.getItem('selectProject')+'/caleffortoverview',{
    headers: {
      "X-Auth-Token": localStorage.getItem("token"),
      "content-type": "application/json"
    }
  })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_EFFORT_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_EFFORT_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error =>  {
      const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
      type: actions.GET_EFFORT_FAILED,
      payload: error.response.data.errMsg
    })})
  )
  ))


//EXEC OVERVIEW
export  const getExecOverviewEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_EXEC_OVERVIEW_REQ),
  mergeMap(() =>  from(axios.get(API_ADDR+'/project/'+localStorage.getItem('selectProject')+'/dataoverview',{
    headers: {
      "X-Auth-Token": localStorage.getItem("token"),
      "content-type": "application/json"
    }
  })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_EXEC_OVERVIEW_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_EXEC_OVERVIEW_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error =>  {
      const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
      type: actions.GET_EXEC_OVERVIEW_FAILED,
      payload: error.response.data.errMsg
    })})
  )
  ))


  //
export const getMultiChart = (action$, state$) => action$.pipe(
  ofType(actions.GET_MULTI_CHART_REQ),
  mergeMap(() =>  from(axios.get(API_ADDR+'/project/'+localStorage.getItem('selectProject')+'/numberofexecuteineachmonth',{
    headers: {
      "X-Auth-Token": localStorage.getItem("token"),
      "content-type": "application/json"
    }
  })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_MULTI_CHART_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_MULTI_CHART_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error =>  {
      const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
      type: actions.GET_MULTI_CHART_FAILED,
      payload: error.response.data.errMsg
    })})
  )
  ))

  //SIX EXECUTION
export  const getSixExecution = (action$, state$) => action$.pipe(
  ofType(actions.GET_SIX_EXECUTION_REQ),
  mergeMap(() =>  from(axios.get(API_ADDR+'/'+localStorage.getItem('selectProject')+'/api/getsixtestexecutionnewest',{
    headers: {
      "X-Auth-Token": localStorage.getItem("token"),
      "content-type": "application/json"
    }
  })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_SIX_EXECUTION_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_SIX_EXECUTION_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error =>  {
      const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
      type: actions.GET_SIX_EXECUTION_FAILED,
      payload: 'something error'
    })})
  )
  ))