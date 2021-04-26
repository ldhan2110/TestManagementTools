import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, filter,catchError} from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
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
    catchError (error => of({
      type: actions.GET_ALL_TESTCASE_FAILED,
      payload: error.response.data.errMsg
    }))
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
    catchError (error => of({
      type: actions.GET_ALL_TESTSUITE_FAILED,
      payload: error.response.data.errMsg
    }))
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
      catchError (error => of({
        type: actions.ADD_TEST_SUITE_FAILED,
        payload: error.response.data.errMsg
      }))
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
        catchError (error => of({
          type: actions.ADD_TEST_CASE_FAILED,
          payload: error.response.data.errMsg
        }))
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
          catchError (error => of({
            type: actions.GET_ALL_TESTSUITE_NO_TREE_FAILED,
            payload: error.response.data.errMsg
          }))
        )))

        export const updateTestCaseEpic = (action$, state$) => action$.pipe(
          ofType(actions.UPDATE_TESTCASE_REQ),
          mergeMap(({ payload  }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/'+payload.testcaseid+'/api/updatetestcase',{
            testcaseName: payload.testcasename,
            description: payload.description,
            testsuite: payload.testsuite,
            priority: payload.priority,
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
            catchError (error => of({
              type: actions.UPDATE_TESTCASE_FAILED,
              payload: error.response.data.errMsg
            }))
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
                  console.log(data);
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
              catchError (error => of({
                type: actions.DELETE_TESTCASE_FAILED,
                payload: error.response.data.errMsg
              }))
            )))