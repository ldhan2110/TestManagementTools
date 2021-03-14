import React from "react";
import {
  Grid,
  Users,
  Flag,
  PieChart,
  Package,
  Layers,
  Home,
  Settings,
  Briefcase,
  Trello
} from "react-feather";
import async from "../components/Async";

// Auth components
const Page500 = async(() => import("../pages/error/Page500"));
const LoginPage = async(()=> import("../pages/auth/login-page/index"));
const ForgotPassword = async(()=> import("../pages/auth/forgot-password-page"));
const ProfilePage = async(()=>import("../pages/auth/profile-page"));

// Dashboards components
const Dashboard = async(() => import("../pages/dashboard"));

//Projects components
const ProjectList = async(()=>import('../pages/projects/project-list-page/index'));

//TestPlans components
const TestPlanList = async(()=>import('../pages/testplans/test-plans-list-page/index'));
const NewTestPlanPage = async(()=>import('../pages/testplans/new-test-plan-page/index'));
const TestPlanDetailPage = async(()=>import('../pages/testplans/test-plan-detail-page/index'));

//Build-Release components
const BuildList = async(()=>import('../pages/builds/builds-list-page/index'));
const NewBuildPage = async(()=>import('../pages/builds/new-build-page/index'));
const DetailBuildPage = async(()=>import('../pages/builds/build-detail-page/index'));

//Setting components
const MemberListPage = async(()=>import('../pages/settings/members/index'));

//Milestone components
const MileStonePage = async(()=>import('../pages/milstones/milestone-overview-page/index'));

//TestCase components
const TestCasePage = async(()=>import('../pages/testcases/test-cases-list-page/index'));

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
      component: Dashboard
    },
    {
      id: "Members",
      path: "/projects/:projectName/members",
      name: "Members",
      icon: <Users/>,
      component: MemberListPage
    },
  ]
};


const forgotPasswordRoute = {
  path: "/auth/forgot-password",
  name: "Forgot Password",
  component: ForgotPassword
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

//BUILD-RELEASE
const buildListRoute = {
  id: "Build/Release",
  path: "/projects/:projectName/builds",
  name: "Build/Release",
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

const milestoneRoute = {
  id: "Milestones",
  path: "/projects/:projectName/milestones",
  name: "Milestones",
  icon: <Flag/>,
  restrict: true,
  exact: true,
  component: MileStonePage,
}


//Test Plan
const testCaseRoute = {
  id: "Test Cases",
  path: "/projects/:projectName/test-cases",
  name: "Test Cases",
  icon: <Briefcase/>,
  restrict: true,
  exact: true,
  component: TestCasePage
}

// Routes using the Dashboard layout
export const primaryLayoutRoutes = [
  dashboardRoute,
  testPlanListRoute,
  newTestPlanRoute,
  testPlanDetailRoute,
  buildListRoute,
  newBuildRoute,
  buildDetailRoute,
  projectSettingRoutes,
  milestoneRoute,
  testCaseRoute
];

// Routes using the Auth layout
export const freeLayoutRoutes = [
  forgotPasswordRoute,
  projectListRoute,
  profileRoute,
];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardRoute,
  testPlanListRoute,
  testCaseRoute,
  buildListRoute,
  milestoneRoute,
  projectSettingRoutes,
];

export const emptyRoutes = [
  loginRoute,
  error500Route,
];

export const publicRoutes = [
  loginRoute.path,
  forgotPasswordRoute.path
]
  

