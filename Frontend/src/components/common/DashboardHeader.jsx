import React from 'react'
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
const DashboardHeader = () => {
  return (
    <>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      {/* LEFT */}
      <div className="space-y-1">
        <p className="text-xs text-gray-500 tracking-wide">
          FEB 2026
        </p>

        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Welcome back, Harsh
        </h1>

        <p className="text-sm text-gray-400">
          You have{" "}
          <span className="font-medium text-white">
            5 active projects
          </span>{" "}
          and{" "}
          <span className="font-medium text-white">
            4 invoices
          </span>{" "}
          awaiting payment.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        
        <Button
          variant="outline"
          className="flex items-center gap-2 border-gray-700 bg-[#111114] text-gray-300 hover:bg-[#252525] hover:text-white cursor-pointer"
        >
          <Plus size={14} />
          New Client
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2 border-gray-700 bg-[#111114] text-gray-300 hover:bg-[#252525] hover:text-white cursor-pointer"
        >
          <Plus size={14} />
          New Project
        </Button>

        <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 cursor-pointer">
          <Plus size={14} />
          Generate Proposal
        </Button>

      </div>
    </div>
      
    </>
  )
}

export default DashboardHeader
