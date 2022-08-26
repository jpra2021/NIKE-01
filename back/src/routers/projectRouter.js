import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const proRouter = Router();

/* --- handling req, res, next --- */

/* CREATE and UPDATE */

const createAndUpdate = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const id = req.currentUserId;
    const { title, detail, date } = req.body;
    const reqData = { id, title, detail, date };

    const newPro = await projectService.setPro(reqData);

    if (newPro.errorMessage) {
      throw new Error(newPro.errorMessage);
    }
    res.status(201).json(newPro);
  } catch (error) {
    next(error);
  }
};

/* GET */
const getPros = async (req, res, next) => {
  try {
    const id = req.currentUserId;
    const pros = await projectService.getPro(id);
    res.status(201).send(pros);
  } catch (error) {
    next(error);
  }
};
/* --- Routes ---*/

proRouter.put("/user/project", login_required, createAndUpdate);
proRouter.post("/user/project", login_required, createAndUpdate);
proRouter.get("/user/project", login_required, getPros);

export { proRouter };
