import mongoose from "mongoose";
import course from "./courseModel.js"; // Reference to the Course Model
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    // Multiple courses a student can enroll in
    courseEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true,
    }],
    joinDate: { type: Date, required: true },
    gender: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dob: { type: Date, required: true },

    totalFee: { type: Number, required: true },
    paidFee: { type: Number, default: 0 },
    dueFee: { type: Number }, // Will be auto-calculated
    image: { type: String, required: true }
});

// Auto-calculate dueFee before saving
studentSchema.pre("save", function (next) {
    this.dueFee = this.totalFee - this.paidFee;
    next();
});

const student = mongoose.models.student || mongoose.model("student", studentSchema);
export default student;
