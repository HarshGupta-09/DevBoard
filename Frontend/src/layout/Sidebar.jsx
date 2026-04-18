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
    <div className="w-[240px] h-screen bg-white rounded-xl m-3 p-4 border border-gray-200 flex flex-col">
      
      {/* 🔹 Logo / Brand */}
      <div className="mb-6 px-2">
        <h1 className="text-xl font-semibold text-indigo-600 tracking-tight">
          DevBoard
        </h1>

        <div className="mt-4 border-b border-gray-200"></div>
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
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* 🔹 Bottom space (future use: logout/settings) */}
      <div className="mt-auto text-xs text-gray-400 px-2">
        v1.0 DevBoard
      </div>
    </div>
  );
};

export default Sidebar;