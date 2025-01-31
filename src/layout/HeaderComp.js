import React,{ useState }  from 'react';
import Logo from '../assets/Logo/logoimgfinal-Photoroom.png';
import './Style.css';
import NavComp from './NavComp';

const HeaderComp = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
        <div className='Mainheader'>
            <span className='Logoimgspan'><img src={Logo} alt='Logo' className='logoimg'/></span>
            <span className='Headertitle'>Mirai D. Scholars</span>
            {/* <button className='HeaderLoginbutton btn btn-warning'>Login</button> */}
            <button className='HeaderLoginbutton'>Login</button>
            <div className="HamburgerMenu" onClick={toggleDropdown}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        </div>

        {dropdownOpen && (
        <div className="DropdownMenu">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#about">All Courses</a></li>
            <li><a href="#contact">Batches</a></li>
            <li><a href="#batches">Contact Us</a></li>
            <li style={{background:"lightyellow"}}><a href="#batches">Login</a></li>
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