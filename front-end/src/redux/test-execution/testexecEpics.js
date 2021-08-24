import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError} from 'rxjs/operators';
import { //Observable, 
  from, of } from 'rxjs';
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
    catchError (error => {
      const {status} = error?.response?.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
      type: actions.GET_ALL_TESTEXEC_FAILED,
      payload: error.response.data.errMsg
    })})
  )))




  //ADD A NEW TEST EXECUTION
export  const addNewTestexecEpic = (action$, state$) => action$.pipe(
  ofType(actions.ADD_TESTEXEC_REQ),
  mergeMap(({payload}) =>  from(axios.post(API_ADDR+'/'+localStorage.getItem("selectProject")+'/api/createtestexecution',payload,{
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
    catchError (error => {
      const {status} = error.response.data;
      if (status ===  401) {
        localStorage.clear();
        window.location.replace('/login');
      } else
      return of({
      type: actions.ADD_TESTEXEC_FAILED,
      payload: error.response.data.errMsg
    })})
  )))




  //EXEC A TEST CASE IN TEST EXECUTION
export  const execTestcaseEpic = (action$, state$) => action$.pipe(
  ofType(actions.EXECUTE_TEST_CASE_REQ),
  mergeMap(({payload}) =>  from(axios.put(API_ADDR+'/'+localStorage.getItem("selectProject")+'/'+payload.testexecid+'/api/updatetestcaseexec',payload,{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.EXECUTE_TEST_CASE_SUCCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.EXECUTE_TEST_CASE_FAILED,
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
      type: actions.EXECUTE_TEST_CASE_FAILED,
      payload: error.response.data.errMsg
    })})
  )))




  //UPDATE TEST EXEC RESULT
  export  const updTestExecEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_TEST_EXEC_REQ),
    mergeMap(({payload}) =>  from(axios.put(API_ADDR+'/'+localStorage.getItem("selectProject")+'/'+payload.testexecid+'/api/updatetestexecution',payload,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.UPDATE_TEST_EXEC_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.UPDATE_TEST_EXEC_FAILED,
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
        type: actions.UPDATE_TEST_EXEC_FAILED,
        payload: error.response.data.errMsg
      })})
    )))



    //UPDATE TEST EXEC RESULT
  export  const delTestExecEpic = (action$, state$) => action$.pipe(
    ofType(actions.DELETE_TEST_EXEC_REQ),
    mergeMap(({payload}) =>  from(axios.delete(API_ADDR+'/'+localStorage.getItem("selectProject")+'/'+payload,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.DELETE_TEST_EXEC_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.DELETE_TEST_EXEC_FAILED,
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
        type: actions.DELETE_TEST_EXEC_FAILED,
        payload: error.response.data.errMsg
      })})
    )))




    //UPDATE TEST EXEC RESULT
  export  const updTestExecDetailEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_TEST_EXEC_DETAIL_REQ),
    mergeMap(({payload}) =>  from(axios.put(API_ADDR+'/'+localStorage.getItem("selectProject")+'/'+payload._id+'/api/updatedetailtestexecution',payload,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.UPDATE_TEST_EXEC_DETAIL_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.UPDATE_TEST_EXEC_DETAIL_FAILED,
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
        type: actions.UPDATE_TEST_EXEC_DETAIL_FAILED,
        payload: error.response.data.errMsg
      })})
    )))


