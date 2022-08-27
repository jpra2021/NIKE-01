import { Certificate } from "../db/models/Certificate";

class certiService {
  /* --- CREATE -----*/
  static async createCertis(newInput) {
    const creatednewCertis = await Certificate.create(newInput);

    return creatednewCertis;
  }

  /* --- UPDATE -----*/
  static async updateCerti(obj_id, newInput) {
    /* for return */
    let certi;
    const { title, detail, date } = newInput;
    //check title
    if (title) {
      const fieldToUpdate = "title";
      const newValue = title;
      certi = await Certificate.update({ obj_id, fieldToUpdate, newValue });
    }
    //check detail
    if (detail) {
      const fieldToUpdate = "detail";
      const newValue = detail;
      certi = await Certificate.update({ obj_id, fieldToUpdate, newValue });
    }

    //check date
    if (date) {
      const fieldToUpdate = "date";
      const newValue = date;
      certi = await Certificate.update({ obj_id, fieldToUpdate, newValue });
    }
    return certi;
  }

  /* --- GET -----*/
  static async getCertis(user_id) {
    const getCertis = await Certificate.find(user_id);
    return getCertis;
  }

  /* --- DELETE -----*/
  static async deleteCerti(obj_id) {
    const certi = await Certificate.delete(obj_id);
    return certi;
  }
}

export { certiService };
