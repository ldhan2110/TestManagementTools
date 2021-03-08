import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, filter,catchError, } from 'rxjs/operators';
import { Observable, from, throwError} from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';

const temp_account = {
  username: "hayateazuma23",
  password: "I am an idiot",
  isLogin: "true"
};


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
          payload: temp_account
        })
      } else {
        return ({
          type: actions.LOGIN_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error =>  console.log(error.response))
  )
  ))


  //REGISTER
  export  const registerReqEpic = (action$, state$) => action$.pipe(
    ofType(actions.REGISTER_REQ),
    mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/users',payload)).pipe(
      map(response => {
        const {data} = response;
        const {token} = data.result;
        localStorage.setItem("token",token);
        if (data.success) {
          return ({
            type: actions.REGISTER_SUCCESS,
            payload: temp_account
          })
        } else {
          return ({
            type: actions.REGISTER_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error =>  console.log(error.response))
    )
    ))
    


 //LOGOUT EPIC
 export const logoutReqEpic = (action$, state$) => action$.pipe(
  ofType(actions.LOGOUT_REQ),
  map(()=>({
      type: actions.LOGOUT_SUCESS,
      payload: {
        isLogin: false
      }
    }))
 );