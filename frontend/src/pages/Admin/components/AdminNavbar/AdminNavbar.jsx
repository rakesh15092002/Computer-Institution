import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';
import StoreContext from '../../../../context/StoreContext';

const AdminNavbar = () => {
  const { setToken, setRole } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken("");      // clear token
    setRole("");       // clear role
    navigate("/"); // redirect to login page
  };

  return (
    <div className="admin-navbar">
      <div className="admin-navbar-left">
        <h2>Admin Panel</h2>
      </div>
      <div className="admin-navbar-right">
        <button onClick={logout} className="admin-logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default AdminNavbar;
