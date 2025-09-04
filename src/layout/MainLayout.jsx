import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css"; // optional, for styling

const MainLayout = () => {
  return (
    <div className="layout">
      <Sidebar isOpen={true} /> {/* Sidebar always visible */}
      <div className="body-wrapper">
        <Header />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
