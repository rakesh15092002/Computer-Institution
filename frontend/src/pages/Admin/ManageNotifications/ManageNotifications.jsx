import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageNotifications.css";
import axios from "axios";
import StoreContext from "../../../context/StoreContext";
import { toast } from "react-toastify";

const ManageNotifications = () => {
  const { url, token } = useContext(StoreContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, [url]);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${url}/api/notifications`);
      if (res.data.success && Array.isArray(res.data.data)) {
        const formatted = res.data.data.map((n, i) => ({
          ...n,
          id: i + 1,
        }));
        setNotifications(formatted);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.error("❌ Error fetching notifications:", err);
      toast.error("Failed to load notifications");
      setError("Failed to load notifications");
    }
    setLoading(false);
  };

  const handleRemove = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this notification?");
    if (!confirm) return;

    try {
      const res = await axios.delete(`${url}/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        toast.success("🗑️ Notification deleted");
        setNotifications((prev) => prev.filter((n) => n._id !== id));
      } else {
        toast.error("❌ Failed to delete");
      }
    } catch (error) {
      toast.error("❌ Error deleting");
      console.error(error);
    }
  };

  return (
    <div className="manage-notification">
      <div className="heading-notifications">
        <h2>Manage Notifications</h2>
        <div className="notification-button">
          <button onClick={() => navigate("/admin/add-notifications")}>
            Add New Notification
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <div className="notification-table">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Type</th>
                <th>Title</th>
                <th>Description</th>
                <th>User</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <tr key={n._id}>
                    <td>{n.id}</td>
                    <td>{n.type}</td>
                    <td>{n.title}</td>
                    <td>{n.desc}</td>
                    <td>{n.user}</td>
                    <td>{n.time}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(n._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No notifications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageNotifications;
