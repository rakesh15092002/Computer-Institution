import React, { useState, useEffect, useContext } from 'react';
import './ManageCourse.css';
import axios from 'axios';
import StoreContext from '../../../context/StoreContext';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ManageCourse = () => {
  const { url ,token } = useContext(StoreContext);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch courses
  useEffect(() => {
    fetchCourses();
  }, [url]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${url}/api/course/get`);
      if (res.data.success) {
        const courseWithId = res.data.courses.map((course, index) => ({
          id: index + 1,
          name: course.name,
          price: course.fees,
          duration: course.duration,
          photo: course.image,
          _id: course._id,
        }));
        setCourses(courseWithId);
      } else {
        toast.error("⚠️ Failed to load courses");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Error fetching course data");
    }
  };

  // ✅ Handle remove course
  const handleRemove = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this course?");
  if (!confirm) return;

  try {

    const res = await axios.delete(`${url}/api/course/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      toast.success("🗑️ Course deleted successfully");
      setCourses(courses.filter(course => course._id !== id));
    } else {
      toast.error("❌ Failed to delete course");
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    toast.error("❌ Error deleting course");
  }
};


  return (
    <div className='manage-course'>
      <div className="headin-registration">
        <h2>Student Course Fee Details</h2>
        <div className="registration-button">
          <button onClick={() => navigate('/admin/add-course')}>Add New Course</button>
        </div>
      </div>

      <div className="course-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Duration</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="6">No courses available</td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.price}</td>
                  <td>{course.duration}</td>
                  <td>
                    <img
                      src={course.photo}
                      alt={course.name}
                      width="60"
                      height="40"
                      style={{ objectFit: 'cover' }}
                    />
                  </td>
                  <td>
                    <button className="remove-btn" onClick={() => handleRemove(course._id)}>Remove</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourse;
