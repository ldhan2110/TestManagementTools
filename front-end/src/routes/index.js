import React from "react";
import {
  Users,
  Flag,
  PieChart,
  Layers,
  Settings,
  Briefcase,
  Trello,
  Radio,
  List,
} from "react-feather";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import async from "../components/Async";

// Auth components
const Page500 = async(() => import("../pages/error/Page500"));
const LoginPage = async(()=> import("../pages/auth/login-page/index"));
const ForgotPassword = async(()=> import("../pages/auth/forgot-password-page"));
const ResetPassword = async(()=> import("../pages/auth/reset-password-page"));
const ProfilePage = async(()=>import("../pages/auth/profile-page"));
const VerifyMemberPage =  async(()=>import("../pages/auth/verify-member-page"));

// Dashboards components
const Dashboard = async(() => import("../pages/dashboard"));

//Projects components
const ProjectList = async(()=>import('../pages/projects/project-list-page/index'));

//TestPlans components
const TestPlanList = async(()=>import('../pages/testplans/test-plans-list-page/index'));
const NewTestPlanPage = async(()=>import('../pages/testplans/new-test-plan-page/index'));
const TestPlanDetailPage = async(()=>import('../pages/testplans/test-plan-detail-page/index'));

//TestExecution components
const TestExecutionList = async(()=>import('../pages/testexecution/test-execution-list-page/index'));
const NewTestExecutionPage = async(()=>import('../pages/testexecution/new-test-execution-page/index'));
const TestExecutionDetailPage = async(()=>import('../pages/testexecution/test-execution-detail-page/index'));
const TestCaseExecDetailPage = async(()=> import('../pages/testexecution/test-case-execution-detail-page/index'));
const TestExecutionOverviewDetailPage = async(()=> import('../pages/testexecution/test-execution-detail-overview-page/index'));

//Build-Release components
const BuildList = async(()=>import('../pages/builds/builds-list-page/index'));
const NewBuildPage = async(()=>import('../pages/builds/new-build-page/index'));
const DetailBuildPage = async(()=>import('../pages/builds/build-detail-page/index'));
const BuildReportPage = async(()=>import('../pages/builds/build-report-page/index'));

//Setting components
const MemberListPage = async(()=>import('../pages/settings/members/index'));
const SettingProjectPage = async(()=>import('../pages/settings/setting-project/index'));
const MantisConfigPage = async(()=>import('../pages/settings/mantis-config/index'));
const MemberMantis = async(()=>import('../pages/settings/member-mantis/index'));
const ManageMantis = async(()=>import('../pages/settings/manage-mantis/index'));

//Milestone components
const MileStonePage = async(()=>import('../pages/milstones/milestone-overview-page/index'));
const NewMileStonePage = async(()=>import('../pages/milstones/new-milestone-page/index'));
const detailMileStonePage = async(()=>import('../pages/milstones/milestone-detail-page/index'));

//TestCase components
const TestCasePage = async(()=>import('../pages/testcases/test-cases-list-page/index'));
const NewTestCasePage = async(()=>import('../pages/testcases/new-test-case-page/index'));
const EditTestCasePage = async(()=>import('../pages/testcases/edit-test-case-page/index'));

//Requirements components
const RequirementListPage = async(()=>import(('../pages/requirements/requirements-list-page/index')));
const NewRequirementPage = async(()=>import(('../pages/requirements/new-requirement-page/index')));
const RequirementDetailPage = async(()=>import(('../pages/requirements/requirement-details-page/index')));

//Issues components
const IssueListPage = async(()=>import(('../pages/issues/issue-list/index')));
const IssueDetailPage = async(()=>import(('../pages/issues/issue-detail/index')));

const dashboardRoute = {
  id: "Dashboard",
  path: "/projects/:projectName",
  icon: <PieChart />,
  exact: true,
  containsHome: true,
  component: Dashboard
};

const projectSettingRoutes = {
  id: "Project Settings",
  path: "/projects/:projectName",
  icon: <Settings />,
  component: null,
  children: [
    {
      id: "Settings",
      path: "/projects/:projectName/settings",
      name: "Settings",
      component: SettingProjectPage
    },
    {
      id: "Members",
      path: "/projects/:projectName/members",
      name: "Members",
      icon: <Users/>,
      component: MemberListPage
    },
    {
      id: "Mantis Configuration",
      path: "/projects/:projectName/mantis-connect",
      name: "Mantis Connect",
      icon: <Users/>,
      component: MantisConfigPage
    },
    {
      id: "Member Mantis",
      path: "/projects/:projectName/member-mantis",
      name: "Mantis Members",
      icon: <Users/>,
      component: MemberMantis
    },
    {
      id: "Manage Mantis",
      path: "/projects/:projectName/manage-mantis",
      name: "Mantis Management",
      icon: <Users/>,
      component: ManageMantis
    },
  ]
};

