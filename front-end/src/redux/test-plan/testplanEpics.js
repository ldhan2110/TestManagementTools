import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError} from 'rxjs/operators';
import { //Observable, 
  from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';


export  const getAllTestplanEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_ALL_TESTPLAN_REQ),
  mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+payload+'/getalltestplanbyid',{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_ALL_TESTPLAN_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_ALL_TESTPLAN_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error => {
      const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
      type: actions.GET_ALL_TESTPLAN_FAILED,
      payload: error.response
    })})
  )))


  export  const addNewTestplanEpic = (action$, state$) => action$.pipe(
    ofType(actions.ADD_NEW_TESTPLAN_REQ),
    mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/'+payload.projectid+'/createtestplan',{
        testplanname: payload.Testplanname,
        description: payload.description,
        buildname: payload.buildname,
        isActive: payload.is_active,
        isPublic: payload.is_public,
        summaryname: payload.summaryname,
        summaryurl: payload.summaryurl,
    } , {
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.ADD_NEW_TESTPLAN_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.ADD_NEW_TESTPLAN_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.ADD_NEW_TESTPLAN_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const updateTestplanEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_TESTPLAN_REQ),
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/'+payload.testplanid+'/api/updatetestplan',{
        testplanname: payload.testplanname,
        description: payload.description,
        buildname: payload.buildname,
        isActive: payload.isActive,
        isPublic: payload.isPublic,
        summaryname: payload.summaryname,
        summaryurl: payload.summaryurl,
    } , {
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.UPDATE_TESTPLAN_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.UPDATE_TESTPLAN_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.UPDATE_TESTPLAN_FAILED,
        payload: error.response.data.errMsg
      })})
    )))



  export  const getAllActiveTestplanEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_ACTIVE_TESTPLAN_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+localStorage.getItem("selectProject")+'/getalltestplanactive',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_ALL_ACTIVE_TESTPLAN_SUCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_ALL_ACTIVE_TESTPLAN_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.GET_ALL_ACTIVE_TESTPLAN_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const deleteTestplanEpic = (action$, state$) => action$.pipe(
    ofType(actions.DELETE_TESTPLAN_REQ),
    mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+'/'+payload.projectid+'/'+payload.testplanid+'/api/deletetestplan',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.DELETE_TESTPLAN_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.DELETE_TESTPLAN_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.DELETE_TESTPLAN_FAILED,
        payload: error.response.data.errMsg
      })})
    )))