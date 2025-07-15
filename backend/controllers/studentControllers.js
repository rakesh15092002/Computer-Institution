import studentModel from "../models/studentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// Function to generate JWT token
const createToken = (id) => jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
);

// ✅ Fixed: Login a student
export const studentLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await studentModel.findOne({ email });

        if (!student) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Match the password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Generate token
        const token = createToken(student._id);

        res.json({ success: true, message: "Login successful hai", token });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Something went wrong" });
    }
};

// Get student profile
export const  studentProfile = async (req,res) =>{
    const {studentId} = req.body;
    try {
        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.json({ success: false, message: "Student not found" });
        }
        res.json({ success: true, student });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred" });
    }
}
