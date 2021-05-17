import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, filter,catchError} from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';


export  const getAllProjectEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_ALL_PROJECTS_REQ),
  mergeMap(({  }) =>  from(axios.get(API_ADDR+'/project/inproject',{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_ALL_PROJECTS_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_ALL_PROJECTS_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error => of({
      type: actions.GET_ALL_PROJECTS_FAILED,
      payload: error.response.data.errMsg
    }))
  )))


  export  const addNewProjectEpic = (action$, state$) => action$.pipe(
    ofType(actions.ADD_NEW_PROJECT_REQ),
    mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/project/createproject',payload,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.ADD_NEW_PROJECT_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.ADD_NEW_PROJECT_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error => of({
        type: actions.ADD_NEW_PROJECT_FAILED,
        payload: error.response.data.errMsg
      }))
    )))

  export  const updateProjectEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_PROJECT_REQ),
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+payload.projectid+'/project/updateproject',payload,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.UPDATE_PROJECT_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.UPDATE_PROJECT_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error => of({
        type: actions.UPDATE_PROJECT_FAILED,
        payload: error.response.data.errMsg
      }))
    )))

  export  const deleteProjectEpic = (action$, state$) => action$.pipe(
    ofType(actions.DELETE_PROJECT_REQ),
    mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+payload.projectid+'/project/deleteproject',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.DELETE_PROJECT_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.DELETE_PROJECT_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error => of({
        type: actions.DELETE_PROJECT_FAILED,
        payload: error.response.data.errMsg
      }))
    )))