import * as types from './constants';

var initialState = {
  efforts: {
    sucess: null,
    errMsg: null,
    data: null
  },

  execOverview:{
    sucess: null,
    errMsg: null,
    data: null
  },

  sixExecution:{
    sucess: null,
    errMsg: null,
    data: null
  },

  multiChart:{
    sucess: null,
    errMsg: null,
    data: null
  }
}

const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //EFFORT
    case types.GET_EFFORT_REQ:
      return {
        ...state,
      }

    case types.GET_EFFORT_FAILED:
        return {
          ...state,
          efforts: {
            sucess: false,
            errMsg: payload,
            data: null
          },
        }

    case types.GET_EFFORT_SUCESS:
          return {
            ...state,
            efforts: {
              sucess: true,
              errMsg: null,
              data: payload
            },
          }

    //OVERVIEW EXEC
    case types.GET_EXEC_OVERVIEW_REQ:
      return {
        ...state,
      }

    case types.GET_EXEC_OVERVIEW_FAILED:
        return {
          ...state,
          execOverview: {
            sucess: false,
            errMsg: payload,
            data: null
          },
        }

    case types.GET_EXEC_OVERVIEW_SUCESS:
          return {
            ...state,
            execOverview: {
              sucess: true,
              errMsg: null,
              data: payload
            },
          }
    
    //OVERVIEW EXEC
    case types.GET_MULTI_CHART_REQ:
      return {
        ...state,
      }

    case types.GET_MULTI_CHART_FAILED:
        return {
          ...state,
          multiChart: {
            sucess: false,
            errMsg: payload,
            data: null
          },
        }

    case types.GET_MULTI_CHART_SUCESS:
          return {
            ...state,
            multiChart: {
              sucess: true,
              errMsg: null,
              data: payload
            },
          }

// SIX EXECUTION

    case types.GET_SIX_EXECUTION_REQ:
        return {
          ...state,
        }

    case types.GET_SIX_EXECUTION_FAILED:
        return {
          ...state,
          sixExecution: {
            sucess: false,
            errMsg: payload,
            data: null
          },
        }

    case types.GET_SIX_EXECUTION_SUCESS:
          return {
            ...state,
            sixExecution: {
              sucess: true,
              errMsg: null,
              data: payload
            },
          }

    default: 
        return state;
    }
}

export default reducer;