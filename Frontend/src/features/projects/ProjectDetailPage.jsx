import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById } from "./projects.api";
import Loader from "../../components/common/Loader";
import { ArrowLeft, Calendar, IndianRupee } from "lucide-react";
import {
  getMilestonesByProject,
  updateMilestone,
} from "../milestones/milestone.api";
import AddMilestoneModal from "../milestones/AddMilestoneModal";
import { createMilestone } from "../milestones/milestone.api";
const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const [open, setOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA (SAFE VERSION)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Project fetch (critical)
        const projectRes = await getProjectById(id);
        setProject(projectRes.data.project);

        // ✅ Milestones fetch (non-critical)
        try {
          const milestoneRes = await getMilestonesByProject(id);
          setMilestones(milestoneRes.data.milestones || []);
        } catch (err) {
          console.log("Milestone fetch error:", err);
        }

      } catch (err) {
        console.log("Project fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🔥 Progress
  const completed = milestones.filter(
    (m) => m.status === "completed"
  ).length;

  const total = milestones.length;

  const progress = total
    ? Math.round((completed / total) * 100)
    : 0;


const handleAddMilestone = async (data) => {
  try {
    const res = await createMilestone(data);

    setMilestones((prev) => [
      res.data.milestone,
      ...prev,
    ]);
  } catch (err) {
    console.log(err.response.data.error);
  }
};

  // 🔥 Toggle milestone
  const handleToggleMilestone = async (milestone) => {
    try {
      const newStatus =
        milestone.status === "completed"
          ? "pending"
          : "completed";

      const res = await updateMilestone(milestone._id, {
        status: newStatus,
      });

      const updated = res.data.updatedMilestone;

      setMilestones((prev) =>
        prev.map((m) =>
          m._id === milestone._id ? updated : m
        )
      );
    } catch (err) {
      console.log(err);
    }
  };


  // 🔥 STATES
  if (loading) return <Loader />;

  if (!project) {
    return (
      <div className="p-6 text-white">
        <p>Project not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 text-indigo-400"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-6">

      {/* 🔙 Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Projects
      </button>

      {/* 🔥 HEADER */}
      <div className="bg-[#111114] border border-gray-800 rounded-xl p-6 flex justify-between items-center">

        <div>
          <p className="text-xs text-gray-500 mb-1">PRJ</p>

          <h1 className="text-xl font-semibold">
            {project.title}
          </h1>

          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="px-2 py-1 rounded-full bg-gray-700 text-gray-300">
              {project.status}
            </span>

            <span className="px-2 py-1 rounded-full bg-indigo-600/20 text-indigo-400">
              {project.billingType}
            </span>

            <span className="text-gray-400">
              {project.client?.name}
            </span>
          </div>
        </div>

        <div className="flex gap-10 text-sm">
          <div>
            <p className="text-gray-400 text-xs">TOTAL</p>
            <p className="font-medium">
              ₹{project.budget
                ? project.budget.toLocaleString()
                : "—"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-xs">DEADLINE</p>
            <p className="font-medium">
              {project.deadline
                ? new Date(project.deadline).toLocaleDateString()
                : "No date"}
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 MILESTONES */}
      <div className="bg-[#111114] border border-gray-800 rounded-xl p-6">

        <div className="flex justify-between items-center mb-4">

  <div>
    <p className="text-xs text-gray-400">
      MILESTONE TRACKER
    </p>
    <p className="text-sm mt-1">
      {completed} of {total} completed
    </p>
  </div>

  <div className="flex items-center gap-3">
    <p className="text-sm font-medium">{progress}%</p>

    {/*  ADD BUTTON */}
    <button
      onClick={() => setOpen(true)}
      className="text-xs cursor-pointer bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-md"
    >
      + Add
    </button>
  </div>

</div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-800 rounded-full mb-6">
          <div
            className="h-1.5 bg-indigo-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* List */}
        <div className="space-y-4">
          {milestones.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No milestones yet
            </p>
          ) : (
            milestones.map((m, i) => (
              <div
                key={m._id}
                className="flex items-center justify-between"
              >
                {/* Left */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={m.status === "completed"}
                    onChange={() =>
                      handleToggleMilestone(m)
                    }
                    className="accent-indigo-500"
                  />

                  <div>
                    <p className="text-sm">
                      #{i + 1} {m.title}
                    </p>

                    <p className="text-xs text-gray-400 flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {m.dueDate
                          ? new Date(m.dueDate).toLocaleDateString()
                          : "No date"}
                      </span>

                      <span className="flex items-center gap-1">
                        <IndianRupee size={12} />
                        {m.amount || "—"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    m.status === "completed"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-yellow-600/20 text-yellow-400"
                  }`}
                >
                  {m.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🔥 DESCRIPTION */}
      {project.description && (
        <div className="bg-[#111114] border border-gray-800 rounded-xl p-6">
          <p className="text-xs text-gray-400 mb-2">
            DESCRIPTION
          </p>

          <p className="text-sm text-gray-300">
            {project.description}
          </p>
        </div>
      )}
<AddMilestoneModal
  isOpen={open}
  onClose={() => setOpen(false)}
  onAdd={handleAddMilestone}
  projectId={id}
/>
    </div>
  );
};

export default ProjectDetailPage;