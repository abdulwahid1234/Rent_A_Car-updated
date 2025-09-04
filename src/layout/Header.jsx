import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import toast from "react-hot-toast";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const username = sessionStorage.getItem("username") || "User";
  const profileImage =
    sessionStorage.getItem("profileImage") ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}`;
  const role = sessionStorage.getItem("role") || "operator";

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    navigate("/login");
  };

  // Close on outside click / Esc
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setShowDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header className="topbar main-header">
      <div className="brand">
        <span className="brand-mark" aria-hidden>🏠</span>
        <span className="brand-title">Bismillah RAC</span>
      </div>

      {/* Search like the screenshot (optional to wire later) */}
      {/* <div className="hdr-search">
        <span className="search-icon" aria-hidden>🔎</span>
        <input
          className="input"
          placeholder="Search…"
          aria-label="Search"
        />
      </div> */}

      <nav className="header-actions">
        {isAuthenticated ? (
          <div className="profile-area" ref={dropdownRef}>
            {/* <button
              className="icon-btn bell"
              aria-label="Notifications"
              title="Notifications"
            >
              🔔
            </button> */}

            {/* <button
              className="icon-btn settings"
              aria-label="Settings"
              title="Settings"
            >
              ⚙️
            </button> */}

            <button
              className="profile-chip"
              onClick={() => setShowDropdown((p) => !p)}
              aria-haspopup="menu"
              aria-expanded={showDropdown}
              title={username}
            >
              <img src={profileImage} alt="" className="profile-img" />
              <span className="chip-text">{username}</span>
            </button>

            {showDropdown && (
              <div className="profile-dropdown" role="menu">
                <div className="dropdown-user">
                  <p className="dropdown-username">{username}</p>
                  <p className="dropdown-role">{role}</p>
                </div>
                <Link to="/profile" className="dropdown-link" role="menuitem">
                  My Profile
                </Link>
                <Link
                  to="/change-password"
                  className="dropdown-link"
                  role="menuitem"
                >
                  Change Password
                </Link>
                <button
                  className="dropdown-link logout-btn"
                  onClick={handleLogout}
                  role="menuitem"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-btns">
            <Link to="/login" className="btn btn-outline header-login">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary header-signup">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
