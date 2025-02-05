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

      {(location.pathname.startsWith('/Myprofile/admin') || location.pathname === '/Myprofile/admin') && (
        <div className="subnav-container">
          <Link to="/Myprofile/admin" className="subnavbuttons">Dashboard</Link>{" "}
          <Link to="/Myprofile/admin/students" className="subnavbuttons">Manage Students</Link>{" "}
          <Link to="/Myprofile/admin/teachers" className="subnavbuttons">Manage Teachers</Link>{" "}
          <Link to="/Myprofile/admin/courses" className="subnavbuttons">Manage Courses</Link>{" "}
          <Link to="/Myprofile/admin/batches" className="subnavbuttons">Manage Batches</Link>{" "}
          <Link to="/Myprofile/admin/reports" className="subnavbuttons">View Reports</Link>{" "}
        </div>
      )}


      {( location.pathname.startsWith('/Myprofile/student') || location.pathname === '/Myprofile/student' ) &&(
        <div className="subnav-container">
          <Link to="/Myprofile/student" className="subnavbuttons">Dashboard</Link>{" "}
          <Link to="/Myprofile/student/courses" className="subnavbuttons">Enroll in Courses</Link>{" "}
          <Link to="/Myprofile/student/profile" className="subnavbuttons">Profile</Link>{" "}
          <Link to="/Myprofile/student/batch" className="subnavbuttons">Batch Information</Link>{" "}
        </div>
      )}
      {( location.pathname.startsWith('/Myprofile/teacher') || location.pathname === '/Myprofile/teacher') && (
        <div className="subnav-container">
          <Link to="/Myprofile/teacher" className="subnavbuttons">Dashboard</Link>{" "}
          <Link to="/Myprofile/teacher/enrolledcourses" className="subnavbuttons">My Courses</Link>{" "}
          <Link to="/Myprofile/teacher/createcourse" className="subnavbuttons">Create Course</Link>{" "}
          <Link to="/Myprofile/teacher/students" className="subnavbuttons">Manage Students</Link>{" "}
          <Link to="/Myprofile/teacher/batches" className="subnavbuttons">Manage Batches</Link>{" "}
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
