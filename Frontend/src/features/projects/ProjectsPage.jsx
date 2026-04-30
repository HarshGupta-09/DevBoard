import React, { useEffect, useState } from "react";
import ProjectHeader from "./ProjectHeader";
import ProjectCard from "./ProjectCard";
import Loader from "../../components/common/Loader";

import {
  getProjects,
  updateProject,
  createProject,
  deleteProject,
} from "./projects.api";

import {
  getClients,
  createClient,
} from "../clients/clients.api";

import AddProjectModal from "./AddProjectModal";
import AddClientModal from "../clients/AddClientModal";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  better naming
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);

  const [selectedClient, setSelectedClient] = useState("");
  const [editProjectData, setEditProjectData] = useState(null);

  // Fetch Clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await getClients();
        setClients(res.data.clients || []);
      } catch (err) {
        console.log("Client fetch error", err);
      }
    };

    fetchClients();
  }, []);

  //  Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data.projects || []);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  //  DELETE
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      setProjects((prev) =>
        prev.filter((p) => p?._id !== id)
      );
    } catch (error) {
      console.log("Delete Project error:", error);
    }
  };

  //  EDIT CLICK
  const handleEdit = (project) => {
    setEditProjectData(project);
    setProjectModalOpen(true);
  };

  //  UPDATE PROJECT
  const handleUpdateProject = async (id, data) => {
    try {
      const res = await updateProject(id, data);

      const updatedProject = res.data.updatedProject;

      setProjects((prev) =>
        prev.map((p) =>
          p?._id === id ? updatedProject : p
        )
      );
    } catch (err) {
      console.log("Update error:", err.response?.data || err);
    }
  };

  // MARK COMPLETE
  const handleMarkComplete = async (id) => {
    try {
      const res = await updateProject(id, {
        status: "completed",
      });

      const updatedProject = res.data.updatedProject;

      setProjects((prev) =>
        prev.map((p) =>
          p?._id === id ? updatedProject : p
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ADD PROJECT
  const handleAddProject = async (data) => {
    try {
      const res = await createProject(data);

      setProjects((prev) => [
        res.data.project,
        ...prev,
      ]);
    } catch (err) {
      console.log("Create project error", err);
    }
  };

  //  ADD CLIENT (from modal)
  const handleAddClient = async (data) => {
    try {
      const res = await createClient(data);

      const newClient = res.data.client;

      setClients((prev) => [newClient, ...prev]);

      //  auto select
      setSelectedClient(newClient._id);

      setClientModalOpen(false);
    } catch (err) {
      console.log("Create client error", err);
    }
  };

  //  SAFE FILTERS
  const activeProjects = projects.filter(
    (p) => p?.status === "active"
  );

  const completedProjects = projects.filter(
    (p) => p?.status === "completed"
  );

  return (
    <div>
      {/* Header */}
      <ProjectHeader
        count={projects.length}
        onAddClick={() => setProjectModalOpen(true)}
      />

      {/* Loading */}
      {loading && <Loader />}

      {/* Error */}
      {error && (
        <p className="text-red-400 mt-6">{error}</p>
      )}

      {/* Empty */}
      {!loading && projects.length === 0 && (
        <p className="text-gray-400 mt-6 text-center">
          No projects yet. Create your first project 🚀
        </p>
      )}

      {/* Columns */}
      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Active */}
          <div className="bg-[#111114] border border-gray-800 rounded-xl p-4">
            <h2 className="text-white font-medium mb-4">
              In Progress ({activeProjects.length})
            </h2>

            <div className="flex flex-col gap-4">
              {activeProjects.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No active projects
                </p>
              ) : (
                activeProjects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    {...project}
                    onMarkComplete={handleMarkComplete}
                    onDelete={handleDelete}
                    onEdit={() => handleEdit(project)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Completed */}
          <div className="bg-[#111114] border border-gray-800 rounded-xl p-4">
            <h2 className="text-white font-medium mb-4">
              Completed ({completedProjects.length})
            </h2>

            <div className="flex flex-col gap-4">
              {completedProjects.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No completed projects
                </p>
              ) : (
                completedProjects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    {...project}
                    onDelete={handleDelete}
                    onEdit={() => handleEdit(project)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/*  Project Modal */}
      <AddProjectModal
        isOpen={projectModalOpen}
        onClose={() => {
          setProjectModalOpen(false);
          setSelectedClient("");
          setEditProjectData(null); //  FIXED BUG
        }}
        onAddProject={handleAddProject}
        onUpdateProject={handleUpdateProject}
        editProject={editProjectData}
        clients={clients}
        onOpenClientModal={() => setClientModalOpen(true)}
        selectedClient={selectedClient}
      />

      {/*  Client Modal */}
      <AddClientModal
        isOpen={clientModalOpen}
        onClose={() => setClientModalOpen(false)}
        onAddClient={handleAddClient}
      />
    </div>
  );
};

export default ProjectsPage;