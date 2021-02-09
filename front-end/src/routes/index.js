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
import async from "../components/Async";

// Auth components
const Page500 = async(() => import("../pages/error/Page500"));
const ServiceList = async(()=> import("../pages/service-management/index"));
const LoginPage = async(()=> import("../pages/auth/login-page/index"));
const ForgotPassword = async(()=> import("../pages/auth/forgot-password-page"));
const ProfilePage = async(()=>import("../pages/auth/profile-page"));

// Dashboards components
const Dashboard = async(() => import("../pages/dashboard"));

//Projects components
const ProjectList = async(()=>import('../pages/projects/project-list-page/index'));

//TestPlans components
const TestPlanList = async(()=>import('../pages/testplans/test-plans-list-page/index'));

const currentURL = window.location.pathname;

console.log(currentURL);

const dashboardRoute = {
  id: "Thống kê",
  path: "/projects/:projectName",
  icon: <PieChart />,
  exact: true,
  containsHome: true,
  component: Dashboard
};

const financeRoute = {
  id: "Tài chính",
  path: "/finance",
  icon: <TrendingUp />,
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

const servicesRoute = {
  id: "Dịch vụ",
  path: "/services",
  icon: <Grid />,
  component: ServiceList
};

const paymentRoute = {
  id: "Thanh toán",
  path: "/payment",
  icon: <CreditCard />,
  component: Dashboard
};

const customersRoute = {
  id: "Khách hàng",
  path: "/customers",
  icon: <Users />,
  component: Dashboard
};

const contractsRoute = {
  id: "Hợp đồng",
  path: "/contracts",
  icon: <Layers />,
  component: Dashboard
};

const residentRoute = {
  id: "Lưu trú",
  path: "/resident",
  icon: <Home />,
  component: Dashboard
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

const projectListRoute = {
  path: "/projects",
  name: "Projects",
  restrict: true,
  exact: true,
  component: ProjectList
}

const testPlanListRoute = {
  id: "Test Plans",
  path: "/projects/:projectName/test-plans",
  icon: <Trello/>,
  name: "Test Plans",
  restrict: true,
  exact:true,
  component: TestPlanList
}

// Routes using the Dashboard layout
export const primaryLayoutRoutes = [
  dashboardRoute,
  financeRoute,
  assetRoutes,
  servicesRoute,
  paymentRoute,
  contractsRoute,
  customersRoute,
  residentRoute,
  testPlanListRoute
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
  financeRoute,
  assetRoutes,
  servicesRoute,
  paymentRoute,
  contractsRoute,
  customersRoute,
  residentRoute,
  testPlanListRoute
];

export const emptyRoutes = [
  loginRoute,
  error500Route,
];

export const publicRoutes = [
  loginRoute.path,
  forgotPasswordRoute.path
]
  

