import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageStudent.css";
import StoreContext from "../../../context/StoreContext";
import axios from "axios";

const ManageStudent = () => {
  const navigate = useNavigate();
  const { token, url } = useContext(StoreContext);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${url}/api/admin/get-student`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("hii");
        setStudents(res.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [token]);

  const handleEdit = (id) => {
    navigate(`/admin/edit-student/${id}`);
  };

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this student?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${url}/api/admin/remove-student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student");
    }
  };

  return (
    <div className="manage-student">
      <div className="headin-registration">
        <h2>Student Course Fee Details</h2>
        <div className="registration-button">
          <button onClick={() => navigate("/admin/register-student")}>
            New Registration
          </button>
        </div>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Student Name</th>
            <th>Course Name</th>
            <th>Paid Fee (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.courseEnrolled[0]?.name || "N/A"}</td>
              <td>{student.paidFee}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/admin/update-student/${student._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(student._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudent;
