import { IntroModel } from "../schemas/intro";

class Intro {
  /* CREATE */
  static async create(newIntro) {
    const createdNewIntro = await IntroModel.create();
    return createdNewIntro;
  }

  /* UPDATE */
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { user_id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedIntro = await IntroModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedIntro;
  }

  /* -- FIND --- */
  static async findByUserId(user_id) {
    const user = await IntroModel.findOne({});
    return user;
  }

  /*-- DELETE --*/
  static async delete(obj_id, user_id) {
    const deletedPro = await IntroModel.findOneAndDelete({
      _id: obj_id,
      user_id: user_id,
    });
    return deletedPro;
  }
}

export { Intro };
