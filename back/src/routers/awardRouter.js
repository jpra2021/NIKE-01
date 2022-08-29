import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
import { awardMsg } from "../db/constant/errorMessage";

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

    //ERROR THROW
    if (!title) {
      throw new Error(awardMsg.NO_TITLE_ERROR);
    } else if (!description) {
      throw new Error(awardMsg.NO_DESC_ERROR);
    }

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

    //ERROR THROW
    if (!title) {
      throw new Error(awardMsg.NO_TITLE_ERROR);
    } else if (!description) {
      throw new Error(awardMsg.NO_DESC_ERROR);
    } else if (!obj_id) {
      throw new Error(awardMsg.NO_OBJ_ERROR);
    }

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
    const user_id = req.params.id;
    //ERROR THROW
    if (!user_id) {
      throw new Error(awardMsg.NO_USERID_ERROR);
    }

    const awards = await awardService.getAwards(user_id);
    res.status(201).json(awards);
  } catch (error) {
    next(error);
  }
};

/*-- DELETE --*/
const deleteAward = async (req, res, next) => {
  try {
    const obj_id = req.params.id;

    if (!obj_id) {
      throw new Error(awardMsg.NO_OBJ_ERROR);
    }

    //changed Input
    await awardService.deleteAward(obj_id);

    res.status(201).json({ message: "deleted!" });
  } catch (error) {
    next(error);
  }
};

/*-------Router-------*/
awardRouter.post("/users/award", login_required, createNewAwards);
awardRouter.put("/users/award", login_required, updateNewAward);
awardRouter.get("/users/:id/award", login_required, getAwards);
awardRouter.delete("/users/:id/award", login_required, deleteAward);

export { awardRouter };
