import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById } from "./projects.api";
import Loader from "../../components/common/Loader";
import { ArrowLeft, Calendar, IndianRupee, Pencil, Trash2, Plus } from "lucide-react";
import {
  getMilestonesByProject,
  updateMilestone,
  deleteMilestone,
  createMilestone,
} from "../milestones/milestone.api";
import AddMilestoneModal from "../milestones/AddMilestoneModal";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await getProjectById(id);
        setProject(projectRes.data.project);
        const milestoneRes = await getMilestonesByProject(id);
        setMilestones(milestoneRes.data.milestones || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // 🔥 ADD
  const handleAddMilestone = async (data) => {
    try {
      const res = await createMilestone(data);
      setMilestones((prev) => [res.data.milestone, ...prev]);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // 🔥 UPDATE
  const handleUpdateMilestone = async (id, data) => {
    try {
      const res = await updateMilestone(id, data);
      const updated = res.data.updatedMilestone;
      setMilestones((prev) =>
        prev.map((m) => (m._id === id ? updated : m))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE
  const handleDeleteMilestone = async (id) => {
    const confirmDelete = confirm("Delete this milestone?");
    if (!confirmDelete) return;
    try {
      await deleteMilestone(id);
      setMilestones((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 TOGGLE
  const handleToggleMilestone = async (milestone) => {
    try {
      const newStatus =
        milestone.status === "completed" ? "pending" : "completed";
      const res = await updateMilestone(milestone._id, { status: newStatus });
      const updated = res.data.updatedMilestone;
      setMilestones((prev) =>
        prev.map((m) => (m._id === milestone._id ? updated : m))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 EDIT CLICK
  const handleEdit = (m) => {
    setEditData(m);
    setOpen(true);
  };

  // 🔥 Progress
  const completed = milestones.filter((m) => m.status === "completed").length;
  const total = milestones.length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  if (loading) return <Loader />;

  if (!project) {
    return (
      <div className="p-6 text-white">
        <p>Project not found</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const statusColors = {
    completed: "bg-green-500/10 text-green-400",
    pending: "bg-yellow-500/10 text-yellow-400",
    "in-progress": "bg-indigo-500/10 text-indigo-400",
  };

  return (
    <div className="p-6 text-white space-y-4">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-white hover:bg-[#1a1a24] px-3 py-2 rounded-lg transition-all"
      >
        <ArrowLeft size={15} />
        Projects
      </button>

      {/* HEADER */}
      <div className="bg-[#111114] border border-[#1f1f2e] rounded-xl p-5 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold mb-2">{project.title}</h1>
          <div className="flex gap-2 flex-wrap items-center">
            <span className="px-2 py-1 bg-[#1f1f2e] text-gray-400 rounded-md text-xs font-medium">
              {project.status}
            </span>
            <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-md text-xs font-medium">
              {project.billingType}
            </span>
            <span className="text-gray-500 text-xs">
              {project.client?.name}
            </span>
          </div>
        </div>

        <div className="flex gap-8 text-sm">
          <div>
            <p className="text-[10px] text-gray-500 tracking-widest mb-1">TOTAL</p>
            <p className="font-medium">₹{project.budget?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 tracking-widest mb-1">DEADLINE</p>
            <p className="font-medium">
              {project.deadline
                ? new Date(project.deadline).toLocaleDateString()
                : "No date"}
            </p>
          </div>
        </div>
      </div>

      {/* MILESTONES */}
      <div className="bg-[#111114] border border-[#1f1f2e] rounded-xl p-5">

        {/* TOP */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-[10px] text-gray-500 tracking-widest mb-1">
              MILESTONE TRACKER
            </p>
            <p className="text-sm text-gray-300">
              {completed} of {total} completed
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-indigo-400 font-semibold">
              {progress}%
            </span>
            <button
              onClick={() => {
                setEditData(null);
                setOpen(true);
              }}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:-translate-y-0.5"
            >
              <Plus size={13} />
              Add Milestone
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#1f1f2e] rounded-full h-1 mb-5">
          <div
            className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-1 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* LIST */}
        <div className="space-y-2">
          {milestones.map((m, i) => (
            <div
              key={m._id}
              className={`flex justify-between items-center px-4 py-3 rounded-xl border transition-all
                ${m.status === "completed"
                  ? "bg-[#0f0f18] border-[#1a1a28] opacity-55"
                  : "bg-[#0f0f18] border-[#1a1a28] hover:border-[#2d2d45]"
                }`}
            >
              {/* LEFT */}
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={m.status === "completed"}
                  onChange={() => handleToggleMilestone(m)}
                  className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
                />
                <div>
                  <p className={`text-sm font-medium ${m.status === "completed" ? "line-through text-gray-500" : ""}`}>
                    #{i + 1} {m.title}
                  </p>
                  <div className="flex gap-3 items-center mt-1 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {m.dueDate
                        ? new Date(m.dueDate).toLocaleDateString()
                        : "No date"}
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupee size={11} />
                      {m.amount || "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-2">

                {/* STATUS */}
                <span className={`text-[10px] px-2 py-1 rounded-md font-medium ${statusColors[m.status] || "bg-gray-700 text-gray-400"}`}>
                  {m.status}
                </span>

                {/* EDIT */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleEdit(m); }}
                  className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                >
                  <Pencil size={13} />
                </button>

                {/* DELETE */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteMilestone(m._id); }}
                  className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 size={13} />
                </button>

              </div>
            </div>
          ))}

          {/* Empty state */}
          {milestones.length === 0 && (
            <div className="text-center py-10 text-gray-600 text-sm">
              No milestones yet — add your first one!
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <AddMilestoneModal
        isOpen={open}
        onClose={() => { setOpen(false); setEditData(null); }}
        onAdd={handleAddMilestone}
        onUpdate={handleUpdateMilestone}
        editData={editData}
        projectId={id}
      />
    </div>
  );
};

export default ProjectDetailPage;