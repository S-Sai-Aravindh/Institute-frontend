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
                      <NavLink to="/Myprofile/admin/queries" className="subnavbuttons" activeClassName="active">Queries</NavLink>
                      <NavLink to="/Myprofile/admin/enrollrequest" className="subnavbuttons" activeClassName="active">Enroll Request</NavLink>
                  </div>
              )}
              
        
              {( location.pathname.startsWith('/Myprofile/student') || location.pathname === '/Myprofile/student' ) &&(
                <div className="subnav-container" style={{width:"280px"}}>
                  <h1 className='subnavheader'>Student Dashboard</h1>
                  <NavLink to="/Myprofile/student/dashboard" className="subnavbuttons" activeClassName="active">Dashboard</NavLink>{" "}
                  <NavLink to="/Myprofile/student/mycourse" className="subnavbuttons" activeClassName="active">My Course</NavLink>{" "}
                  <NavLink to="/Myprofile/student/allcourses" className="subnavbuttons" activeClassName="active">All Courses</NavLink>{" "}
                  <NavLink to="/Myprofile/student/batch" className="subnavbuttons" activeClassName="active">Batch Details</NavLink>{" "}
                  <NavLink to="/Myprofile/student/enrollform" className="subnavbuttons" activeClassName="active">Enroll Form</NavLink>{" "}
                </div>
              )}  
              {( location.pathname.startsWith('/Myprofile/teacher') || location.pathname === '/Myprofile/teacher') && (
                <div className="subnav-container" style={{width:"270px"}}>
                  <h1 className='subnavheader'>Teacher Dashboard</h1>
                  <NavLink to="/Myprofile/teacher/dashboard" className="subnavbuttons">Dashboard</NavLink>{" "}
                  <NavLink to="/Myprofile/teacher/students" className="subnavbuttons" activeClassName="active">Students</NavLink>{" "}
                  <NavLink to="/Myprofile/teacher/createcourse" className="subnavbuttons" activeClassName="active">Courses</NavLink>{" "}
                  <NavLink to="/Myprofile/teacher/batches" className="subnavbuttons" activeClassName="active">Student Batches</NavLink>{" "}
                  <NavLink to="/Myprofile/teacher/batch" className="subnavbuttons" activeClassName="active">Batch Details</NavLink>{" "}
                </div>
              )}
    </div>
  )
}

export default DashNav