import { Router } from "express";
import { file_upload } from "../middlewares/file_upload";
import { login_required } from "../middlewares/login_required";
import { fileService } from "../services/fileService";
const fileRouter = Router();
const uploadSingle = file_upload.single("file");
/* CREATE Single File*/
fileRouter.post(
  "/users/upload",
  login_required,
  uploadSingle,
  async (req, res, next) => {
    try {
      const user_id = req.currentUserId;
      const fileName = req.file.filename;
      const fileExt = req.file.fieldname;
      const fileSrc = req.file.path;
      const fileSize = req.file.size;
      const newFileValue = { user_id, fileName, fileExt, fileSrc, fileSize };

      const newFile = await fileService.createFileSrc(newFileValue);

      if (newFile.errorMessage) {
        res.json({ ok: false });
        return;
      }
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  }
);

fileRouter.get("users/files");
fileRouter.get("users/file/:filename");

export { fileRouter };

//`${Date.now()}-nike-${file.originalname}.${ext}`
