import React from "react";

const getStatusColor = (status) => {
  if (status === "active")
    return "bg-indigo-600/20 text-indigo-400";
  if (status === "completed")
    return "bg-green-600/20 text-green-400";
  return "bg-gray-600/20 text-gray-400";
};

// 🔹 date formatter
const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatCurrency = (amount) => {
  if (!amount) return "₹0";
  return `₹${amount.toLocaleString("en-IN")}`;
};

const RecentProjects = ({ projects }) => {
  console.log("Projects:", projects);

 
  if (!projects) {
    return (
      <div className="mt-8 text-gray-400 text-sm">
        Loading projects...
      </div>
    );
  }

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

      {/* Content */}
      <div className="flex flex-col gap-4">

        {/* 🔹 Empty */}
        {projects.length === 0 ? (
          <p className="text-gray-400 text-sm">No projects yet</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="p-4 rounded-lg border border-gray-800 bg-[#0F0F12] hover:bg-[#1a1a1f] transition"
            >
              
              {/* Top Row */}
              <div className="flex items-center justify-between">
                
                {/* Left */}
                <div>
                  <p className="text-white font-medium">
                    {project.title}
                  </p>

                  <p className="text-xs text-gray-400">
                    {project.client?.name || "No Client"}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`text-xs px-2 py-1 rounded-md ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                
                <span>
                  Deadline: {formatDate(project.deadline)}
                </span>

                <span className="text-white font-medium">
                  {formatCurrency(project.budget)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentProjects;