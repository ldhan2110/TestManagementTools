import 'dotenv/config';

import App from './app';
import AuthRoute from '@modules/auth/auth.route';
import { IndexRoute } from '@modules/index';
import ProfileRoute from '@modules/profile/profile.route';
import UsersRoute from '@modules/users/user.route';
import { validateEnv } from '@core/utils';
import { ProjectRoute } from '@modules/project';
import { ProjectRequirementRoute } from '@modules/projectrequirement';

validateEnv();

const routes = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProfileRoute(),
  new ProjectRoute(),
  new ProjectRequirementRoute()
];

const app = new App(routes);

app.listen();