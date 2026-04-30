import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { getMilestones } from "./milestone.api";

const MilestonesPage = () => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  // 🔥 FETCH (no projectId here)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMilestones(); // ✅ fixed
        setMilestones(res.data.milestones || []);
      } catch (err) {
        console.log("Milestone error:", err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔥 FILTER
  const filtered = milestones.filter((m) => {
    if (statusFilter === "all") return true;
    return m.status === statusFilter;
  });

  if (loading) return <Loader />;

  return (
    <div className="p-6 text-white space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Milestones</h1>
          <p className="text-sm text-gray-400">
            {milestones.length} milestones
          </p>
        </div>

        {/* FILTER */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#111114] border border-gray-800 rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-[#111114] border border-gray-800 rounded-xl overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-6 text-xs text-gray-400 px-4 py-3 border-b border-gray-800">
          <span>Milestone</span>
          <span>Project</span>
          <span>Client</span>
          <span>Due Date</span>
          <span>Amount</span>
          <span>Status</span>
        </div>

        {/* BODY */}
        <div>
          {filtered.length === 0 ? (
            <p className="p-6 text-gray-400 text-sm">
              No milestones found
            </p>
          ) : (
            filtered.map((m) => (
              <div
                key={m._id}
                className="grid grid-cols-6 px-4 py-4 border-b border-gray-800 hover:bg-[#1a1a1f] transition"
              >
                {/* TITLE */}
                <div>
                  <p className="text-sm">{m.title}</p>
                  <p className="text-xs text-gray-500">
                    #{m.order || 1}
                  </p>
                </div>

                {/* PROJECT */}
                <p className="text-sm text-gray-300">
                  {m.project?.title || "—"}
                </p>

                {/* CLIENT */}
                <p className="text-sm text-gray-300">
                  {m.project?.client?.name || "—"}
                </p>

                {/* DATE */}
                <p className="text-sm text-gray-300">
                  {m.dueDate
                    ? new Date(m.dueDate).toLocaleDateString()
                    : "No date"}
                </p>

                {/* AMOUNT */}
                <p className="text-sm">
                  ₹{m.amount?.toLocaleString() || "—"}
                </p>

                {/* STATUS */}
                <span
                  className={`text-xs px-2 py-1 rounded-full w-fit ${
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
    </div>
  );
};

export default MilestonesPage;