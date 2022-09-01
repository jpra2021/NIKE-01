import { User } from "../db";
import { File } from "../db/models/FileUpload";

class fileService {
  /*--- CREATE ---*/
  static async createFileSrc(newFileValue) {
    const newFile = await File.create(newFileValue);
    return newFile;
  }
  /*--GET --*/
  static async getUser(user_id) {
    const user = await File.findbyUserId(user_id);
    return user;
  }

  /*DELETE*/
  static async deleteFile(user_id) {
    const deletedfile = await File.deleteFile(user_id);
    return deletedfile;
  }

  /* UPDATE */
  static async updateFile(newInput) {
    /* for return */
    const { user_id, fileName, fileExt, fileSrc, fileSize } = newInput;
    let file = await File.findbyUserId(user_id);

    //file = await File.updateFile(user_id, changedFile);
    if (fileName) {
      const fieldToUpdate = "fileName";
      const newValue = fileName;
      file = await File.updateFile(user_id, fieldToUpdate, newValue);
    }
    if (fileExt) {
      const fieldToUpdate = "fileExt";
      const newValue = fileExt;
      file = await File.updateFile(user_id, fieldToUpdate, newValue);
    }
    if (fileSrc) {
      const fieldToUpdate = "fileSrc";
      const newValue = fileSrc;
      file = await File.updateFile(user_id, fieldToUpdate, newValue);
    }
    if (fileSize) {
      const fieldToUpdate = "fileSize";
      const newValue = fileSize;
      file = await File.updateFile(user_id, fieldToUpdate, newValue);
    }
    return file;
  }
}

export { fileService };
