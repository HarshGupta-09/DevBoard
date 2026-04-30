import { useState, useEffect } from "react";
import { X } from "lucide-react";

const AddProjectModal = ({
  isOpen,
  onClose,
  onAddProject,
  clients = [],
  onOpenClientModal,
  selectedClient,
  editProject,
  onUpdateProject,
}) => {
  const [form, setForm] = useState({
    title: "",
    client: "",
    billingType: "fixed",
    budget: "",
    deadline: "",
    description: "",
  });

  // 🔥 RESET on close
  useEffect(() => {
    if (!isOpen) {
      setForm({
        title: "",
        client: "",
        billingType: "fixed",
        budget: "",
        deadline: "",
        description: "",
      });
    }
  }, [isOpen]);

  // 🔥 PREFILL when editing
  useEffect(() => {
    if (editProject) {
      setForm({
        title: editProject.title || "",
        client: editProject.client?._id || editProject.client || "",
        billingType: editProject.billingType || "fixed",
        budget: editProject.budget || "",
        deadline: editProject.deadline
          ? editProject.deadline.split("T")[0]
          : "",
        description: editProject.description || "",
      });
    }
  }, [editProject]);

  // 🔥 AUTO SELECT newly created client
  useEffect(() => {
    if (selectedClient) {
      setForm((prev) => ({
        ...prev,
        client: selectedClient,
      }));
    }
  }, [selectedClient]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 MAIN SUBMIT (ADD + EDIT)
  const handleSubmit = async () => {
    if (!form.title || !form.client || !form.budget) {
      alert("Title, Client and Budget are required");
      return;
    }

    const payload = {
      ...form,
      budget: Number(form.budget),
    };

    try {
      if (editProject) {
        // 🔥 UPDATE MODE
        await onUpdateProject(editProject._id, payload);
      } else {
        // 🔥 CREATE MODE
        await onAddProject(payload);
      }

      onClose();
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
      <div className="w-full max-w-xl bg-[#111114] border border-gray-800 rounded-xl p-6 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold text-white">
          {editProject ? "Edit Project" : "New Project"}
        </h2>

        <div className="mt-6 space-y-4">

          {/* Title */}
          <div>
            <label className="text-sm text-gray-400">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full mt-1 bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
            />
          </div>

          {/* Client + Billing */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* CLIENT */}
            <div>
              <label className="text-sm text-gray-400">Client</label>

              <div className="flex gap-2 mt-1">
                <select
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                  className="flex-1 bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none"
                >
                  <option value="">Select client</option>
                  {clients.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={onOpenClientModal}
                  className="px-3 py-2 text-sm border border-gray-700 rounded-lg text-gray-300 hover:bg-[#1a1a1f]"
                >
                  + New
                </button>
              </div>
            </div>

            {/* BILLING */}
            <div>
              <label className="text-sm text-gray-400">Billing</label>
              <select
                name="billingType"
                value={form.billingType}
                onChange={handleChange}
                className="w-full mt-1 bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none"
              >
                <option value="fixed">Fixed</option>
                <option value="milestone" disabled>
                  Milestone (coming soon)
                </option>
              </select>
            </div>

          </div>

          {/* Budget + Deadline */}
          <div className="grid grid-cols-2 gap-4">
            
            <div>
              <label className="text-sm text-gray-400">Amount</label>
              <input
                name="budget"
                type="number"
                value={form.budget}
                onChange={handleChange}
                className="w-full mt-1 bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Deadline</label>
              <input
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                className="w-full mt-1 bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none"
              />
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none h-24 resize-none"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-700 rounded-lg text-gray-300 hover:bg-[#1a1a1f]"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white"
          >
            {editProject ? "Update Project" : "Save Project"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;