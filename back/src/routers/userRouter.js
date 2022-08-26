import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

const userAuthRouter = Router();

/* --- POST (CREATE) / user/register ---*/
const createUser = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    console.log("createUser가잘됨");
    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });
    console.log("adduser라우터실행됨");

    if (newUser.errorMessage) {
      console.log("adduser에러뱉음");
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

/* -- POST (AUTH) Router /user/login --*/
const loginfunction = async (req, res, next) => {
  try {
    console.log("로그인펑션되니?");
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    console.log("의심하는놈", email, password);

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });
    console.log("너나오니", user);

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

/* -- GET /userlist --*/

const getUserList = async (req, res, next) => {
  try {
    // 전체 사용자 목록을 얻음
    console.log("제발좀되라");
    const users = await userAuthService.getUsers();
    console.log(users);
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

/* -- GET(AuthChecking) /user/current  --*/

const getUserInfo = async (req, res, next) => {
  try {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    console.log("겟유저인포시작했니?");
    const user_id = req.currentUserId;
    console.log("👀getUserInfo에서 userid=>", user_id);
    const currentUserInfo = await userAuthService.getUserInfo(user_id);

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
};

/* -- UPDATE(Auth), /users/:id--*/

const setUser = async (req, res, next) => {
  try {
    // URI로부터 사용자 id를 추출함.
    const user_id = req.params.user_id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { name, email, password, description };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

/* -- GET(Auth), /users/:id--*/
const getUser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;

    console.log("👀getUser에서 user_id=>", user_id);
    const currentUserInfo = await userAuthService.getUserInfo(user_id);

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
};

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

/* -- Post Router -- */
//
userAuthRouter.post("/user/register", createUser);
userAuthRouter.post("/user/login", loginfunction);

userAuthRouter.get("/userlist", login_required, getUserList);
userAuthRouter.get("/user/current", login_required, getUserInfo);

userAuthRouter.put("/users/:user_id", login_required, setUser);
userAuthRouter.get("/users/:user_id", login_required, getUser);

export { userAuthRouter };
