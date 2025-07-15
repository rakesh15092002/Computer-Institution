import express from 'express';
import {
  addTestimonial,
  getAllTestimonials,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import adminMiddleware from "../middleware/adminMiddleware.js";
import { upload } from '../middleware/multer.js';

const router = express.Router();

// Routes
router.post('/add', adminMiddleware, upload.single('avatar'), addTestimonial); // 🔧 fixed
router.get('/allTestimonials', getAllTestimonials);
router.delete('/delete/:id', adminMiddleware, deleteTestimonial);

export default router;
