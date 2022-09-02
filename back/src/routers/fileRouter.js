import { Router } from "express";
import { file_upload } from "../middlewares/file_upload";
import { login_required } from "../middlewares/login_required";
import { fileService } from "../services/fileService";
import path from "path";
import fs from "fs";
import { file_delete } from "../middlewares/file_delete";
import { userAuthService } from "../services/userService";
const fileRouter = Router();
/* CREATE Single File*/
const uploadSingle = file_upload.single("file");

/* setting Default */
fileRouter.post("/settingDefaultImg", async (req, res, next) => {
  try {
    const defaultFileLink = `defaultImage/latte_default.png`;
    const user_id = req.body.user_id;
    const fileName = path.basename(defaultFileLink);
    const fileExt = path.extname(defaultFileLink);
    const fileSrc = path.join(defaultFileLink);
    const fileSize = fs.statSync(defaultFileLink).size;
    const userDefaultImg = { user_id, fileName, fileExt, fileSrc, fileSize };
    const newFile = await fileService.createFileSrc(userDefaultImg);
    if (newFile.errorMessage) {
      res.json({ ok: false });
      return;
    }
    console.log(`register ${user_id}'s default img in database`);
    res.json({
      ok: true,
      status: "register user's default imgSrc in database",
    });
  } catch (error) {
    next(error);
  }
});

fileRouter.get("/load/:id", login_required, async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const fileValue = await fileService.getUser(user_id);
    if (fileValue === null) {
      console.log("파일이 없습니다.");
    }
    const fileSrc = fileValue[0].fileSrc;
    //console.log("GET으로 받는 파일 주소:", fileSrc);
    res.json({ path: fileSrc });
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
      await userAuthService.updateImg(user_id, "latteIsHere");
      res.status(201).json({ message: "deleted!" });
    } catch (error) {
      next(error);
    }
  }
);

/*-- UPDATE --*/

fileRouter.put(
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
      //const fileSrc = path.join(__dirname, filePath);
      console.log("라우터의 파일src", fileSrc);
      const fileSize = req.file.size;
      const newFileValue = { user_id, fileName, fileExt, fileSrc, fileSize };

      const newFile = await fileService.updateFile(newFileValue);
      // const changedSrc = await newFile.fileSrc;
      const changedSrc = `http://kdt-ai5-team01.elicecoding.com:5001/LocalFile/${fileName}`;
      await userAuthService.updateImg(user_id, changedSrc);

      if (newFile.errorMessage) {
        res.json({ ok: false });
        return;
      }
      console.log("updated to LocalFile and database");
      res.json({ ok: true }); //path를 바로 보내는 방법도 생각
    } catch (error) {
      next(error);
    }
  }
);

export { fileRouter };

/*storage*/
// fs.readFile(defaultFileLink, (err, data) => {
//   if (err) {
//     console.log("latte is missing!");
//   } else {
//     console.log(`user(${user_id})'s Default img is saved to database`);
//     res.writeHead(200, { "Content-Type": "image/jpeg" });
//     res.end(data);
//   }
// });
/* post new file */
// fileRouter.post(
//   "/upload",
//   login_required,
//   uploadSingle,
//   async (req, res, next) => {
//     try {
//       //console.log(req.file);
//       const user_id = req.currentUserId;
//       const fileName = req.file.filename;
//       const fileExt = req.file.fieldname;
//       const fileSrc = req.file.path;
//       const fileSize = req.file.size;
//       const newFileValue = { user_id, fileName, fileExt, fileSrc, fileSize };

//       const newFile = await fileService.createFileSrc(newFileValue);

//       if (newFile.errorMessage) {
//         res.json({ ok: false });
//         return;
//       }
//       console.log("saved to LocalFile and database");
//       res.json({ ok: true });
//     } catch (error) {
//       next(error);
//     }
//   }
// );
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
