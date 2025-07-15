import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import StoreContext from "../../context/StoreContext"; // 👈 context import

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [hamburger, setHamburger] = useState(false);

  // 👇 context se token & role le rahe hain
  const { token, role } = useContext(StoreContext);

  // Toggle hamburger menu
  const toggleHamburger = () => {
    setHamburger(!hamburger);
  };

  // Close hamburger when a menu item is clicked
  const handleMenuClick = (item) => {
    setMenu(item);
    setHamburger(false);
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <img className="logo" src={assets.logo} alt="Logo" />
        </Link>
      </div>

      <div className={`navbar-menu ${hamburger ? "show" : ""}`}>
        <Link
          to="/"
          onClick={() => handleMenuClick("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="courses"
          onClick={() => handleMenuClick("course")}
          className={menu === "course" ? "active" : ""}
        >
          Courses
        </Link>
        <Link
          to="facility"
          onClick={() => handleMenuClick("facility")}
          className={menu === "facility" ? "active" : ""}
        >
          Facility
        </Link>
        <Link
          to="downloads"
          onClick={() => handleMenuClick("results")}
          className={menu === "results" ? "active" : ""}
        >
          Downloads
        </Link>
        <Link
          to="gallery"
          onClick={() => handleMenuClick("images")}
          className={menu === "images" ? "active" : ""}
        >
          Images
        </Link>
        <Link
          to="notifications"
          onClick={() => handleMenuClick("notifications")}
          className={menu === "notifications" ? "active" : ""}
        >
          Notifications
        </Link>
        <Link
          to="contact-us"
          onClick={() => handleMenuClick("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact Us
        </Link>
        <Link
          to="about-us"
          onClick={() => handleMenuClick("about")}
          className={menu === "about" ? "active" : ""}
        >
          About
        </Link>

        {/* ✅ Admin route sirf tabhi dikhe jab login ho aur role admin ho */}
        {token && role === "admin" && <Link to="/admin">Admin</Link>}

        <div className="navbar-button-sidebar">
          <button
            style={{
              color: "white",
              border: "1px solid grey",
              backgroundColor: "transparent",
              padding: "8px 20px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
      </div>
      {token ? (
        <div className="navbar-profile">
          <img src={assets.profile_icon} alt="" />
          <ul className="navbar-profile-dropdown">
            <li >
              <img src={assets.profile_icon} alt="" />
              <p>Profile</p>
            </li>
            <hr />
            <li >
              <img src={assets.profile_icon} alt="" />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      ) : (
        <div className="navbar-right">
          <div className="navbar-button">
            <button onClick={() => setShowLogin(true)}>Login</button>
          </div>
        </div>
      )}
      

      {/* Hamburger Menu Button */}
      <div
        className={`hamburger ${hamburger ? "active" : ""}`}
        onClick={toggleHamburger}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
