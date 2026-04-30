import { useState } from "react";
import { generateProposal } from "./aiproposal.api";
import { Sparkles, Copy } from "lucide-react";

const AIProposalPage = () => {
  const [form, setForm] = useState({
    clientName: "",
    projectTitle: "",
    description: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    if (!form.clientName || !form.projectTitle || !form.description) {
      alert("Fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        budget: form.budget ? Number(form.budget) : undefined,
      };

      const res = await generateProposal(payload);

      setProposal(res.data.proposal);
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to generate proposal");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(proposal);
  };

  return (
    <div className="p-6 text-white grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* LEFT FORM */}
      <div className="bg-[#111114] border border-gray-800 rounded-xl p-5 space-y-4">

        <h2 className="text-lg font-semibold">Proposal Generator</h2>

        <input
          name="clientName"
          placeholder="Client Name"
          value={form.clientName}
          onChange={handleChange}
          className="w-full bg-[#0F0F12] border border-gray-800 px-3 py-2 rounded"
        />

        <input
          name="projectTitle"
          placeholder="Project Title"
          value={form.projectTitle}
          onChange={handleChange}
          className="w-full bg-[#0F0F12] border border-gray-800 px-3 py-2 rounded"
        />

        <input
          name="budget"
          type="number"
          placeholder="Budget (optional)"
          value={form.budget}
          onChange={handleChange}
          className="w-full bg-[#0F0F12] border border-gray-800 px-3 py-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-[#0F0F12] border border-gray-800 px-3 py-2 rounded h-32"
        />

        <button
          onClick={handleGenerate}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg"
        >
          <Sparkles size={16} />
          {loading ? "Generating..." : "Generate Proposal"}
        </button>
      </div>

      {/* RIGHT OUTPUT */}
      <div className="bg-[#111114] border border-gray-800 rounded-xl p-5 relative">

        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm text-gray-400">Generated Proposal</h2>

          {proposal && (
            <button
              onClick={handleCopy}
              className="text-xs flex items-center gap-1 text-gray-400 hover:text-white"
            >
              <Copy size={14} />
              Copy
            </button>
          )}
        </div>

        {!proposal ? (
          <div className="flex items-center justify-center h-[300px] text-gray-500 text-sm">
            Ready when you are 🚀
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {proposal}
          </p>
        )}
      </div>
    </div>
  );
};

export default AIProposalPage;