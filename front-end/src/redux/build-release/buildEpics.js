import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError} from 'rxjs/operators';
import { //Observable, 
  from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';


  export  const getAllBuildEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_BUILDS_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/api/build/'+payload,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_ALL_BUILDS_SUCCESS,
            payload: data.result[0].build
          })
        } else {
          return ({
            type: actions.GET_ALL_BUILDS_FAILED,
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
        type: actions.GET_ALL_BUILDS_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

    export  const getBuildReportEpic = (action$, state$) => action$.pipe(
      ofType(actions.GET_BUILD_REPORT_REQ),
      mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/api/build/'+payload.projectid+'/'+payload.buildid+'/getdatareportofbuild',{
          headers: {
            "X-Auth-Token": localStorage.getItem("token"),
            "content-type": "application/json"
          }
        })).pipe(
        map(response => {
          const {data} = response;
          if (data.success) {
            return ({
              type: actions.GET_BUILD_REPORT_SUCCESS,
              payload: data.result
            })
          } else {
            return ({
              type: actions.GET_BUILD_REPORT_FAILED,
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
          type: actions.GET_BUILD_REPORT_FAILED,
          payload: error.response.data.errMsg
        })})
      )))

  export  const addNewBuildEpic = (action$, state$) => action$.pipe(
    ofType(actions.ADD_NEW_BUILD_REQ),
    mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/api/build/'+payload.projectid,{
      buildname: payload.buildname,
      description: payload.description,
      isActive: payload.isActive,
      isPublic: payload.isPublic,
      releasedate: payload.releasedate,
      testplanname: payload.testplan,
      id_exist_build: payload.id_exist_build
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
            type: actions.ADD_NEW_BUILD_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.ADD_NEW_BUILD_FAILED,
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
        type: actions.ADD_NEW_BUILD_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const getBuildByIdEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_BUILD_BYID_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/api/build/'+payload.projectid+'/'+payload.buildid+'/getbyid',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_BUILD_BYID_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_BUILD_BYID_FAILED,
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
        type: actions.GET_BUILD_BYID_FAILED,
        payload: error.response
      })})
    )))

  export  const updateBuildEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_BUILD_REQ),
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/api/build/'+payload.projectid+'/'+payload.buildid,{
      buildname: payload.buildname,
      description: payload.description,
      isActive: payload.isActive,
      isPublic: payload.isPublic,
      releasedate: payload.releasedate,
      testplanname: payload.testplan
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
            type: actions.UPDATE_BUILD_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.UPDATE_BUILD_FAILED,
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
        type: actions.UPDATE_BUILD_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const deleteBuildEpic = (action$, state$) => action$.pipe(
    ofType(actions.DELETE_BUILD_REQ),
    mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+'/api/build/'+payload.projectid+'/'+payload.buildid+'/api/deletebuildfromproject',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"), 
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.DELETE_BUILD_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.DELETE_BUILD_FAILED,
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
        type: actions.DELETE_BUILD_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const getAllBuildActiveEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_BUILD_ACTIVE_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/api/build/'+payload.projectid+'/getallbuildactive',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_ALL_BUILD_ACTIVE_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_ALL_BUILD_ACTIVE_FAILED,
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
        type: actions.GET_ALL_BUILD_ACTIVE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))


    export  const getAllBuildByTestplan = (action$, state$) => action$.pipe(
      ofType(actions.GET_ALL_BUILD_TESTPLAN_REQ),
      mergeMap(({ payload  }) =>  from(axios.post(API_ADDR+'/'+localStorage.getItem('selectProject')+'/api/getallbuildoftestplan',payload,{
          headers: {
            "X-Auth-Token": localStorage.getItem("token"),
            "content-type": "application/json"
          }
        })).pipe(
        map(response => {
          const {data} = response;
          if (data.success) {
            return ({
              type: actions.GET_ALL_BUILD_TESTPLAN_SUCCESS,
              payload: data.result
            })
          } else {
            return ({
              type: actions.GET_ALL_BUILD_TESTPLAN_FAILED,
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
          type: actions.GET_ALL_BUILD_ACTIVE_FAILED,
          payload:  error.response.data.errMsg
        })})
      )))