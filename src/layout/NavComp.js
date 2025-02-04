import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Style.css';

const NavComp = () => {
  const location = useLocation();

  // Define allowed routes and construct My Profile path dynamically
  const allowedRoutes = ["/Myprofile/admin", "/Myprofile/student", "/Myprofile/teacher"];
  const isProfileVisible = allowedRoutes.includes(location.pathname);

  return (
    <div>
      <div className="nav-container">
        <Link to="/" className="navbuttons">Home</Link>{" "}
        <Link to="/AboutUs" className="navbuttons">About Us</Link>{" "}
        <Link to="/AllCourses" className="navbuttons">All Courses</Link>{" "}
        <Link to="/Batches" className="navbuttons">Batches</Link>{" "}
        <Link to="/ContactUs" className="navbuttons">Contact Us</Link>{" "}
        {isProfileVisible && (
          <Link to={`${location.pathname}`} className="navbuttons">My Profile</Link>
        )}
      </div>

      <div className="subnav-container">
        <Link to="/" className="subnavbuttons">Home</Link>{" "}
        <Link to="/" className="subnavbuttons">About Us</Link>{" "}
        <Link to="/" className="subnavbuttons">All Courses</Link>{" "}
        <Link to="/" className="subnavbuttons">Batches</Link>{" "}
        <Link to="/" className="subnavbuttons">Contact Us</Link>{" "}
      </div>
    </div>
  );
};

export default NavComp;
