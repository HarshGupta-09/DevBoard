import React, { useEffect, useState } from "react";
import ProjectHeader from "./ProjectHeader";
import ProjectCard from "./ProjectCard";
import { getProjects } from "./projects.api";
import Loader from "../../components/common/Loader";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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

  
  const activeProjects = projects.filter(
    (p) => p.status === "active"
  );

  const completedProjects = projects.filter(
    (p) => p.status === "completed"
  );

  return (
    <div>
     
      <ProjectHeader count={projects.length} />

      {loading && <Loader />}

      
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
          
          {/* Active Column */}
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
                  <ProjectCard key={project._id} {...project} />
                ))
              )}
            </div>
          </div>

          {/* Completed Column */}
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
                  <ProjectCard key={project._id} {...project} />
                ))
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ProjectsPage;