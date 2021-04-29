import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, filter,catchError} from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';


  export  const getAllUserEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_USERS_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/users',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_ALL_USERS_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_ALL_USERS_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error => of({
        type: actions.GET_ALL_USERS_FAILED,
        payload: error.response
      }))
    )))

    export  const getAllUserOfProjectEpic = (action$, state$) => action$.pipe(
        ofType(actions.GET_ALL_USERS_OF_PROJECT_REQ),
        mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/project/members/'+payload,{
            headers: {
              "X-Auth-Token": localStorage.getItem("token"),
              "content-type": "application/json"
            }
          })).pipe(
          map(response => {
            const {data} = response;
            if (data.success) {
              return ({
                type: actions.GET_ALL_USERS_OF_PROJECT_SUCCESS,
                payload: data.result[0].members
              })
            } else {
              return ({
                type: actions.GET_ALL_USERS_OF_PROJECT_FAILED,
                payload: data.errMsg
              })
            }
          
          }),
          catchError (error => of({
            type: actions.GET_ALL_USERS_OF_PROJECT_FAILED,
            payload: error.response
          }))
        )))

        export  const addUserToProjectEpic = (action$, state$) => action$.pipe(
            ofType(actions.ADD_USERS_TO_PROJECT_REQ),
            mergeMap(({ payload  }) =>  from(axios.post(API_ADDR+'/project/members/'+payload.projectid,{
              email: payload.email,
              role: payload.role,
            },{
                headers: {
                  "X-Auth-Token": localStorage.getItem("token"),
                  "content-type": "application/json"
                }
              })).pipe(
              map(response => {
                const {data} = response;
                if (data.success) {
                  return ({
                    type: actions.ADD_USERS_TO_PROJECT_SUCCESS,
                    payload: true
                  })
                } else {
                  return ({
                    type: actions.ADD_USERS_TO_PROJECT_FAILED,
                    payload: data.errMsg
                  })
                }
              
              }),
              catchError (error => of({
                type: actions.ADD_USERS_TO_PROJECT_FAILED,
                payload: error.response.data.errMsg
              }))
            )))

            export  const deleteUserOfProjectEpic = (action$, state$) => action$.pipe(
              ofType(actions.DELETE_USER_OF_PROJECT_REQ),
              mergeMap(({ payload  }) =>  from(axios.delete(API_ADDR+'/project/members/'+payload.projectid+'/'+payload.userid,{
                  headers: {
                    "X-Auth-Token": localStorage.getItem("token"),
                    "content-type": "application/json"
                  }
                })).pipe(
                map(response => {
                  const {data} = response;
                  if (data.success) {
                    return ({
                      type: actions.DELETE_USER_OF_PROJECT_SUCCESS,
                      payload: true
                    })
                  } else {
                    return ({
                      type: actions.DELETE_USER_OF_PROJECT_FAILED,
                      payload:  data.errMsg
                    })
                  }
                
                }),
                catchError (error => of({
                  type: actions.DELETE_USER_OF_PROJECT_FAILED,
                  payload:  error.response.data.errMsg
                }))
              )))

    export  const addNewUserEpic = (action$, state$) => action$.pipe(
      ofType(actions.ADD_NEW_USER_REQ),
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
              type: actions.ADD_NEW_USER_SUCCESS,
              payload: true
            })
          } else {
            return ({
              type: actions.ADD_NEW_USER_FAILED,
              payload: data.errMsg
            })
          }
        
        }),
        catchError (error => of({
          type: actions.ADD_NEW_USER_FAILED,
          payload: error.response.data.errMsg
        }))
      )))

      export  const getUserByIdEpic = (action$, state$) => action$.pipe(
        ofType(actions.GET_USER_BYID_REQ),
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
                type: actions.GET_USER_BYID_SUCCESS,
                payload: data.result
              })
            } else {
              return ({
                type: actions.GET_USER_BYID_FAILED,
                payload: data.errMsg
              })
            }
          
          }),
          catchError (error => of({
            type: actions.GET_USER_BYID_FAILED,
            payload: error.response
          }))
        )))

      export  const updateUserEpic = (action$, state$) => action$.pipe(
        ofType(actions.UPDATE_USER_REQ),
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
                type: actions.UPDATE_USER_SUCCESS,
                payload: true
              })
            } else {
              return ({
                type: actions.UPDATE_USER_FAILED,
                payload: data.errMsg
              })
            }
          
          }),
          catchError (error => of({
            type: actions.UPDATE_USER_FAILED,
            payload: error.response.data.errMsg
          }))
        )))

        export  const deleteUserEpic = (action$, state$) => action$.pipe(
          ofType(actions.DELETE_USER_REQ),
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
                  type: actions.DELETE_USER_SUCCESS,
                  payload: true
                })
              } else {
                return ({
                  type: actions.DELETE_USER_FAILED,
                  payload: data.errMsg
                })
              }
            
            }),
            catchError (error => of({
              type: actions.DELETE_USER_FAILED,
              payload: error.response.data.errMsg
            }))
          )))