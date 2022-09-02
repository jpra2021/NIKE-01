import Portfolio from "../views/Portfolio";
import LoginForm from "../views/LoginForm";
import Network from "../views/Network";
import RegisterForm from "../views/RegisterForm";
import UserInfoAuth from "../views/UserInfoAuth";
import UserInfoEdit from "../views/UserInfoEdit";

export const ROUTES = {
  HOME: {
    path: "/",
    component: Portfolio,
  },
  LOGIN_PAGE: {
    path: "/login",
    component: LoginForm,
  },
  REGISTER_PAGE: {
    path: "/register",
    component: RegisterForm,
  },
  USER_PAGE: {
    path: "/users/:userId",
    component: Portfolio,
  },
  NETWORK: {
    path: "/network",
    component: Network,
  },
  AUTH: {
    path: "/user/auth",
    component: UserInfoAuth,
  },
  EDIT: {
    path: "/user/edit",
    component: UserInfoEdit,
  },
};

export const RAUTES_VALUES = Object.values(ROUTES);
