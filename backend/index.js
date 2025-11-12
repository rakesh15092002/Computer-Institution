import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import studentRouter from './routes/studentRoutes.js';
import courseRouter from './routes/courseRoute.js';
import adminRouter from './routes/adminRoutes.js';
import testimonial from './routes/testimonialRoutes.js'
import materialRouter from './routes/materialRoutes.js';
import notificationRouter from './routes/notificationRoutes.js';

// Load environment variables
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); 
const allowedOrigins = [process.env.FRONTEND_URL]; // Replace with your actual frontend URLs
    app.use(cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true 
      
    }));

// API Routes
app.use("/api/student", studentRouter);  // ✅ Check this is correctly defined
app.use("/api/course",courseRouter);
app.use('/api/admin',adminRouter);
app.use('/api/testimonials',testimonial);
app.use("/api/materials", materialRouter)
app.use('/api/notifications', notificationRouter);

// Database connection
connectDB();

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
