import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import './Style.css';

const NavComp = () => {
  
  return (
    <div className="nav-container">
      <Link to="" className="navbuttons">Home</Link>{" "}
      <Link to="/AboutUs" className="navbuttons">About Us</Link>{" "}
      <Link to="/AllCourses" className="navbuttons">All Courses</Link>{" "}
      <Link to="/Batches" className="navbuttons">Batches</Link>{" "}
      <Link to="/ContactUs" className="navbuttons">Contact Us</Link>{" "}
      {/* <Link to="" className="navbuttons">My Profile</Link>{" "} */}
    </div>
  );
};

export default NavComp;