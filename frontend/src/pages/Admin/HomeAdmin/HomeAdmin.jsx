import React from "react";
import "./HomeAdmin.css";
// import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { Outlet } from "react-router-dom";

const HomeAdmin = () => {
  return (
    <div className="admin-panel">
      <div className="admin-sidebar">{/* <AdminSidebar /> */}</div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeAdmin;
