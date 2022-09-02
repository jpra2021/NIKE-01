import React, {
    useState,
    useEffect,
    useReducer,
    createContext,
    useMemo,
} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import { loginReducer } from "./reducer";

import Header from "./components/Header";

import Redirect from "./views/Redirect";
import Loading from "./views/Loading";
import { RAUTES_VALUES } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
    // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });
    // redirect page에서 header를 안 보이게 하는 용도
    const [headerVisible, setHeaderVisible] = useState(true);

    // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
    // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
            const res = await Api.get("user/current");
            const currentUser = res.data;

            // dispatch 함수를 통해 로그인 성공 상태로 만듦.
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: currentUser,
            });

            console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
        } catch {
            console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
        }
        // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
        setIsFetchCompleted(true);
    };

    // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const routes = useMemo(() => {
        return RAUTES_VALUES.map(({ path, component }, idx) => {
            const Component = component;
            return <Route key={idx} path={path} element={<Component />} />;
        });
    }, []);

    if (!isFetchCompleted) {
        return <Loading />;
    }

    return (
        <DispatchContext.Provider value={dispatch}>
            <UserStateContext.Provider value={userState}>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover
                />
                <Router>
                    <Header headerVisible={headerVisible} />
                    <Routes>
                        {routes}
                        <Route
                            path="*"
                            element={
                                <Redirect setHeaderVisible={setHeaderVisible} />
                            }
                        />
                    </Routes>
                </Router>
            </UserStateContext.Provider>
        </DispatchContext.Provider>
    );
}

export default App;
