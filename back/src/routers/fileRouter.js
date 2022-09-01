import { Router } from "express";
import { file_upload } from "../middlewares/file_upload";
import { login_required } from "../middlewares/login_required";
import { fileService } from "../services/fileService";
import path from "path";
import { file_delete } from "../middlewares/file_delete";
const fileRouter = Router();
/* CREATE Single File*/
const uploadSingle = file_upload.single("file");

fileRouter.post(
  "/upload",
  login_required,
  uploadSingle,
  async (req, res, next) => {
    try {
      //console.log(req.file);
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
      console.log("saved to LocalFile and database");
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  }
);

fileRouter.get("/fileload", login_required, async (req, res, next) => {
  try {
    const user_id = req.currentUserId;
    const fileValue = await fileService.getUser(user_id);
    const fileSrc = fileValue[0].fileSrc;
    res.sendFile(path.join(__dirname, `../../${fileSrc}`));
  } catch (error) {
    next(error);
  }
});

fileRouter.delete(
  "/delete",
  login_required,
  file_delete,
  async (req, res, next) => {
    try {
      const user_id = req.currentUserId;
      const user = await fileService.deleteFile(user_id);
      res.status(201).json({ message: "deleted!" });
    } catch (error) {
      next(error);
    }
  }
);

/*-- UPDATE --*/
// fileRouter.put('/updateFile',login_required, async (req, res, next) => {
//   try {
//     const user_id = req.currentUserId;

//     //changed Input
//     const newInput = { school, major, degree };
//     const edu = await eduService.updateEdu(obj_id, newInput);

//     res.status(201).send(edu);
//   } catch (error) {
//     next(error);
//   }
// };)

export { fileRouter };

//`${Date.now()}-nike-${file.originalname}.${ext}`
