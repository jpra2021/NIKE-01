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
    description: {
      type: String,
      required: true,
    },
    getDate:{
      type:Date,
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
