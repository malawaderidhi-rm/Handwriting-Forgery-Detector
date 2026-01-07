
import React, { useState } from 'react';
import { AnalysisResult, EvidenceMarker } from '../types';

interface ForensicViewerProps {
  authenticPreview: string | null;
  suspectPreview: string | null;
  result: AnalysisResult;
}

const ForensicViewer: React.FC<ForensicViewerProps> = ({ authenticPreview, suspectPreview, result }) => {
  const [activeMarker, setActiveMarker] = useState<EvidenceMarker | null>(null);
  const [mode, setMode] = useState<'side' | 'overlay'>('side');
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);

  const getMarkerStyle = (box: [number, number, number, number]) => {
    const [ymin, xmin, ymax, xmax] = box;
    return {
      top: `${ymin / 10}%`,
      left: `${xmin / 10}%`,
      width: `${(xmax - xmin) / 10}%`,
      height: `${(ymax - ymin) / 10}%`,
    };
  };

  const getMarkerColor = (type: EvidenceMarker['type']) => {
    switch (type) {
      case 'tremor': return 'border-amber-500 bg-amber-500/10';
      case 'retouching': return 'border-red-500 bg-red-500/10';
      case 'habit': return 'border-emerald-500 bg-emerald-500/10';
      case 'alignment': return 'border-blue-500 bg-blue-500/10';
      case 'pressure': return 'border-purple-500 bg-purple-500/10';
      default: return 'border-slate-500 bg-slate-500/10';
    }
  };

  const getMarkerLabelColor = (type: EvidenceMarker['type']) => {
    switch (type) {
      case 'tremor': return 'bg-amber-500';
      case 'retouching': return 'bg-red-500';
      case 'habit': return 'bg-emerald-500';
      case 'alignment': return 'bg-blue-500';
      case 'pressure': return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-[#0f172a] rounded-xl overflow-hidden shadow-2xl border border-slate-800 ring-1 ring-white/5">
      <div className="px-6 py-4 bg-slate-900/50 border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Evidence Visualization Suite</h3>
        </div>
        <div className="flex bg-slate-800 p-0.5 rounded-lg">
          <button 
            onClick={() => setMode('side')}
            className={`px-4 py-1.5 rounded text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'side' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Comparative
          </button>
          <button 
            onClick={() => setMode('overlay')}
            className={`px-4 py-1.5 rounded text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'overlay' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Digital Overlay
          </button>
        </div>
      </div>

      <div className="p-8">
        {mode === 'side' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block text-center">Reference Alpha</span>
              <div className="relative aspect-square bg-[#020617] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center p-4">
                <img src={authenticPreview || ''} className="max-w-full max-h-full object-contain mix-blend-screen opacity-90 contrast-125 grayscale" alt="Auth" />
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]"></div>
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block text-center">Specimen Beta (Scanned)</span>
              <div className="relative aspect-square bg-[#020617] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center p-4 group">
                <img src={suspectPreview || ''} className="max-w-full max-h-full object-contain contrast-125" alt="Suspect" />
                
                {result.evidenceMarkers?.map((marker, i) => (
                  <div
                    key={i}
                    style={getMarkerStyle(marker.box_2d)}
                    onMouseEnter={() => setActiveMarker(marker)}
                    onMouseLeave={() => setActiveMarker(null)}
                    className={`absolute border rounded shadow-lg cursor-crosshair transition-all duration-300 ${getMarkerColor(marker.type)} ${
                      activeMarker === marker 
                        ? 'scale-105 z-20 ring-2 ring-amber-400 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.3)]' 
                        : 'opacity-60 grayscale-[0.5]'
                    }`}
                  >
                    <div className={`absolute -top-5 left-0 px-1.5 py-0.5 rounded-sm ${getMarkerLabelColor(marker.type)}`}>
                       <span className="text-[6px] font-black text-white uppercase tracking-wider">{marker.type}</span>
                    </div>
                  </div>
                ))}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="relative aspect-video bg-[#020617] rounded-xl border border-white/5 overflow-hidden p-8 flex items-center justify-center">
                <img src={authenticPreview || ''} className="max-w-full max-h-full object-contain opacity-50 grayscale invert" alt="Auth" />
                <img 
                  src={suspectPreview || ''} 
                  className="absolute inset-0 w-full h-full object-contain mix-blend-difference invert px-8 py-8" 
                  style={{ opacity: overlayOpacity }}
                  alt="Susp" 
                />
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#0f172a]/80 backdrop-blur-xl px-6 py-2 rounded-full border border-white/10 shadow-2xl">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Blend Intensity</span>
                  <input 
                    type="range" min="0" max="1" step="0.01" 
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                    className="w-32 accent-amber-500"
                  />
                  <span className="text-[8px] font-black text-amber-500 w-8">{Math.round(overlayOpacity * 100)}%</span>
                </div>
             </div>
             <p className="text-[9px] text-center text-slate-500 uppercase tracking-[0.2em] font-medium italic">Spectral Difference Analysis Mode Activated</p>
          </div>
        )}

        {/* Granular Inspection Panel */}
        <div className="mt-10">
          <div className={`min-h-[140px] transition-all duration-500 p-8 rounded-lg border flex flex-col md:flex-row items-center gap-8 ${activeMarker ? 'bg-amber-400/5 border-amber-400/20' : 'bg-slate-800/20 border-white/5 opacity-50'}`}>
             {activeMarker ? (
               <>
                 <div className="flex flex-col items-center gap-2">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-slate-900 shadow-2xl ${getMarkerLabelColor(activeMarker.type)}`}>
                       <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <div className="text-center">
                       <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Local Certainty</span>
                       <div className="flex items-center gap-2 mt-1">
                          <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-amber-400 transition-all duration-700" 
                                style={{ width: `${activeMarker.confidence}%` }}
                             ></div>
                          </div>
                          <span className="text-[10px] font-black text-amber-500">{activeMarker.confidence}%</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                       <span className={`text-[10px] font-black text-white px-3 py-1 rounded uppercase tracking-widest shadow-lg ${getMarkerLabelColor(activeMarker.type)}`}>
                          {activeMarker.type}
                       </span>
                       <span className="text-[10px] font-black text-amber-400 border border-amber-400/30 px-3 py-1 rounded uppercase tracking-widest bg-amber-400/5">
                          Classification: {activeMarker.subType}
                       </span>
                    </div>
                    <p className="text-slate-200 text-sm leading-relaxed italic border-l-2 border-slate-700 pl-4 py-1">
                       "{activeMarker.description}"
                    </p>
                 </div>

                 <div className="hidden lg:block w-48 p-4 bg-slate-900 rounded border border-white/5">
                    <h5 className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Technical Summary</h5>
                    <div className="space-y-1">
                       <p className="text-[9px] text-slate-400"><span className="text-slate-500">Certainty:</span> {activeMarker.confidence > 80 ? 'High' : activeMarker.confidence > 50 ? 'Moderate' : 'Uncertain'}</p>
                       <p className="text-[9px] text-slate-400"><span className="text-slate-500">System Code:</span> FB-{activeMarker.type.slice(0,1).toUpperCase()}-{Math.floor(activeMarker.box_2d[0])}</p>
                    </div>
                 </div>
               </>
             ) : (
               <div className="w-full text-center py-6">
                  <div className="inline-block p-4 rounded-full bg-slate-800/50 mb-4 animate-pulse">
                     <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">Hover over forensic markers for granular specimen inspection</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForensicViewer;
