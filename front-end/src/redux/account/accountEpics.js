import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError, } from 'rxjs/operators';
import { //Observable, 
  from, of} from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';


//LOGIN
export  const loginReqEpic = (action$, state$) => action$.pipe(
  ofType(actions.LOGIN_REQ),
  mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/login',payload)).pipe(
    map(response => {
      const {data} = response;
      const {token} = data.result;
      localStorage.setItem("token",token);
      if (data.success) {
        return ({
          type: actions.LOGIN_SUCESS,
          payload: data.result
        })
      } else {
        return ({
          type: actions.LOGIN_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error =>  of({
      type: actions.LOGIN_FAILED,
      payload: error.response.data.errMsg
    }))
  )
  ))


  //REGISTER
  export  const registerReqEpic = (action$, state$) => action$.pipe(
    ofType(actions.REGISTER_REQ),
    mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/users',payload)).pipe(
      map(response => {
        const {data} = response;
        const {token} = data.result;
       
        if (data.success) {
          return ({
            type: actions.REGISTER_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.REGISTER_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error =>  of({
        type: actions.REGISTER_FAILED,
        payload: error.response.data.errMsg
      }))
    )
    ))
    
 //LOGOUT EPIC
  export const logoutReqEpic = (action$, state$) => action$.pipe(
    ofType(actions.LOGOUT_REQ),
    map(()=>{
      localStorage.clear();
      return ({
        type: actions.LOGOUT_SUCESS,
        payload: {
          isLogin: false
        }
      })})
  );

  export  const sendMailResetPasswordReqEpic = (action$, state$) => action$.pipe(
      ofType(actions.SEND_MAIL_RESET_PASSWORD_REQ),
      mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/users/forgotpassword',{
        email: payload.email
      } , {
          headers: {
            "content-type": "application/json"
          }
        })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.SEND_MAIL_RESET_PASSWORD_SUCCESS,
            payload: true
          })
        } else {
          return ({
            type: actions.SEND_MAIL_RESET_PASSWORD_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error =>  of({
        type: actions.SEND_MAIL_RESET_PASSWORD_FAILED,
        payload: error.response.data.errMsg
      }))
    )
    ))

  export  const confirmResetPasswordReqEpic = (action$, state$) => action$.pipe(
    ofType(actions.CONFIRM_RESET_PASSWORD_REQ),
    mergeMap(({ payload }) =>  from(axios.put(API_ADDR+'/users/api/resetpassword',{
      newpassword: payload.password,
      confirmnewpassword: payload.confirmPassword
    }, {
      headers: {
        "reset-token": payload.resettoken,
        "content-type": "application/json"
      }
    })).pipe(
      map(response => {
        const {data} = response;
        if (data.success) {
          return ({
            type: actions.CONFIRM_RESET_PASSWORD_SUCCESS,
            payload: data.result
          })
        } else {
          return ({
            type: actions.CONFIRM_RESET_PASSWORD_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error =>  of({
        type: actions.CONFIRM_RESET_PASSWORD_FAILED,
        payload: error.response.data.errMsg
      }))
    )
    ))