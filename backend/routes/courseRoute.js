import express from 'express';
import { addCourse, getAllCourses, deleteCourse } from '../controllers/courseControllers.js';
import { upload } from '../middleware/multer.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

// Change this 👇
router.post('/add',adminMiddleware, upload.single('image'), addCourse);

router.get('/get', getAllCourses);
router.delete('/delete/:id', adminMiddleware, deleteCourse);

export default router;
