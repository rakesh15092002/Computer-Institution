import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import StoreContext from "../../context/StoreContext";
import TopHeader from "../TopHeader/TopHeader";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [hamburger, setHamburger] = useState(false);

  const { token, role } = useContext(StoreContext);

  const toggleHamburger = () => {
    setHamburger(!hamburger);
  };

  const handleMenuClick = (item) => {
    setMenu(item);
    setHamburger(false);
  };

  const handleMobileLoginClick = () => {
    setShowLogin(true);
    setHamburger(false); // Close menu after clicking login
  };

  return (
    <div className="navbar">
      <TopHeader />
      <div className="bottom">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <img src={assets.logo} alt="Logo" className="logo" />
        </Link>

        {/* Menu */}
        <div className={`navbar-menu ${hamburger ? "show" : ""}`}>
          <Link to="/" onClick={() => handleMenuClick("home")} className={menu === "home" ? "active" : ""}>Home</Link>
          <Link to="courses" onClick={() => handleMenuClick("course")} className={menu === "course" ? "active" : ""}>Courses</Link>
          <Link to="facility" onClick={() => handleMenuClick("facility")} className={menu === "facility" ? "active" : ""}>Facility</Link>
          <Link to="downloads" onClick={() => handleMenuClick("results")} className={menu === "results" ? "active" : ""}>Downloads</Link>
          <Link to="gallery" onClick={() => handleMenuClick("images")} className={menu === "images" ? "active" : ""}>Images</Link>
          <Link to="notifications" onClick={() => handleMenuClick("notifications")} className={menu === "notifications" ? "active" : ""}>Notifications</Link>
          <Link to="contact-us" onClick={() => handleMenuClick("contact")} className={menu === "contact" ? "active" : ""}>Contact Us</Link>
          <Link to="about-us" onClick={() => handleMenuClick("about")} className={menu === "about" ? "active" : ""}>About</Link>
          <Link to="about-us" onClick={() => handleMenuClick("about")} className={menu === "about" ? "active" : ""}>Testimonials</Link>

          {token && role === "admin" && <Link to="/admin">Admin</Link>}

          {/* Mobile Login Button (Hidden on Desktop via CSS) */}
          <button className="navbar-login-btn-mobile" onClick={handleMobileLoginClick}>
            Login
          </button>
        </div>

        {/* Desktop Login Button (Hidden on Mobile via CSS) */}
        <div className="navbar-button-desktop">
          <button className="navbar-login-btn" onClick={() => setShowLogin(true)}>Login</button>
        </div>

        {/* Hamburger */}
        <div className={`hamburger ${hamburger ? "active" : ""}`} onClick={toggleHamburger}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;