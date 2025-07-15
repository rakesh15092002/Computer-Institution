import express from "express";
import {
  uploadMaterial,
  getMaterials,
  deleteMaterial,
} from "../controllers/materialController.js";
import { upload } from "../middleware/multer.js";
import adminAuth from "../middleware/adminMiddleware.js";

const materialRouter = express.Router();

materialRouter.post(
  "/upload",
  adminAuth,
  upload.fields([
    { name: "file", maxCount: 1 },   // PDF file
    { name: "image", maxCount: 1 }   // Image file
  ]),
  uploadMaterial
);
materialRouter.get("/:category", getMaterials);
materialRouter.delete("/:id", adminAuth, deleteMaterial); // ✅ Fixed

export default materialRouter;
