import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError} from 'rxjs/operators';
import { //Observable, 
  from, of } from 'rxjs';
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
    catchError (error => {
      const {status} = error.response.data;
      if (status ===  401) {
        localStorage.clear();
        window.location.replace('/login');
      } else
      return of({
        type: actions.GET_ALL_PROJECTS_FAILED,
        payload: error.response.data.errMsg
      })})
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
      catchError (error =>{
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.ADD_NEW_PROJECT_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const updateProjectEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_PROJECT_REQ),
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/project/updateproject/'+payload.projectid,payload,{
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
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.UPDATE_PROJECT_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const deleteProjectEpic = (action$, state$) => action$.pipe(
    ofType(actions.DELETE_PROJECT_REQ),
    mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+'/project/deleteproject/'+payload.projectid,{
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
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.DELETE_PROJECT_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const getProjectByIdEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_PROJECTS_BY_ID_REQ),
    mergeMap(({ payload }) =>  from(axios.get(API_ADDR+'/project/getprojectbyid/'+payload,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json",
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_PROJECTS_BY_ID_SUCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_PROJECTS_BY_ID_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error =>{
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.GET_PROJECTS_BY_ID_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const changeRoleMemberEpic = (action$, state$) => action$.pipe(
    ofType(actions.CHANGE_ROLE_MEMBER_REQ),
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/project/changerole/'+payload.projectid,{
      role: payload.role,
      userid: payload.id
  } ,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.CHANGE_ROLE_MEMBER_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.CHANGE_ROLE_MEMBER_FAILED,
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
        type: actions.CHANGE_ROLE_MEMBER_FAILED,
        payload: error.response.data.errMsg
      })})
    )))




    export  const getProjectNameByIdEpic = (action$, state$) => action$.pipe(
      ofType(actions.GET_PROJECT_BY_ID_VERIFY_REQ),
      mergeMap(({ payload }) =>  from(axios.get(API_ADDR+'/project/getnameproject/'+payload.id,{
          headers: {
            "Reset-Token": payload.token,
            "content-type": "application/json",
          }
        })).pipe(
        map(response => {
          const {data} = response;
          if (data.success) {
            return ({
              type: actions.GET_PROJECT_BY_ID_VERIFY_SUCCESS,
              payload: data.result
            })
          } else {
            return ({
              type: actions.GET_PROJECT_BY_ID_VERIFY_FAIL,
              payload: data.errMsg
            })
          }
        
        }),
        catchError (error =>{
          //console.log("eRROR");
          return of({
          type: actions.GET_PROJECT_BY_ID_VERIFY_FAIL,
          payload: error.response.data.errMsg
        })})
      )))