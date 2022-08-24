import mongoose from "mongoose";
import { EducationModel } from "../schemas/education";
import { UserModel } from "../schemas/user";
import { User } from "./User";

class Education {
  //Create
  static async create(newEdu) {
    const createdNewEdu = await EducationModel.create(newEdu);
    console.log("createdNewedu 결과물:", createdNewEdu);
    console.log("EducationModel있니없니", EducationModel);
    return createdNewEdu;
  }

  /*user_id <- req.currentId */
  static async findById(user_Id) {
    console.log("1 userId 가져옴:", user_Id);

    const user = await EducationModel.findOne({ id: user_Id });

    console.log("2--- findeone작동했니안했네user체킹:", user);

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
