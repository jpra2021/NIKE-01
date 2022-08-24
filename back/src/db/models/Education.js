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

  static async findById(obj_id) {
    console.log("userId 가져옴:", obj_id);
    const id = mongoose.Types.ObjectId(obj_id);
    console.log(typeof id);
    /* object id used */
    const user = await UserModel.findById({ _id: id }).populate("edu");
    /* user id used */
    const usertest = await UserModel.findOne({
      id: "cbb84ddc-64ab-4444-a71b-3d7b81759ede",
    }).populate("edu");

    console.log("user체킹:", user);
    console.log("usertest체킹:", usertest);
    return usertest;
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
