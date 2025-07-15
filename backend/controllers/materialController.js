import Material from "../models/materialModel.js";
import { uploadOnCloudinary, cloudinary } from "../utils/cloudinary.js";

import fs from "fs";

export const uploadMaterial = async (req, res) => {
  try {
    const { title, desc, category } = req.body;

    const file = req.files?.file?.[0];
    const image = req.files?.image?.[0];

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No PDF file uploaded" });
    }

    // Upload PDF
    const pdfResult = await uploadOnCloudinary(file.path, "raw");
    fs.unlinkSync(file.path); // delete local temp PDF

    if (!pdfResult?.url) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Failed to upload PDF on Cloudinary",
        });
    }

    // Upload Image (optional)
    let imageResult = null;
    if (image) {
      imageResult = await uploadOnCloudinary(image.path, "image");
      fs.unlinkSync(image.path); // delete local temp image
    }

    const newMaterial = new Material({
      title,
      desc,
      category,
      fileUrl: pdfResult.url,
      imgUrl: imageResult?.url || "https://via.placeholder.com/150",
      public_id: pdfResult.public_id,
    });

    await newMaterial.save();

    res.status(201).json({ success: true, material: newMaterial });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMaterials = async (req, res) => {
  try {
    const category = req.params.category?.toLowerCase(); // ✅ ensure lowercase

    if (!["notes", "pyq", "ebooks", "assignments"].includes(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });
    }

    const materials = await Material.find({ category });

    res.status(200).json(materials);
  } catch (err) {
    console.error(" getMaterials error:", err);
    res.status(500).json({ message: err.message });
  }
};

import mongoose from "mongoose";

export const deleteMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(materialId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    const material = await Material.findById(materialId);
    if (!material) {
      return res
        .status(404)
        .json({ success: false, message: "Material not found" });
    }

    if (material.public_id) {
      await cloudinary.uploader.destroy(material.public_id, {
        resource_type: "raw",
      });
    }

    await Material.findByIdAndDelete(materialId);

    res
      .status(200)
      .json({ success: true, message: "Material deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err); // log the actual error
    res.status(500).json({ success: false, message: err.message });
  }
};
