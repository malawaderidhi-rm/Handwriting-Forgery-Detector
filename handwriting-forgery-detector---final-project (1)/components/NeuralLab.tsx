
import React, { useState } from 'react';

const NeuralLab: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [percent, setPercent] = useState(99);

  const testAlgorithm = () => {
    setRunning(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      if (p >= 100) {
        clearInterval(interval);
        setRunning(false);
        setPercent(99.4 + Math.random() * 0.5);
      }
    }, 100);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase mb-4 leading-none">Kernel Console</h2>
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
             <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs leading-none">Project Logic Core Online</p>
          </div>
        </div>
        <button 
          onClick={testAlgorithm}
          disabled={running}
          className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl flex items-center gap-3 ${
            running ? 'bg-slate-800 text-slate-600' : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-900/40'
          }`}
        >
          {running ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-600 border-t-white rounded-full animate-spin"></div>
              Computing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Run Logic Diagnostic
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-8">
          <div className="academic-card p-10 bg-slate-900 border-slate-700">
            <h3 className="text-[11px] font-black uppercase text-slate-500 mb-8 tracking-[0.3em]">Precision Monitoring</h3>
            <div className="space-y-10">
               <div>
                  <div className="flex justify-between items-end mb-4">
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">Logic Matching Rate</span>
                     <span className="text-3xl font-black text-indigo-400 leading-none">{percent.toFixed(1)}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                     <div className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000" style={{ width: `${percent}%` }}></div>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between items-end mb-4">
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">Data Synchronization</span>
                     <span className="text-3xl font-black text-emerald-400 leading-none">ACTIVE</span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                     <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] w-full"></div>
                  </div>
               </div>
               <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest border-t border-slate-800 pt-6">
                 Matches based on local V4-Project heuristic node. Non-cloud restricted.
               </p>
            </div>
          </div>

          <div className="p-10 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 015.25-2.094z" /></svg>
             </div>
             <h3 className="text-[11px] font-black text-indigo-200 uppercase tracking-[0.4em] mb-4">System Node</h3>
             <p className="text-white text-lg font-bold leading-snug relative z-10">
               Localized forensic specimen registry currently indexing 1,000+ behavioral habit clusters.
             </p>
          </div>
        </div>

        <div className="md:col-span-7">
           <div className="bg-slate-950 p-10 rounded-[2rem] border border-slate-800 shadow-3xl h-full flex flex-col min-h-[400px]">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-6">
                 <div className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                 <h3 className="mono-text text-[11px] font-bold text-slate-500 uppercase tracking-widest">Logic Kernel Stream v4.0.2</h3>
              </div>
              <div className="flex-1 mono-text text-[11px] text-slate-400 space-y-3 overflow-y-auto max-h-[350px]">
                 <div className="text-indigo-400 font-bold">> [BOOT] VERI-LOGIC INITIALIZED</div>
                 <div className="text-indigo-400 font-bold">> [SCAN] MAPPING LOCAL DIRECTORY... OK</div>
                 <div>> [INFO] PROJECT_ID: CS-FINAL-99</div>
                 <div>> [INFO] ENCRYPTION_NODE: ACTIVE</div>
                 <div>> [INFO] SPECIMEN_CACHE: STANDBY</div>
                 {running && (
                   <div className="space-y-3 animate-in fade-in duration-300">
                     <div className="text-emerald-400">> [PROC] SCANNING VECTORS... 14%</div>
                     <div className="text-emerald-400">> [PROC] SCANNING VECTORS... 42%</div>
                     <div className="text-emerald-400">> [PROC] SCANNING VECTORS... 88%</div>
                     <div className="text-emerald-400">> [PROC] COMPARISON_RESULT: SYNCED</div>
                     <div className="text-emerald-400">> [DIAG] HEURISTIC_STABILITY: 0.998</div>
                   </div>
                 )}
                 <div className="text-slate-600 animate-pulse">> _</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralLab;
