import { Education } from "../db/models/Education";

class eduService1 {
  /* --- CREATE & UPDATE -----*/
  /* user_id <= req.currentUserId from login-requires */

  static async setEdu(inputdata) {
    const { id } = inputdata;
    const { school, major, position } = inputdata;
    const setinputdata = { school, major, position };
    console.log("id가 존재하는가?:", id);

    /*-- for testing existence  --*/
    let edu = await Education.findById(id);
    console.log("edu(in eduService):", edu);
    console.log("!edu result?", !edu);
    //console.log("inputdata?", inputdata);

    if (!edu) {
      console.log(!edu, ":Educational Background is not exist, create new one");
      const creatednewEdu = await Education.create(inputdata);
      return creatednewEdu;
    }
    /* checking which part is updated*/
    /*then, if the key is not null(=have value), update */
    //check school
    console.log("else로 들어갈 id는?:", id);
    if (setinputdata.school) {
      const fieldToUpdate = "school";
      const newValue = setinputdata.school;
      console.log("inputdata.school은?", newValue);
      edu = await Education.update({ id, fieldToUpdate, newValue });
    }
    //check major
    if (setinputdata.major) {
      const fieldToUpdate = "major";
      const newValue = setinputdata.major;
      console.log("inputdata.major은?", newValue);
      edu = await Education.update({ id, fieldToUpdate, newValue });
    }
    //check position
    if (setinputdata.position) {
      const fieldToUpdate = "position";
      const newValue = setinputdata.position;
      console.log("inputdata.position은?", newValue);
      edu = await Education.update({ id, fieldToUpdate, newValue });
    }
    return edu;
  }

  /*--- GET ---*/
  static async getEdu({ user_Id }) {
    const edu = await Education.findById({ user_Id });
  }
}

export { eduService1 };
