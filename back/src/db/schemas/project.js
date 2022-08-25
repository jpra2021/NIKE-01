import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProjectModel = model("Project", ProjectSchema);
export { ProjectModel };
