import is from "@sindresorhus/is";
import { Router } from "express";
import { eduService } from "../services/eduService";
import { eduService1 } from "../services/eduServiceN";
//라우터 설정

const eduRouter = Router();

/*------Controller------- */
const createAndUpdate = async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;

    //const userId = req.params.id;
    const obj_id = req.body.obj_id;
    console.log("userId:", obj_id);

    const newData = { school, major, position };
    console.log("newData:", newData);

    const newEdu = await eduService1.setEdu({ obj_id, newData });

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
eduRouter.route("/edu/post").post(createAndUpdate);

//eduRouter.route("/userid/:id/edu").post(createAndUpdate);

eduRouter.route("/userid/:id/edu").put(createAndUpdate);
eduRouter.route("/userid/:id/edu").get(getData);

export { eduRouter };
