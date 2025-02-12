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
        <div className="subnav-containermt">
          <Link to="/Myprofile/admin/dashboard" className="subnavbuttonsmt">Dashboard</Link>{" "}
          <Link to="/Myprofile/admin/students" className="subnavbuttonsmt">Students</Link>{" "}
          <Link to="/Myprofile/admin/teachers" className="subnavbuttonsmt">Teachers</Link>{" "}
          <Link to="/Myprofile/admin/courses" className="subnavbuttonsmt">Courses</Link>{" "}
          <Link to="/Myprofile/admin/batches" className="subnavbuttonsmt">Batches</Link>{" "}
          <Link to="/Myprofile/admin/queries" className="subnavbuttonsmt">Queries</Link>{" "}
          <Link to="/Myprofile/admin/enrollrequest" className="subnavbuttonsmt">Enroll Request</Link>{" "}
        </div>
      )}


      {( location.pathname.startsWith('/Myprofile/student') || location.pathname === '/Myprofile/student' ) &&(
        <div className="subnav-containermt">
          <Link to="/Myprofile/student/dashboard" className="subnavbuttonsmt">Dashboard</Link>{" "}
          <Link to="/Myprofile/student/mycourse" className="subnavbuttonsmt">My Course</Link>{" "}
          <Link to="/Myprofile/student/allcourses" className="subnavbuttonsmt">All Courses</Link>{" "}
          <Link to="/Myprofile/student/batch" className="subnavbuttonsmt">Batch Details</Link>{" "}
          <Link to="/Myprofile/student/enrollform" className="subnavbuttonsmt">Enroll Form</Link>{" "}
        </div>
      )}
      {( location.pathname.startsWith('/Myprofile/teacher') || location.pathname === '/Myprofile/teacher') && (
        <div className="subnav-containermt">
          <Link to="/Myprofile/teacher/dashboard" className="subnavbuttonsmt">Dashboard</Link>{" "}
          <Link to="/Myprofile/teacher/students" className="subnavbuttonsmt">Students</Link>{" "}
          <Link to="/Myprofile/teacher/createcourse" className="subnavbuttonsmt">Courses</Link>{" "}
          <Link to="/Myprofile/teacher/batches" className="subnavbuttonsmt">Student Batches</Link>{" "}
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
