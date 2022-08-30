import { multer } from "multer";
import mongoose from "mongoose";

//const file_upload = multer({ storage: storage })

/* ---storage setting--- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "File/");
  },
  filename: (req, file, cb) => {
    //to get file extension
    const ext = path.extname(file.originalname);
    const newFilename = `${Date.now()}-nike-${file.originalname}.${ext}`;
    cb(null, newFilename);
  },
});

function file_upload_single(req, res, next) {
  try {
    const singleUpload = multer({ storage: storage }).single(req.file);
    const upload = util.promisify(singleUpload);
    next();
  } catch (error) {
    res.status(400).send("파일 업로드 실패(미들웨어 오류");
    return;
  }
}

export { file_upload_single };
