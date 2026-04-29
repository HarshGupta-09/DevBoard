import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ClientHeader = ({ count, onAddClick }) => {
  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      {/* LEFT */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Clients
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {count} clients
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Search */}
        <div className="px-3 py-2 rounded-lg border border-gray-800 bg-[#0F0F12]">
          <input
            type="text"
            placeholder="Search clients..."
            className="bg-transparent outline-none text-sm text-gray-300 placeholder-gray-500"
          />
        </div>

        {/* Add Client */}
        <Button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
        >
          <Plus size={16} />
          Add Client
        </Button>

      </div>
    </section>
  );
};

export default ClientHeader;