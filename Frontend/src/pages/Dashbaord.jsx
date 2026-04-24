import RecentProjects from "@/components/common/RecentProjects";
import StatCard from "@/components/common/StatCard";
import { Button } from "@/components/ui/button";
import { Plus,Users, FolderKanban, Receipt, IndianRupee } from "lucide-react";

const Dashboard = () => {
  return (
        <>
    <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
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
    </section>
   
{/* Cards Section */}
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
  
  
<StatCard 
  title="TOTAL CLIENTS" 
  value={6} 
  icon={<Users size={18} />} 
  color="indigo"
/>

<StatCard 
  title="ACTIVE PROJECTS" 
  value={5} 
  icon={<FolderKanban size={18} />} 
  color="purple"
/>

<StatCard 
  title="PENDING INVOICES" 
  value={4} 
  icon={<Receipt size={18} />} 
  color="yellow"
/>

<StatCard 
  title="TOTAL EARNED" 
  value="24,300" 
  icon={<IndianRupee size={18} />} 
  color="green"
/>

</section>

{/* Recent Projects  */}
<RecentProjects/>

    
    </>
  );
};

export default Dashboard;