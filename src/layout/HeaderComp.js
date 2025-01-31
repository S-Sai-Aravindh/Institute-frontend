import React from 'react';
import Logo from '../assets/Logo/logoimgfinal-Photoroom.png';
import './Style.css';
import NavComp from './NavComp';

const HeaderComp = () => {
  return (
    <div>
        <div className='Mainheader'>
            <span className='Logoimgspan'><img src={Logo} alt='Logo' className='logoimg'/></span>
            <span className='Headertitle'>Mirai D. Scholars</span>
            {/* <button className='HeaderLoginbutton btn btn-warning'>Login</button> */}
            <button className='HeaderLoginbutton'>Login</button>
        </div>
        <div>
          <NavComp/>
        </div>
    </div>
  )
}

export default HeaderComp