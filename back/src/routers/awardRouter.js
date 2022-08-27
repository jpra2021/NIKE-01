import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();

/*------Controller------- */

/*-- CREATE --*/
const createNewAwards = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    /* must be same with schema!*/
    const { title, description } = req.body;

    /* -req.currentUserId from login-requires -*/
    const user_id = req.currentUserId;

    const newAward = await awardService.createAwards({
      user_id,
      title,
      description,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }
    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
};

/*-- UPDATE --*/
const updateNewAward = async (req, res, next) => {
  try {
    const obj_id = req.body._id;
    const { title, description } = req.body;

    //changed Input
    const newInput = { title, description };
    const award = await awardService.updateAward(obj_id, newInput);

    res.status(201).send(award);
  } catch (error) {
    next(error);
  }
};

/* -- GET --*/
const getAwards = async (req, res, next) => {
  try {
    const user_id = req.currentUserId;
    const awards = await awardService.getAwards(user_id);
    res.status(201).json(awards);
  } catch (error) {
    next(error);
  }
};

/*-- DELETE --*/
const deleteAward = async (req, res, next) => {
  try {
    const obj_id = req.body._id;

    //changed Input
    await awardService.deleteAward(obj_id);

    res.status(201).json({ message: "deleted!" });
  } catch (error) {
    next(error);
  }
};

/*-------Router-------*/
awardRouter.post("/user/award", login_required, createNewAwards);
awardRouter.put("/user/award", login_required, updateNewAward);
awardRouter.get("/user/award", login_required, getAwards);
awardRouter.delete("/user/award", login_required, deleteAward);

export { awardRouter };
