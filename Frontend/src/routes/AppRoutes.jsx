import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Clients from '../features/clients/ClientsPage'
import Projects from '../features/projects/ProjectsPage'
import Proposals from '../features/proposals/ProposalPage'
import Milestones from '../features/milestones/MilestonesPage'
import Invoices from '../features/invoices/InvoicesPage'
import Dashboard from "../pages/Dashbaord"
import AppLayout from '@/layout/AppLayout';

const AppRoutes = () => {
  return (
  <BrowserRouter>
      <Routes>

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Layout Routes */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/ai-proposals" element={<Proposals />} />
          <Route path="/invoices" element={<Invoices />} />
          
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
