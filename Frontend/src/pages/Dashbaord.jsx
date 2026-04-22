import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const Dashboard = () => {
  return (
    <section className="p-6 bg-white border border-gray-200 rounded-xl flex justify-between items-center">
      
      {/* LEFT */}
      <div className="space-y-1">
        <p className="text-xs text-gray-500 tracking-wide">FEB 2026</p>

        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, Harsh
        </h1>

        <p className="text-sm text-gray-600">
          You have <span className="font-semibold text-gray-800">5 active projects</span> and{" "}
          <span className="font-semibold text-gray-800">4 invoices</span> awaiting payment.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex gap-3">
        
        <Button variant="outline" className="flex items-center">
          <Plus size={16} className="mr-2" />
          New Client
        </Button>

        <Button variant="outline" className="flex items-center">
          <Plus size={16} className="mr-2" />
          New Project
        </Button>

        <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center">
          <Plus size={16} className="mr-2" />
          Generate Proposal
        </Button>

      </div>
    </section>
  )
}

export default Dashboard