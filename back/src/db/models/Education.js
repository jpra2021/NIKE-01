import { EducationModel } from "../schemas/education";

class Education {
  /*--- CREATE ---*/
  static async create(newEdu) {
    const createdNewEdu = await EducationModel.create(newEdu);
    return createdNewEdu;
  }

  /* --UPDATE -- */
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { _id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEdu = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEdu;
  }

  /* ---FIND ---*/
  //to get all docs of the user
  static async find(id) {
    const users = await EducationModel.find({ id: id });
    return users;
  }
}

export { Education };

/* userSertvie is using 'findById', the _id*/
/* However, Education(model) and eduSerivce is using 'findOne'*/

/* storage */
/* 
 //--user_id <= req.currentUserId from login-requires--
 static async findById(user_id) {
  const user = await EducationModel.findById({ _id: user_id });
  return user;
}

static async findAll() {
  const users = await EducationModel.findAll({});
  return users;
}
*/
