import { ajax } from 'rxjs/ajax';
import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, filter} from 'rxjs/operators'


const temp_account = {
  username: "hayateazuma23",
  password: "I am an idiot"
};


//  export const loginReqEpic = (action$, state$) => action$.pipe(
//   ofType(actions.LOGIN_REQ),
//   mergeMap(({ payload }) => ajax.getJSON(`/api/users/${payload}`).pipe(
//     map(response => ({
//       type: actions.LOGIN_REQ,
//       payload: temp_account
//     }))
//   )
// ));

//LOGIN EPIC
 export const loginReqEpic = (action$, state$) => action$.pipe(
  ofType(actions.LOGIN_REQ),
  map(()=>({
      type: actions.LOGIN_SUCESS,
      payload: temp_account
    }))
 );

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