import { Project } from "../db/models/Project";

class projectService {
  /* CREATE or UPDATE after checking  */
  static async setPro(newInput) {
    /* GET to check */
    const { id } = newInput;

    let pro = await Project.findById(id);

    if (!pro) {
      const createdNewPro = await Project.create(newInput);
      return createdNewPro;
    }
    //subject
    if (newInput.title) {
      const fieldToUpdate = "subject";
      const newValue = newInput.subject;
      pro = await Project.update({ id, fieldToUpdate, newValue });
    }
    //detail
    if (newInput.detail) {
      const fieldToUpdate = "detail";
      const newValue = newInput.detail;
      pro = await Project.update({ id, fieldToUpdate, newValue });
    }
    //date
    if (newInput.date) {
      const fieldToUpdate = "date";
      const newValue = newInput.date;
      pro = await Project.update({ id, fieldToUpdate, newValue });
    }
    return pro;
  }

  /*  GET  */
  static async getPro(id) {
    const pro = await Project.findById(id);
    return pro;
  }
}

export { projectService };
