import * as types from './constants';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

var initialState = {
  success:"",
  error: "",
  errorMsg:"",
  accountInfo: {
    username:  "",
    password: localStorage.getItem("password") || "",
    isKeepedLogin: false,
    showPassword: false,
    isLogin: localStorage.getItem("isLogin") ? true : false
  }
}

const persistConfig = {
  key: 'account',
  storage: storage,
};


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  console.log(payload);

  switch (actions.type) {

    //LOGIN
    case types.LOGIN_REQ:
      return {
        ...state,
        accountInfo: actions.payload
      }

    case types.LOGIN_SUCESS:
      return {
        ...state,
        accountInfo:{
          username:"hayateazuma23",
          password:"fdsa",
          isKeepedLogin: false,
          showPassword: false,
          isLogin: true
        }
      }
    
    case types.LOGIN_FAILED:
      return {
        ...state,
        accountInfo: {
          username:"My Name is An",
          password:"dsadsadasd",
          isKeepedLogin: false,
          showPassword: false,
          isLogin: false
        }
      }

    case types.LOGOUT_REQ:
      return {
        ...state
      }

    case types.LOGOUT_SUCESS:
      return{
        ...state,
        accountInfo:{
          ...state.accountInfo,
          isLogin: payload.isLogin,
        }
      }
    
    
    default:
      return state
  }
}

export default persistReducer(persistConfig, reducer);