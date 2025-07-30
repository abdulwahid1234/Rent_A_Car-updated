import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import toast from "react-hot-toast";
import './Header.css';
import { FaBars, FaChevronLeft } from "react-icons/fa";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const username = sessionStorage.getItem("username") || "User";
  const profileImage =
    sessionStorage.getItem("profileImage") ||
    `https://ui-avatars.com/api/?name=${username}`;
  const role = sessionStorage.getItem("role") || "operator";

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    navigate("/login");
  };

  // Handle dropdown close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="main-header">
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <FaChevronLeft /> : <FaBars />}
      </button>

      <div className="brand-title">
        Bismillah RAC
      </div>

      <nav className="header-actions">
        {isAuthenticated ? (
          <div className="profile-area" ref={dropdownRef}>
            <img
              src={profileImage}
              alt="Profile"
              className="profile-img"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-user">
                  <p className="dropdown-username">{username}</p>
                  <p className="dropdown-role">{role}</p>
                </div>
                <Link to="/profile" className="dropdown-link">
                  My Profile
                </Link>
                <Link to="/change-password" className="dropdown-link">
                  Change Password
                </Link>
                <button className="dropdown-link logout-btn" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-btns">
            <Link to="/login" className="btn header-login">Login</Link>
            <Link to="/signup" className="btn header-signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
