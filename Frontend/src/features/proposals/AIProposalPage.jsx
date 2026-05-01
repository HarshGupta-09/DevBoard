import { useState } from "react";
import { generateProposal } from "./aiproposal.api";
import { Sparkles, Copy, Download, FileText } from "lucide-react";

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
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <div className="p-6 text-white min-h-screen">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-semibold tracking-widest uppercase mb-3">
          <Sparkles size={10} />
          AI-Powered
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Proposal Generator</h1>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the brief and we'll draft a structured, client-ready proposal in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* LEFT — FORM */}
        <div className="bg-[#111114] border border-[#1f1f2e] rounded-xl p-5 space-y-4">

          <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase">
            Brief
          </p>

          {/* Client Name */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Client Name</label>
            <input
              name="clientName"
              placeholder="Nimbus Labs"
              value={form.clientName}
              onChange={handleChange}
              className="w-full bg-[#0c0c10] border border-[#1f1f2e] hover:border-[#2d2d45] focus:border-indigo-500/50 focus:outline-none px-3 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 transition-colors"
            />
          </div>

          {/* Project Title as Select-style */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Project Type</label>
            <input
              name="projectTitle"
              placeholder="Dashboard / Analytics"
              value={form.projectTitle}
              onChange={handleChange}
              className="w-full bg-[#0c0c10] border border-[#1f1f2e] hover:border-[#2d2d45] focus:border-indigo-500/50 focus:outline-none px-3 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 transition-colors"
            />
          </div>

          {/* Budget + Timeline row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Budget</label>
              <input
                name="budget"
                type="number"
                placeholder="18500"
                value={form.budget}
                onChange={handleChange}
                className="w-full bg-[#0c0c10] border border-[#1f1f2e] hover:border-[#2d2d45] focus:border-indigo-500/50 focus:outline-none px-3 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Timeline</label>
              <input
                placeholder="10 weeks"
                disabled
                className="w-full bg-[#0c0c10] border border-[#1f1f2e] px-3 py-2.5 rounded-lg text-sm text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Key Requirements</label>
            <textarea
              name="description"
              placeholder="Full redesign of analytics dashboard with data-viz primitives, keyboard navigation, and a white-label theming layer."
              value={form.description}
              onChange={handleChange}
              className="w-full bg-[#0c0c10] border border-[#1f1f2e] hover:border-[#2d2d45] focus:border-indigo-500/50 focus:outline-none px-3 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 transition-colors h-32 resize-none"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5"
          >
            <Sparkles size={14} />
            {loading ? "Generating..." : "Generate Proposal"}
          </button>
        </div>

        {/* RIGHT — OUTPUT */}
        <div className="bg-[#111114] border border-[#1f1f2e] rounded-xl p-5 flex flex-col">

          {/* Output Header */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#1f1f2e]">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <FileText size={14} />
              Generated Proposal
            </div>
            {proposal && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-[#1f1f2e] transition-all"
                >
                  <Copy size={12} />
                  Copy
                </button>
                <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-[#1f1f2e] transition-all">
                  <Download size={12} />
                  PDF
                </button>
              </div>
            )}
          </div>

          {/* Output Content */}
          {!proposal ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Sparkles size={22} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">Ready when you are</p>
                <p className="text-xs text-gray-600 mt-1">
                  Fill in the brief and hit{" "}
                  <span className="text-gray-400 font-medium">Generate Proposal</span>{" "}
                  to draft a client-ready document.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <p className="text-sm leading-relaxed whitespace-pre-line text-gray-300">
                {proposal}
              </p>
            </div>
          )}

          {/* Bottom notice */}
          {!proposal && (
            <div className="mt-4 pt-3 border-t border-[#1f1f2e]">
              <p className="text-[11px] text-gray-600 text-center">
                Frontend Preview Only. Please wake servers to enable backend functionality.{" "}
                <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  Wake up servers
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIProposalPage;