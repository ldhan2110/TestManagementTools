import * as types from './constants';
import storage from 'redux-persist/lib/storage';
//import { persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

const initialState = {
  success:"",
  isRegister: "",
  error: "",
  errorMsg:"",
  isConfirmPassword:{
    sucess: null,
    errMsg: null
  },
  isSendMail:{
    sucess: null,
    errMsg: null
  },
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
        ...state,
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
        ...state,
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
        ...state,
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
        ...state,
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
        ...state,
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
        ...state,
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
        ...state,
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
 
    case types.SEND_MAIL_RESET_PASSWORD_REQ:{      
      return {
        ...state,
        isSendMail: initialState.isSendMail
      };
    }

    case types.SEND_MAIL_RESET_PASSWORD_SUCCESS:{
      return {
        ...state,
        isSendMail: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.SEND_MAIL_RESET_PASSWORD_FAILED: {
      return{
        ...state,
        isSendMail:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_SEND_MAIL_RESET_PASSWORD:{
      return {
        ...state,
        isSendMail: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.CONFIRM_RESET_PASSWORD_REQ:{      
      return {
        ...state,
        isConfirmPassword: initialState.isConfirmPassword
      };
    }

    case types.CONFIRM_RESET_PASSWORD_SUCCESS:{
      return {
        ...state,
        isConfirmPassword: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.CONFIRM_RESET_PASSWORD_FAILED: {
      return{
        ...state,
        isConfirmPassword:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_CONFIRM_RESET_PASSWORD:{
      return {
        ...state,
        isConfirmPassword: {
          sucess: null,
          errMsg: null
        }
      }
    }
    
    default:
      return state
  }
}

export default  reducer;

