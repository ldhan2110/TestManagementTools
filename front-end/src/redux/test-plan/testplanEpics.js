import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, filter,catchError} from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
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
    catchError (error => of({
      type: actions.GET_ALL_TESTPLAN_FAILED,
      payload: error.response
    }))
  )))


  export  const addNewTestplanEpic = (action$, state$) => action$.pipe(
    ofType(actions.ADD_NEW_TESTPLAN_REQ),
    mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/'+payload.projectid+'/createtestplan',{
        testplanname: payload.Testplanname,
        description: payload.description,
        isActive: payload.is_public,
        isPublic: payload.active
    } , {
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          console.log(data);
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
      catchError (error => of({
        type: actions.ADD_NEW_TESTPLAN_FAILED,
        payload: error.response.data.errMsg
      }))
    )))