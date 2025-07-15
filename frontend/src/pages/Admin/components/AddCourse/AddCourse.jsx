import React, { useContext, useState } from "react";
import "./AddCourse.css";
import StoreContext from "../../../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddCourse = () => {
  const { url, token } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    fees: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("duration", formData.duration);
    data.append("fees", formData.fees);
    data.append("image", formData.image);

    try {
      const response = await axios.post(`${url}/api/course/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
      });

      if (response.data.success) {
        toast.success("🎉 Course added successfully!");
      } else {
        toast.error("⚠️ " + response.data.message);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Failed to add course");
    }
  };

  return (
    <div className="add-course">
      <h1>Add New Course</h1>

      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="input-group">
          <p>Course Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter course name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <p>Course Description</p>
          <textarea
            name="description"
            placeholder="Enter description"
            rows={5}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="input-group">
          <p>Course Duration</p>
          <input
            type="text"
            name="duration"
            placeholder="Enter duration (e.g., 3 months)"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <p>Course Fees</p>
          <input
            type="number"
            name="fees"
            placeholder="Enter fees"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <p>Upload Image</p>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
