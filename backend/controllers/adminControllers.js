import studentModel from "../models/studentModel.js";
import courseModel from "../models/courseModel.js"; // ✅ Renamed here
import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import validator from "validator";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey"; // Use .env in production

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Find admin by email
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "No such admin found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: "admin",
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

export const addStudent = async (req, res) => {
  try {
    console.log("📥 Received Student Body:", req.body);

    const {
      name,
      email,
      password,
      phone,
      address,
      courseName, // coming from frontend as string
      joinDate,
      gender,
      fatherName,
      motherName,
      dob,
      image,
      totalFee,
      paidFee,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !courseName ||
      !joinDate ||
      !gender ||
      !fatherName ||
      !motherName ||
      !dob ||
      !image
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // 🔍 Find course ID using courseName from frontend
    const course = await courseModel.findOne({ name: courseName });

    if (!course) {
      return res
        .status(400)
        .json({ success: false, message: "Course not found" });
    }

    const courseId = course._id;

    // 🔒 Check existing student
    const existStudent = await studentModel.findOne({ email });
    if (existStudent) {
      return res
        .status(409)
        .json({ success: false, message: "Student already exists" });
    }

    // ✉️ Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // 🔑 Validate password
    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 8 characters",
        });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧾 Save student
    const newStudent = new studentModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      courseEnrolled: [courseId], // ✅ using ID now
      courseName,
      joinDate: new Date(joinDate),
      gender,
      fatherName,
      motherName,
      dob: new Date(dob),
      image,
      totalFee,
      paidFee,
    });

    await newStudent.save();

    // 📌 Update course record (enroll student)
    await courseModel.findByIdAndUpdate(courseId, {
      $push: {
        studentsEnrolled: {
          studentId: newStudent._id,
          enrollmentDate: new Date(joinDate),
        },
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Student added successfully" });
  } catch (error) {
    console.log("❌ Error in addStudent:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

export const removeStudent = async (req, res) => {
  const { id } = req.params; // Getting the ID from request parameters

  try {
    // Find the student by ID
    const student = await studentModel.findById(id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Remove student from the courses they are enrolled in
    for (let courseId of student.courseEnrolled) {
      await courseModel.findByIdAndUpdate(courseId, {
        $pull: {
          studentsEnrolled: { studentId: student._id },
        },
      });
    }

    // Delete the student record
    await studentModel.findByIdAndDelete(id);

    // Respond with success message
    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error occurred while deleting student",
        error: error.message,
      });
  }
};

export const getAllStudent = async (req, res) => {
  try {
    // Fetch students with course details populated
    const students = await studentModel.find({}).populate("courseEnrolled");

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched students",
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching students",
      error: error.message,
    });
  }
};


export const updateStudent = async (req, res) => {
  const { id } = req.params;
  let {
    name,
    email,
    phone,
    address,
    courseEnrolled,
    gender,
    fatherName,
    motherName,
    dob,
    totalFee,
    paidFee,
    image
  } = req.body;

  if (!name || !email || !phone || !address || !gender || !fatherName || !motherName || !dob) {
    return res.status(400).json({ success: false, message: 'Required fields are missing.' });
  }

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format.' });
  }

  try {
    // Convert course names to ObjectId
    if (courseEnrolled && courseEnrolled.length > 0) {
      const courses = await courseModel.find({ name: { $in: courseEnrolled } });
      courseEnrolled = courses.map(course => course._id);
    }

    const updatedStudent = await studentModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        address,
        courseEnrolled,
        gender,
        fatherName,
        motherName,
        dob: new Date(dob),
        totalFee,
        paidFee,
        image,
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


export const getstudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await studentModel.findById(id).populate("courseEnrolled");

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
