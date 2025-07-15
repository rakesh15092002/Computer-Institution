import mongoose from "mongoose";
const { Schema } = mongoose;

const facultySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    }

});

export const faculty = mongoose.models.faculty || mongoose.model("faculty", facultySchema);
export default faculty;
// Compare this snippet from backend/models/courseModel.js: