import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="bg-[#07070A] min-h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[240px] min-h-screen flex flex-col">
        
        {/* Navbar */}
        <div className="sticky top-0 z-40">
          <Navbar />
        </div>

        {/* Page Content */}
        <div className="p-10  w-full ">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AppLayout;