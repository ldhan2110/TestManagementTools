import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, filter,catchError} from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';

const temp_account = {
  username: "hayateazuma23",
  password: "I am an idiot",
  isLogin: "true"
};
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';



 export  const loginReqEpic = (action$, state$) => action$.pipe(
  ofType(actions.LOGIN_REQ),
  mergeMap(({ payload }) =>  from(axios.post(API_ADDR+'/api/auth',payload)).pipe(
    map(response => {
      const {data} = response;
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
    catchError (error => console.log(error))
  )
  ))
  
  

//LOGIN EPIC
//  export const loginReqEpic = (action$, state$) => action$.pipe(
//   ofType(actions.LOGIN_REQ),
//   map(()=>({
//       type: actions.LOGIN_SUCESS,
//       payload: temp_account
//     }))
//  );

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