import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError} from 'rxjs/operators';
import { //Observable, 
  from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';

//get all test case
export  const getAllTestcaseEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_ALL_TESTCASE_REQ),
  mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+localStorage.getItem("selectProject")+'/api/getalltestsuite',{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_ALL_TESTCASE_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_ALL_TESTCASE_FAILED,
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
      type: actions.GET_ALL_TESTCASE_FAILED,
      payload: error.response.data.errMsg
    })})
  )))

//get all test suite
export  const getAllTestsuiteEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_ALL_TESTSUITE_REQ),
  mergeMap(() =>  from(axios.get(API_ADDR+'/'+localStorage.getItem("selectProject")+'/api/getalltestsuiteonlyname',{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_ALL_TESTSUITE_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_ALL_TESTSUITE_FAILED,
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
      type: actions.GET_ALL_TESTSUITE_FAILED,
      payload: error.response.data.errMsg
    })})
  )))


  //add test suite
  export const addTestSuiteEpic = (action$, state$) => action$.pipe(
    ofType(actions.ADD_TEST_SUITE_REQ),
    mergeMap(({ payload  }) =>  from(axios.post(API_ADDR+'/'+localStorage.getItem("selectProject")+'/api/create_testsuite',payload,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.ADD_TEST_SUITE_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.ADD_TEST_SUITE_FAILED,
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
        type: actions.ADD_TEST_SUITE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

    //ADD TEST CASE
  export const addTestCaseEpic = (action$, state$) => action$.pipe(
    ofType(actions.ADD_TEST_CASE_REQ),
    mergeMap(({ payload  }) =>  from(axios.post(API_ADDR+'/'+localStorage.getItem("selectProject")+'/api/addteststep',payload,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.ADD_TEST_CASE_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.ADD_TEST_CASE_FAILED,
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
        type: actions.ADD_TEST_CASE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const getAllTestcaseNoTreeEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_TESTSUITE_NO_TREE_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+localStorage.getItem("selectProject")+'/api/getalltestsuitenotree',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_ALL_TESTSUITE_NO_TREE_SUCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_ALL_TESTSUITE_NO_TREE_FAILED,
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
        type: actions.GET_ALL_TESTSUITE_NO_TREE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export const updateTestCaseEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_TESTCASE_REQ),
    mergeMap(({ payload  }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/'+payload.testcaseid+'/api/updatetestcase',{
      testcaseName: payload.testcasename,
      description: payload.description,
      testsuite: payload.testsuite,
      priority: payload.priority,
      precondition: payload.precondition,
      postcondition: payload.postcondition,
      requirement: payload.requirement._id,
      listStep: payload.listStep
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
            type: actions.UPDATE_TESTCASE_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.UPDATE_TESTCASE_FAILED,
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
        type: actions.UPDATE_TESTCASE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const deleteTestcaseEpic = (action$, state$) => action$.pipe(
    ofType(actions.DELETE_TESTCASE_REQ),
    mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+'/'+payload.projectid+'/'+payload.testcaseid+'/api/deletetestcaseofproject',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"), 
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.DELETE_TESTCASE_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.DELETE_TESTCASE_FAILED,
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
        type: actions.DELETE_TESTCASE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export const getListTestcaseSelectEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_LIST_TESTCASE_SELECT_REQ),
    mergeMap(({ payload  }) =>  from(axios.post(API_ADDR+'/'+payload.projectid+'/api/get_list_testcase',{
      listselect: payload
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
            type: actions.GET_LIST_TESTCASE_SELECT_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_LIST_TESTCASE_SELECT_FAILED,
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
        type: actions.GET_LIST_TESTCASE_SELECT_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export const updateTestSuiteEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_TESTSUITE_REQ),
    mergeMap(({ payload  }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/'+payload._id+'/api/updatetestsuite',{
      testsuitename: payload.name,
      description: payload.description,
      priority: payload.priority,
      parent: payload.parent
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
            type: actions.UPDATE_TESTSUITE_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.UPDATE_TESTSUITE_FAILED,
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
        type: actions.UPDATE_TESTSUITE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const deleteTestsuiteEpic = (action$, state$) => action$.pipe(
    ofType(actions.DELETE_TESTSUITE_REQ),
    mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+'/'+payload.projectid+'/'+payload._id+'/api/deletetestsuitefromproject',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"), 
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.DELETE_TESTSUITE_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.DELETE_TESTSUITE_FAILED,
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
        type: actions.DELETE_TESTSUITE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  //search testcase
  export const searchTestCaseEpic = (action$, state$) => action$.pipe(
    ofType(actions.SEARCH_TESTCASE_REQ),
    mergeMap(({ payload  }) =>  from(axios.post(API_ADDR+'/'+localStorage.getItem("selectProject")+'/api/searchtestcase',{
      testcasename: payload.testcasename,
      testsuite: payload.testsuite,
      important: payload.priority
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
            type: actions.SEARCH_TESTCASE_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.SEARCH_TESTCASE_FAILED,
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
        type: actions.SEARCH_TESTCASE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))


      //UPLOAD TEST CASE
  export const uploadTestCaseEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPLOAD_TESTCASE_REQ),
    mergeMap(({ payload  }) =>  from(axios.post(API_ADDR+'/'+localStorage.getItem("selectProject")+'/api/importtestcase',payload,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.UPLOAD_TESTCASE_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.UPLOAD_TESTCASE_FAILED,
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
        type: actions.UPLOAD_TESTCASE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))