import mongoose from "mongoose";

import { Schema } from "mongoose";

const adminSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    },
    photo:{
        type:String,
        required:true,
    },
});

export const admin = mongoose.models.admin || mongoose.model("admin",adminSchema);
export default admin;
// Compare this snippet from backend/models/courseModel.js:
