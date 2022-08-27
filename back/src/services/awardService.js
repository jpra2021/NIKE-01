import { Award } from "../db/models/Award";

class awardService {
  /* --- CREATE -----*/
  static async createAwards(newInput) {
    const creatednewAwards = await Award.create(newInput);
    return creatednewAwards;
  }

  /* --- UPDATE -----*/
  static async updateAward(obj_id, newInput) {
    /* for return */
    let award;
    const { title, description } = newInput;
    //check title
    if (title) {
      const fieldToUpdate = "title";
      const newValue = title;
      award = await Award.update({ obj_id, fieldToUpdate, newValue });
    }
    //check description
    if (description) {
      const fieldToUpdate = "description";
      const newValue = description;
      award = await Award.update({ obj_id, fieldToUpdate, newValue });
    }
    return award;
  }

  /* --- GET -----*/
  static async getAwards(user_id) {
    const getAward = await Award.find(user_id);
    return getAward;
  }

  /* --- DELETE -----*/
  static async deleteAward(obj_id) {
    const award = await Award.delete(obj_id);
    return award;
  }
}

export { awardService };
