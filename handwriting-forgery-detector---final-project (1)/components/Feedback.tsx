
import React, { useState } from 'react';

const Feedback: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl">
           <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="serif-title text-3xl font-bold text-slate-900 mb-4">Submission Registered</h2>
        <p className="text-slate-500">
          Your forensic report and platform feedback have been logged in the ScribeShield secure registry. Our technical council will review your data for future model enhancements.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-10 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
        >
          Submit Another Entry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center mb-16">
        <h2 className="serif-title text-5xl font-black text-slate-900 mb-4">Expert Registry</h2>
        <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        <p className="mt-8 text-slate-500 max-w-2xl mx-auto">
          Provide feedback on analysis accuracy, suggest feature enhancements, or report inconsistencies to our forensic development board.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
           <div className="p-8 bg-slate-900 text-white rounded-xl shadow-xl">
              <h3 className="serif-title text-xl font-bold mb-4 text-amber-400">Professional Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Direct channel for law firms and investigative agencies requiring technical documentation or API integration support.
              </p>
              <div className="space-y-4">
                 <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center">
                       <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">forensics@scribeshield.com</span>
                 </div>
                 <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center">
                       <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">+1 (555) SCRIBE-7</span>
                 </div>
              </div>
           </div>
           
           <div className="p-8 bg-white border border-slate-200 rounded-xl shadow-sm italic">
              <p className="text-xs text-slate-500 leading-relaxed">
                "Your feedback is the critical loop in our AI training. Every reported false positive improves the tremor detection weights for our global forensic node."
              </p>
           </div>
        </div>

        <div className="lg:col-span-2">
           <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-xl border border-slate-200 legal-paper">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Full Professional Name</label>
                    <input required type="text" className="w-full border-b-2 border-slate-200 py-2 focus:border-amber-500 outline-none bg-transparent text-sm" placeholder="e.g. Atty. Jane Doe" />
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Organization/Firm</label>
                    <input required type="text" className="w-full border-b-2 border-slate-200 py-2 focus:border-amber-500 outline-none bg-transparent text-sm" placeholder="e.g. Global Legal Group" />
                 </div>
              </div>

              <div className="mb-8">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Case Category</label>
                 <select className="w-full border-b-2 border-slate-200 py-2 focus:border-amber-500 outline-none bg-transparent text-sm">
                    <option>Wills & Probate</option>
                    <option>Real Estate Fraud</option>
                    <option>Corporate Contract Dispute</option>
                    <option>Historical/Art Verification</option>
                    <option>Technical Platform Error</option>
                    <option>Other</option>
                 </select>
              </div>

              <div className="mb-10">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Expert Observations / Feedback</label>
                 <textarea required className="w-full border-b-2 border-slate-200 py-2 min-h-[150px] focus:border-amber-500 outline-none bg-transparent text-sm resize-none" placeholder="Provide detailed feedback on your experience or report a specific case outcome..."></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-[#0f172a] text-white font-black text-xs uppercase tracking-[0.3em] rounded shadow-lg hover:bg-slate-800 transition-all active:scale-[0.98]">
                 Submit to Forensic Board
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
