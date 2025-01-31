import React from 'react';
import Logo from '../assets/Logo/logo2-Photoroom.png';
import './Style.css';

const HeaderComp = () => {
  return (
    <div>
        <div className='Mainheader'>
            <span className='Logoimgspan'><img src={Logo} alt='Logo' className='logoimg'/></span>
            <span><namehead >Mirai D. Scholars</namehead></span>
            <button>Login</button>
        </div>
    </div>
  )
}

export default HeaderComp