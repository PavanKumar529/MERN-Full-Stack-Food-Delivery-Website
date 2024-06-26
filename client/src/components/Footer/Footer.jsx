import React from 'react';
import "./Footer.css";
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque quam dolorem sapiente, sequi atque ad id consequuntur eveniet illum enim nobis quae voluptates inventore alias veritatis? Non saepe vel vitae.</p>
          <div className="footer-social-media-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>+91 8328533863</li>
            <li>pavankumarkuruva529@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 © Tomato.com - All Rights Reserved</p>
    </div>
  );
}

export default Footer;
