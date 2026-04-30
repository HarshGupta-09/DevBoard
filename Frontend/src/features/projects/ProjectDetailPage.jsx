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

  // ✅ CENTRAL FETCH FUNCTION (IMPORTANT)
  const fetchAllData = async () => {
    try {
      const projectRes = await getProjectById(id);
      setProject(projectRes.data.project);

      const milestoneRes = await getMilestonesByProject(id);
      setMilestones(milestoneRes.data.milestones || []);
    } catch (err) {
      console.log(err.response);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchAllData();
      setLoading(false);
    };
    init();
  }, [id]);

  // 🔥 ADD
  const handleAddMilestone = async (data) => {
    try {
      await createMilestone(data);
      await fetchAllData(); // ✅ FIX
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // 🔥 UPDATE
  const handleUpdateMilestone = async (milestoneId, data) => {
    try {
      await updateMilestone(milestoneId, data);
      await fetchAllData(); // ✅ FIX
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE
  const handleDeleteMilestone = async (milestoneId) => {
    const confirmDelete = confirm("Delete this milestone?");
    if (!confirmDelete) return;

    try {
      await deleteMilestone(milestoneId);
      await fetchAllData(); // ✅ FIX
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 TOGGLE
  const handleToggleMilestone = async (milestone) => {
    try {
      const newStatus =
        milestone.status === "completed" ? "pending" : "completed";

      await updateMilestone(milestone._id, { status: newStatus });

      await fetchAllData(); // ✅ FIX
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (m) => {
    setEditData(m);
    setOpen(true);
  };

  // PROGRESS
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

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-white px-3 py-2 rounded-lg"
      >
        <ArrowLeft size={15} />
        Projects
      </button>

      {/* HEADER */}
      <div className="bg-[#111114] border border-[#1f1f2e] rounded-xl p-5 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold mb-2">{project.title}</h1>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-[#1f1f2e] text-gray-400 rounded-md text-xs">
              {project.status}
            </span>
            <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-md text-xs">
              {project.billingType}
            </span>
            <span className="text-gray-500 text-xs">
              {project.client?.name}
            </span>
          </div>
        </div>

        <div className="flex gap-8 text-sm">
          <div>
            <p className="text-[10px] text-gray-500">TOTAL</p>
            <p>₹{project.budget?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500">DEADLINE</p>
            <p>
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
            <p className="text-xs text-gray-500">MILESTONE TRACKER</p>
            <p className="text-sm">{completed} of {total} completed</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-indigo-400">{progress}%</span>
            <button
              onClick={() => {
                setEditData(null);
                setOpen(true);
              }}
              className="flex items-center gap-1 bg-indigo-600 px-3 py-1.5 rounded-lg text-xs"
            >
              <Plus size={13} />
              Add Milestone
            </button>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-[#1f1f2e] h-1 mb-5">
          <div
            className="bg-indigo-500 h-1"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* LIST */}
        <div className="space-y-2">
          {milestones.map((m, i) => (
            <div
              key={m._id}
              className="flex justify-between items-center px-4 py-3 border border-[#1a1a28] rounded-xl"
            >
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={m.status === "completed"}
                  onChange={() => handleToggleMilestone(m)}
                />
                <div>
                  <p className={m.status === "completed" ? "line-through text-gray-500" : ""}>
                    #{i + 1} {m.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {m.dueDate
                      ? new Date(m.dueDate).toLocaleDateString()
                      : "No date"} • ₹{m.amount || "—"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleEdit(m)}>
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDeleteMilestone(m._id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {milestones.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No milestones yet — add your first one!
            </p>
          )}
        </div>
      </div>

      {/* MODAL */}
      <AddMilestoneModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        onAdd={handleAddMilestone}
        onUpdate={handleUpdateMilestone}
        editData={editData}
        projectId={id}
      />
    </div>
  );
};

export default ProjectDetailPage;