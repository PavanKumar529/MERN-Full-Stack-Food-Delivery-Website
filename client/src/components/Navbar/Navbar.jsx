import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { Link } from 'react-router-dom'
const Navbar = () => {
    const [menu, setMenu] = useState("menu");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="navbar">
            <img src={assets.logo} alt="logo" className="logo" />
            <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
                <Link to='/'><li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li></Link>
                <a href="#explore-menu"><li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li></a>
                <a href="#app-download"><li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</li></a>
                <a href="#footer"><li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</li></a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search icon" />
                <div className="navbar-search-icon">
                    <img src={assets.basket_icon} alt="basket icon" />
                    <div className="dot"></div>
                </div>
                <button>sign in</button>
            </div>
            <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Navbar;
