import { useState } from "react";
import { X } from "lucide-react";

const AddClientModal = ({ isOpen, onClose, onAddClient }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    await onAddClient(form);

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      notes: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
      {/* Modal Box */}
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
          New Client
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Store contact info and notes.
        </p>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          
          <input
            name="name"
            placeholder="Name *"
            value={form.name}
            onChange={handleChange}
            className="bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />

          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />

          <input
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            className="bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />
        </div>

        {/* Address */}
        <div className="mt-4">
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />
        </div>

        {/* Notes */}
        <div className="mt-4">
          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full bg-[#0F0F12] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 h-24 resize-none"
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
            Save Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;