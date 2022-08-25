import { ProjectModel } from "../schemas/project";

/* setting class with Mongoose Query */
class Project {
  /* GET = find in Mongoose */
  static async findById(id) {
    const user = await ProjectModel.findOne({ id });
    return user;
  }

  //checking : is findAll needed?

  /* CREATE */
  static async create(newPro) {
    const createdNewPro = await ProjectModel.create(newPro);
    return createdNewPro;
  }
  /* UPDATE */
  static async update({ id, fieldToUpdate, newValue }) {
    const filter = id;
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedNewPro = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedNewPro;
  }
}

export { Project };
