import { combineEpics } from 'redux-observable';
import * as accountEpics from '../account/accountEpics';
import * as projectEpics from '../projects/projectEpics';
import * as testplanEpics from '../test-plan/testplanEpics';
import * as testcaseEpics from '../test-case/testcaseEpics';
import * as buildEpics from '../build-release/buildEpics';
import * as milestoneEpics from '../milestones/milestoneEpics';
import * as userEpics from '../users/userEpics';
import * as testexecEpics from '../test-execution/testexecEpics';


export default combineEpics(
   //ACCOUNT EPICS
   accountEpics.loginReqEpic,
   accountEpics.logoutReqEpic,
   accountEpics.registerReqEpic,

   //PROJECT EPICS
   projectEpics.getAllProjectEpic,
   projectEpics.addNewProjectEpic,

   //TEST PLAN EPICS
   testplanEpics.getAllTestplanEpic,
   testplanEpics.addNewTestplanEpic,
   testplanEpics.updateTestplanEpic,
   testplanEpics.getAllActiveTestplanEpic,

   //TEST CASE EPICS
   testcaseEpics.getAllTestcaseEpic,
   testcaseEpics.addTestSuiteEpic,
   testcaseEpics.addTestCaseEpic,
   testcaseEpics.getAllTestsuiteEpic,
   testcaseEpics.getAllTestcaseNoTreeEpic,
   testcaseEpics.updateTestCaseEpic,
   testcaseEpics.deleteTestcaseEpic,
   testcaseEpics.getListTestcaseSelectEpic,
   testcaseEpics.updateTestSuiteEpic,
   testcaseEpics.deleteTestsuiteEpic,

   // BUILD-RELEASE EPICS
   buildEpics.addNewBuildEpic,
   buildEpics.getAllBuildEpic,
   buildEpics.getBuildByIdEpic,
   buildEpics.updateBuildEpic,
   buildEpics.deleteBuildEpic,
   buildEpics.getAllBuildActiveEpic,

   //MILESTONE EPICS
   milestoneEpics.addNewMilestoneEpic,
   milestoneEpics.getAllMilestoneEpic,
   milestoneEpics.getMilestoneByIdEpic,
   milestoneEpics.updateMilestoneEpic,
   milestoneEpics.deleteMilestoneEpic,

   //USER EPICS
   userEpics.getAllUserOfProjectEpic,
   userEpics.addUserToProjectEpic,
   userEpics.getAllUserEpic,
   userEpics.deleteUserOfProjectEpic,

   //TEST EXEC EPICS
   testexecEpics.getAllTestexecEpic,
   testexecEpics.addNewTestexecEpic

);