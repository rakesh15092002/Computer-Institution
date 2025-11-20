import Testimonial from '../models/testimonial.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs';

export const addTestimonial = async (req, res) => {
  try {
    const { name, course, review, rating } = req.body;

    if (!name || !review || !rating) {
      return res.status(400).json({ message: "Name, review, and rating are required." });
    }

    let avatarUrl = '';

    // ✅ Case 1: Upload image file to Cloudinary
    if (req.file) {
      const localPath = req.file.path;
      const cloudinaryResult = await uploadOnCloudinary(localPath);

      if (!cloudinaryResult || !cloudinaryResult.url) {
        return res.status(500).json({ message: "Cloudinary upload failed" });
      }

      avatarUrl = cloudinaryResult.url; // Store only URL as string

      // ✅ Safe cleanup: delete file only if it exists
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
    }

    // ✅ Case 2: Use URL sent in request body
    else if (req.body.avatar) {
      avatarUrl = req.body.avatar;
    }

    const newTestimonial = new Testimonial({
      name,
      course,
      review,
      rating,
      avatar: avatarUrl, // Must be string
    });

    await newTestimonial.save();

    res.status(201).json({
      message: "Testimonial added successfully",
      testimonial: newTestimonial
    });

  } catch (err) {
    console.error("❌ Error adding testimonial:", err);
    res.status(500).json({ message: "Error adding testimonial", error: err.message });
  }
};

// Get all testimonials
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ date: -1 });
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ message: "Error fetching testimonials", error: err.message });
  }
};

// Delete testimonial by ID
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Testimonial.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting testimonial", error: err.message });
  }
};
