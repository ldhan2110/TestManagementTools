import * as types from './constants';

var initialState = {
  error: "",
  errorMsg:"",
  currentSelectedMilestone: "",
  insMilestones: {
    sucess: null,
    errMsg: null
  },
  listMilestones: [],
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //LOGIN
    case types.GET_ALL_MILESTONES_REQ:
      return {
        ...state, listMilestones: []
      }

    case types.GET_ALL_MILESTONES_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_MILESTONES_SUCCESS:
        return {
          error: "",
          errorMsg:"",
          currentSelectedMilestone: "",
          insMilestones: [],
          listMilestones: payload,
        }
    
    case types.ADD_NEW_MILESTONE_REQ:{      
      return {
        ...state,
        insMilestones: initialState.insMilestones
      };
    }

    case types.ADD_NEW_MILESTONE_SUCCESS:{
      return {
        ...state,
        insMilestones: {
          sucess: true,
          errMsg: null
        }
      }
    }

    case types.ADD_NEW_MILESTONE_FAILED: {
      return{
        ...state,
        insMilestones:{
          sucess: false,
          errMsg: payload
        }
      }    
    }

    
    case types.SELECT_MILESTONE:
      localStorage.setItem("selectMilestone",actions.value); 
      return {
        ...state,
        currentSelectedMilestone: actions.value
      }

    
  case types.UPDATE_MILESTONE_REQ:{      
    return {
      ...state,
      insMilestones: initialState.insMilestones
    };
  }

  case types.UPDATE_MILESTONE_SUCCESS:{
    return {
      ...state,
      insMilestones: {
        sucess: true,
        errMsg: null
      }
    }
  }

  case types.UPDATE_MILESTONE_FAILED: {
    return{
      ...state,
      insMilestones:{
        sucess: false,
        errMsg: payload
      }
    }    
  }


  case types.DELETE_MILESTONE_REQ:{      
    return {
      ...state,
      insMilestones: initialState.insMilestones
    };
  }

  case types.DELETE_MILESTONE_SUCCESS:{
    return {
      ...state,
      insMilestones: {
        sucess: true,
        errMsg: null
      }
    }
  }

  case types.DELETE_MILESTONE_FAILED: {
    return{
      ...state,
      insMilestones:{
        sucess: false,
        errMsg: payload
      }
    }    
  }

  case types.GET_MILESTONE_BYID_REQ:
      return {
        ...state, listMilestones: []
      }

    case types.GET_MILESTONE_BYID_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_MILESTONE_BYID_SUCCESS:
        return {
          error: "",
          errorMsg:"",
          currentSelectedMilestone: "",
          insMilestones: [],
          listMilestones: payload,
        }

    default:
      return state

    
  }
}

export default reducer;