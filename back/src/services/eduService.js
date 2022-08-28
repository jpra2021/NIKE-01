import { Education } from "../db/models/Education";

class eduService {
  /* --- CREATE -----*/
  static async createEdus(newInput) {
    const creatednewEdu = await Education.create(newInput);
    return creatednewEdu;
  }

  static async updateEdu(obj_id, newInput) {
    /* for return */
    let edu;
    const { school, major, degree } = newInput;
    //check school
    if (school) {
      const fieldToUpdate = "school";
      const newValue = school;
      edu = await Education.update({ obj_id, fieldToUpdate, newValue });
    }
    //check major
    if (major) {
      const fieldToUpdate = "major";
      const newValue = major;
      edu = await Education.update({ obj_id, fieldToUpdate, newValue });
    }
    //check position
    if (degree) {
      const fieldToUpdate = "degree";
      const newValue = degree;
      edu = await Education.update({ obj_id, fieldToUpdate, newValue });
    }
    return edu;
  }

  /*--- GET ---*/
  static async getEdus(user_id) {
    const edu = await Education.find(user_id);
    return edu;
  }
  /*-- DELETE --*/
  static async deleteEdu(obj_id) {
    const edu = await Education.delete(obj_id);
    return edu;
  }
}

export { eduService };
