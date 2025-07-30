import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import {
  FaTachometerAlt, FaCarSide, FaUserFriends, FaClipboardList,
  FaMoneyCheckAlt, FaChartBar, FaFileAlt, FaQuestionCircle,
  FaUserCircle, FaChevronDown, FaChevronUp, FaChevronLeft
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const role = sessionStorage.getItem("role");

  const [showRegistration, setShowRegistration] = useState(false);

  const toggleRegistrationMenu = () => setShowRegistration(v => !v);

  return (
    <aside className={`custom-sidebar ${isOpen ? "open" : ""}`}>
      <button
        className="sidebar-close-btn"
        onClick={toggleSidebar}
        aria-label="Close sidebar"
        tabIndex={isOpen ? 0 : -1}
      >
        <FaChevronLeft />
      </button>
      <div className="sidebar-logo">
        <span className="sidebar-logo-text">Bismillah RAC</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link">
          <FaTachometerAlt />
          <span className="label">Dashboard</span>
        </NavLink>
        <NavLink to="/bookings" className="sidebar-link">
          <FaClipboardList />
          <span className="label">Bookings</span>
        </NavLink>

        {role === "admin" && (
          <>
            <button className="sidebar-link collapsible"
              onClick={toggleRegistrationMenu}
              aria-expanded={showRegistration}
              tabIndex={isOpen ? 0 : -1}
            >
              <FaUserFriends />
              <span className="label">Registration</span>
              {showRegistration ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <div className={`submenu${showRegistration ? " open" : ""}`}>
              <NavLink to="/register-car" className="sidebar-link sub-link">
                <FaCarSide /><span>Car Register</span>
              </NavLink>
              <NavLink to="/operator-management" className="sidebar-link sub-link">
                <FaUserFriends /><span>Operators</span>
              </NavLink>
              <NavLink to="/drivers" className="sidebar-link sub-link">
                <FaUserFriends /><span>Drivers</span>
              </NavLink>
            </div>
            <NavLink to="/transactions" className="sidebar-link">
              <FaMoneyCheckAlt />
              <span className="label">Transactions</span>
            </NavLink>
            <NavLink to="/statistics" className="sidebar-link">
              <FaChartBar />
              <span className="label">Statistics</span>
            </NavLink>
            <NavLink to="/reports" className="sidebar-link">
              <FaFileAlt />
              <span className="label">Reports</span>
            </NavLink>
            <NavLink to="/cars" className="sidebar-link">
              <FaCarSide />
              <span className="label">Cars</span>
            </NavLink>
          </>
        )}

        {role === "operator" && (
          <>
            <NavLink to="/register-car" className="sidebar-link">
              <FaCarSide />
              <span className="label">Car Register</span>
            </NavLink>
            <NavLink to="/drivers" className="sidebar-link">
              <FaUserFriends />
              <span className="label">Drivers</span>
            </NavLink>
          </>
        )}

        <NavLink to="/profile" className="sidebar-link">
          <FaUserCircle />
          <span className="label">My Profile</span>
        </NavLink>
        <NavLink to="/help" className="sidebar-link">
          <FaQuestionCircle />
          <span className="label">Help</span>
        </NavLink>
        <NavLink to="/user" className="sidebar-link">
          <FaQuestionCircle />
          <span className="label">User</span>
        </NavLink>
        <NavLink to="/booking" className="sidebar-link">
          <FaQuestionCircle />
          <span className="label">Booking</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
