import React from 'react'
import StatCard from "@/components/common/StatCard";
import { Users, FolderKanban, Receipt, IndianRupee } from "lucide-react";

const StatSection = ({ projects = [], clients = [] }) => {


  const totalClients = clients.length;

  const activeProjects = projects.filter(
    (p) => p.status === "active"
  ).length;

  const totalRevenue = projects.reduce(
    (acc, p) => acc + (p.budget || 0),
    0
  );

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

      <StatCard 
        title="TOTAL CLIENTS" 
        value={totalClients} 
        icon={<Users size={18} />} 
        color="indigo"
      />

      <StatCard 
        title="ACTIVE PROJECTS" 
        value={activeProjects} 
        icon={<FolderKanban size={18} />} 
        color="purple"
      />

      <StatCard 
        title="PENDING INVOICES" 
        value={"—"} // placeholder for now
        icon={<Receipt size={18} />} 
        color="yellow"
      />

      <StatCard 
        title="TOTAL EARNED" 
        value={`₹${totalRevenue.toLocaleString("en-IN")}`} 
        icon={<IndianRupee size={18} />} 
        color="green"
      />

    </section>
  )
}

export default StatSection