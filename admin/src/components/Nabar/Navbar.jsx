import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/admin_assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <a href="https://kissan-bazzar-new-frontend.onrender.com/">
        <img className='logo' src={assets.logo} alt="Logo" />
      </a>
      <img className='profile' src={assets.profile_image} alt="Profile" />
    </div>
  );
}

export default Navbar;

