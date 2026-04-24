import React from "react";

const projects = [
  {
    name: "E-commerce Platform",
    client: "Tech Solutions Inc",
    status: "In Progress",
    amount: "₹25,000",
    deadline: "Jan 30, 2026",
    progress: 75,
  },
  {
    name: "Mobile App Design",
    client: "StartupX",
    status: "In Progress",
    amount: "₹18,000",
    deadline: "Feb 15, 2026",
    progress: 45,
  },
  {
    name: "Brand Identity",
    client: "Creative Agency",
    status: "Pending",
    amount: "₹12,000",
    deadline: "Feb 28, 2026",
    progress: 20,
  },
];

const getStatusColor = (status) => {
  if (status === "In Progress")
    return "bg-indigo-600/20 text-indigo-400";
  if (status === "Pending")
    return "bg-yellow-600/20 text-yellow-400";
  return "bg-green-600/20 text-green-400";
};

const RecentProjects = () => {
  return (
    <div className="mt-8 bg-[#111114] border border-gray-800 rounded-xl p-5">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">
          Recent Projects
        </h2>
        <button className="text-sm text-indigo-400 hover:underline">
          View all →
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-800 bg-[#0F0F12] hover:bg-[#1a1a1f] transition"
          >
            
            {/* Top Row */}
            <div className="flex items-center justify-between">
              
              {/* Left */}
              <div>
                <p className="text-white font-medium">
                  {project.name}
                </p>
                <p className="text-xs text-gray-400">
                  {project.client}
                </p>
              </div>

              {/* Right */}
              <span
                className={`text-xs px-2 py-1 rounded-md ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>

            {/* Progress */}
            <div className="mt-3">
              <div className="w-full h-1.5 bg-gray-800 rounded-full">
                <div
                  className="h-1.5 bg-indigo-500 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
              <span>Deadline: {project.deadline}</span>
              <span className="text-white font-medium">
                {project.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;