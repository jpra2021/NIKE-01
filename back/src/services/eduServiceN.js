import { Education } from "../db/models/Education";

class eduService1 {
  /* --- CREATE -----*/
  /* user_id <= req.currentUserId from login-requires */

  static async createEdus(newInput) {
    const creatednewEdu = await Education.create(newInput);
    return creatednewEdu;
  }

  static async updateEdu(user_id, newInput) {
    /* for return */
    let edu;
    const { school, major, degree } = newInput;
    //check school
    if (school) {
      const fieldToUpdate = "school";
      const newValue = school;
      edu = await Education.update({ user_id, fieldToUpdate, newValue });
    }
    //check major
    if (major) {
      const fieldToUpdate = "major";
      const newValue = major;
      edu = await Education.update({ user_id, fieldToUpdate, newValue });
    }
    //check position
    if (degree) {
      const fieldToUpdate = "degree";
      const newValue = degree;
      edu = await Education.update({ user_id, fieldToUpdate, newValue });
    }
    return edu;
  }

  /*--- GET ---*/
  static async getEdus(id) {
    const edu = await Education.find(id);
    return edu;
  }
}

export { eduService1 };
