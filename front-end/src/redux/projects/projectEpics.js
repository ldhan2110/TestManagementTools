import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, filter,catchError} from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

export  const getAllProjectEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_ALL_PROJECTS_REQ),
  mergeMap(({ payload }) =>  from(axios.get(API_ADDR+'/project/inproject',{
      headers: {
        "X-Auth-Token": localStorage.getItem('token'),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      console.log(data);
      if (data.success) {
        return ({
          type: actions.GET_ALL_PROJECTS_SUCESS,
          payload: []
        })
      } else {
        return ({
          type: actions.GET_ALL_PROJECTS_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error => console.log(error))
  )
  ))