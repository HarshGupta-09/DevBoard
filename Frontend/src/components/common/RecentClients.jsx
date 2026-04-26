import React from "react";

const RecentClients = ({ clients }) => {
  console.log("Clients:", clients);

  // 🔹 Loading state
  if (!clients) {
    return (
      <div className="text-gray-400 text-sm mt-6">
        Loading clients...
      </div>
    );
  }

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

      {/* Content */}
      <div className="flex flex-col gap-3">

        {/* 🔹 Empty state */}
        {clients.length === 0 ? (
          <p className="text-gray-400 text-sm">No clients yet</p>
        ) : (
          clients.map((client) => (
            <div
              key={client._id}
              className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F12] border border-gray-800 hover:bg-[#1a1a1f] transition"
            >
              
              {/* LEFT */}
              <div className="flex items-center gap-3">
                
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold">
                  {client.name?.charAt(0) || "?"}
                </div>

                {/* Info */}
                <div>
                  <p className="text-white text-sm font-medium">
                    {client.name || "Unnamed"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {client.company || "No Company"}
                  </p>
                </div>
              </div>

              {/* RIGHT (temporary placeholder) */}
              <div className="text-right">
                <p className="text-xs text-gray-400">
                  {/* future: projects count */}
                  —
                </p>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentClients;