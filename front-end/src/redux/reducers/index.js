import { combineReducers } from 'redux';

import themeReducer from '../theme/themeReducers';
import accountReducer from '../account/accountReducers';
import projectReducers from '../projects/projectReducers';
import testplanReducers from '../test-plan/testplanReducers';
import issueReducers from '../issue/issueReducers';
import requirementsReducers from '../requirements/requirementsReducers';
import messageReducers from '../message/messageReducers';
import testcaseReducers from '../test-case/testcaseReducers';
import buildReducers from '../build-release/buildReducers';
import milestoneReducers from '../milestones/milestoneReducers';
import userReducers from '../users/userReducers';
import testexecReducers from '../test-execution/testexecReducers';
import dashboardReducers from '../dashboard/dashboardReducers';
import notificationReducers from '../notification/notificationReducers';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const projectConfig = {
	key: 'project',
	storage,
}

const appReducer = combineReducers({
	themeReducer,
	dashboard: dashboardReducers,
	account: accountReducer,
  	project: persistReducer(projectConfig,projectReducers),
  	testplan: testplanReducers,
	issue: issueReducers,
	requirements: requirementsReducers,
	message: messageReducers,
	testcase: testcaseReducers,
	testexec:testexecReducers,
	build: buildReducers,
	milestone: milestoneReducers,
	user: userReducers,
	notification: notificationReducers,
});

export default (state, action) => {
	if (action.type === 'LOGOUT_REQ') {
	  storage.removeItem('persist:project');
	  localStorage.clear();
	  return appReducer(undefined, action);
	}
  
	return appReducer(state, action)
  }
