import * as types from './constants';

var initialState = {
  content: '',
  type: '',
  isOpen: false
}

const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    
    case types.DISPLAY_MESSAGE:
      return {
          content: payload.content,
          type: payload.type,
          isOpen: true
      };

    case types.RESET_MESSAGE:
      return initialState;
    

    default:
      return state
  }
}

export default reducer;