const verifyMemberRoute = {
  path: "/auth/verify-member/:email/:projectid/:token",
  name: "Verify Member",
  component: VerifyMemberPage
}


const forgotPasswordRoute = {
  path: "/auth/forgot-password",
  name: "Forgot Password",
  component: ForgotPassword
}

const resetPasswordRoute = {
  path: "/auth/reset-password/:token",
  name: "Reset Password",
  component: ResetPassword
}


const error500Route = {
  path: "/error/500",
  name: "Internal Error",
  component: Page500
};

const loginRoute = {
  path: "/login",
  name: "Login",
  component: LoginPage
};

const profileRoute = {
  path: "/profile",
  name: "profile",
  restrict: true,
  component: ProfilePage
};

//PROJECT
const projectListRoute = {
  path: "/projects",
  name: "Projects",
  restrict: true,
  exact: true,
  component: ProjectList
}

//ISSUE
const issueListRoute = {
  id: "Defects",
  path: "/projects/:projectName/defects",
  icon: <List/>,
  name: "Defects",
  restrict: true,
  exact:true,
  component: IssueListPage
}

const issueDetailRoute = {
  id: "Defect Detail",
  path: "/projects/:projectName/defects/:id",
  name: "Defect Detail",
  restrict: true,
  exact: true,
  component: IssueDetailPage
}

//TEST PLAN
const testPlanListRoute = {
  id: "Test Plans",
  path: "/projects/:projectName/test-plans",
  icon: <Trello/>,
  name: "Test Plans",
  restrict: true,
  exact:true,
  component: TestPlanList
}

const newTestPlanRoute = {
  id: "New Test Plan",
  path: "/projects/:projectName/test-plans/create-test-plan",
  name: "New Test Plan",
  restrict: true,
  exact: true,
  component: NewTestPlanPage
}

const testPlanDetailRoute = {
  id: "Test Plan Detail",
  path: "/projects/:projectName/test-plans/:testPlanName",
  name: "Test Plan Detail",
  restrict: true,
  exact: true,
  component: TestPlanDetailPage
}

//REQUIREMENT
const requirementsRoute = {
  id: "Requirements",
  path: "/projects/:projectName/requirements",
  name: "Requirements",
  icon: <AssignmentOutlinedIcon/>,
  restrict: true,
  exact: true,
  component: RequirementListPage
}

const newRequirementsRoute = {
  id: "New Requirement",
  path: "/projects/:projectName/requirements/new-requirement",
  name: "New Requirement",
  restrict: true,
  exact: true,
  component: NewRequirementPage
}

const requirementsDetailRoute = {
  id: "Requirement Details",
  path: "/projects/:projectName/requirements/:requirementId",
  name: "Requirement Details",
  restrict: true,
  exact: true,
  component: RequirementDetailPage
}

//TEST EXECUTION
const testExecutionListRoute = {
  id: "Test Executions",
  path: "/projects/:projectName/test-execution",
  icon: <Radio />,
  name: "Test Execution",
  restrict: true,
  exact:true,
  component: TestExecutionList
}

const newTestExecutionRoute = {
  id: "New Test Execution",
  path: "/projects/:projectName/test-execution/create-test-execution",
  name: "New Test Execution",
  restrict: true,
  exact: true,
  component: NewTestExecutionPage
}

const testExecutionDetailRoute = {
  id: "Test Execution Detail",
  path: "/projects/:projectName/test-execution/edit/:testExecutionId",
  name: "Test Execution Detail",
  restrict: true,
  exact: true,
  component: TestExecutionDetailPage
} 

const testExecutionOverviewRoute = {
  id: "Test Execution Overview",
  path: "/projects/:projectName/test-execution/:testExecutionId",
  name: "Test Execution Overview",
  restrict: true,
  exact: true,
  component: TestExecutionOverviewDetailPage
} 

const testCaseExecDetailRoute = {
  id: "Test Case Execution Detail",
  path: "/projects/:projectName/test-execution/:testExecutionId/test-exec/:id",
  name: "Test Case Execution Detail",
  restrict: true,
  exact: true,
  component: TestCaseExecDetailPage
} 

const executeResultRoutes = {
  id: "Test Execution Result",
  path: "/projects/:projectName/test-execution/:testExecutionId/execute-result",
  name: "Test Execution Result",
  restrict: true,
  exact: true,
  component: TestExecutionOverviewDetailPage
}

