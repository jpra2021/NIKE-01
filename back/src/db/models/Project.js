import { ProjectModel } from "../schemas/project";

/* setting class with Mongoose Query */
class Project {
  /* CREATE */
  static async create(newPro) {
    const createdNewPro = await ProjectModel.create(newPro);
    return createdNewPro;
  }

  /* UPDATE */
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { _id: user_id };
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
  static async find(id) {
    const user = await ProjectModel.find({ id: id });
    return user;
  }

  /*-- DELETE --*/
  static async delete(user_id) {
    const deletedPro = await ProjectModel.findOneAndDelete({ _id: user_id });
    return deletedPro;
  }
}

export { Project };
