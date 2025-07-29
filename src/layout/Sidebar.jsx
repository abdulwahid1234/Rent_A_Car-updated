// import React, { useContext, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { AuthContext } from "../AuthContext/AuthContext.jsx";
// import {
//   FaTachometerAlt, FaCarSide, FaUserFriends, FaClipboardList,
//   FaMoneyCheckAlt, FaChartBar, FaFileAlt, FaQuestionCircle,
//   FaUserCircle, FaChevronDown, FaChevronUp, FaCogs
// } from "react-icons/fa";
// import "./Sidebar.css";

// const Sidebar = ({ isOpen }) => {
//   const { isAuthenticated } = useContext(AuthContext);
//   const role = sessionStorage.getItem("role"); // Get the role from sessionStorage

//   const [showRegistration, setShowRegistration] = useState(false);

//   const toggleRegistrationMenu = () => setShowRegistration(!showRegistration);

//   return (
//     <aside className={`sidebar ${isOpen ? "open" : ""}`}>
//       <nav className="icon">
//         <NavLink to="/" className="sidebar-link">
//           <FaTachometerAlt /> <span className="label">Dashboard</span>
//         </NavLink>
//         <NavLink to="/bookings" className="sidebar-link">
//           <FaClipboardList /> <span className="label">Bookings</span>
//         </NavLink>

//         {/* Conditional rendering for Admin and Operator roles */}
//         {role === "admin" && (
//           <>
//             {/* Registration Collapsible */}
//             <div className="sidebar-link collapsible" onClick={toggleRegistrationMenu}>
//               <FaUserFriends />
//               <span className="label">Registration</span>
//               {showRegistration ? <FaChevronUp /> : <FaChevronDown />}
//             </div>
//             {showRegistration && (
//               <div className="submenu">
//                 <NavLink to="/register-car" className="sidebar-link sub-link"><FaCarSide /><span>Car Register</span></NavLink>
//                 <NavLink to="/operator-management" className="sidebar-link sub-link"><FaUserFriends /><span>Operators</span></NavLink>
//                 <NavLink to="/drivers" className="sidebar-link sub-link"><FaUserFriends /><span>Drivers</span></NavLink>
//               </div>
//             )}
//             {/* Additional admin-only links */}
//             <NavLink to="/transactions" className="sidebar-link"><FaMoneyCheckAlt /><span className="label">Transactions</span></NavLink>
//             <NavLink to="/statistics" className="sidebar-link"><FaChartBar /><span className="label">Statistics</span></NavLink>
//             <NavLink to="/reports" className="sidebar-link"><FaFileAlt /><span className="label">Reports</span></NavLink>
//             <NavLink to="/cars" className="sidebar-link"><FaCarSide /><span className="label">Cars</span></NavLink>
//           </>
//         )}

//         {/* Conditional rendering for Operator role */}
//         {role === "operator" && (
//           <>
//             <NavLink to="/register-car" className="sidebar-link"><FaCarSide /><span className="label">Car Register</span></NavLink>
//             <NavLink to="/drivers" className="sidebar-link"><FaUserFriends /><span className="label">Drivers</span></NavLink>
//           </>
//         )}

//         {/* Common Links for all users */}
//         <NavLink to="/profile" className="sidebar-link"><FaUserCircle /><span className="label">My Profile</span></NavLink>
//         <NavLink to="/help" className="sidebar-link"><FaQuestionCircle /><span className="label">Help</span></NavLink>
//         <NavLink to="/user" className="sidebar-link"><FaQuestionCircle /><span className="label">User</span></NavLink>
//         <NavLink to="/booking" className="sidebar-link"><FaQuestionCircle /><span className="label">Booking</span></NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import {
  FaTachometerAlt, FaCarSide, FaUserFriends, FaClipboardList,
  FaMoneyCheckAlt, FaChartBar, FaFileAlt, FaQuestionCircle,
  FaUserCircle, FaChevronDown, FaChevronUp, FaBars, FaChevronLeft
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const role = sessionStorage.getItem("role"); // Get the role from sessionStorage

  const [showRegistration, setShowRegistration] = useState(false);

  const toggleRegistrationMenu = () => setShowRegistration(!showRegistration);

  console.log(`Sidebar is now ${!isOpen ? "closed" : "open"}`);

  return (
    
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {isOpen && (
        <button
          className="sidebar-close-btn"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          <FaChevronLeft />
        </button>
      )}
      <nav className="icon">
        <div className="logo-container">
          <div className="logo-side">
              <span className="logo-text">Bismillah RAC</span>
          </div>
        </div>
        <NavLink to="/" className="sidebar-link">
          <FaTachometerAlt /> <span className="label">Dashboard</span>
        </NavLink>
        <NavLink to="/bookings" className="sidebar-link">
          <FaClipboardList /> <span className="label">Bookings</span>
        </NavLink>

        {/* Conditional rendering for Admin and Operator roles */}
        {role === "admin" && (
          <>
            {/* Registration Collapsible */}
            <div className="sidebar-link collapsible" onClick={toggleRegistrationMenu}>
              <FaUserFriends />
              <span className="label">Registration</span>
              {showRegistration ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showRegistration && (
              <div className="submenu">
                <NavLink to="/register-car" className="sidebar-link sub-link"><FaCarSide /><span>Car Register</span></NavLink>
                <NavLink to="/operator-management" className="sidebar-link sub-link"><FaUserFriends /><span>Operators</span></NavLink>
                <NavLink to="/drivers" className="sidebar-link sub-link"><FaUserFriends /><span>Drivers</span></NavLink>
              </div>
            )}
            {/* Additional admin-only links */}
            <NavLink to="/transactions" className="sidebar-link"><FaMoneyCheckAlt /><span className="label">Transactions</span></NavLink>
            <NavLink to="/statistics" className="sidebar-link"><FaChartBar /><span className="label">Statistics</span></NavLink>
            <NavLink to="/reports" className="sidebar-link"><FaFileAlt /><span className="label">Reports</span></NavLink>
            <NavLink to="/cars" className="sidebar-link"><FaCarSide /><span className="label">Cars</span></NavLink>
          </>
        )}

        {/* Conditional rendering for Operator role */}
        {role === "operator" && (
          <>
            <NavLink to="/register-car" className="sidebar-link"><FaCarSide /><span className="label">Car Register</span></NavLink>
            <NavLink to="/drivers" className="sidebar-link"><FaUserFriends /><span className="label">Drivers</span></NavLink>
          </>
        )}

        {/* Common Links for all users */}
        <NavLink to="/profile" className="sidebar-link"><FaUserCircle /><span className="label">My Profile</span></NavLink>
        <NavLink to="/help" className="sidebar-link"><FaQuestionCircle /><span className="label">Help</span></NavLink>
        <NavLink to="/user" className="sidebar-link"><FaQuestionCircle /><span className="label">User</span></NavLink>
        <NavLink to="/booking" className="sidebar-link"><FaQuestionCircle /><span className="label">Booking</span></NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

