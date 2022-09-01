import mongoose, { Schema, model } from "mongoose";

const FileSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileExt: {
      type: String,
      required: true,
    },
    fileSrc: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FileModel = model("FileList", FileSchema);
export { FileModel };
