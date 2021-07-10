import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError, } from 'rxjs/operators';
import { //Observable,
  from, of} from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';

// POST IMAGE
export  const uploadImageEpic = (action$, state$) => action$.pipe(
  ofType(actions.UPLOAD_IMAGE_REQ),
  mergeMap(({ payload  }) =>  from(axios.post("https://api.cloudinary.com/v1_1/testcontrol/image/upload", payload))
  .pipe(
    map(response => {
      const {data} = response;
      return ({
          type: actions.UPLOAD_IMAGE_SUCCESS,
          payload: data
        })      
      }),
    catchError (error => {
      const {status} = error;    
    return of({
      type: actions.UPLOAD_IMAGE_FAILED,
      payload: error
    })})
  )))



/* 
  .then(res => { return({
    type: actions.UPLOAD_IMAGE_SUCCESS,
    payload: res.data.secure_url    
    })})
    .catch(err => {return of({
      type: actions.UPLOAD_IMAGE_FAILED,
      payload: err
    })})    
  )) */