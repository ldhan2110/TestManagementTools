import { combineReducers } from 'redux';

import themeReducer from '../theme/themeReducers';
import accountReducer from '../account/accountReducers';
import projectReducers from '../projects/projectReducers';
import testplanReducers from '../test-plan/testplanReducers';
import messageReducers from '../message/messageReducers';
import buildReducers from '../build-release/buildReducers';

export default combineReducers({
	themeReducer,
	account: accountReducer,
  project: projectReducers,
  testplan: testplanReducers,
	message: messageReducers,
	build: buildReducers,
});
