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
      payload: error.response
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
          console.log(data);
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
            console.log(data);
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
          payload: error.response
        }))
      )))