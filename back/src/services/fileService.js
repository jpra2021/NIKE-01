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
  static async updateEdu(obj_id, newInput) {
    /* for return */
    let file;
    const { fileName, fileExt, fileSrc, fileSize } = newInput;
    //check school
    if (fileName) {
      const fieldToUpdate = "fileName";
      const newValue = fileName;
      file = await File.update({ obj_id, fieldToUpdate, newValue });
    }
    //check major
    if (fileName) {
      const fieldToUpdate = "fileName";
      const newValue = fileName;
      file = await File.update({ obj_id, fieldToUpdate, newValue });
    }
    //check position
    if (fileName) {
      const fieldToUpdate = "fileName";
      const newValue = fileName;
      file = await File.update({ obj_id, fieldToUpdate, newValue });
    }
    if (fileName) {
      const fieldToUpdate = "fileName";
      const newValue = fileName;
      file = await File.update({ obj_id, fieldToUpdate, newValue });
    }
    return fi;
  }
}

export { fileService };
