import bcrypt from "bcrypt";
import adminModel from "./models/adminModel.js";
import { connectDB }  from "./config/db.js";

connectDB();

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await adminModel.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      phone: "9876543210",
      dob: "2000-01-01",
      photo: "https://dummyimage.com/admin-photo.jpg",
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
