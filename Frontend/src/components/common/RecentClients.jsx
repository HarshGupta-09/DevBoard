import React from "react";

const clients = [
  {
    name: "John Doe",
    company: "Tech Solutions",
    activeProjects: 2,
    revenue: "₹40,000",
  },
  {
    name: "Sarah Lee",
    company: "StartupX",
    activeProjects: 1,
    revenue: "₹18,000",
  },
  {
    name: "Amit Sharma",
    company: "Creative Agency",
    activeProjects: 3,
    revenue: "₹65,000",
  },
];

const RecentClients = () => {
  return (
    <div className="bg-[#111114] border border-gray-800 rounded-xl p-5">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">
          Recent Clients
        </h2>
        <button className="text-sm text-indigo-400 hover:underline">
          View all →
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {clients.map((client, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F12] border border-gray-800 hover:bg-[#1a1a1f] transition"
          >
            
            {/* LEFT */}
            <div className="flex items-center gap-3">
              
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold">
                {client.name.charAt(0)}
              </div>

              {/* Info */}
              <div>
                <p className="text-white text-sm font-medium">
                  {client.name}
                </p>
                <p className="text-xs text-gray-400">
                  {client.company}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <p className="text-sm text-white font-medium">
                {client.activeProjects} Projects
              </p>
              <p className="text-xs text-gray-400">
                {client.revenue}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentClients;