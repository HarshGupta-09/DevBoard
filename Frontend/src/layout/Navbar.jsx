import React from "react";
import { Search, Bell, Plus } from "lucide-react";
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

  const path = "/" + location.pathname.split("/")[1];
  const title = routeTitles[path] || "Dashboard";

  const userName = "Harsh Gupta";
  const initials = userName.charAt(0);

  return (
    <div className="w-full flex items-center justify-between px-6 h-16 border-b border-gray-800 bg-[#0B0B0F]">
      
      {/* LEFT */}
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <h1 className="text-sm text-gray-400">Your freelance command center</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="flex items-center bg-[#111114] border border-gray-800 rounded-lg px-3 py-1.5">
          <Search size={16} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search clients, projects..."
            className="bg-transparent outline-none text-sm text-gray-300 placeholder-gray-500"
          />
        </div>

        {/* New Button */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-800 bg-[#111114] hover:bg-[#1a1a1f] cursor-pointer text-sm text-gray-300">
          <Plus size={14} />
          New
        </button>

        {/* Notification */}
        <button className="p-2 cursor-pointer rounded-lg border border-gray-800 bg-[#111114] hover:bg-[#1a1a1f]">
          <Bell size={16} className="text-gray-400" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-800 bg-[#111114] cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold">
            {initials}
          </div>
          <span className="text-sm text-gray-300">{userName}</span>
        </div>

      </div>
    </div>
  );
};

export default Navbar;