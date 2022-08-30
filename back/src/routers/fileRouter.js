import { Router } from "express";
import { file_upload_single } from "../middlewares/file_upload";
import fs from "fs";
import { login_required } from "../middlewares/login_required";
import { fileService } from "../services/fileService";
const fileRouter = Router();

/* CREATE */
fileRouter.post(
  "users/upload",
  login_required,
  file_upload_single,
  async (req, res, next) => {
    try {
      const user_id = req.currentUserId;
      const imgPath = fs.readFileSync(req.file.path);
      const mimetype = req.file.mimetype;
      const encode_img = imgPath.toString("base64");

      const newFile_info = { user_id, encode_img, mimetype };

      const newFile = await fileService.uploadFile(newFile_info);
      console.log("Saved To database");
      console.log("uploadFile:", uploadFile);

      if (newFile.errorMessage) {
        throw new Error(newFile.errorMessage);
      }
      res.contentType(newFile.contentType);
      res.status(201).send(newFile.image);
    } catch (error) {
      next(error);
    }
  }
);

fileRouter.get("users/files");
fileRouter.get("users/file/:filename");

export { fileRouter };
