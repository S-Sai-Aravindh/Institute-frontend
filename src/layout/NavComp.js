import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import '../Styles/Style.css';

const NavComp = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/'); 
  };
  return (
    <div className="nav-container">
      <h1 className="nav-header">Main Dashboard</h1>
      <Link to="" className="nav-btn">My Details</Link>{" "}
      <Link to="AttendanceRecord" className="nav-btn">Attendance Details</Link>{" "}
      <Link to="allemployees" className="nav-btn">All Employees</Link>{" "}
      <button onClick={handleLogout} className="nav-btn2">Logout</button>
    </div>
  );
};

export default NavComp;