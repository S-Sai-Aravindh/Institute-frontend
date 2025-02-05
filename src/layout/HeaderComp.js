import React, { useState, useEffect } from 'react';
import Logo from '../assets/Logo/logoimgfinal-Photoroom.png';
import './Style.css';
import { Link, useNavigate } from 'react-router-dom';
import NavComp from './NavComp';

const HeaderComp = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Check if the user is logged in
  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role');

    if (userId && email && role) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div>
      <div className='Mainheader'>
        <span className='Logoimgspan'>
          <img src={Logo} alt='Logo' className='logoimg' />
        </span>
        <span className='Headertitle'>Mirai D. Scholars</span>
        {isLoggedIn ? (
          <Link to="/" className="HeaderLoginbutton" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/login" className="HeaderLoginbutton">Login</Link>
        )}
        <div className="HamburgerMenu" onClick={toggleDropdown}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>

      {dropdownOpen && (
        <div className="DropdownMenu">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/AboutUs">About Us</a></li>
            <li><a href="/AllCourses">All Courses</a></li>
            <li><a href="/Batches">Batches</a></li>
            <li><a href="/ContactUs">Contact Us</a></li>
            {isLoggedIn ? (
              <li style={{ background: "lightyellow" }}>
                <a href="/" onClick={handleLogout}>Logout</a>
              </li>
            ) : (
              <li style={{ background: "lightyellow" }}>
                <a href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      )}
      <div className='Navcomp'>
        <NavComp />
      </div>
    </div>
  );
};

export default HeaderComp;