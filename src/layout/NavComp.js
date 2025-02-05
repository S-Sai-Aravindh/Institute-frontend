import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Style.css';

const NavComp = () => {
  const location = useLocation();

  // Define allowed routes and construct My Profile path dynamically
  // const allowedRoutes = [ "/Myprofile/admin", "/Myprofile/student", "/Myprofile/teacher"];

  const allowedRoute = getAllowedRoute();
  // const isProfileVisible = allowedRoutes.includes(location.pathname);

  return (
    <div>
      <div className="nav-container">
        <Link to="/" className="navbuttons">Home</Link>{" "}
        <Link to="/AboutUs" className="navbuttons">About Us</Link>{" "}
        <Link to="/AllCourses" className="navbuttons">All Courses</Link>{" "}
        <Link to="/Batches" className="navbuttons">Batches</Link>{" "}
        <Link to="/ContactUs" className="navbuttons">Contact Us</Link>{" "}
        {allowedRoute && (
          <Link to={allowedRoute} className="navbuttons" >My Profile</Link>
        )}
      </div>

      {location.pathname === '/Myprofile/admin' && (
        <div className="subnav-container">
          <Link to="/" className="subnavbuttons">Admin</Link>{" "}
          <Link to="/" className="subnavbuttons">About Us</Link>{" "}
          <Link to="/" className="subnavbuttons">All Courses</Link>{" "}
          <Link to="/" className="subnavbuttons">Batches</Link>{" "}
          <Link to="/" className="subnavbuttons">Contact Us</Link>{" "}
        </div>
      )}
      {location.pathname === '/Myprofile/student' && (
        <div className="subnav-container">
          <Link to="/" className="subnavbuttons">Student</Link>{" "}
          <Link to="/" className="subnavbuttons">About Us</Link>{" "}
          <Link to="/" className="subnavbuttons">All Courses</Link>{" "}
          <Link to="/" className="subnavbuttons">Batches</Link>{" "}
          <Link to="/" className="subnavbuttons">Contact Us</Link>{" "}
        </div>
      )}
      {location.pathname === '/Myprofile/teacher' && (
        <div className="subnav-container">
          <Link to="/" className="subnavbuttons">teacher</Link>{" "}
          <Link to="/" className="subnavbuttons">About Us</Link>{" "}
          <Link to="/" className="subnavbuttons">All Courses</Link>{" "}
          <Link to="/" className="subnavbuttons">Batches</Link>{" "}
          <Link to="/" className="subnavbuttons">Contact Us</Link>{" "}
        </div>
      )}

    </div>
  );
};

const getAllowedRoute = () => {
  const role = sessionStorage.getItem('role');
  const allowedRoutes = ["/Myprofile/admin", "/Myprofile/student", "/Myprofile/teacher"];

  switch (role) {
      case 'Admin':
          return allowedRoutes[0]; // "/Myprofile/admin"
      case 'Student':
          return allowedRoutes[1]; // "/Myprofile/student"
      case 'Teacher':
          return allowedRoutes[2]; // "/Myprofile/teacher"
      default:
          return null;
  }
};

export default NavComp;
