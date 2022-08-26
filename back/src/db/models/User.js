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

<<<<<<< HEAD
  static async findById({ user_id }) {
=======
  static async findById(user_id) {
    console.log("이놈이문제냐??", typeof user_id);
>>>>>>> f7ff45fe2170cc3bfe6e54a6542cb172288eb3ed
    const user = await UserModel.findOne({ user_id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { user_id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

export { User };
