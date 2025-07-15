import React, { useContext, useState } from "react";
import "./AddNotifications.css";
import StoreContext from "../../../..//context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddNotifications = () => {
  const { url, token } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    type: "Message",
    title: "",
    desc: "",
    user: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${url}/api/notifications`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("🎉 Notification added successfully!");
        setFormData({
          type: "Message",
          title: "",
          desc: "",
          user: "",
        });
      } else {
        toast.error("⚠️ " + response.data.message);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Failed to add notification");
    }
  };

  return (
    <div className="add-notification">
      <h1>Add New Notification</h1>

      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="input-group">
          <p>Notification Type</p>
          <select name="type" onChange={handleChange} value={formData.type} required>
            <option value="Message">Message</option>
            <option value="Comment">Comment</option>
            <option value="Connect">Connect</option>
            <option value="Joined New User">Joined New User</option>
          </select>
        </div>

        <div className="input-group">
          <p>Notification Title</p>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            onChange={handleChange}
            value={formData.title}
            required
          />
        </div>

        <div className="input-group">
          <p>Notification Description</p>
          <textarea
            name="desc"
            placeholder="Enter description"
            rows={5}
            onChange={handleChange}
            value={formData.desc}
            required
          ></textarea>
        </div>

        <div className="input-group">
          <p>User</p>
          <input
            type="text"
            name="user"
            placeholder="Enter user name"
            onChange={handleChange}
            value={formData.user}
            required
          />
        </div>

        <button type="submit">Add Notification</button>
      </form>
    </div>
  );
};

export default AddNotifications;
