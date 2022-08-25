import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    edu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Education",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };

/*const user_id = jwtDecoded.user_id; 가 userid인경우 --시도중*/
/*const user_id = jwtDecoded.user_id; 가 Obj id인경우 */
