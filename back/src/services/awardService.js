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

/* previous code */
/*
  static async setAward(inputdata) {
    const { id } = inputdata;
    const { title, description } = inputdata;

    let isAward = await Award.findById(id);

    if (!isAward) {
      const createAward = await Award.create(inputdata);

      return createAward;
    }

    let updateAward;

    if (title) {
      const fieldToUpdate = "title";
      const newValue = title;

      updateAward = await Award.update({ id, fieldToUpdate, newValue });
    }

    if (description) {
      const fieldToUpdate = "description";
      const newValue = description;

      updateAward = await Award.update({ id, fieldToUpdate, newValue });
    }

    return updateAward;
  }
*/
