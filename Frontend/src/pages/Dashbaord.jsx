import RecentClients from "@/components/common/RecentClients";
import RecentProjects from "@/components/common/RecentProjects";
import DashboardHeader from "@/components/common/DashboardHeader";
import StatSection from "@/components/common/StatSection";

const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* Header */}
      <DashboardHeader />

      {/* Stats */}
      <StatSection />

      {/* Recent Projects */}
      <RecentProjects />

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Clients */}
        <div className="lg:col-span-2">
          <RecentClients />
        </div>

        {/* Deadlines */}
        <div>
          {/* UpcomingDeadlines */}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;