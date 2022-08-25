import { Education } from "../db/models/Education";

class eduService1 {
  /* --- CREATE & UPDATE -----*/
  /* user_id <= req.currentUserId from login-requires */
  static async setEdu(inputdata) {
    const { user_Id, school } = inputdata;

    let edu = await Education.findById(school);
    console.log("edu 체킹 서비스에서:", edu);
    console.log("!edu결과는?", !edu);
    console.log("inputdata는?", inputdata);

    if (!edu) {
      console.log("(!!) Educational Background is not exist, create new one");
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
  }

  /*--- GET ---*/
  static async getEdu({ user_Id }) {
    const edu = await Education.findById({ user_Id });
  }
}

export { eduService1 };
