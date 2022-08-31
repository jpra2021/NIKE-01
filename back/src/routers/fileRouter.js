import { Router } from "express";
import { file_upload } from "../middlewares/file_upload";
import fs from "fs";
import { login_required } from "../middlewares/login_required";
import { fileService } from "../services/fileService";
const fileRouter = Router();
const uploadSingle = file_upload.single("file");
/* CREATE */
fileRouter.post(
  "/users/upload",
  login_required,
  uploadSingle,
  //스토리컴에 저장이 되는거고
  async (req, res, next) => {
    //저장된걸 mongk db 정보처리
    try {
      //console.log("File Uploaded 라우터에서:::", req.file);
      const user_id = req.currentUserId;
      const fileName = req.file.filename;
      //console.log("라우터 filename", fileName);
      const decoded = decodeURIComponent(fileName);
      //console.log("라우터 타입?", decoded);
      //console.log("라우터 decoded", decoded);
      const fileExt = req.file.fieldname;
      const fileSrc = req.file.path;
      const fileSize = req.file.size;

      const newFileValue = { user_id, fileName, fileExt, fileSrc, fileSize };
      //console.log("무엇이 전달되는가?(rout to ser)", newFileValue);

      const newFile = await fileService.createFileSrc(newFileValue);

      if (newFile.errorMessage) {
        throw new Error(newFile.errorMessage);
      }
      //console.log("Saved To database");
      //console.log("uploadFile:", newFile);
      res.send("ok");
    } catch (error) {
      next(error);
    }
  }
);

fileRouter.get("users/files");
fileRouter.get("users/file/:filename");

export { fileRouter };

//`${Date.now()}-nike-${file.originalname}.${ext}`
