import Portfolio from "./components/Portfolio";
import LoginForm from "./components/user/LoginForm";

export const ROUTES = {
  HOME: {
    path: "/",
    link: "/",
    component: Portfolio,
  },
  LOGIN: {
    path: "/login",
    link: "/login",
    component: LoginForm,
  },
  PORTFOLIO: {
    path: "/users/:userId",
    link: "/users",
    component: Portfolio,
  },
};

export const ROUTES_ARR = Object.values(ROUTES);
