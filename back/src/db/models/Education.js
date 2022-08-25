import { EducationModel } from "../schemas/education";

class Education {
  /*--- CREATE ---*/
  static async create(newEdu) {
    const createdNewEdu = await EducationModel.create(newEdu);
    //console.log("createdNewedu result", createdNewEdu);
    return createdNewEdu;
  }

  /* ---FIND ---*/
  /*-- for testing existence  --*/
  /*--user_id <= req.currentUserId from login-requires--*/
  static async findById(user_Id) {
    console.log("1 userId is pulled:", user_Id);
    const user = await EducationModel.findOne({ id: user_Id });
    //console.log("2--- user checking:", user);
    return user;
  }

  static async findAll() {
    const users = await EducationModel.findAll({});
    return users;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    //console.log("모델의 user_id가 받는 것은:", id);
    const filter = id;
    //console.log("모델, filter성공:", filter);
    const update = { [fieldToUpdate]: newValue };
    //console.log("모델, update성공:", update);
    const option = { returnOriginal: false };
    //console.log("모델, opition성공", option);

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
