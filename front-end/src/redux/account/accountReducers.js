import * as types from './constants';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

const initialState = {
  success:"",
  isRegister: "",
  error: "",
  errorMsg:"",
  accountInfo: {
    username:  "",
    fullName: "",
    email: "",
    isLogin: localStorage.getItem('token') ? true : false
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
        isRegister: "",
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
        isRegister: "",
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
        isRegister: "",
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
        isRegister: "",
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
        isRegister: true,
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
        success:false,
        error: true,
        isRegister: false,
        errorMsg: payload,
        accountInfo: {
          username:  "",
          fullName: "",
          email: "",
          isLogin: false
        }
      }

      case types.RESET_REGISTER:
        return {
          success: null,
          error: "",
          isRegister: "",
          errorMsg: "",
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
        ...state,
        isRegister: ""
      }

    case types.LOGOUT_SUCESS:
      localStorage.clear();
      return{
        success:"",
        isRegister: "",
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

