import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
      enum: ["재학중", "학사졸업", "석사졸업", "박사졸업"],
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);
export { EducationModel };
