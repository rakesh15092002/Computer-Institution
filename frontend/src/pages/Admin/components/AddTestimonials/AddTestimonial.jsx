import React, { useState, useContext } from 'react';
import axios from 'axios';
import './AddTestimonial.css';
import StoreContext from '../../../../context/StoreContext';
import { toast } from 'react-toastify';

const AddTestimonial = () => {
  const { url, token } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    review: '',
    rating: '5',
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]); // single file
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('course', formData.course);
    data.append('review', formData.review);
    data.append('rating', formData.rating);
    if (avatar) data.append('avatar', avatar);

    // 🔍 Debug: Show what's inside FormData
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    // ✅ Check endpoint path — make sure it's /testimonials/add
    const response = await axios.post(`${url}/api/testimonials/add`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Response:", response.data); // 🔍 Confirm success
    toast.success('✅ Testimonial added!');
    setFormData({ name: '', course: '', review: '', rating: '5' });
    setAvatar(null);
  } catch (error) {
    console.error("❌ Axios Error:", error.response?.data || error.message); // 🔍 Proper debug
    toast.error('❌ Failed to submit testimonial');
  }
};


  return (
    <div className="testimonial-container">
      <h2 className="form-heading">Add Testimonial</h2>
      <p className="form-subtitle">Enter student's feedback and rating below</p>

      <form className="testimonial-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Name <span>*</span></label>
          <input
            type="text"
            name="name"
            placeholder="Rakesh Maurya"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <input
            type="text"
            name="course"
            placeholder="ADCA, DSA, CCC etc."
            value={formData.course}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Review <span>*</span></label>
          <textarea
            name="review"
            rows="4"
            placeholder="Share their experience in brief"
            value={formData.review}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Rating <span>*</span></label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Choose Photo</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="submit-btn">Add Testimonial</button>
      </form>
    </div>
  );
};

export default AddTestimonial;
