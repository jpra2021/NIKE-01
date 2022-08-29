import { EducationModel } from "../schemas/education";

class Education {
  /*--- CREATE ---*/
  static async create(newEdu) {
    const createdNewEdu = await EducationModel.create(newEdu);
    return createdNewEdu;
  }

  /* --UPDATE -- */
  static async update({ obj_id, fieldToUpdate, newValue }) {
    const filter = { _id: obj_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEdu = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEdu;
  }

  /* ---FIND ---*/
  //to get all docs of the user
  static async find(user_id) {
    const users = await EducationModel.find({ user_id: user_id });
    return users;
  }

  /* ---DELETE ---*/
  static async delete(obj_id) {
    const deletedEdu = await EducationModel.findOneAndDelete({ _id: obj_id });
    return deletedEdu;
  }
}

export { Education };
