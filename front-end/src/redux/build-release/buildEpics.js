import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, filter,catchError} from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';


export  const getAllBuildEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_ALL_BUILD_REQ),
  mergeMap(({ payload  }) =>  from(axios.get(API_ADDR + '/api/build/' + payload,{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }      
    })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_ALL_BUILD_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_ALL_BUILD_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error => of({
      type: actions.GET_ALL_BUILD_FAILED,
      payload: error.response
    }))
  )))


  export  const addNewBuildEpic = (action$, state$) => action$.pipe(
    ofType(actions.ADD_NEW_BUILD_REQ),
    mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/api/build/'+payload.projectid,{
        buildname: payload.buildname,
        descriptions: payload.descriptions,
        isActive: payload.isActive,
        isOpen: payload.isOpen,
        releasedate: payload.releasedate
    },{
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