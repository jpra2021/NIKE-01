import mongoose, { Schema, model } from "mongoose";

const FileSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FileModel = model("FileList", FileSchema);
export { FileModel };
