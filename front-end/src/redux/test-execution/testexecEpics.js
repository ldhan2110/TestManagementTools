import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, filter,catchError} from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';

//get all test case
export  const getAllTestexecEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_ALL_TESTEXEC_REQ),
  mergeMap(() =>  from(axios.get(API_ADDR+'/'+localStorage.getItem("selectProject")+'/api/getalltestexecutionofproject',{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_ALL_TESTEXEC_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_ALL_TESTEXEC_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error => of({
      type: actions.GET_ALL_TESTEXEC_FAILED,
      payload: error.response.data.errMsg
    }))
  )))




  //ADD A NEW TEST EXECUTION
export  const addNewTestexecEpic = (action$, state$) => action$.pipe(
  ofType(actions.ADD_TESTEXEC_REQ),
  mergeMap(() =>  from(axios.post(API_ADDR+'/'+localStorage.getItem("selectProject")+'/api/createtestexecution',{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.ADD_TESTEXEC_SUCCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.ADD_TESTEXEC_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error => of({
      type: actions.ADD_TESTEXEC_FAILED,
      payload: error.response.data.errMsg
    }))
  )))