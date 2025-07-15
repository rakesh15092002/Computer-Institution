import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-content">
        <h2>SoftDev TallyGuru</h2>
        <ul className="sidebar-list">
          <li className="sidebar-list-li">
            <Link to="/admin/manage-student">Student</Link>
          </li>
          <li className="sidebar-list-li">
            <Link to="/admin/manage-course">Courses</Link>
          </li>
          <li className="sidebar-list-li">
            <Link to="/admin/manage-testimonials">Testimonials</Link>
          </li>
          <li className="sidebar-list-li">
            <Link to="/admin/manage-download">Study Material</Link>
          </li>
          <li className="sidebar-list-li">
            <Link to="/admin/manage-notifications">Notifications</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
