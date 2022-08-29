import { Schema, model } from "mongoose";

const IntroSchema = new Schema(
  {
    user_id: {
      type: String,
      max: 300,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const IntroModel = model("Intro", IntroSchema);
export { IntroModel };
