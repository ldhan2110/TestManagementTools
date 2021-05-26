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

    default: 
        return initialState;
    }
}

export default reducer;