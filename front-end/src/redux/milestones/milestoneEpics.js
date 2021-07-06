import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError} from 'rxjs/operators';
import { //Observable, 
  from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';


  export  const getAllMilestoneEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_MILESTONES_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+payload+'/getallmilestoneofproject',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_ALL_MILESTONES_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_ALL_MILESTONES_FAILED,
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
        type: actions.GET_ALL_MILESTONES_FAILED,
        payload: error.response
      })})
    )))

    export  const addNewMilestoneEpic = (action$, state$) => action$.pipe(
      ofType(actions.ADD_NEW_MILESTONE_REQ),
      mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/'+payload.projectid+'/createmilestone',{
          milestonetitle: payload.milestonetitle,
          description: payload.description,
          start_date: payload.start_date,
          end_date: payload.end_date,
          is_completed: payload.is_completed
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
              type: actions.ADD_NEW_MILESTONE_SUCCESS,
              payload: true
            })
          } else {
            return ({
              type: actions.ADD_NEW_MILESTONE_FAILED,
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
          type: actions.ADD_NEW_MILESTONE_FAILED,
          payload: error.response.data.errMsg
        })})
      )))

      export  const getMilestoneByIdEpic = (action$, state$) => action$.pipe(
        ofType(actions.GET_MILESTONE_BYID_REQ),
        mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+payload.projectid+'/'+payload.milestoneid+'/getbyid',{
            headers: {
              "X-Auth-Token": localStorage.getItem("token"),
              "content-type": "application/json"
            }
          })).pipe(
          map(response => {
            const {data} = response;
            if (data.success) {
              return ({
                type: actions.GET_MILESTONE_BYID_SUCCESS,
                payload: data.result
              })
            } else {
              return ({
                type: actions.GET_MILESTONE_BYID_FAILED,
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
            type: actions.GET_MILESTONE_BYID_FAILED,
            payload: error.response
          })})
        )))

      export  const updateMilestoneEpic = (action$, state$) => action$.pipe(
        ofType(actions.UPDATE_MILESTONE_REQ),
        mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/'+payload.milestoneid+'/api/updatemilestone',{
            milestonetitle: payload.milestonetitle,
            description: payload.description,
            start_date: payload.start_date,
            end_date: payload.end_date,
            is_completed: payload.is_completed
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
                type: actions.UPDATE_MILESTONE_SUCCESS,
                payload: true
              })
            } else {
              return ({
                type: actions.UPDATE_MILESTONE_FAILED,
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
            type: actions.UPDATE_MILESTONE_FAILED,
            payload: error.response.data.errMsg
          })})
        )))

        export  const deleteMilestoneEpic = (action$, state$) => action$.pipe(
          ofType(actions.DELETE_MILESTONE_REQ),
          mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+'/'+payload.projectid+'/'+payload.milestoneid+'/api/removeanddeletefromproject',{
              headers: {
                "X-Auth-Token": localStorage.getItem("token"), 
                "content-type": "application/json"
              }
            })).pipe(
            map(response => {
              const {data} = response;
              if (data.success) {
                return ({
                  type: actions.DELETE_MILESTONE_SUCCESS,
                  payload: true
                })
              } else {
                return ({
                  type: actions.DELETE_MILESTONE_FAILED,
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
              type: actions.DELETE_MILESTONE_FAILED,
              payload: error.response.data.errMsg
            })})
          )))