import React from "react";

const StatCard = ({ title, value, icon , color }) => {
    const colorMap = {
  indigo: "bg-indigo-600/20 text-indigo-400",
  purple: "bg-purple-600/20 text-purple-400",
  yellow: "bg-yellow-600/20 text-yellow-400",
  green: "bg-green-600/20 text-green-400",
};
  return (
    <div className="
      w-full min-h-[110px] 
      bg-[#1A1A1A] text-white p-4 rounded-xl 
      border border-transparent
      flex items-center justify-between 
      transition-all duration-400 ease-in-out
      hover:-translate-y-1 shadow-sm hover:shadow-lg 
      hover:border-gray-700 hover:bg-[#222222]
    ">
      
      {/* LEFT */}
      <div className="flex flex-col gap-1">
        <p className="text-gray-400 text-xs font-medium">
          {title}
        </p>
        <p className="text-2xl md:text-3xl font-semibold">
          {value}
        </p>
      </div>

      {/* RIGHT */}
   <div className={`p-2 rounded-lg ${colorMap[color]}} flex items-center justify-center`}>
  {icon}
</div>

    </div>
  );
};

export default StatCard;