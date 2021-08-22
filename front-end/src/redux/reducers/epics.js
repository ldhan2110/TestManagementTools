import { combineEpics } from 'redux-observable';
import * as accountEpics from '../account/accountEpics';
import * as projectEpics from '../projects/projectEpics';
import * as testplanEpics from '../test-plan/testplanEpics';
import * as issueEpics from '../issue/issueEpics';
import * as requirementsEpics from '../requirements/requirementsEpics';
import * as testcaseEpics from '../test-case/testcaseEpics';
import * as buildEpics from '../build-release/buildEpics';
import * as milestoneEpics from '../milestones/milestoneEpics';
import * as userEpics from '../users/userEpics';
import * as testexecEpics from '../test-execution/testexecEpics';
import * as dashboardEpics from '../dashboard/dasboardEpics';
import * as notificationEpics from '../notification/notificationEpics';


export default combineEpics(
   //DASHBOARD EPICS
   dashboardEpics.getEffortEpic,
   dashboardEpics.getExecOverviewEpic,
   dashboardEpics.getMultiChart,
   dashboardEpics.getSixExecution,

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
   projectEpics.changeRoleMemberEpic,
   projectEpics.getProjectNameByIdEpic,

   //TEST PLAN EPICS
   testplanEpics.getAllTestplanEpic,
   testplanEpics.addNewTestplanEpic,
   testplanEpics.updateTestplanEpic,
   testplanEpics.getAllActiveTestplanEpic,
   testplanEpics.deleteTestplanEpic,

   //ISSUE EPICS
   issueEpics.getAllIssueEpic,
   issueEpics.createIssueEpic,
   issueEpics.updateIssueEpic,
   issueEpics.deleteIssueEpic,
   issueEpics.getAllCategoryEpic,
   issueEpics.addIssueToExecEpic,
   issueEpics.getInfoMantisEpic,
   issueEpics.getAllMantisOfProjectEpic,
   issueEpics.getAllConnectedMantisEpic,
   issueEpics.switchConnectedMantisEpic,
   issueEpics.createNewMantisEpic,
   issueEpics.createAndSwitchMantisEpic,
   issueEpics.switchMantisEpic,
   issueEpics.changeAPIKeyEpic,
   issueEpics.deleteIssueFromExecEpic,

   //REQUIREMENTS EPICS
   requirementsEpics.getAllRequirementsEpic,
   requirementsEpics.addNewRequirementsEpic,
   requirementsEpics.updateRequirementsEpic,
   requirementsEpics.getAllActiveRequirementsEpic,
   requirementsEpics.deleteRequirementsEpic,

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
   testcaseEpics.searchTestCaseEpic,
   testcaseEpics.uploadTestCaseEpic,

   // BUILD-RELEASE EPICS
   buildEpics.addNewBuildEpic,
   buildEpics.getAllBuildEpic,
   buildEpics.getBuildReportEpic,
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
   userEpics.verifyUserToProjectEpic,
   userEpics.updateAvatarEpic,
   userEpics.getAllMemberMantisEpic,
   userEpics.addMemberMantisEpic,
   userEpics.deleteMemberMantisEpic,
   userEpics.changeRoleMemberMantisEpic,

   //TEST EXEC EPICS
   testexecEpics.getAllTestexecEpic,
   testexecEpics.addNewTestexecEpic,
   testexecEpics.updTestExecEpic,
   testexecEpics.execTestcaseEpic,
   testexecEpics.delTestExecEpic,
   testexecEpics.updTestExecDetailEpic,

   //NOTIFICATION
   notificationEpics.getAllNotificationEpic,
   notificationEpics.addNewNotificationEpic,
   notificationEpics.updateNotificationEpic,

);