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
    //obj_id(comes from req.body._id) means objectID, which assigned automatically and can be used as primary key(RDBMS) in MongoDB. A req.body will possess it to distinct which data is updated.
    const obj_id = req.body._id;
    const title = req.body.title ?? null;
    const detail = req.body.detail ?? null;
    const date = req.body.date ?? null;
    const newInput = { title, detail, date };
    const pro = await projectService.updatePro(obj_id, newInput);

    res.status(201).send(pro);
  } catch (error) {
    next(error);
  }
};
/* GET */
///users/:id/project
const getNewPros = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const pros = await projectService.getPros(user_id);
    res.status(201).send(pros);
  } catch (error) {
    next(error);
  }
};
/*--DELETE--*/
const deleteTargetPro = async (req, res, next) => {
  try {
    //use params id to delete
    const obj_id = req.params.id;
    const user_id = req.currentUserId;
    await projectService.deletePro(obj_id, user_id);

    return res.status(201).json({ message: "Project Deleted" });
  } catch (error) {
    next(error);
  }
};
/* --- Routes ---*/
proRouter.post("/users/project", login_required, createNewPros);
proRouter.put("/users/project", login_required, updateNewPro);
proRouter.get("/users/:id/project", login_required, getNewPros);
proRouter.delete("/users/project/:id", login_required, deleteTargetPro);

export { proRouter };
