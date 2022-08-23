import mongoose, { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    school :{
        type:String,
        required:true
    },
    major:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true,
        enum:['재학중', '학사졸업', '석사졸업', '박사졸업']
    }
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
