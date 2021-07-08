import * as types from './constants';

export function uploadImage(value){
  return{
    type: types.UPLOAD_IMAGE_REQ,
    payload: value
  }
}