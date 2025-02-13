import React from 'react';
import Logo from '../assets/Logo/logoimgfinal.jpg';
import { Link } from 'react-router-dom';

const FooterComp = () => {

  const handleLinkClick = (e) => {
    window.scrollTo(0, 0);
};
  return (
    <div>

    <div className='FooterMainComp'>
      <div className='Footercomps'> 
          <div >
              <h3 className='Footaddresscomp'>Address</h3>
              <hr style={{width:"120px"}}></hr>
              <div className='address'>No. 15, Second Cross Street, Anna Nagar West, Chennai - 600040, Tamil Nadu, India.</div>
          </div>

          <div className='FootQuickLinks'>
              <h3 className='Footaddresscomp'>Quick Links</h3>
              <hr></hr>
                    <Link to="/" className="footerlinks" onClick={handleLinkClick}>Home</Link>{" "}<br></br>
                    <Link to="/AboutUs" className="footerlinks" onClick={handleLinkClick}>About Us</Link>{" "}<br></br>
                    <Link to="/AllCourses" className="footerlinks" onClick={handleLinkClick}>All Courses</Link>{" "}<br></br>
                    <Link to="/Batches" className="footerlinks" onClick={handleLinkClick}>Batches</Link>{" "}<br></br>
                    <Link to="/ContactUs" className="footerlinks" onClick={handleLinkClick}>Contact Us</Link>{" "}<br></br>
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
    Copyright © 2025 Mirai D. Scholars Private Limited
    </div>
  </div>

  )
}

export default FooterComp