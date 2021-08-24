import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError} from 'rxjs/operators';
import { //Observable, 
  from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';


export  const getAllRequirementsEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_ALL_REQUIREMENTS_REQ),
  mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+payload+'/getallrequirementsbyid',{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_ALL_REQUIREMENTS_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_ALL_REQUIREMENTS_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error => of({
      type: actions.GET_ALL_REQUIREMENTS_FAILED,
      payload: error.response
    }))
  )))


  export  const addNewRequirementsEpic = (action$, state$) => action$.pipe(
    ofType(actions.ADD_NEW_REQUIREMENTS_REQ),
    mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/'+payload.projectid+'/createtrequirements',{
        projectrequirementname: payload.projectrequirementname,
        description: payload.description,
        //buildname: payload.buildname,
        isActive: payload.is_active,
        isPublic: payload.is_public
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
            type: actions.ADD_NEW_REQUIREMENTS_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.ADD_NEW_REQUIREMENTS_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error => of({
        type: actions.ADD_NEW_REQUIREMENTS_FAILED,
        payload: error.response.data.errMsg
      }))
    )))

  export  const updateRequirementsEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_REQUIREMENTS_REQ),
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/'+payload.requirementsid+'/api/updaterequirements',{
        projectrequirementname: payload.projectrequirementname,
        description: payload.description,
        //buildname: payload.buildname,
        isActive: payload.isActive,
        isPublic: payload.isPublic,
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
            type: actions.UPDATE_REQUIREMENTS_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.UPDATE_REQUIREMENTS_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error => of({
        type: actions.UPDATE_REQUIREMENTS_FAILED,
        payload: error.response.data.errMsg
      }))
    )))



  export  const getAllActiveRequirementsEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_ACTIVE_REQUIREMENTS_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+localStorage.getItem("selectProject")+'/getallrequirementsactive',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_ALL_ACTIVE_REQUIREMENTS_SUCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_ALL_ACTIVE_REQUIREMENTS_FAILED,
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
        type: actions.GET_ALL_ACTIVE_REQUIREMENTS_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const deleteRequirementsEpic = (action$, state$) => action$.pipe(
    ofType(actions.DELETE_REQUIREMENTS_REQ),
    mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+'/'+payload.projectid+'/'+payload.requirementsid+'/api/deleterequirements',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.DELETE_REQUIREMENTS_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.DELETE_REQUIREMENTS_FAILED,
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
        type: actions.DELETE_REQUIREMENTS_FAILED,
        payload: error.response.data.errMsg
      })})
    )))