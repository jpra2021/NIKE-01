import multer from "multer";
import fs from "fs";
import path from "path";

/* checking existence of folder */
try {
  fs.readdirSync("LocalUpload");
  console.log("Localupload 폴더가 있습니다.");
} catch (err) {
  console.error("LocalUpload 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("LocalUpload");
}

//const file_upload = multer({ storage: storage })

/* ---storage setting--- */

const file_upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "LocalFile");
    },
    filename(req, file, cb) {
      const user_id = req.currentUserId;
      const ext = path.extname(file.originalname);
      const newFilename = `nike_${user_id}_${Date.now()}${ext}`;
      console.log("multe결과값", newFilename);
      cb(null, newFilename);
    },
  }),
});
export { file_upload };

// function file_upload_single(req, res, next) {
//   try {
//     const singleUpload = multer({ storage: storage }).single(req.file);
//     const upload = util.promisify(singleUpload);d

//     next();
//   } catch (error) {
//     res.status(400).send("파일 업로드 실패(미들웨어 오류");
//     return;
//   }
// }

/* try catch */
// async function upload_single(req, res, next) {
//   try {
//     const uploadedFile = multer({ storage: storage }).single(req.body.PLZFile);
//     console.log("middleware", uploadedFile);
//     next();
//   } catch (error) {
//     res.status(400).send("multer middleware에서 문제가 생김");
//     return;
//   }
// }

// export { upload_single };

/* shorted */
// const file_upload = multer({ storage: storage });
// export { file_upload };

// /* ---storage setting--- */
// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//       //console.log("스토리지, destination-req", req, "\n-----------------");
//       //console.log("스토리지, destination-file", file, "\n-----------------");
//       cb(null, "/LocalUpload");
//     },
//     filename(req, file, cb) {
//       //to get file extension
//       const originalName = file.originalname;
//       //console.log("스토리지, filename, original", originalName);
//       ////const ext = path.extname(originalName);
//       //console.log("스토리지, filename, ext", ext);
//       //const newFilename = `${originalName}__${Date.now()}`;
//       //console.log("스토리지, filename, newFilename", newFilename);
//       const newFilename = file.filename + "-" + Date.now();
//       cb(null, newFilename);
//     },
//   });
