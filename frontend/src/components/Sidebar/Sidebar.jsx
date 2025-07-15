import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const handleClick = (menuName) => {
    setMenu(menuName);
    closeSidebar();
  };

  return (
    <div className='sidebar'>
      <div className="sidebar-container">

        {/* Sidebar Navigation */}
        <div className="sidebar-content">
          <ul>
            <li><Link to="/" onClick={() => handleClick("home")}>Home</Link></li>
            <li><Link to="/courses" onClick={() => handleClick("course")}>Course</Link></li>
            <li><Link to="/facility" onClick={() => handleClick("facility")}>Facility</Link></li>
            <li><Link to="/downloads" onClick={() => handleClick("results")}>Download</Link></li>
            <li><Link to="/gallery" onClick={() => handleClick("images")}>Images</Link></li>
            <li><Link to="/contact-us" onClick={() => handleClick("contact")}>Contact</Link></li>
            <li><Link to="/about-us" onClick={() => handleClick("about")}>About</Link></li>
          </ul>
        </div>

        {/* Optional: Login Button */}
        <div className="sidebar-login">
          <button onClick={() => { setShowLogin(true); closeSidebar(); }}>
            Login
          </button>
        </div>

        {/* Sidebar Footer (Logout) */}
        <div className="sidebar-footer" onClick={closeSidebar}>
          <img src="/path-to-logout-icon.png" alt="Logout Icon" className="sidebar-logout-icon" />
          <p>Close</p>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
