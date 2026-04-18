import React from "react";
import { Moon } from "lucide-react";
import { useLocation } from "react-router-dom";
const Navbar = () => {
    const location = useLocation();
    const routeTitles = {
  "/dashboard": "Dashboard",
  "/clients": "Clients",
  "/projects": "Projects",
  "/milestones": "Milestones",
  "/invoices": "Invoices",
  "/ai-proposals": "AI Proposals",
};

  const getTitle = () => {
      const path = location.pathname.split("/")[1];
  return routeTitles[`/${path}`] || "Dashboard";
  };

  return (
    <div className="w-full flex items-center justify-between bg-white px-6 h-16 rounded-xl m-3 shadow-sm">
      
      {/* LEFT */}
      <h1 className="text-lg font-semibold text-gray-800">
        {getTitle()}
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        
        {/* Dark mode icon */}
        <button className="p-2  cursor-pointer rounded-lg hover:bg-gray-100 transition">
          <Moon size={18} className="text-gray-600" />
        </button>

        {/* User name */}
        <span className="text-sm text-gray-700 font-medium">
          Harsh Gupta
        </span>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
          H
        </div>

      </div>
    </div>
  );
};

export default Navbar;