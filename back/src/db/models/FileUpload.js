import { FileModel } from "../schemas/file";
import mongoose from "mongoose";
import { multer } from "multer";
//import { config } from "../db/config/db";
import { GridFsStorage } from "multer-gridfs-storage";

class File {
  /* GET - from user */

  static async findbyUserId(user_id) {
    const user = await FileModel.find({ user_id: user_id });
    return user;
  }
  static async findbyFilename(filename) {
    const file = await FileModel.find({
      filename: filename,
    });
    return filename;
  }

  static async create(newFileValue) {
    const newFile = await FileModel.create(newFileValue);
    return newFile;
  }
}

export { File };
