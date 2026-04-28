import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Clients from "../features/clients/ClientsPage";
import Projects from "../features/projects/ProjectsPage";
import Proposals from "../features/proposals/ProposalPage";
import Milestones from "../features/milestones/MilestonesPage";
import Invoices from "../features/invoices/InvoicesPage";
import Dashboard from "../pages/Dashbaord";
import AppLayout from "@/layout/AppLayout";
import Login from "@/features/auth/Login";
import Register from "@/features/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Layout Routes */}
        {/* jo bhi routes iske andar hain, wo sab AppLayout ke andar render honge. */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/ai-proposals" element={<Proposals />} />
          <Route path="/invoices" element={<Invoices />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
