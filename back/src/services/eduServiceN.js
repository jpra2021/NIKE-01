import { Education } from "../db/models/Education";

class eduService1 {
  /* --- CREATE & UPDATE -----*/
  /* user_id <= req.currentUserId from login-requires */

  static async setEdu(inputdata) {
    const { id } = inputdata;
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
    } else if (inputdata.school) {
      /* checking what part is updated */
      const fieldToUpdate = "school";
      const newValue = inputdata.school;
      edu = await Education.update({ user_Id, fieldToUpdate, newValue });
    } else if (inputdata.major) {
      const fieldToUpdate = "major";
      const newValue = inputdata.major;

      edu = await Education.update({ user_Id, fieldToUpdate, newValue });
    } else if (inputdata.position) {
      const fieldToUpdate = "position";
      const newValue = inputdata.position;

      edu = await Education.update({ user_Id, fieldToUpdate, newValue });
    }
    console.log("이미 있습니다!");
  }

  /*--- GET ---*/
  static async getEdu({ user_Id }) {
    const edu = await Education.findById({ user_Id });
  }
}

export { eduService1 };
