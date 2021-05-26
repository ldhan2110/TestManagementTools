import { combineEpics } from 'redux-observable';
import * as accountEpics from '../account/accountEpics';
import * as projectEpics from '../projects/projectEpics';
import * as testplanEpics from '../test-plan/testplanEpics';
import * as testcaseEpics from '../test-case/testcaseEpics';
import * as buildEpics from '../build-release/buildEpics';
import * as milestoneEpics from '../milestones/milestoneEpics';
import * as userEpics from '../users/userEpics';
import * as testexecEpics from '../test-execution/testexecEpics';
import * as dashboardEpics from '../dashboard/dasboardEpics';


export default combineEpics(
   //DASHBOARD EPICS
   dashboardEpics.getEffortEpic,
   dashboardEpics.getExecOverviewEpic,
   dashboardEpics.getMultiChart,

   //ACCOUNT EPICS
   accountEpics.loginReqEpic,
   accountEpics.logoutReqEpic,
   accountEpics.registerReqEpic,
   accountEpics.sendMailResetPasswordReqEpic,
   accountEpics.confirmResetPasswordReqEpic,

   //PROJECT EPICS
   projectEpics.getAllProjectEpic,
   projectEpics.addNewProjectEpic,
   projectEpics.updateProjectEpic,
   projectEpics.deleteProjectEpic,
   projectEpics.getProjectByIdEpic,

   //TEST PLAN EPICS
   testplanEpics.getAllTestplanEpic,
   testplanEpics.addNewTestplanEpic,
   testplanEpics.updateTestplanEpic,
   testplanEpics.getAllActiveTestplanEpic,
   testplanEpics.deleteTestplanEpic,

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
   buildEpics.deleteBuildEpic,
   buildEpics.getAllBuildByTestplan,

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
   userEpics.updatePasswordEpic,
   userEpics.updateProfileEpic,
   userEpics.getCurrentUserEpic,

   //TEST EXEC EPICS
   testexecEpics.getAllTestexecEpic,
   testexecEpics.addNewTestexecEpic,
   testexecEpics.updTestExecEpic,
   testexecEpics.execTestcaseEpic

);