import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import toast from "react-hot-toast";
import './Header.css';
import { FaBars, FaChevronLeft } from "react-icons/fa";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const username = sessionStorage.getItem("username") || "User";
  const profileImage = sessionStorage.getItem("profileImage") || `https://ui-avatars.com/api/?name=${username}`;
  const role = sessionStorage.getItem("role") || "operator";

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header-container">
      {/* Sidebar Toggle Button */}
      <button
        className="menu-toggle"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <FaChevronLeft /> : <FaBars />}
      </button>
      <marquee>
        <h1 style={{ flex: 1, textAlign: "center" }}>Bismillah RAC</h1>
      </marquee>
      
      <div className="header-right">
        {isAuthenticated ? (
          <div className="dropdown-wrapper" ref={dropdownRef}>
            <img
              src={profileImage}
              alt="Profile"
              className="profile-avatar"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="dropdown">
                <div>
                  <p>{username}</p>
                  <p className="role">{role}</p>
                </div>
                <Link to="/profile">My Profile</Link>
                <Link to="/change-password">Change Password</Link>
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="auth-btn login">Login</Link>
            <Link to="/signup" className="auth-btn signup">Sign Up</Link>
          </>
        )}
        {/* <button onClick={toggleTheme} className="theme-toggle-btn">
  {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
</button> */}

      </div>
      
    </header>
  );
};

export default Header;
