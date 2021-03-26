import { combineEpics } from 'redux-observable';
import * as accountEpics from '../account/accountEpics';
import * as projectEpics from '../projects/projectEpics';
import * as testplanEpics from '../test-plan/testplanEpics';
import * as buildEpics from '../build-release/buildEpics';
export default combineEpics(
   accountEpics.loginReqEpic,
   accountEpics.logoutReqEpic,
   accountEpics.registerReqEpic,
   projectEpics.getAllProjectEpic,
   projectEpics.addNewProjectEpic,
   testplanEpics.getAllTestplanEpic,
   testplanEpics.addNewTestplanEpic,
   buildEpics.addNewBuildEpic,
   buildEpics.getAllBuildEpic,
);