
import fs from "fs";
import course from "../models/courseModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addCourse = async (req, res) => {
    const { name, duration, fees, description } = req.body;
    // console.log(req.file)

    if (!name || !duration || !fees || !description || !req.file) {
        return res.json({ success: false, message: "All fields including image are required" });
    }

    let localPath;
    try {
        const existCourse = await course.findOne({ name });
        if (existCourse) {
            return res.json({ success: false, message: "Course already exists" });
        }

        localPath = req.file.path;
        // console.log(localPath)
        const imageUrl = await uploadOnCloudinary(localPath);

        const newCourse = new course({
            name,
            duration,
            fees,
            description,
            image: imageUrl,
        });

        await newCourse.save();

        return res.json({ success: true, message: "Course added successfully" });
    } catch (error) {
        console.error("Error adding course:", error);
        return res.json({ success: false, message: "Something went wrong" });
    } finally {
        if (localPath && fs.existsSync(localPath)) {
            fs.unlinkSync(localPath);
        }
    }
};



// Delete course
export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.json({ success: false, message: "course ID is required" });
    }

    try {
        const courseToDelete = await course.findByIdAndDelete(id);
        if (!courseToDelete) {
            return res.json({ success: false, message: "course not found" });
        }

        return res.json({ success: true, message: "course deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Something went wrong" });
    }
}


export const getAllCourses = async (req, res) => {
  try {
    const courses = await course.find({}).sort({ createdAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};


// Enroll in course

