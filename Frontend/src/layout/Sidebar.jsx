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
    <div className="w-[220px] h-screen bg-white rounded-xl m-3 p-3 shadow-sm">
      
      <div className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-[#F1F1F9] text-black font-medium"
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
    </div>
  );
};

export default Sidebar;