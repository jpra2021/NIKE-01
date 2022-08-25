import { EducationModel } from "../schemas/education";

class Education {
  /*--- CREATE ---*/
  static async create(newEdu) {
    const createdNewEdu = await EducationModel.create(newEdu);
    return createdNewEdu;
  }

  /* ---FIND ---*/
  /*-- for testing existence  --*/
  /*--user_id <= req.currentUserId from login-requires--*/
  static async findById(user_Id) {
    console.log("1 userId is pulled:", user_Id);
    const user = await EducationModel.findOne({ id: user_Id });
    return user;
  }

  static async findAll() {
    const users = await EducationModel.findAll({});
    return users;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = id;
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEdu = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEdu;
  }
}

export { Education };

/* userSertvie is using 'findById', the _id*/
/* However, Education(model) and eduSerivce is using 'findOne'*/
