import React,{ useState }  from 'react';
import Logo from '../assets/Logo/logoimgfinal-Photoroom.png';
import './Style.css';
import { Link , useNavigate } from 'react-router-dom';
import NavComp from './NavComp';

const HeaderComp = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const LoginCompFunc = () => {
    
  };

  return (
    <div>
        <div className='Mainheader'>
            <span className='Logoimgspan'><img src={Logo} alt='Logo' className='logoimg'/></span>
            <span className='Headertitle'>Mirai D. Scholars</span>
            {/* <button className='HeaderLoginbutton btn btn-warning'>Login</button> */}
            {/* <button className='HeaderLoginbutton' >Login</button> */}
            <Link to="/login" className="HeaderLoginbutton">Login</Link>{" "}
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
            <li style={{background:"lightyellow"}}><a href="/login">Login</a></li>
          </ul>
        </div>
      )}
        <div className='Navcomp'>
          <NavComp/>
        </div>
    </div>
  )
}

export default HeaderComp