import { combineReducers } from 'redux';

import themeReducer from '../theme/themeReducers';
import accountReducer from '../account/accountReducers';
import projectReducers from '../projects/projectReducers';
import messageReducers from '../message/messageReducers';

export default combineReducers({
	themeReducer,
	account: accountReducer,
  project: projectReducers,
	message: messageReducers
});
