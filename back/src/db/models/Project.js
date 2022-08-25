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
    //console.log("모델/filter상태는?:", id);
    const update = { [fieldToUpdate]: newValue };
    //console.log("모델/update상태는?:", update);
    const option = { returnOriginal: false };
    const updatedNewPro = await ProjectModel.findOneAndUpdate({
      filter,
      update,
      option,
    });
    console.log("모델/업데이트 되는 데이터는?", updatedNewPro);
    return updatedNewPro;
  }
}

export { Project };
