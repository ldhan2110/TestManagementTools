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
        testcase_id: payload.testcase_id,
        attachment: payload.attachment
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
            payload: data?.result?.id
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
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/'+'/api/v1/removeissuefromexecution',{
      testexecution_id: payload.testexecution_id,
      issue_id: payload.issue_id
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

    export const deleteIssueFromExecEpic = (action$, state$) => action$.pipe(
      ofType(actions.DELETE_ISSUE_FROM_EXEC_REQ),
      mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/api/v1/removeissuefromexecution',{
        testexecution_id: payload.testexecution_id,
        issue_id: payload.issue_id
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
              type: actions.DELETE_ISSUE_FROM_EXEC_SUCCESS,
              payload: true
            })
          } else {
            return ({
              type: actions.DELETE_ISSUE_FROM_EXEC_FAILED,
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
          type: actions.DELETE_ISSUE_FROM_EXEC_FAILED,
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
    
      export  const addIssueToExecEpic = (action$, state$) => action$.pipe(
        ofType(actions.ADD_ISSUE_REQ),
        mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/api/v1/addissuetoexecution',{
            testexecution_id: payload.testexecution_id,
            issue_id: payload.issue_id,
            url: payload.url
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
                type: actions.ADD_ISSUE_SUCCESS,
                payload: true
              })
            } else {
              return ({
                type: actions.ADD_ISSUE_FAILED,
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
            type: actions.ADD_ISSUE_FAILED,
            payload: error.response.data.errMsg
          })})
        )))

          
// MANTIS

// GET INFO MANTIS
export  const getInfoMantisEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_INFO_MANTIS_REQ),
  mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+payload+'/api/mantis/getinformationmantis',{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      if (data.success) {
        return ({
          type: actions.GET_INFO_MANTIS_SUCCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.GET_INFO_MANTIS_FAILED,
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
      type: actions.GET_INFO_MANTIS_FAILED,
      payload: error.response.data.errMsg
    })})
  )))

  // GET ALL MANTIS OF PROJECT
  export  const getAllMantisOfProjectEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_MANTIS_OF_PROJECT_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+payload+'/api/mantis/getallmantis',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_ALL_MANTIS_OF_PROJECT_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_ALL_MANTIS_OF_PROJECT_FAILED,
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
        type: actions.GET_ALL_MANTIS_OF_PROJECT_FAILED,
        payload: error.response.data.errMsg
      })})
    )))


    // GET ALL CONNECTED MANTIS OF PROJECT
  export  const getAllConnectedMantisEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_CONNECTED_MANTIS_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+payload+'/api/v1/getallmantisofproject',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_ALL_CONNECTED_MANTIS_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_ALL_CONNECTED_MANTIS_FAILED,
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
        type: actions.GET_ALL_CONNECTED_MANTIS_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

      // SWITCH CONNECTED MANTIS
    export  const switchConnectedMantisEpic = (action$, state$) => action$.pipe(
      ofType(actions.SWITCH_CONNECTED_MANTIS_REQ),
      mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/api/v1/swtichmantisofproject',{
          mantis_id: payload.mantis_id,
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
              type: actions.SWITCH_CONNECTED_MANTIS_SUCCESS,
              payload: true
            })
          } else {
            return ({
              type: actions.SWITCH_CONNECTED_MANTIS_FAILED,
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
          type: actions.SWITCH_CONNECTED_MANTIS_FAILED,
          payload: error.response.data.errMsg
        })})
      )))
  

    // CREATE NEW MANTIS
  export  const createNewMantisEpic = (action$, state$) => action$.pipe(
    ofType(actions.CREATE_NEW_MANTIS_REQ),
    mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/'+payload.projectid+'/api/createmantis',{
        url: payload.url,
        token: payload.apikey,
        project: payload.mantisname
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
            type: actions.CREATE_NEW_MANTIS_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.CREATE_NEW_MANTIS_FAILED,
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
        type: actions.CREATE_NEW_MANTIS_FAILED,
        payload: error.response.data.errMsg
      })})
    )))
      // CREATE AND SWITCH MANTIS
    export  const createAndSwitchMantisEpic = (action$, state$) => action$.pipe(
      ofType(actions.CREATE_AND_SWITCH_MANTIS_REQ),
      mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/'+payload.projectid+'/api/createandswitchmantis',{
          url: payload.url,
          token: payload.apikey,
          project: payload.mantisname
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
              type: actions.CREATE_AND_SWITCH_MANTIS_SUCCESS,
              payload: true
            })
          } else {
            return ({
              type: actions.CREATE_AND_SWITCH_MANTIS_FAILED,
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
          type: actions.CREATE_AND_SWITCH_MANTIS_FAILED,
          payload: error.response.data.errMsg
        })})
      )))

        // SWITCH MANTIS
      export  const switchMantisEpic = (action$, state$) => action$.pipe(
        ofType(actions.SWITCH_MANTIS_REQ),
        mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/api/mantis/swtichmantis',{
            mantis_id: payload.mantisid,
            mantis_name: payload.mantisname,
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
                type: actions.SWITCH_MANTIS_SUCCESS,
                payload: true
              })
            } else {
              return ({
                type: actions.SWITCH_MANTIS_FAILED,
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
            type: actions.SWITCH_MANTIS_FAILED,
            payload: error.response.data.errMsg
          })})
        )))

        // CHANGE API
        export  const changeAPIKeyEpic = (action$, state$) => action$.pipe(
          ofType(actions.CHANGE_API_KEY_REQ),
          mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/api/mantis/changetoken',{
              token: payload.apikey
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
                  type: actions.CHANGE_API_KEY_SUCCESS,
                  payload: true
                })
              } else {
                return ({
                  type: actions.CHANGE_API_KEY_FAILED,
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
              type: actions.CHANGE_API_KEY_FAILED,
              payload: error.response.data.errMsg
            })})
          )))