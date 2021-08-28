import 'dotenv/config';

import App from './app';
import AuthRoute from '@modules/auth/auth.route';
import { IndexRoute } from '@modules/index';
import ProfileRoute from '@modules/profile/profile.route';
import UsersRoute from '@modules/users/user.route';
import { validateEnv } from '@core/utils';
import { ProjectRoute } from '@modules/project';
import { ProjectRequirementRoute } from '@modules/projectrequirement';
import { TestPlanRoute } from '@modules/testplan';
import { MilestoneRoute } from '@modules/milestone';
import { TestSuiteRoute } from '@modules/TestSuite';
import { BuildRoute } from '@modules/build';
import TestCaseRoute from '@modules/testcase/testcase.route';
import { TestExecutionRoute } from '@modules/testexecution';
import { NotificationRoute } from '@modules/notification';
import { MantisRoute } from '@modules/mantis';

validateEnv();

const routes = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProfileRoute(),
  new ProjectRoute(),
  new ProjectRequirementRoute(),
  new TestPlanRoute(),
  new MilestoneRoute(),
  new TestSuiteRoute(),
  new TestCaseRoute(),
  new BuildRoute(),
  new TestExecutionRoute(),
  new NotificationRoute(),
  new MantisRoute()
];

const app = new App(routes);

app.listen();