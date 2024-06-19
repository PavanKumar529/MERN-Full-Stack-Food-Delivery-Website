import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("menu");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

    const navigate = useNavigate();


    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }
    return (
        <div className="navbar">
            <Link to="/"><img src={assets.logo} alt="logo" className="logo" /></Link>
            <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
                <li><Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link></li>
                <li><a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a></li>
                <li><a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a></li>
                <li><a href="#contact-us" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a></li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search icon" />
                <div className="navbar-search-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt="basket icon" /></Link>
                    <div className={getTotalCartAmount()===0 ? "" : "dot"}></div>
                </div>

                {
                    !token 
                    ? <button onClick={() => setShowLogin(true)}>sign in</button> 
                    : <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                }

                
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
