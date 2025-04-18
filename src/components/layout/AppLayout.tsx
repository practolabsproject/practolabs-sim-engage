
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (window.innerWidth < 768 && isSidebarOpen) {
        const sidebar = document.getElementById('sidebar-container');
        const target = event.target as Node;
        if (sidebar && !sidebar.contains(target)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <div id="sidebar-container">
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <div 
          className={cn(
            "flex-1 p-4 md:p-6 transition-all duration-200 ease-in-out",
            isSidebarOpen ? "md:ml-64" : ""
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
