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
    if (newInput.subject) {
      const fieldToUpdate = "subject";
      const newValue = newInput.subject;
      pro = await Project.update({ id, fieldToUpdate, newValue });
    }
    //description
    if (newInput.description) {
      const fieldToUpdate = "description";
      const newValue = newInput.description;
      pro = await Project.update({ id, fieldToUpdate, newValue });
    }
    //subject
    if (newInput.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = newInput.startDate;
      pro = await Project.update({ id, fieldToUpdate, newValue });
    }
    //subject
    if (newInput.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = newInput.endDate;
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
