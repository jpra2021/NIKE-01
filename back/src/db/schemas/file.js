import mongoose, { Schema, model } from "mongoose";

const File = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FileModel = model("File", UserSchema);
export { FileModel };
