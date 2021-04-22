import { combineEpics } from 'redux-observable';
import * as accountEpics from '../account/accountEpics';
import * as projectEpics from '../projects/projectEpics';
import * as testplanEpics from '../test-plan/testplanEpics';
import * as testcaseEpics from '../test-case/testcaseEpics';
import * as buildEpics from '../build-release/buildEpics';
import * as milestoneEpics from '../milestones/milestoneEpics';
import * as userEpics from '../users/userEpics';


export default combineEpics(
   accountEpics.loginReqEpic,
   accountEpics.logoutReqEpic,
   accountEpics.registerReqEpic,
   projectEpics.getAllProjectEpic,
   projectEpics.addNewProjectEpic,
   testplanEpics.getAllTestplanEpic,
   testplanEpics.addNewTestplanEpic,
   testcaseEpics.getAllTestcaseEpic,
   testcaseEpics.addTestSuiteEpic,
   testcaseEpics.addTestCaseEpic,
   buildEpics.addNewBuildEpic,
   buildEpics.getAllBuildEpic,
   buildEpics.getBuildByIdEpic,
   buildEpics.updateBuildEpic,
   buildEpics.deleteBuildEpic,
   milestoneEpics.addNewMilestoneEpic,
   milestoneEpics.getAllMilestoneEpic,
   milestoneEpics.getMilestoneByIdEpic,
   milestoneEpics.updateMilestoneEpic,
   milestoneEpics.deleteMilestoneEpic,
   userEpics.getAllUserOfProjectEpic,
   userEpics.addUserToProjectEpic,
   userEpics.getAllUserEpic,
   userEpics.deleteUserOfProjectEpic

);