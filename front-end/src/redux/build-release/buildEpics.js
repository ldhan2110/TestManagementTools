import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, filter,catchError} from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
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
      catchError (error => of({
        type: actions.GET_ALL_BUILDS_FAILED,
        payload: error.response
      }))
    )))

  export  const addNewBuildEpic = (action$, state$) => action$.pipe(
    ofType(actions.ADD_NEW_BUILD_REQ),
    mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/api/build/'+payload.projectid,{
      buildname: payload.buildname,
      description: payload.description,
      isActive: payload.isActive,
      isPublic: payload.isPublic,
      releasedate: payload.releasedate
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
      catchError (error => of({
        type: actions.ADD_NEW_BUILD_FAILED,
        payload: error.response.data.errMsg
      }))
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
      catchError (error => of({
        type: actions.GET_BUILD_BYID_FAILED,
        payload: error.response
      }))
    )))

  export  const updateBuildEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_BUILD_REQ),
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/api/build/'+payload.projectid+'/'+payload.buildid,{
      buildname: payload.buildname,
      description: payload.description,
      isActive: payload.isActive,
      isPublic: payload.isPublic,
      releasedate: payload.releasedate
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
      catchError (error => of({
        type: actions.UPDATE_BUILD_FAILED,
        payload: error.response.data.errMsg
      }))
    )))

  export  const deleteBuildEpic = (action$, state$) => action$.pipe(
    ofType(actions.DELETE_BUILD_REQ),
    mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+'/api/build/'+payload.projectid+'/'+payload.buildid,{
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
      catchError (error => of({
        type: actions.DELETE_BUILD_FAILED,
        payload: error.response.data.errMsg
      }))
    )))

  export  const getAllBuildActiveEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_BUILD_ACTIVE_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/api/build/'+payload+'/getallbuildactive',{
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
            payload: data.result[0].build
          })
        } else {
          return ({
            type: actions.GET_ALL_BUILD_ACTIVE_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error => of({
        type: actions.GET_ALL_BUILD_ACTIVE_FAILED,
        payload: error.response
      }))
    )))