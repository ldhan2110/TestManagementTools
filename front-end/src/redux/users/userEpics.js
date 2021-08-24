import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError} from 'rxjs/operators';
import { //Observable, 
  from, of } from 'rxjs';
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
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.GET_ALL_USERS_FAILED,
        payload: error.response
      })})
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
        catchError (error => {
          const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
          type: actions.GET_ALL_USERS_OF_PROJECT_FAILED,
          payload: error.response
        })})
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
        catchError (error => {
          const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
          type: actions.ADD_USERS_TO_PROJECT_FAILED,
          payload: error.response.data.errMsg
        })})
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
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.DELETE_USER_OF_PROJECT_FAILED,
        payload:  error.response.data.errMsg
      })})
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
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.ADD_NEW_USER_FAILED,
        payload: error.response.data.errMsg
      })})
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
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.GET_USER_BYID_FAILED,
        payload: error.response
      })})
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
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.UPDATE_USER_FAILED,
        payload: error.response.data.errMsg
      })})
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
      catchError (error => {
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          window.location.replace('/login');
        } else
        return of({
        type: actions.DELETE_USER_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const updatePasswordEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_PASSWORD_REQ),
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/users/api/updatepassword',{
        Password: payload.password,
        ConfirmPassword: payload.confirmpassword
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
            type: actions.UPDATE_PASSWORD_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.UPDATE_PASSWORD_FAILED,
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
        type: actions.UPDATE_PASSWORD_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  export  const updateProfileEpic = (action$, state$) => action$.pipe(
    ofType(actions.UPDATE_PROFILE_REQ),
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/users/api/updateprofile',{
      fullname: payload.fullname,
      phonenumber: payload.phonenumber,
      introduction: payload.introduction
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
            type: actions.UPDATE_PROFILE_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.UPDATE_PROFILE_FAILED,
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
        type: actions.UPDATE_PROFILE_FAILED,
        payload: error.response.data.errMsg
      })})
    )))
  
  export  const getCurrentUserEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_CURRENT_USER_REQ),
    mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/users/api/getcurrentuser',{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json"
        }
      })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.GET_CURRENT_USER_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.GET_CURRENT_USER_FAILED,
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
        type: actions.GET_CURRENT_USER_FAILED,
        payload: error.response
      })})
    )))

    export  const verifyUserToProjectEpic = (action$, state$) => action$.pipe(
      ofType(actions.VERIFY_USERS_TO_PROJECT_REQ),
      mergeMap(({ payload  }) =>  from(axios.post(API_ADDR+'/project/members/verifymember/'+payload.projectid,{
        email: payload.email,
        role: payload.role
      },{
          headers: {
            "reset-token": payload.resettoken,
            "content-type": "application/json"
          }
        })).pipe(
        map(response => {
          const {data} = response;
          if (data.success) {
            return ({
              type: actions.VERIFY_USERS_TO_PROJECT_SUCCESS,
              payload: true
            })
          } else {
            return ({
              type: actions.VERIFY_USERS_TO_PROJECT_FAILED,
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
          type: actions.VERIFY_USERS_TO_PROJECT_FAILED,
          payload: error.response.data.errMsg
        })})
      )))

      export  const updateAvatarEpic = (action$, state$) => action$.pipe(
        ofType(actions.UPDATE_AVATAR_REQ),
        mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/users/api/uploadavatar',{
          avatar: payload
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
                type: actions.UPDATE_AVATAR_SUCCESS,
                payload: true
              })
            } else {
              return ({
                type: actions.UPDATE_AVATAR_FAILED,
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
            type: actions.UPDATE_AVATAR_FAILED,
            payload: error.response.data.errMsg
          })})
        )))

        export  const getAllMemberMantisEpic = (action$, state$) => action$.pipe(
          ofType(actions.GET_ALL_MEMBERMANTIS_REQ),
          mergeMap(({ payload  }) =>  from(axios.get(API_ADDR+'/'+payload+'/api/getallmembermantis',{
              headers: {
                "X-Auth-Token": localStorage.getItem("token"),
                "content-type": "application/json"
              }
            })).pipe(
            map(response => {
              const {data} = response;
              if (data.success) { 
               // console.log(JSON.stringify(data.result,null,' '))
                return ({
                  type: actions.GET_ALL_MEMBERMANTIS_SUCCESS,
                  payload: data.result.members
                })
              } else {
                return ({
                  type: actions.GET_ALL_MEMBERMANTIS_FAILED,
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
              type: actions.GET_ALL_MEMBERMANTIS_FAILED,
              payload: error.response.data.errMsg
            })})
          )))

          export  const addMemberMantisEpic = (action$, state$) => action$.pipe(
            ofType(actions.ADD_MEMBERMANTIS_REQ),
            mergeMap(({ payload  }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/api/mantis/addmembermantis',{
              username: payload.username,
              email: payload.email,
              access_level: payload.access_level,
              projectid: payload.projectid,
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
                    type: actions.ADD_MEMBERMANTIS_SUCCESS,
                    payload: true
                  })
                } else {
                  return ({
                    type: actions.ADD_MEMBERMANTIS_FAILED,
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
                type: actions.ADD_MEMBERMANTIS_FAILED,
                payload: error.response.data.errMsg
              })})
            )))
      
        export  const deleteMemberMantisEpic = (action$, state$) => action$.pipe(
          ofType(actions.DELETE_MEMBERMANTIS_REQ),
          mergeMap(({ payload  }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/api/mantis/removemembermantis',{
            username: payload.username,
              email: payload.email,
              access_level: payload.access_level,
              projectid: payload.projectid,  
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
                  type: actions.DELETE_MEMBERMANTIS_SUCCESS,
                  payload: true
                })
              } else {
                return ({
                  type: actions.DELETE_MEMBERMANTIS_FAILED,
                  payload:  data.errMsg
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
              type: actions.DELETE_MEMBERMANTIS_FAILED,
              payload:  error.response.data.errMsg
            })})
          )))
          

          export  const changeRoleMemberMantisEpic = (action$, state$) => action$.pipe(
            ofType(actions.CHANGE_ROLE_MEMBER_MANTIS_REQ),
            mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/'+payload.projectid+'/api/v1/changerolemembermantis',{
                email: payload.email,
                role: payload.role_mantis
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
                    type: actions.CHANGE_ROLE_MEMBER_MANTIS_SUCCESS,
                    payload: true
                  })
                } else {
                  return ({
                    type: actions.CHANGE_ROLE_MEMBER_MANTIS_FAILED,
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
                type: actions.CHANGE_ROLE_MEMBER_MANTIS_FAILED,
                payload: error.response.data.errMsg
              })})
            )))