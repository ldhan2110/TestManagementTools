import { combineReducers } from 'redux';

import themeReducer from '../theme/themeReducers';
import accountReducer from '../account/accountReducers';
import projectReducers from '../projects/projectReducers';
import testplanReducers from '../test-plan/testplanReducers';
import messageReducers from '../message/messageReducers';
import testcaseReducers from '../test-case/testcaseReducers';

export default combineReducers({
	themeReducer,
	account: accountReducer,
  project: projectReducers,
  testplan: testplanReducers,
	message: messageReducers,
	testcase: testcaseReducers
});
