import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
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
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AwardModel = model("Award", AwardSchema);
export { AwardModel };
