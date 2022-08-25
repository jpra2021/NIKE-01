import { Project } from "../db/models/Project";

class projectService {
  /* CREATE or UPDATE after checking  */
  static async setPro(newInput) {
    /* GET to check */
    const { id } = newInput;
    //const { subject, description, startDate, endDate } = newInput;
    //const setinputData = { subject, description, startDate, endDate };

    let pro = await Project.findById(id);
    console.log("이미 있는 유저인가?:", pro);

    if (!pro) {
      const createdNewPro = await Project.create(newInput);
      console.log("서비스/pro의 상태는:", pro);
      return createdNewPro;
    }
    //subject
    if (newInput.subject) {
      const fieldToUpdate = "subject";
      const newValue = newInput.subject;
      pro = await Project.update({ id, fieldToUpdate, newValue });
      //console.log("서비스/subject상태는?", newValue);
    }
    //description
    if (newInput.description) {
      const fieldToUpdate = "description";
      const newValue = newInput.description;
      pro = await Project.update({ id, fieldToUpdate, newValue });
      //console.log("서비스/d상태는?", newValue);
    }
    //subject
    if (newInput.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = newInput.startDate;
      pro = await Project.update({ id, fieldToUpdate, newValue });
      //console.log("서비스/sD상태는?", newValue);
    }
    //subject
    if (newInput.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = newInput.endDate;
      pro = await Project.update({ id, fieldToUpdate, newValue });
      //console.log("서비스/endD상태는?", newValue);
    }
    console.log("이미 있습니다!");
    return pro;
  }

  /*  GET  */
  static async getPro(id) {
    const pro = await Project.findById(id);
    return pro;
  }
}

export { projectService };
