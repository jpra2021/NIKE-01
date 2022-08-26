import { Education } from "../db/models/Education";

class eduService1 {
  /* --- CREATE & UPDATE -----*/
  /* user_id <= req.currentUserId from login-requires */

  static async setEdu(inputdata) {
    const { id } = inputdata;
    const { school, major, position } = inputdata;
    const setinputdata = { school, major, position };
    //console.log("id가 존재하는가?:", id);

    /*-- for testing existence  --*/
    let edu = await Education.findById(id);

    if (!edu) {
      const creatednewEdu = await Education.create(inputdata);
      return creatednewEdu;
    }
    /*then, if the key is not null(=have value), update */
    //check school

    if (setinputdata.school) {
      const fieldToUpdate = "school";
      const newValue = setinputdata.school;
      edu = await Education.update({ id, fieldToUpdate, newValue });
    }
    //check major
    if (setinputdata.major) {
      const fieldToUpdate = "major";
      const newValue = setinputdata.major;
      edu = await Education.update({ id, fieldToUpdate, newValue });
    }
    //check position
    if (setinputdata.position) {
      const fieldToUpdate = "position";
      const newValue = setinputdata.position;
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
