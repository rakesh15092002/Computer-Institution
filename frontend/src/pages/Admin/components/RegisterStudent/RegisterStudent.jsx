import React, { useState, useContext } from 'react';
import './RegisterStudent.css';
import axios from 'axios';
import StoreContext from '../../../../context/StoreContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterStudent = () => {
  const { url, token } = useContext(StoreContext);
  const courses = ['CCC', 'DCA', 'DSA', 'Tally', 'Excel', 'Photoshop', 'ADCA', 'O Level'];
  const [selectedCourses, setSelectedCourses] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    address: '',
    city: '',
    pincode: '',
    email: '',
    phone: '',
    gender: 'Male',
    totalFee: '',
    paidFee: '',
  });

  const handleCourseChange = (e) => {
    const value = e.target.value;
    if (selectedCourses.includes(value)) {
      setSelectedCourses(selectedCourses.filter(c => c !== value));
    } else {
      setSelectedCourses([...selectedCourses, value]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.firstName || selectedCourses.length === 0) {
      toast.error("Please fill all required fields and select at least one course.");
      return;
    }

    const studentPayload = {
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      password: formData.phone, // using phone as default password
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}, ${formData.pincode}`,
      courseName: selectedCourses.join(", "),
      courseEnrolled: [], // If using ObjectIds, handle this differently
      joinDate: new Date(),
      gender: formData.gender,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      dob: formData.dob,
      totalFee: parseInt(formData.totalFee),
      paidFee: parseInt(formData.paidFee),
      image: "https://dummyimage.com/200x200/000/fff&text=Student", // Dummy photo URL
    };

    try {
      const res = await axios.post(`${url}/api/admin/add-student`, studentPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("object")

      if (res.data.success) {
        toast.success("Student registered successfully!");
        setFormData({
          firstName: '',
          lastName: '',
          fatherName: '',
          motherName: '',
          dob: '',
          address: '',
          city: '',
          pincode: '',
          email: '',
          phone: '',
          gender: 'Male',
          totalFee: '',
          paidFee: '',
        });
        setSelectedCourses([]);
      } else {
        toast.error(res.data.message || "Failed to register student.");
      }
      navigate('/admin/manage-student')
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while registering student.");
    }
  };

  return (
    <div className='register-student-page'>
      <div className="rs-student-content">
        <h1>Register New Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="student-information-section">
            <h2>Student Information</h2>
            <div className="student-info">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First Name' />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last Name' />
            </div>
            <div className="student-info">
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder='Father Name' />
              <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} placeholder='Mother Name' />
            </div>
            <div className="student-DOB">
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder='DOB' />
            </div>
          </div>

          <div className="student-address-section">
            <h2>Student Address</h2>
            <div className="student-address">
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder='Address' />
            </div>
            <div className="student-info">
              <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder='City' />
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder='Pin Code' />
            </div>
          </div>

          <div className="student-contact-section">
            <h2>Student Contact</h2>
            <div className="student-info">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' />
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='Mobile Number' />
            </div>
          </div>

          <div className="student-contact-section">
            <h2>Fee Information</h2>
            <div className="student-info">
              <input type="number" name="totalFee" value={formData.totalFee} onChange={handleChange} placeholder='Total Fee' />
              <input type="number" name="paidFee" value={formData.paidFee} onChange={handleChange} placeholder='Paid Fee' />
            </div>
          </div>

          <div className="student-course-section">
            <h2>Select Courses</h2>
            <div className="course-grid">
              {courses.map((course) => (
                <label key={course} className="course-checkbox">
                  {course}
                  <input
                    type="checkbox"
                    value={course}
                    checked={selectedCourses.includes(course)}
                    onChange={handleCourseChange}
                  />
                </label>
              ))}
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
