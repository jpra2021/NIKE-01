import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { eduService } from "../services/eduService";

const eduRouter = Router();

/*------Controller------- */

/*-- CREATE --*/
const createNewEdus = async (req, res, next) => {
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
    const degree = req.body.degree;
    /* -req.currentUserId from login-requires -*/
    const id = req.currentUserId;
    const newInput = { id, school, major, degree };

    const newEdu = await eduService.createEdus(newInput);

    if (newEdu.errorMessage) {
      throw new Error(newEdu.errorMessage);
    }
    res.status(201).json(newEdu);
  } catch (error) {
    next(error);
  }
};

/*-- UPDATE --*/
const updateNewEdu = async (req, res, next) => {
  try {
    const user_id = req.body._id;
    const school = req.body.school;
    const major = req.body.major;
    const degree = req.body.degree;
    //changed Input
    const newInput = { school, major, degree };
    const edu = await eduService.updateEdu(user_id, newInput);

    res.status(201).send(edu);
  } catch (error) {
    next(error);
  }
};

/* -- GET --*/
const getEdus = async (req, res, next) => {
  try {
    //to get all docs of the user by user's id
    const id = req.currentUserId;
    const edus = await eduService.getEdus(id);
    res.status(201).send(edus);
  } catch (error) {
    next(error);
  }
};

/*--DELETE--*/
const deleteEdu = async (req, res, next) => {
  try {
    const user_id = req.body._id;

    await eduService.deleteEdu(user_id);

    return res.status(201).json({ message: "Education Deleted" });
  } catch (error) {
    next(error);
  }
};

/*-------Router-------*/
eduRouter.post("/user/edu", login_required, createNewEdus);
eduRouter.put("/user/edu", login_required, updateNewEdu);
eduRouter.get("/user/edu", login_required, getEdus);
eduRouter.delete("/user/edu", login_required, deleteEdu);

export { eduRouter };
