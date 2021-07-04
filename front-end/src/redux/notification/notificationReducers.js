import * as types from './constants';

var initialState = {
  success: "",
  error: "",
  errorMsg:"",
  currentSelectedNotification: "",

  insNotifications: {
    sucess: null,
    errMsg: null
  },

  insNotificationsDelete: {
    sucess: null,
    errMsg: null
  },
  listNotifications: [],
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_NOTIFICATIONS_REQ:
      return {
        ...state, listNotifications: []
    }

    case types.GET_ALL_NOTIFICATIONS_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
    }
    
    case types.GET_ALL_NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          listNotifications: payload,
          success: true
    }
    
    case types.ADD_NEW_NOTIFICATION_REQ:{      
      return {
        ...state,
        insNotifications: initialState.insNotifications
      };
    }

    case types.ADD_NEW_NOTIFICATION_SUCCESS:{
      return {
        ...state,
        insNotifications: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.ADD_NEW_NOTIFICATION_FAILED: {
      return{
        ...state,
        insNotifications:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_ADD_NEW_NOTIFICATION:{
      return {
        ...state,
        insNotifications: {
          sucess: null,
          errMsg: null
        }
      }
    }
    
    case types.SELECT_NOTIFICATION:
      localStorage.setItem("selectNotification",actions.value); 
      return {
        ...state,
        currentSelectedNotification: actions.value
    }

    
    case types.UPDATE_NOTIFICATION_REQ:{      
      return {
        ...state,
        insNotifications: initialState.insNotifications
      };
    }

    case types.UPDATE_NOTIFICATION_SUCCESS:{
      return {
        ...state,
        insNotifications: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.UPDATE_NOTIFICATION_FAILED: {
      return{
        ...state,
        insNotifications:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_UPDATE_NOTIFICATION:{
      return {
        ...state,
        insNotifications: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.DELETE_NOTIFICATION_REQ:{      
      return {
        ...state,
        insNotificationsDelete: initialState.insNotificationsDelete
      };
    }

    case types.DELETE_NOTIFICATION_SUCCESS:{
      return {
        ...state,
        insNotificationsDelete: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.DELETE_NOTIFICATION_FAILED: {
      return{
        ...state,
        insNotificationsDelete:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    case types.RESET_DELETE_NOTIFICATION:{
      return {
        ...state,
        insNotificationsDelete: {
          sucess: null,
          errMsg: null
        }
      }
    }

    case types.GET_NOTIFICATION_BYID_REQ:
        return {
          ...state, listNotifications: []
    }

    case types.GET_NOTIFICATION_BYID_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
    }
    
    case types.GET_NOTIFICATION_BYID_SUCCESS:
        return {
          ...state,
          listNotifications: payload,
    }

    default:
      return state

    
  }
}

export default reducer;