import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import {
  FaTachometerAlt, FaCarSide, FaUserFriends, FaClipboardList,
  FaMoneyCheckAlt, FaChartBar, FaFileAlt, FaQuestionCircle,
  FaUserCircle, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isOpen = true }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const role = sessionStorage.getItem("role") || "operator";

  const [showRegistration, setShowRegistration] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const linkClass = ({ isActive }) => `sidebar-link${isActive ? " active" : ""}`;
  const subLinkClass = ({ isActive }) => `sidebar-link sub-link${isActive ? " active" : ""}`;

  return (
    <aside
      className={`custom-sidebar ${isOpen ? "open" : ""} ${collapsed ? "collapsed" : ""}`}
      aria-label="Primary sidebar"
    >
      {/* Top control */}
      <div className="sidebar-top">
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(v => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Logo / App name */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-text">Bismillah RAC</span>
      </div>

      {/* Navigation */}
      <nav
        className="sidebar-nav"
        onMouseLeave={() => collapsed && setShowRegistration(false)}
      >
        <NavLink to="/" className={linkClass} end title="Dashboard">
          <FaTachometerAlt />
          <span className="label">Dashboard</span>
          <span className="active-indicator" aria-hidden="true" />
        </NavLink>

        <NavLink to="/bookings" className={linkClass} title="Bookings">
          <FaClipboardList />
          <span className="label">Bookings</span>
          <span className="active-indicator" aria-hidden="true" />
        </NavLink>

        {role === "admin" && (
          <>
            <button
              className={`sidebar-link collapsible${showRegistration ? " open" : ""}`}
              onClick={() => setShowRegistration(v => !v)}
              onMouseEnter={() => collapsed && setShowRegistration(true)}
              aria-expanded={showRegistration}
              title="Registration"
              type="button"
            >
              <FaUserFriends />
              <span className="label">Registration</span>
              {showRegistration ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            <div className={`submenu${showRegistration ? " open" : ""}`}>
              <NavLink to="/register-car" className={subLinkClass} title="Car Register">
                <FaCarSide />
                <span className="label">Car Register</span>
                <span className="active-indicator" aria-hidden="true" />
              </NavLink>
              <NavLink to="/operator-management" className={subLinkClass} title="Operators">
                <FaUserFriends />
                <span className="label">Operators</span>
                <span className="active-indicator" aria-hidden="true" />
              </NavLink>
              <NavLink to="/drivers" className={subLinkClass} title="Drivers">
                <FaUserFriends />
                <span className="label">Drivers</span>
                <span className="active-indicator" aria-hidden="true" />
              </NavLink>
              <NavLink to="/customer" className={subLinkClass} title="Customers Register">
                <FaCarSide />
                <span className="label">Customers Register</span>
                <span className="active-indicator" aria-hidden="true" />
              </NavLink>
            </div>

            <NavLink to="/transactions" className={linkClass} title="Transactions">
              <FaMoneyCheckAlt />
              <span className="label">Transactions</span>
              <span className="active-indicator" aria-hidden="true" />
            </NavLink>
            <NavLink to="/statistics" className={linkClass} title="Statistics">
              <FaChartBar />
              <span className="label">Statistics</span>
              <span className="active-indicator" aria-hidden="true" />
            </NavLink>
            <NavLink to="/reports" className={linkClass} title="Reports">
              <FaFileAlt />
              <span className="label">Reports</span>
              <span className="active-indicator" aria-hidden="true" />
            </NavLink>
            <NavLink to="/cars" className={linkClass} title="Cars">
              <FaCarSide />
              <span className="label">Cars</span>
              <span className="active-indicator" aria-hidden="true" />
            </NavLink>
          </>
        )}

        {role === "operator" && (
          <>
            <NavLink to="/register-car" className={linkClass} title="Car Register">
              <FaCarSide />
              <span className="label">Car Register</span>
              <span className="active-indicator" aria-hidden="true" />
            </NavLink>
            <NavLink to="/drivers" className={linkClass} title="Drivers">
              <FaUserFriends />
              <span className="label">Drivers</span>
              <span className="active-indicator" aria-hidden="true" />
            </NavLink>
          </>
        )}

        <NavLink to="/profile" className={linkClass} title="My Profile">
          <FaUserCircle />
          <span className="label">My Profile</span>
          <span className="active-indicator" aria-hidden="true" />
        </NavLink>
        <NavLink to="/help" className={linkClass} title="Help">
          <FaQuestionCircle />
          <span className="label">Help</span>
          <span className="active-indicator" aria-hidden="true" />
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
