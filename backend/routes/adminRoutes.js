import express from 'express';
import { addStudent, adminLogin, getAllStudent, getstudentById, removeStudent, updateStudent } from '../controllers/adminControllers.js';
import adminMiddleware  from '../middleware/adminMiddleware.js'

const adminRouter = express.Router();
adminRouter.post('/login',adminLogin);
adminRouter.post('/add-student', adminMiddleware,addStudent);
adminRouter.get('/get-student',adminMiddleware,getAllStudent);
adminRouter.delete('/remove-student/:id',adminMiddleware,removeStudent)
adminRouter.put('/update-student/:id', adminMiddleware, updateStudent);

adminRouter.get('/getStudentById/:id',adminMiddleware,getstudentById);

export default adminRouter;
