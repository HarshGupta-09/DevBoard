import React from "react";
import { Mail, Phone, Briefcase } from "lucide-react";

const ClientCard = ({
  name,
  email,
  phone,
  company,
  projectCount = 0,
  status = "active",
}) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-[#111114] border border-gray-800 rounded-xl p-5 transition hover:border-gray-700 hover:shadow-md hover:-translate-y-1 duration-300">
      
      {/* Top */}
      <div className="flex items-start justify-between">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-semibold text-white">
            {initials || "U"}
          </div>

          {/* Info */}
          <div>
            <p className="text-white font-medium text-sm">{name}</p>
            <p className="text-xs text-gray-400">{company}</p>
          </div>
        </div>

        {/* Status */}
        <span
          className={`text-[10px] px-2 py-1 rounded-full flex items-center gap-1 ${
            status === "active"
              ? "bg-green-600/20 text-green-400"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          {status}
        </span>
      </div>

      {/* Contact */}
      <div className="mt-4 space-y-1.5 text-xs text-gray-400">
        {email && (
          <div className="flex items-center gap-2">
            <Mail size={13} />
            <span className="truncate">{email}</span>
          </div>
        )}

        {phone && (
          <div className="flex items-center gap-2">
            <Phone size={13} />
            <span>{phone}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-800"></div>

      {/* Bottom */}
      <div className="flex items-center justify-between text-xs">
        
        <div className="flex items-center gap-2 text-gray-400">
          <Briefcase size={13} />
          <span>
            {projectCount} {projectCount === 1 ? "project" : "projects"}
          </span>
        </div>

        <button className="text-indigo-400 hover:underline text-xs">
          Open →
        </button>
      </div>
    </div>
  );
};

export default ClientCard;