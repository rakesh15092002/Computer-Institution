import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import "./AdminLayout.css";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import StoreContext from "../../../../context/StoreContext";

const AdminLayout = () => {
  const { url } = useContext(StoreContext);

  // const  on
  return (
    <div className="admin-layout">
      <div className="admin-navbar">
        <AdminNavbar />
      </div>

      <div className="admin-sidebar">
        <h2 className="admin-heading">DashBoard</h2>
        <AdminSidebar />
      </div>

      <div className="admin-main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
