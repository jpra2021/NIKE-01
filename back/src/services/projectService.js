import { Project } from "../db/models/Project";

class projectService {
  /* ---CREATE----  */
  static async createPros(newInput) {
    const creatednewPro = await Project.create(newInput);
    return creatednewPro;
  }

  /* -- UPDATE --*/
  static async updatePro(user_id, newInput) {
    let pro;
    const { title, detail, date } = newInput;

    //check title
    if (title) {
      const fieldToUpdate = "title";
      const newValue = title;
      pro = await Project.update({ user_id, fieldToUpdate, newValue });
    }
    //check detail
    if (detail) {
      const fieldToUpdate = "detail";
      const newValue = detail;
      pro = await Project.update({ user_id, fieldToUpdate, newValue });
    }
    //check date
    if (date) {
      const fieldToUpdate = "date";
      const newValue = date;
      pro = await Project.update({ user_id, fieldToUpdate, newValue });
    }
    return pro;
  }

  /* -- GET -- */
  static async getPros(id) {
    const pro = await Project.find(id);
    return pro;
  }
  /*-- DELETE --*/
  static async deletePro(user_id) {
    const pro = await Project.delete(user_id);
    return pro;
  }
}

export { projectService };
