import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError} from 'rxjs/operators';
import { //Observable, 
  from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';


export  const getAllIssueEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_ALL_ISSUE_REQ),
  mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+payload+'/api/mantis/getallissue',{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_ALL_ISSUE_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_ALL_ISSUE_FAILED,
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
      type: actions.GET_ALL_ISSUE_FAILED,
      payload: error.response.data.errMsg
    })})
  )))

  export  const createIssueEpic = (action$, state$) => action$.pipe(
    ofType(actions.CREATE_ISSUE_REQ),
    mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/'+payload.projectid+'/api/mantis/createissue',{
        summary: payload.summary,
        description: payload.description,
        category: payload.category,
        testexecution_id: payload.testexecution_id,
        attachment: payload.attachment,
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
            type: actions.CREATE_ISSUE_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.CREATE_ISSUE_FAILED,
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
        type: actions.UPDATE_ISSUE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const updateIssueEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_ISSUE_REQ),
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/'+payload.id+'/api/mantis/updateissue',{
        id: payload.id,
        summary: payload.summary,
        description: payload.description,
        category: payload.category,
        reporter: payload.reporter,
        url: payload.url,
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
            type: actions.UPDATE_ISSUE_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.UPDATE_ISSUE_FAILED,
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
        type: actions.UPDATE_ISSUE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const deleteIssueEpic = (action$, state$) => action$.pipe(
    ofType(actions.DELETE_ISSUE_REQ),
    mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+'/'+payload.projectid+'/'+payload.testplanid+'/api/deleteissue',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.DELETE_ISSUE_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.DELETE_ISSUE_FAILED,
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
        type: actions.DELETE_ISSUE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))


    // CATEGORY
    export  const getAllCategoryEpic = (action$, state$) => action$.pipe(
      ofType(actions.GET_ALL_CATEGORY_REQ),
      mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+payload+'/api/mantis/getallcategory',{
          headers: {
            "X-Auth-Token": localStorage.getItem("token"),
            "content-type": "application/json"
          }
        })).pipe(
        map(response => {
          const {data} = response;
          if (data.success) {
            return ({
              type: actions.GET_ALL_CATEGORY_SUCCESS,
              payload: data.result
            })
          } else {
            return ({
              type: actions.GET_ALL_CATEGORY_FAILED,
              payload: data.errMsg
            })
          }
        
        }),
        catchError (error => {
          const {status} = error?.response?.data;
            if (status ===  401) {
              localStorage.clear();
              window.location.replace('/login');
            } else
            return of({
          type: actions.GET_ALL_CATEGORY_FAILED,
          payload: error.response.data.errMsg
        })})
      )))
    
      export  const addCategoryEpic = (action$, state$) => action$.pipe(
        ofType(actions.ADD_CATEGORY_REQ),
        mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/api/mantis/addcategory',{
            category_name: payload.category
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
                type: actions.ADD_CATEGORY_SUCCESS,
                payload: true
              })
            } else {
              return ({
                type: actions.ADD_CATEGORY_FAILED,
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
            type: actions.ADD_CATEGORY_FAILED,
            payload: error.response.data.errMsg
          })})
        )))

        export  const removeCategoryEpic = (action$, state$) => action$.pipe(
          ofType(actions.REMOVE_CATEGORY_REQ),
          mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/api/removecategory',{
            category_name: payload.category,
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
                  type: actions.REMOVE_CATEGORY_SUCCESS,
                  payload: true
                })
              } else {
                return ({
                  type: actions.REMOVE_CATEGORY_FAILED,
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
              type: actions.REMOVE_CATEGORY_FAILED,
              payload: error.response.data.errMsg
            })})
          )))