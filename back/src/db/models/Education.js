import mongoose from "mongoose";
import { EducationModel } from "../schemas/education";
import { UserModel } from "../schemas/user";
import { User } from "./User";

class Education {
  //Create
  static async create(newEdu) {
    const createdNewEdu = await EducationModel.create(newEdu);
    console.log("createdNewedu 결과물:", createdNewEdu);
    return createdNewEdu;
  }

  /*user_id <- req.currentId */
  static async findById(user_Id) {
    console.log("1 userId 가져옴:", user_Id);
    //const convertedid = mongoose.Types.ObjectId(user_Id);
    //console.log("convertedid의 타입:", typeof convertedid);
    /* object id used */
    //const user = await UserModel.findOne({ id: convertedid });

    const user = await UserModel.findOne({ id: user_Id });

    // const user = await EducationModel.findOne({
    //   school: "좋은학교",
    // });
    //const user = null;

    //const user = await UserModel.findById({ user_id: id }).populate("edu");
    /* user id used */
    // const usertest = await UserModel.findOne({
    //   id: "cbb84ddc-64ab-4444-a71b-3d7b81759ede",
    // }).populate("edu");

    console.log("user체킹:", user);
    //console.log("usertest체킹:", usertest);
    return user;
  }

  static async findAll() {
    const users = await EducationModel.findAll({});
    return users;
  }

  static async update(user_id, fieldToUpdate, newValue) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEdu = await EducationModel.findByIdAndUpdate(
      filter,
      update,
      option
    );
    return updatedEdu;
  }
}

export { Education };
