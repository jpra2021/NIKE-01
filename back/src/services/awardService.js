import { Award } from "../db/models/Award";

class awardService {
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

  static async getAward(id) {
    const getAward = await Award.findById(id);
    return getAward;
  }

  static async deleteAward(inputdata){
    const deleteAward = await Award.delete(inputdata);

    return deleteAward;
  }
}

export { awardService };
