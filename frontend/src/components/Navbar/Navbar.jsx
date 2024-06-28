import React, { useState, useContext } from "react";
import './Navbar.css';
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'; // Import scroll functionality

const Navbar = ({ setShowLogin }) => {
  const { cartItems, getTotalCartAmount, token, setToken, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    // Clear local storage and state related to authentication
    localStorage.removeItem("token");
    setToken("");

    // Clear cart items
    localStorage.removeItem("cartItems");
    setCartItems([]);

    // Navigate to home page or any desired route
    navigate("/");
  };

  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <Link to='/'>
        <img className='logo-design' src={assets.logo} alt="Logo" />
      </Link>
      <ul className="navbar-menu">
        <li>
          <ScrollLink
            activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={menu === "home" ? "active" : ""}
            onClick={() => setMenu("home")}
          >
            Home
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            activeClass="active"
            to="explore-menu"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={menu === "category" ? "active" : ""}
            onClick={() => setMenu("category")}
          >
            Category
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            activeClass="active"
            to="app-download"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={menu === "mobile-app" ? "active" : ""}
            onClick={() => setMenu("mobile-app")}
          >
            Mobile App
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            activeClass="active"
            to="footer"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={menu === "contact-us" ? "active" : ""}
            onClick={() => setMenu("contact-us")}
          >
            Contact Us
          </ScrollLink>
        </li>
      </ul>
      <div className="navbar-right">
        <img className="search" src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to='/cart' onClick={() => setMenu("cart")} className={menu === "cart" ? "active" : ""}>
            <img className="basket" src={assets.basket_icon} alt="Cart" />
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </Link>
        </div>
        {
          !token ?
            <button onClick={() => setShowLogin(true)}>Sign in</button>
            :
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
              </ul>
            </div>
        }
      </div>
    </div>
  );
}

export default Navbar;
