import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, IndianRupee, Pencil, Trash2, Check } from "lucide-react";

const ProjectCard = ({
  _id,
  title,
  client,
  budget,
  deadline,
  status,
  onMarkComplete,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/projects/${_id}`)} className="bg-[#0F0F12] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition cursor-pointer">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white text-sm font-medium truncate">{title}</h3>
          <p className="text-xs text-gray-400 mt-1">
            {client?.name || "Client"}
          </p>
        </div>

        {/* Status */}
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

      {/* Divider */}
      <div className="border-t border-gray-800 my-3"></div>

      {/* Bottom info */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        {/* Budget */}
        <div className="flex items-center gap-1">
          <IndianRupee size={12} />
          <span>₹{budget?.toLocaleString()}</span>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>
            {deadline ? new Date(deadline).toLocaleDateString() : "No date"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4">
        {/* Left actions */}
        <div className="flex items-center gap-3">
          {/* Edit */}
          <button
            onClick={(e) => { 
                e.stopPropagation();
              onEdit?.(_id)}}
            className="text-gray-400 hover:text-white transition"
          >
            <Pencil size={14} />
          </button>

          {/* Delete */}
          <button
            onClick={(e) =>{ 
                e.stopPropagation();
              onDelete?.(_id)}}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Right action */}
        {status === "active" && (
          <button
            onClick={(e) => { 
                e.stopPropagation();
              onMarkComplete?.(_id)}}
            className="flex cursor-pointer items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-green-500/30 bg-green-600/10 text-green-400 hover:bg-green-600/20 hover:border-green-500 transition"
          >
            <Check size={14} />
            Mark Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
