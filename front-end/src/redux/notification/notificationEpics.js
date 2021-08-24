import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError} from 'rxjs/operators';
import { //Observable, 
  from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';


  export  const getAllNotificationEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_NOTIFICATIONS_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/api/v1/getallnotificationofuser',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_ALL_NOTIFICATIONS_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_ALL_NOTIFICATIONS_FAILED,
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
        type: actions.GET_ALL_NOTIFICATIONS_FAILED,
        payload: error.response
      })})
    )))

    export  const addNewNotificationEpic = (action$, state$) => action$.pipe(
      ofType(actions.ADD_NEW_NOTIFICATION_REQ),
      mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/createnotification',{
          description: payload.description,
          is_read: 'false',
          url: payload.url,
          user: payload.user
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
              type: actions.ADD_NEW_NOTIFICATION_SUCCESS,
              payload: true
            })
          } else {
            return ({
              type: actions.ADD_NEW_NOTIFICATION_FAILED,
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
          type: actions.ADD_NEW_NOTIFICATION_FAILED,
          payload: error.response.data.errMsg
        })})
      )))

      export  const getNotificationByIdEpic = (action$, state$) => action$.pipe(
        ofType(actions.GET_NOTIFICATION_BYID_REQ),
        mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+payload.projectid+'/'+payload.notificationid+'/getbyid',{
            headers: {
              "X-Auth-Token": localStorage.getItem("token"),
              "content-type": "application/json"
            }
          })).pipe(
          map(response => {
            const {data} = response;
            if (data.success) {
              return ({
                type: actions.GET_NOTIFICATION_BYID_SUCCESS,
                payload: data.result
              })
            } else {
              return ({
                type: actions.GET_NOTIFICATION_BYID_FAILED,
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
            type: actions.GET_NOTIFICATION_BYID_FAILED,
            payload: error.response
          })})
        )))

      export  const updateNotificationEpic = (action$, state$) => action$.pipe(
        ofType(actions.UPDATE_NOTIFICATION_REQ),
        mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/api/updatenotification',{
            is_read: payload.is_read,
            id: payload.id
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
                type: actions.UPDATE_NOTIFICATION_SUCCESS,
                payload: true
              })
            } else {
              return ({
                type: actions.UPDATE_NOTIFICATION_FAILED,
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
            type: actions.UPDATE_NOTIFICATION_FAILED,
            payload: error.response.data.errMsg
          })})
        )))

        export  const deleteNotificationEpic = (action$, state$) => action$.pipe(
          ofType(actions.DELETE_NOTIFICATION_REQ),
          mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+'/'+payload.projectid+'/'+payload.notificationid+'/api/removeanddeletefromproject',{
              headers: {
                "X-Auth-Token": localStorage.getItem("token"), 
                "content-type": "application/json"
              }
            })).pipe(
            map(response => {
              const {data} = response;
              if (data.success) {
                return ({
                  type: actions.DELETE_NOTIFICATION_SUCCESS,
                  payload: true
                })
              } else {
                return ({
                  type: actions.DELETE_NOTIFICATION_FAILED,
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
              type: actions.DELETE_NOTIFICATION_FAILED,
              payload: error.response.data.errMsg
            })})
          )))