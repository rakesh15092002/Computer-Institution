import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Function to upload files (PDFs, etc.)
export const uploadOnCloudinary = async (localFilePath) => {
  try {
    const absolutePath = path.resolve(localFilePath);

    const response = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "raw", // for PDFs
      type: "upload",
      access_mode: "public",
    });

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    return null;
  }
};

// ✅ Export the actual cloudinary SDK for deletion
export { cloudinary };
