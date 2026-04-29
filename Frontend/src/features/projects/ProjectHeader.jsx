import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";

const ProjectHeader = ({ count, onAddClick }) => {
  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      {/* LEFT */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Projects
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {count} Manage and track all your projects.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Client Filter */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-800 bg-[#0F0F12] text-sm text-gray-300 cursor-pointer hover:bg-[#1a1a1f]">
          <span>All clients</span>
          <ChevronDown size={14} />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-800 bg-[#0F0F12] text-sm text-gray-300 cursor-pointer hover:bg-[#1a1a1f]">
          <span>All status</span>
          <ChevronDown size={14} />
        </div>

        {/* Add Project */}
        <Button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500"
        >
          <Plus size={16} />
          New Project
        </Button>

      </div>
    </section>
  );
};

export default ProjectHeader;