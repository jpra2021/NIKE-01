import { File } from "../db/models/FileUpload";

class fileService {
  /*--- CREATE ---*/
  static async uploadFile(newFile_info) {
    const uploadedNewFile = await File.FileUpload(newFile_info);
    return uploadedNewFile;
  }
  /*--GET --*/
  static async getFiles(user_id) {
    const files = await File.findbyUserId(user_id);
  }

  /*DELETE*/
  static async deleteFile(obj_id, user_id) {
    const file = await File.deleteFile(obj_id, user_id);
    return file;
  }

  /* UPDATE */
}

export { fileService };
