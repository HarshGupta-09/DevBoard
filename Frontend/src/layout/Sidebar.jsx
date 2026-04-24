import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckSquare,
  FileText,
  Receipt,
} from "lucide-react";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Clients", path: "/clients", icon: Users },
    { name: "Projects", path: "/projects", icon: FolderKanban },
    { name: "Milestones", path: "/milestones", icon: CheckSquare },
    { name: "Invoices", path: "/invoices", icon: Receipt },
    { name: "AI Proposal", path: "/ai-proposals", icon: FileText },
  ];

  return (
    <div className="w-[240px] h-screen bg-[#0F0F12] border-r border-gray-800 flex flex-col px-4 py-5">
      
      {/* 🔹 Logo */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white tracking-tight">
          DevBoard
        </h1>
        <p className="text-xs text-gray-500">v1.0</p>
      </div>

      {/* 🔹 Menu */}
      <div className="flex flex-col gap-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-indigo-600/20 border border-indigo-500/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* 🔹 Bottom user (optional like your reference) */}
      <div className="mt-auto pt-6 border-t border-gray-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold">
          H
        </div>
        <div>
          <p className="text-sm text-white">Harsh Gupta</p>
          <p className="text-xs text-gray-500">harsh@devboard.io</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;