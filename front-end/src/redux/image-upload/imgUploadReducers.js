import * as types from './constants';

var initialState = {
  success: "",
  error: "",
  image:{}
}

const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    //EFFORT
    case types.UPLOAD_IMAGE_REQ:
      return {
        ...state,
      }

    case types.UPLOAD_IMAGE_FAILED:
        return {
          ...state,
          success: "",
          error: payload
        }

    case types.UPLOAD_IMAGE_SUCCESS:
          return {
            ...state,
            success: true,
            error: "",
            image: payload
          }

    case types.RESET_UPLOAD_IMAGE:
      return {
        initialState
      }
    
    default: 
        return state;
    }
}

export default reducer;