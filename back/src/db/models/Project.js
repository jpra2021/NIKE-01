import { ProjectModel } from "../schemas/project";

class Project {
  /* CREATE */
  static async create(newPro) {
    const createdNewPro = await ProjectModel.create(newPro);
    return createdNewPro;
  }

  /* UPDATE */
  static async update({ obj_id, fieldToUpdate, newValue }) {
    const filter = { _id: obj_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedNewPro = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedNewPro;
  }

  /* -- FIND --- */
  static async find(user_id) {
    const user = await ProjectModel.find({ user_id: user_id });
    return user;
  }

  /*-- DELETE --*/
  static async delete(obj_id, user_id) {
    const deletedPro = await ProjectModel.findOneAndDelete({
      _id: obj_id,
      user_id: user_id,
    });
    return deletedPro;
  }
}

export { Project };
