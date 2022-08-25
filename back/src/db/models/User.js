import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    console.log("모델, filter성공:", filter);
    const update = { [fieldToUpdate]: newValue };
    console.log("모델, update성공:", update);
    const option = { returnOriginal: false };
    console.log("모델, opition성공", option);

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

export { User };
