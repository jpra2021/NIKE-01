import fs from "fs";
import path from "path";
import { fileService } from "../services/fileService";
import { response } from "express";

async function file_delete(req, res, next) {
  try {
    const user_id = req.currentUserId;
    const fileValue = await fileService.getUser(user_id);
    const fileSrc = fileValue[0].fileSrc;
    const filePath = path.join(__dirname, `../../${fileSrc}`);
    const deletedFile = await fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File Deleted");
      }
    });
    next();
  } catch (error) {
    next(error);
  }
}

export { file_delete };
