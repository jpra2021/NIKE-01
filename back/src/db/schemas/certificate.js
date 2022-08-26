import { Schema, model } from "mongoose";

const certificateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    date:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CertificateModel = model("Certificate", certificateSchema);
export { CertificateModel };
