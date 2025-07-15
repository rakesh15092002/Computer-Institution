// components/LoginPopup/LoginPopup.jsx
import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import StoreContext from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setRole } = useContext(StoreContext);

  const [data, setData] = useState({
    email: "",
    password: "",
    userType: "", // student | faculty | admin
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let route;
    if (data.userType === "student") route = "/api/student/login";
    else if (data.userType === "faculty") route = "/api/faculty/login";
    else if (data.userType === "admin") route = "/api/admin/login";
    else {
      toast.error("Please select a user type");
      return;
    }

    try {
      const res = await axios.post(url + route, data);
      if (res.data.success) {
        setToken(res.data.token);
        setRole(data.userType); // 👈 Set role for access control
        toast.success("Login successful!");
        setShowLogin(false);
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h1>Login</h1>
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="login-popup-input">
          {/* Role Select */}
          <div className="radio-section">
            {["student", "faculty", "admin"].map((role) => (
              <div key={role} className="radio-section-content">
                <input
                  type="radio"
                  name="userType"
                  value={role}
                  checked={data.userType === role}
                  onChange={onChangeHandler}
                />
                <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
              </div>
            ))}
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
          />
        </div>

        <button type="submit">Login</button>

        <div className="login-popup-reset">
          <p>
            <span>Reset Password</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
