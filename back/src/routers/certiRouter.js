import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certiService } from "../services/certiService";

const certiRouter = Router();

/*------Controller------- */

/*-- CREATE --*/
const createNewCertis = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    /* must be same with schema!*/
    const { title, detail, date } = req.body;
    /* -req.currentUserId from login-requires -*/
    const user_id = req.currentUserId;

    const newCerti = await certiService.createCertis({
      user_id,
      title,
      detail,
      date,
    });

    if (newCerti.errorMessage) {
      throw new Error(newCerti.errorMessage);
    }

    res.status(201).json(newCerti);
  } catch (error) {
    next(error);
  }
};

/*-- UPDATE --*/
const updateNewCerti = async (req, res, next) => {
  try {
    const obj_id = req.body._id;
    const { title, detail, date } = req.body;

    //changed Input
    const newInput = { title, detail, date };
    const certi = await certiService.updateCerti(obj_id, newInput);

    res.status(201).send(certi);
  } catch (error) {
    next(error);
  }
};

/* -- GET --*/
const getCertis = async (req, res, next) => {
  try {
    const user_id = req.currentUserId;
    const certis = await certiService.getCertis(user_id);
    res.status(201).json(certis);
  } catch (err) {
    next(err);
  }
};

/*-- DELETE --*/
const deleteCerti = async (req, res, next) => {
  try {
    const obj_id = req.body._id;

    //changed Input
    await certiService.deleteCerti(obj_id);

    res.status(201).json({ message: "deleted!" });
  } catch (error) {
    next(error);
  }
};

certiRouter.post("/user/certificate", login_required, createNewCertis);
certiRouter.put("/user/certificate", login_required, updateNewCerti);
certiRouter.get("/user/certificate", login_required, getCertis);
certiRouter.delete("/user/certificate", login_required, deleteCerti);

export { certiRouter };
