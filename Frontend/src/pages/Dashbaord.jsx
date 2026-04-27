import RecentClients from "@/components/common/RecentClients";
import RecentProjects from "@/components/common/RecentProjects";
import DashboardHeader from "@/components/common/DashboardHeader";
import StatSection from "@/components/common/StatSection";
import UpcomingDeadlines from "@/components/common/UpcomingDeadlines";
import { getProjects } from "@/features/projects/projects.api";
import { getClients } from "@/features/clients/clients.api";
import { useEffect, useState } from "react";
const Dashboard = () => {
  const [projects , setProjects] = useState([]);
  const [clients , setClients] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const projRes = await getProjects();
        const clientRes = await getClients();
        setProjects(projRes.data.projects)
      setClients(clientRes.data.clients)

        
      } catch (error) {
        console.log(error)
        
      }
    }
    fetchData();

  },[])

  return (
    <div className="space-y-6">

      {/* Header */}
      <DashboardHeader />

      {/* Stats */}
      <StatSection projects={projects} clients={clients} />

      {/* Recent Projects */}
      <RecentProjects projects={projects} />

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Clients */}
        <div className="lg:col-span-2">
          <RecentClients clients={clients} />
        </div>

        {/* Deadlines */}
        <div>
          <UpcomingDeadlines/>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;