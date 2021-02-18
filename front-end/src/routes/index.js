import React from "react";
import {
  Grid,
  Users,
  PieChart,
  Package,
  CreditCard,
  Layers,
  Home,
  TrendingUp,
  Trello
} from "react-feather";
import build from "react-jvectormap";
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

const dashboardRoute = {
  id: "Dashboard",
  path: "/projects/:projectName",
  icon: <PieChart />,
  exact: true,
  containsHome: true,
  component: Dashboard
};

const assetRoutes = {
  id: "Tài sản",
  path: "/asset",
  icon: <Package />,
  component: null,
  children: [
    {
      path: "/asset/real-estate",
      name: "Bất động sản",
      component: Dashboard
    },
    {
      path: "/asset/equipment",
      name: "Trang thiết bị",
      component: Dashboard
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

// Routes using the Dashboard layout
export const primaryLayoutRoutes = [
  dashboardRoute,
  assetRoutes,
  testPlanListRoute,
  newTestPlanRoute,
  testPlanDetailRoute,
  buildListRoute,
  newBuildRoute,
  buildDetailRoute
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
  assetRoutes,
  testPlanListRoute,
  buildListRoute,
];

export const emptyRoutes = [
  loginRoute,
  error500Route,
];

export const publicRoutes = [
  loginRoute.path,
  forgotPasswordRoute.path
]
  

