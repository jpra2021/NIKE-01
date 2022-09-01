import { FileModel } from "../schemas/file";

class File {
  /* CREATE */
  static async create(newFileValue) {
    const newFile = await FileModel.create(newFileValue);
    return newFile;
  }
  /* GET - from user */
  static async findbyUserId(user_id) {
    const user = await FileModel.find({ user_id: user_id });
    return user;
  }

  /* ---DELETE ---*/
  static async deleteFile(user_id) {
    const deleteFile = await FileModel.findOneAndDelete({ user_id: user_id });
    return deleteFile;
  }

  /*--UPDATE--*/
  static async updateFile(user_id, newValue) {
    const filter = { user_id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedFile = await FileModel.findByIdAndUpdate(
      filter,
      update,
      option
    );
    return updatedFile;
  }
}

export { File };
