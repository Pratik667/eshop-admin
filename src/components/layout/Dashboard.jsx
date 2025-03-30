import React, { useState } from "react";
import './sidebar.css';
import AppSidebar from "./AppSidebar";
import { Outlet } from "react-router-dom"; // Link for navigation and Outlet for nested routes

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="dashboard-layout">
      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''} flex items-center space-x-4 lg:space-x-6 mx-6`}>
        <AppSidebar/>
      </nav>
      <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
