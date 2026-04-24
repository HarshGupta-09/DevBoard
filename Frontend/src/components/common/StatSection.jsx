import React from 'react'
import StatCard from "@/components/common/StatCard";
import { Plus,Users, FolderKanban, Receipt, IndianRupee } from "lucide-react";
const StatSection = () => {
  return (
    <>
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
    </>
  )
}

export default StatSection
