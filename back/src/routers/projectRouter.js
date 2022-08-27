import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const proRouter = Router();

/*------Controller------- */

/* ---CREATE ---*/

const createNewPros = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    /*-distributing data from req-*/
    /* must be same with schema!*/
    const user_id = req.currentUserId;
    const { title, detail, date } = req.body;
    const reqData = { user_id, title, detail, date };

    const newPro = await projectService.createPros(reqData);

    if (newPro.errorMessage) {
      throw new Error(newPro.errorMessage);
    }
    res.status(201).json(newPro);
  } catch (error) {
    next(error);
  }
};

/*-- UPDATE --*/
const updateNewPro = async (req, res, next) => {
  try {
    const obj_id = req.body._id;
    const { title, detail, date } = req.body;
    const newInput = { title, detail, date };
    const pro = await projectService.updatePro(obj_id, newInput);

    res.status(201).send(pro);
  } catch (error) {
    next(error);
  }
};
/* GET */
const getNewPros = async (req, res, next) => {
  try {
    const user_id = req.currentUserId;
    const pros = await projectService.getPros(user_id);
    res.status(201).send(pros);
  } catch (error) {
    next(error);
  }
};
/*--DELETE--*/
const deleteTargetPro = async (req, res, next) => {
  try {
    const obj_id = req.body._id;

    await projectService.deletePro(obj_id);

    return res.status(201).json({ message: "Project Deleted" });
  } catch (error) {
    next(error);
  }
};
/* --- Routes ---*/
proRouter.post("/user/project", login_required, createNewPros);
proRouter.put("/user/project", login_required, updateNewPro);
proRouter.get("/user/project", login_required, getNewPros);
proRouter.delete("/user/project", login_required, deleteTargetPro);

export { proRouter };
