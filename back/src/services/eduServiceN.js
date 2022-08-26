import { Education } from "../db/models/Education";

class eduService1 {
  /* --- CREATE & UPDATE -----*/
  /* user_id <= req.currentUserId from login-requires */

  static async setEdu(inputdata) {
    const { id } = inputdata;
    //const { school, major, degree } = inputdata;
    //console.log("id가 존재하는가?:", id);

    /*-- for testing existence  --*/
    let edu = await Education.findById(id);

    if (!edu) {
      const creatednewEdu = await Education.create(inputdata);
      return creatednewEdu;
    }
    /*then, if the key is not null(=have value), update */
    //check school

    if (inputdata.school) {
      const fieldToUpdate = "school";
      const newValue = school;
      edu = await Education.update({ id, fieldToUpdate, newValue });
    }
    //check major
    if (inputdata.major) {
      const fieldToUpdate = "major";
      const newValue = major;
      edu = await Education.update({ id, fieldToUpdate, newValue });
    }
    //check position
    if (inputdata.degree) {
      const fieldToUpdate = "degree";
      const newValue = degree;
      edu = await Education.update({ id, fieldToUpdate, newValue });
    }
    return edu;
  }

  /*--- GET ---*/
  static async getEdu(id) {
    const edu = await Education.findById(id);
    return edu;
  }
}

export { eduService1 };
