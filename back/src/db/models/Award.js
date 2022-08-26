import { AwardModel } from "../schemas/award";

class Award {
  /*--- CREATE ---*/
  static async create(newAward) {
    const createAward = await AwardModel.create(newAward);
    return createAward;
  }

  /* --UPDATE -- */
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { _id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updateAward;
  }

  /* ---FIND ---*/
  //to get all docs of the user
  static async find(id) {
    const users = await AwardModel.find({ id: id });
    return users;
  }

  /* -- Delete -- */
  static async delete(user_id) {
    const filter = { _id: user_id };
    const deleteAward = await AwardModel.findOneAndDelete(filter);

    return deleteAward;
  }
}

export { Award };


/*
   static async findById(id) {
      const findAward = await AwardModel.findOne({ id });
      return findAward;
  }
*/