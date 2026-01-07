
import React from 'react';
import { AnalysisResult } from '../types';
import ForensicViewer from './ForensicViewer';
import { generatePDFReport } from '../services/reportGenerator';

interface AnalysisDisplayProps {
  result: AnalysisResult;
  authenticPreview: string | null;
  suspectPreview: string | null;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, authenticPreview, suspectPreview }) => {
  const verdict = result.isForgery ? 'FORGERY CONFIRMED' : 'ORIGINAL VERIFIED';
  const colorClass = result.isForgery ? 'text-red-400' : 'text-emerald-400';
  const accentBg = result.isForgery ? 'bg-red-500' : 'bg-emerald-500';
  const borderClass = result.isForgery ? 'border-red-500/30' : 'border-emerald-500/30';
  const shadowClass = result.isForgery ? 'shadow-red-900/40' : 'shadow-emerald-900/40';

  const icon = result.isForgery ? (
    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  ) : (
    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 pb-20">
      {/* Result Hero Section */}
      <div className={`academic-card p-12 text-center relative overflow-hidden flex flex-col items-center bg-slate-900 border-2 ${borderClass} shadow-2xl ${shadowClass}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        <div className={`mb-6 ${colorClass} bg-slate-800 rounded-3xl p-6 shadow-2xl border border-current/20 scale-110`}>
          {icon}
        </div>
        <h2 className={`text-5xl font-black mb-4 ${colorClass} tracking-tighter uppercase`}>{verdict}</h2>
        <div className="flex flex-col items-center gap-4 bg-slate-800/80 px-8 py-4 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <div className="w-48 h-3 bg-slate-700 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full ${accentBg} transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.3)]`} 
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
            <span className="text-xl font-black text-white">{result.confidence}% <span className="text-xs uppercase text-slate-500 tracking-widest ml-1">Confidence</span></span>
          </div>
        </div>
        
        <button 
          onClick={() => generatePDFReport(result)}
          className="mt-10 flex items-center gap-3 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/40 active:scale-95 group"
        >
          <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Export Case Report
        </button>
      </div>

      <div className="academic-card p-10 space-y-12 bg-slate-900/80 backdrop-blur-md">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-2 h-8 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
            <div>
              <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em]">Computation Summary</h3>
              <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">Logic Node Output</p>
            </div>
          </div>
          <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50 group-hover:bg-indigo-500 transition-colors"></div>
            <p className="text-white leading-relaxed serif-text text-xl italic opacity-90">
              "{result.summary}"
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-2 h-8 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
            <div>
              <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em]">Visual Examination</h3>
              <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">Gradiometric Overlay</p>
            </div>
          </div>
          <ForensicViewer 
            authenticPreview={authenticPreview} 
            suspectPreview={suspectPreview} 
            result={result} 
          />
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-2 h-8 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
            <div>
              <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em]">Metric Distribution</h3>
              <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">Statistical Variance</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Writing Flow', value: result.comparisons.flow, icon: '🌊' },
              { label: 'Pen Pressure', value: result.comparisons.pressure, icon: '✍️' },
              { label: 'Baseline Slant', value: result.comparisons.slant, icon: '📐' },
              { label: 'Connectivity', value: result.comparisons.connectivity, icon: '🔗' },
              { label: 'Terminations', value: result.comparisons.terminations, icon: '📍' },
              { label: 'Shape Formation', value: result.comparisons.formation, icon: '🔡' },
            ].map((metric) => (
              <div key={metric.label} className="p-6 bg-slate-800 border border-slate-700 rounded-2xl hover:bg-slate-700 hover:border-indigo-500/50 transition-all group shadow-xl hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-indigo-400 transition-colors">{metric.label}</p>
                  <span className="text-2xl opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all grayscale group-hover:grayscale-0">{metric.icon}</span>
                </div>
                <p className="text-sm font-bold text-slate-300 leading-snug">{metric.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
