import React from 'react';
import './Footer.css';
import { assets } from '../../assets/frontend_assets/assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img className='footer-logo' src={assets.logo} alt="" />
          <p>Discover fresh and quality farm produce delivered to your doorstep. KisaanBazzar brings you the best from local farms, ensuring each product is crafted with care and dedication.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-right">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-center">
          <h2>Get In Touch</h2>
          <ul>
            <li>+1212-456-7890</li>
            <li>contact@kisaanbazzar.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>
        Copyright 
        {currentYear}  &copy; kisaanbazzar.com - All Right Reserved
      </p>
    </div>
  );
}

export default Footer;
