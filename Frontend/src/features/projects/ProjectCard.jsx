import React from "react";
import { Calendar, IndianRupee } from "lucide-react";

const ProjectCard = ({
  title,
  client,
  budget,
  deadline,
  status,
}) => {
  return (
    <div className="bg-[#0F0F12] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition cursor-pointer">
      
      {/* Top */}
      <div className="flex items-center justify-between">
        
        <h3 className="text-white text-sm font-medium truncate">
          {title}
        </h3>

        <span
          className={`text-[10px] px-2 py-1 rounded-full ${
            status === "active"
              ? "bg-indigo-600/20 text-indigo-400"
              : "bg-green-600/20 text-green-400"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Client */}
      <p className="text-xs text-gray-400 mt-1">
        {client?.name || "Client"}
      </p>

      {/* Divider */}
      <div className="border-t border-gray-800 my-3"></div>

      {/* Bottom */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        
        {/* Budget */}
        <div className="flex items-center gap-1">
          <IndianRupee size={12} />
          <span>{budget || "—"}</span>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>
            {deadline
              ? new Date(deadline).toLocaleDateString()
              : "No date"}
          </span>
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;