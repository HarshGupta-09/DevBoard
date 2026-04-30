import { useState, useEffect } from "react";
import { X } from "lucide-react";

const AddMilestoneModal = ({
  isOpen,
  onClose,
  onAdd,
  projectId,
  editData,
  onUpdate,
}) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    dueDate: "",
  });

  // 🔥 Prefill (edit mode)
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        amount: editData.amount || "",
        dueDate: editData.dueDate
          ? editData.dueDate.split("T")[0]
          : "",
      });
    } else {
      // reset when switching back to add mode
      setForm({
        title: "",
        amount: "",
        dueDate: "",
      });
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 FIXED SUBMIT
  const handleSubmit = async () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    const payload = {
      title: form.title.trim(),
      project: projectId,
    };

    if (form.amount) {
      payload.amount = Number(form.amount);
    }

    if (form.dueDate) {
      payload.dueDate = form.dueDate;
    }

    // 🔥 order only for CREATE
    if (!editData) {
      payload.order = Date.now();
    }

    try {
      if (editData) {
        await onUpdate(editData._id, payload);
      } else {
        await onAdd(payload);
      }

      // reset
      setForm({
        title: "",
        amount: "",
        dueDate: "",
      });

      onClose();
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-lg bg-[#111114] border border-gray-800 rounded-xl p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold text-white">
          {editData ? "Edit Milestone" : "Add Milestone"}
        </h2>

        {/* Form */}
        <div className="mt-6 space-y-4">

          <input
            name="title"
            placeholder="Milestone Title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />

          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />

          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />

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
            {editData ? "Update" : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddMilestoneModal;