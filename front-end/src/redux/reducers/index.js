import { combineReducers } from 'redux';

import themeReducer from '../theme/themeReducers';
import accountReducer from '../account/accountReducers';
import projectReducers from '../projects/projectReducers';
import testplanReducers from '../test-plan/testplanReducers';
import messageReducers from '../message/messageReducers';
import testcaseReducers from '../test-case/testcaseReducers';
import buildReducers from '../build-release/buildReducers';
import milestoneReducers from '../milestones/milestoneReducers';
import userReducers from '../users/userReducers';
import testexecReducers from '../test-execution/testexecReducers';
import dashboardReducers from '../dashboard/dashboardReducers';

export default combineReducers({
	themeReducer,
	dashboard: dashboardReducers,
	account: accountReducer,
  project: projectReducers,
  testplan: testplanReducers,
	message: messageReducers,
	testcase: testcaseReducers,
	testexec:testexecReducers,
	build: buildReducers,
	milestone: milestoneReducers,
	user: userReducers
});
