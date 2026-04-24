import React from "react";

const deadlines = [
  {
    title: "Landing Page",
    project: "StartupX Website",
    date: "Feb 18, 2026",
    daysLeft: 1,
    status: "Pending",
  },
  {
    title: "Dashboard UI",
    project: "SaaS Panel",
    date: "Feb 20, 2026",
    daysLeft: 3,
    status: "Pending",
  },
  {
    title: "Payment Integration",
    project: "E-commerce App",
    date: "Feb 25, 2026",
    daysLeft: 7,
    status: "Pending",
  },
];

const getColor = (daysLeft) => {
  if (daysLeft <= 1) return "text-red-400";
  if (daysLeft <= 3) return "text-yellow-400";
  return "text-gray-400";
};

const UpcomingDeadlines = () => {
  return (
    <div className="bg-[#111114] border border-gray-800 rounded-xl p-5 h-fit">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">
          Upcoming Deadlines
        </h2>
        <button className="text-sm text-indigo-400 hover:underline">
          View all →
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {deadlines.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between p-3 rounded-lg bg-[#0F0F12] border border-gray-800 hover:bg-[#1a1a1f] transition"
          >
            
            {/* LEFT */}
            <div className="flex gap-3">
              
              {/* Dot */}
              <div className="w-2 h-2 mt-2 rounded-full bg-yellow-400"></div>

              {/* Info */}
              <div>
                <p className="text-white text-sm font-medium">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400">
                  {item.project}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <p className={`text-xs ${getColor(item.daysLeft)}`}>
                {item.date}
              </p>

              <span className="text-[10px] px-2 py-0.5 rounded-md bg-yellow-600/20 text-yellow-400">
                {item.status}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;