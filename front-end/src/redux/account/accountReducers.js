import * as types from './constants';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

const initialState = {
  success:"",
  error: "",
  errorMsg:"",
  accountInfo: {
    username:  "",
    fullName: "",
    email: "",
    isLogin: false
  }
}

const persistConfig = {
  key: 'account',
  storage: storage,
  stateReconciler: autoMergeLevel1 ,
};


const reducer = (state = initialState, actions) => {

  const {payload} = actions;


  switch (actions.type) {

    //LOGIN
    case types.LOGIN_REQ:
      return {
        success: false,
        error: false,
        errorMsg: "",
        accountInfo: {
          username:  payload.username,
          password:  "",
          fullName: "",
          email: "",
          isLogin: false
        }
      }

    case types.LOGIN_SUCESS:
      return {
        success: true,
        error: "",
        errorMsg: "",
        accountInfo: {
          username:  payload.username,
          fullName: payload.fullName,
          email: payload.email,
          isLogin: true
        }
      }
    
    case types.LOGIN_FAILED:
      return {
        success:"",
        error: true,
        errorMsg: payload,
        accountInfo: {
          username:  "",
          fullName: "",
          email: "",
          isLogin: false
        }
      }


    case types.REGISTER_REQ:
      return {
        success: "",
        error: "",
        errorMsg: "",
        accountInfo: {
          username:  "",
          fullName: "",
          email: "",
          isLogin: false
        }
      }

    case types.REGISTER_SUCCESS:
      return {
        success: true,
        error: "",
        errorMsg: "",
        accountInfo: {
          username:  "",
          fullName: "",
          email: "",
          isLogin: false
        }
      }

    case types.REGISTER_FAILED:
      return {
        success:"",
        error: true,
        errorMsg: payload,
        accountInfo: {
          username:  "",
          fullName: "",
          email: "",
          isLogin: false
        }
      }
    
    
    //LOGOUT
    case types.LOGOUT_REQ:
      return {
        ...state
      }

    case types.LOGOUT_SUCESS:
      return{
        success:"",
        error: "",
        errorMsg:"",
        accountInfo: {
          username:  "",
          fullName: "",
          email: "",
          isLogin: false
        }
      }
    
    
    default:
      return state
  }
}

export default  reducer;

