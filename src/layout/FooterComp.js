import React from 'react';
import Logo from '../assets/Logo/logoimgfinal.jpg';
import { Link } from 'react-router-dom';

const FooterComp = () => {
  return (
    <div>

    <div className='FooterMainComp'>
      <div className='Footercomps'> 
          <div >
              <h3>Address</h3>
              <hr style={{width:"120px"}}></hr>
              <div className='address'>No. 15, Second Cross Street, Anna Nagar West, Chennai - 600040, Tamil Nadu, India.</div>
          </div>

          <div className='FootQuickLinks'>
              <h3>Quick Links</h3>
              <hr></hr>
                    <Link to="" className="footerlinks">Home</Link>{" "}<br></br>
                    <Link to="" className="footerlinks">About Us</Link>{" "}<br></br>
                    <Link to="" className="footerlinks">All Courses</Link>{" "}<br></br>
                    <Link to="" className="footerlinks">Batches</Link>{" "}<br></br>
                    <Link to="" className="footerlinks">Contact Us</Link>{" "}<br></br>
          </div>

          <div>
              <h3>Contact</h3>
              <hr style={{width:"110px"}}></hr>
              <p className='footerlinks'>Email : <span>miraidscholars.enquiry@gmail.com</span></p>
              <p className='footerlinks'>Phone : +91-9812785478</p>
          </div>

          <img src={Logo} alt='Logo' className='FooterLogo'/>
      </div>
    </div>

    <div className='copyright'>
    Copyright © 2024 Mirai D. Scholars Private Limited
    </div>
  </div>

  )
}

export default FooterComp