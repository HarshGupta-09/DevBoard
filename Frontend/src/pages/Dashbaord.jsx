import { useEffect, useState } from "react";

import DashboardHeader from "@/components/common/DashboardHeader";
import StatSection from "@/components/common/StatSection";
import RecentProjects from "@/components/common/RecentProjects";
import RecentClients from "@/components/common/RecentClients";
import UpcomingDeadlines from "@/components/common/UpcomingDeadlines";

import { getProjects } from "@/features/projects/projects.api";
import { getClients } from "@/features/clients/clients.api";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projRes = await getProjects();
        const clientRes = await getClients();

        setProjects(projRes.data.projects || []);
        setClients(clientRes.data.clients || []);
      } catch (error) {
        console.log("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
 if (loading) {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Header */}
      <div className="h-16 bg-[#111114] rounded-xl"></div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-24 bg-[#111114] rounded-xl"></div>
        <div className="h-24 bg-[#111114] rounded-xl"></div>
        <div className="h-24 bg-[#111114] rounded-xl"></div>
        <div className="h-24 bg-[#111114] rounded-xl"></div>
      </div>

      {/* Recent Projects */}
      <div className="bg-[#111114] p-5 rounded-xl space-y-3">
        <div className="h-4 w-1/3 bg-gray-700 rounded"></div>
        <div className="h-3 w-1/4 bg-gray-800 rounded"></div>
        <div className="h-3 w-full bg-gray-800 rounded"></div>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-32 bg-[#111114] rounded-xl"></div>
        <div className="h-32 bg-[#111114] rounded-xl"></div>
      </div>

    </div>
  );
}

  return (
    <div className="space-y-6">

      {/* Header */}
      <DashboardHeader />

      {/* Stats */}
      <StatSection projects={projects} clients={clients} />

      {/* Recent Projects */}
      <RecentProjects projects={projects} />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Clients */}
        <div className="lg:col-span-2">
          <RecentClients clients={clients} />
        </div>

        {/* Deadlines */}
        <div>
          <UpcomingDeadlines />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;