import multer from "multer";
import fs from "fs";
import path from "path";

/* checking existence of folder */
try {
  fs.readdirSync("LocalFile");
} catch (err) {
  console.error("LocalFile 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("LocalFile");
}
/*---multer to file upload---*/

const file_upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "LocalFile");
    },
    filename: function (req, file, cb) {
      const user_id = req.currentUserId;
      const ext = path.extname(file.originalname);
      const newFilename = `nike_${user_id}_${Date.now()}${ext}`;
      cb(null, newFilename);
    },
  }),
});

//console.log(multer.diskStorage);
export { file_upload };