const testCaseExecResultRoute = {
  id: "Test Case Execution Detail",
  path: "/projects/:projectName/test-execution/:testExecutionId/test-exec/:id/execute-result",
  name: "Test Case Execution Detail",
  restrict: true,
  exact: true,
  component: TestCaseExecDetailPage
}

const testCaseReExecResultRoute = {
  id: "Test Case Re-Execution Detail",
  path: "/projects/:projectName/test-execution/:testExecutionId/test-exec/:id/re-execute-result",
  name: "Test Case Re-Execution Detail",
  restrict: true,
  exact: true,
  component: TestCaseExecDetailPage
}








//BUILD-RELEASE
const buildListRoute = {
  id: "Builds/Releases",
  path: "/projects/:projectName/builds",
  name: "Builds/Releases",
  icon: <Layers />,
  restrict: true,
  exact: true,
  component: BuildList,
}

const newBuildRoute = {
  id: "New Build/Release",
  path: "/projects/:projectName/builds/new-build",
  name: "New Build/Release",
  restrict: true,
  exact: true,
  component: NewBuildPage,
}

const buildDetailRoute = {
  id: "Detail Build/Release",
  path: "/projects/:projectName/builds/:buildName",
  name: "Detail Build/Release",
  restrict: true,
  exact: true,
  component: DetailBuildPage,
}

const buildReportRoute = {
  id: "Builds/Releases Report",
  path: "/projects/:projectName/builds/:buildName/report",
  name: "Builds/Releases Report",
  restrict: true,
  exact: true,
  component: BuildReportPage,
}


const milestoneRoute = {
  id: "Milestones",
  path: "/projects/:projectName/milestones",
  name: "Milestones",
  icon: <Flag/>,
  restrict: true,
  exact: true,
  component: MileStonePage,
}

const newMilestoneRoute = {
  id: "New Milestone",
  path: "/projects/:projectName/milestones/new-milestone",
  name: "New Milestone",
  icon: <Flag/>,
  restrict: true,
  exact: true,
  component: NewMileStonePage,
}

const detailMilestoneRoute = {
  id: "Detail Milestone",
  path: "/projects/:projectName/milestones/:milestoneid/milestone-detail",
  name: "Detail Milestone",
  icon: <Flag/>,
  restrict: true,
  exact: true,
  component: detailMileStonePage,
}

//Test Case
const testCaseRoute = {
  id: "Test Cases",
  path: "/projects/:projectName/test-cases",
  name: "Test Cases",
  icon: <Briefcase/>,
  restrict: true,
  exact: true,
  component: TestCasePage
}

const newTestcaseRoute = {
  id: "New Test Case",
  path: "/projects/:projectName/test-cases/:testsuiteName/new-test-case",
  name: "New Test Case",
  restrict: true,
  exact: true,
  component: NewTestCasePage
}

const editTestcaseRoute = {
  id: "Edit Test Case",
  path: "/projects/:projectName/test-cases/:testcaseId/edit-test-case",
  name: "Edit Test Case",
  restrict: true,
  exact: true,
  component: EditTestCasePage
}



// Routes using the Dashboard layout
export const primaryLayoutRoutes = [
  dashboardRoute,
  testPlanListRoute,
  newTestPlanRoute,
  testPlanDetailRoute,
  testExecutionListRoute,
  newTestExecutionRoute,
  testCaseExecDetailRoute,
  testExecutionDetailRoute,
  testExecutionOverviewRoute,
  buildListRoute,
  newBuildRoute,
  requirementsRoute,
  buildDetailRoute,
  buildReportRoute,
  projectSettingRoutes,
  milestoneRoute,
  testCaseRoute,
  newTestcaseRoute,
  newMilestoneRoute,
  detailMilestoneRoute,
  executeResultRoutes,
  testCaseExecResultRoute,
  requirementsRoute,
  newRequirementsRoute,
  requirementsDetailRoute,
  testCaseReExecResultRoute,
  issueListRoute,
  issueDetailRoute,
  editTestcaseRoute
];

// Routes using the Auth layout
export const freeLayoutRoutes = [
  forgotPasswordRoute,
  resetPasswordRoute,
  projectListRoute,
  profileRoute,
  verifyMemberRoute
];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardRoute,
  requirementsRoute,
  testPlanListRoute,
  testExecutionListRoute,
  testCaseRoute,
  buildListRoute,
  issueListRoute,
  milestoneRoute,
  projectSettingRoutes,
];

export const emptyRoutes = [
  loginRoute,
  error500Route,
];

export const publicRoutes = [
  loginRoute.path,
  verifyMemberRoute.path,
  forgotPasswordRoute.path,
  resetPasswordRoute.path,
]
  

