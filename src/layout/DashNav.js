import React from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import './Style.css'

const DashNav = () => {
    const location = useLocation();
  return (
    <div>
        {(location.pathname.startsWith('/Myprofile/admin') || location.pathname === '/Myprofile/admin') && (
    <div className="subnav-container">
        <h1 className='subnavheader'>Admin Dashboard</h1>
        <NavLink to="/Myprofile/admin/dashboard" className="subnavbuttons" activeClassName="active">Dashboard</NavLink>
        <NavLink to="/Myprofile/admin/students" className="subnavbuttons" activeClassName="active">Students</NavLink>
        <NavLink to="/Myprofile/admin/teachers" className="subnavbuttons" activeClassName="active">Teachers</NavLink>
        <NavLink to="/Myprofile/admin/courses" className="subnavbuttons" activeClassName="active">Courses</NavLink>
        <NavLink to="/Myprofile/admin/batches" className="subnavbuttons" activeClassName="active">Batches</NavLink>
        <NavLink to="/Myprofile/admin/reports" className="subnavbuttons" activeClassName="active">Reports</NavLink>
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
  )
}

export default DashNav