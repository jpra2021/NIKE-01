import Portfolio from "../components/Portfolio";
import LoginForm from "../components/user/LoginForm";
import Network from "../components/user/Network";
import RegisterForm from "../components/user/RegisterForm";
import UserInfoAuth from "../components/user/UserInfoAuth";
import UserInfoEdit from "../components/user/UserInfoEdit";

export const ROUTES = {
    HOME: {
        path: "/",
        component: Portfolio
    },
    LOGIN_PAGE: {
        path: "/login",
        component: LoginForm
    },
    REGISTER_PAGE: {
        path: "/register",
        component: RegisterForm
    },
    USER_PAGE: {
        path: "/users/:userId",
        component: Portfolio
    },
    NETWORK: {
        path: "/network",
        component: Network
    },
    AUTH: {
        path: "/user/auth",
        component: UserInfoAuth
    },
    EDIT: {
        path: "/user/edit",
        component: UserInfoEdit
    },
}

export const RAUTES_VALUES = Object.values(ROUTES);