import { Education } from "../db/models/Education";

class eduService1 {
  /* --- CREATE & UPDATE -----*/
  static async setEdu(inputdata) {
    const { userId, newData } = inputdata;
    console.log(
      "userId in Service:",
      userId,
      "   newData in service:",
      newData
    );
    let edu = await Education.findById(userId);

    if (!edu) {
      console.log("(!!) Educational Background is not exist, create new one");
      const creatednewEdu = await Education.create(newData);

      return creatednewEdu;
    } else if (newData.school) {
      /* checking what part is updated */
      const fieldToUpdate = "school";
      const newValue = newData.school;
      edu = await Education.update({ userId, fieldToUpdate, newValue });
    } else if (newData.major) {
      const fieldToUpdate = "major";
      const newValue = newData.major;
      edu = await Education.update({ userId, fieldToUpdate, newValue });
    } else if (newData.position) {
      const fieldToUpdate = "position";
      const newValue = newData.position;
      edu = await Education.update({ userId, fieldToUpdate, newValue });
    }
  }

  /*--- GET ---*/
  static async getEdu({ userId }) {
    const edu = await Education.findById({ userId });
  }
}

export { eduService1 };
