import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { eduService1 } from "../services/eduServiceN";

const eduRouter = Router();

/*------Controller------- */
const createAndUpdate = async (req, res, next) => {
  try {
    /* --checking: is the req.body acceptable data?--*/
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    /*-distributing data from req-*/
    /* must be same with schema!*/
    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;
    /* -req.currentUserId from login-requires -*/
    const id = req.currentUserId;
    const newInput = { id, school, major, position };
    /* --create or update ---*/
    const newEdu = await eduService1.setEdu(newInput);

    if (newEdu.errorMessage) {
      throw new Error(newEdu.errorMessage);
    }
    res.status(201).json(newEdu);
  } catch (error) {
    next(error);
  }
};

const getData = async (req, res, next) => {
  try {
    const edus = await eduService1.getEdu();
    res.status(201).send(edus);
  } catch (error) {
    next(error);
  }
};

/*-------Router-------*/

/*testing with postman*/
//eduRouter.route("/edu/post").post(createAndUpdate);

/*oldversion*/
// //eduRouter.route("/userid/:id/edu").post(createAndUpdate);
// eduRouter.route("/userid/:id/edu").put(createAndUpdate);
// eduRouter.route("/userid/:id/edu").get(getData);

/*------testing copying from...------*/
eduRouter.put("/user/edu", login_required, createAndUpdate);
eduRouter.post("/user/edu", login_required, createAndUpdate);
eduRouter.get("/user/edu", login_required, getData);

export { eduRouter };
