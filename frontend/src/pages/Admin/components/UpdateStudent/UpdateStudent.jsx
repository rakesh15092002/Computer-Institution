import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import StoreContext from '../../../../context/StoreContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const UpdateStudent = () => {
  const { id } = useParams();
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const courses = ['CCC', 'DCA', 'DSA', 'Tally', 'Excel', 'Photoshop', 'ADCA', 'O Level'];
  const [selectedCourses, setSelectedCourses] = useState([]);

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

  // ✅ Fetch existing student
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${url}/api/admin/getStudentById/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const student = res.data.student;

          const [firstName = '', lastName = ''] = student.name.split(' ');

          setFormData({
            firstName,
            lastName,
            fatherName: student.fatherName || '',
            motherName: student.motherName || '',
            dob: student.dob?.slice(0, 10) || '',
            address: student.address?.split(',')[0] || '',
            city: student.address?.split(',')[1]?.trim() || '',
            pincode: student.address?.split(',')[2]?.trim() || '',
            email: student.email || '',
            phone: student.phone || '',
            gender: student.gender || 'Male',
            totalFee: student.totalFee || '',
            paidFee: student.paidFee || '',
          });

          setSelectedCourses(
            student.courseEnrolled?.map((course) => course.name) || []
          );
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load student details');
      }
    };

    if (id) fetchStudent();
  }, [id, url, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setSelectedCourses((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPayload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}, ${formData.pincode}`,
      courseEnrolled: selectedCourses,
      gender: formData.gender,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      dob: formData.dob,
      totalFee: formData.totalFee,
      paidFee: formData.paidFee,
      image: 'https://dummyimage.com/200x200/000/fff&text=Student',
    };

    try {
        console.log("pahle")
      const res = await axios.put(
        `${url}/api/admin/update-student/${id}`,
        updatedPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("bad me")

      if (res.data.success) {
        toast.success('Student updated successfully!');
      } else {
        toast.error(res.data.message || 'Update failed');
      }
      navigate('/admin/manage-student')
    } catch (err) {
      console.error(err);
      toast.error('Error updating student');
    }
  };

  return (
    <div className="register-student-page">
      <div className="rs-student-content">
        <h1>Update Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="student-information-section">
            <h2>Student Information</h2>
            <div className="student-info">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
            </div>
            <div className="student-info">
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father Name" />
              <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} placeholder="Mother Name" />
            </div>
            <div className="student-DOB">
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
          </div>

          <div className="student-address-section">
            <h2>Student Address</h2>
            <div className="student-address">
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
            </div>
            <div className="student-info">
              <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pin Code" />
            </div>
          </div>

          <div className="student-contact-section">
            <h2>Student Contact</h2>
            <div className="student-info">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Mobile Number" />
            </div>
          </div>

          <div className="student-contact-section">
            <h2>Fee Information</h2>
            <div className="student-info">
              <input type="number" name="totalFee" value={formData.totalFee} onChange={handleChange} placeholder="Total Fee" />
              <input type="number" name="paidFee" value={formData.paidFee} onChange={handleChange} placeholder="Paid Fee" />
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

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
