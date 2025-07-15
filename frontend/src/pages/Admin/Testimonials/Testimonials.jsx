import React, { useContext, useEffect, useState } from "react";
import "./Testimonials.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import StoreContext from "../../../context/StoreContext";

const Testimonials = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchTestimonials = async () => {
    try {
      console.log("Start");
      const res = await axios.get(`${url}/api/testimonials/allTestimonials`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("end");
      setTestimonials(res.data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      toast.error("Failed to load testimonials");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;

    try {
      await axios.delete(`${url}/api/testimonials/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Testimonial deleted");
      setTestimonials((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete testimonial");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="manage-testimonial">
      <div className="heading-testimonial">
        <h2>Student Testimonials</h2>
        <div className="testimonial-button">
          <button onClick={() => navigate("/admin/add-testimonials")}>
            Add Testimonial
          </button>
        </div>
      </div>

      <table className="testimonial-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Course</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Avatar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No testimonials found
              </td>
            </tr>
          ) : (
            testimonials.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.course || "N/A"}</td>
                <td>{item.rating} ⭐</td>
                <td>{item.review.slice(0, 60)}...</td>
                <td>
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt="avatar"
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Testimonials;
