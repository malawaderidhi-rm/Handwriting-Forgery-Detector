
import React, { useState, useCallback, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import AnalysisDisplay from './components/AnalysisDisplay';
import About from './components/About';
import CaseStudies from './components/CaseStudies';
import Feedback from './components/Feedback';
import NeuralLab from './components/NeuralLab';
import { DocumentState, AnalysisResult } from './types';
import { runForensicScan } from './services/analysisEngine';

type View = 'test' | 'about' | 'cases' | 'feedback' | 'logic';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('test');
  const [authenticDoc, setAuthenticDoc] = useState<DocumentState>({ file: null, preview: null });
  const [suspectDoc, setSuspectDoc] = useState<DocumentState>({ file: null, preview: null });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('project_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("History cleared", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisStep(s => (s + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  useEffect(() => {
    localStorage.setItem('project_history', JSON.stringify(history));
  }, [history]);

  const handleAuthenticChange = useCallback((file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAuthenticDoc({ file, preview: reader.result as string });
      reader.readAsDataURL(file);
    } else {
      setAuthenticDoc({ file: null, preview: null });
    }
    setResult(null);
    setError(null);
  }, []);

  const handleSuspectChange = useCallback((file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSuspectDoc({ file, preview: reader.result as string });
      reader.readAsDataURL(file);
    } else {
      setSuspectDoc({ file: null, preview: null });
    }
    setResult(null);
    setError(null);
  }, []);

  const handleAnalyze = async () => {
    if (!authenticDoc.file || !suspectDoc.file) {
      setError("Input Required: Both master and suspect samples must be uploaded.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setAnalysisStep(0);

    try {
      const analysis = await runForensicScan(authenticDoc.file, suspectDoc.file);
      setResult(analysis);
      setHistory(prev => [analysis, ...prev].slice(0, 10));
    } catch (err: any) {
      setError("Analysis Failed: Specimen quality might be too low or key is missing.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const steps = [
    "Preprocessing Digital Specimen...",
    "Tracing Stroke Ballistics...",
    "Matching Habit Clusters...",
    "Finalizing Comparison Report..."
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'about': return <About />;
      case 'cases': return <CaseStudies />;
      case 'feedback': return <Feedback />;
      case 'logic': return <NeuralLab />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="academic-card p-8 sticky top-28 backdrop-blur-sm bg-slate-800/80">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-indigo-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white tracking-tight leading-none">Intake Phase</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Laboratory Specimen Load</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <FileUpload 
                    id="ref-upload"
                    label="Master Specimen (A)"
                    description="Upload known authentic handwriting."
                    preview={authenticDoc.preview}
                    onFileChange={handleAuthenticChange}
                  />
                  <FileUpload 
                    id="susp-upload"
                    label="Suspect Specimen (B)"
                    description="Upload questioned sample for analysis."
                    preview={suspectDoc.preview}
                    onFileChange={handleSuspectChange}
                  />

                  <button
                    onClick={handleAnalyze}
                    disabled={!authenticDoc.file || !suspectDoc.file || isAnalyzing}
                    className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
                      authenticDoc.file && suspectDoc.file && !isAnalyzing
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-500/30 shadow-xl active:scale-[0.98]'
                        : 'bg-slate-700 text-slate-500 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {isAnalyzing ? (
                      <div className="w-4 h-4 border-2 border-slate-500 border-t-white rounded-full animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    )}
                    {isAnalyzing ? "Analyzing..." : "Run Analysis"}
                  </button>
                </div>
                
                {error && (
                  <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 text-red-400 rounded-xl text-[11px] font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Main Center Area */}
            <div className="lg:col-span-8">
              {isAnalyzing ? (
                <div className="academic-card h-full min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden p-12 text-center bg-slate-800/40">
                  <div className="scanner-line"></div>
                  <div className="w-32 h-32 bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-10 relative">
                    <div className="absolute inset-0 border-4 border-indigo-500/20 border-t-indigo-500 rounded-3xl animate-spin"></div>
                    <svg className="w-12 h-12 text-indigo-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Phase 2: Computation</h3>
                  <div className="flex flex-col gap-2">
                    <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">{steps[analysisStep]}</p>
                    <div className="flex justify-center gap-1 mt-4">
                      {steps.map((_, i) => (
                        <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i === analysisStep ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2 px-4">
                    <div className="bg-emerald-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-white tracking-tight leading-none">Phase 3: Final Report</h2>
                      <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-1">Analysis Complete</p>
                    </div>
                  </div>
                  <AnalysisDisplay 
                    result={result} 
                    authenticPreview={authenticDoc.preview}
                    suspectPreview={suspectDoc.preview}
                  />
                </div>
              ) : (
                <div className="academic-card h-full min-h-[600px] flex flex-col items-center justify-center text-center p-16 bg-slate-800/20 group border-dashed border-2 border-slate-700">
                  <div className="w-24 h-24 bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 flex items-center justify-center mb-8 text-slate-500 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-700">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">Laboratory Workstation</h3>
                  <p className="text-slate-400 max-w-sm mx-auto font-medium leading-relaxed text-lg">
                    Upload forensic evidence on the left to initiate comparison of behavioral handwriting markers.
                  </p>
                  <div className="mt-12 flex gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                     <span>Specimen Ready</span>
                     <span className="text-slate-800">•</span>
                     <span>Logic Core Online</span>
                     <span className="text-slate-800">•</span>
                     <span>V4-Project Node</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="nav-bar sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setCurrentView('test')}>
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-900/40 group-hover:rotate-6 transition-transform duration-300">
               <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" /></svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-white leading-none uppercase">Veri-Logic</h1>
              <p className="text-[10px] uppercase font-black text-indigo-400 tracking-[0.3em] mt-1">Research Case #99</p>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-10">
            {[
              { id: 'test', label: 'Laboratory' },
              { id: 'logic', label: 'Logic Kernel' },
              { id: 'cases', label: 'Registry' },
              { id: 'about', label: 'Documentation' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setCurrentView(tab.id as View)}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-2 ${
                  currentView === tab.id ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
                {currentView === tab.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-700 shadow-xl"
            >
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Archive
              <span className="bg-indigo-600 text-white min-w-[1.5rem] h-6 rounded-lg flex items-center justify-center text-[10px] font-black px-1.5 shadow-lg">{history.length}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {renderContent()}
      </main>

      {showHistory && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" onClick={() => setShowHistory(false)} />
          <div className="relative w-full max-w-md bg-slate-900 h-full shadow-2xl p-8 overflow-y-auto flex flex-col border-l border-slate-800 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight">Project Archive</h2>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1">Local Storage Cache</p>
              </div>
              <button onClick={() => setShowHistory(false)} className="w-10 h-10 rounded-full hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-transparent hover:border-slate-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-1 space-y-4">
              {history.length === 0 ? (
                <div className="text-center py-32 opacity-20">
                  <svg className="w-20 h-20 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  <p className="text-sm font-black uppercase tracking-[0.3em]">No Logged Entries</p>
                </div>
              ) : history.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => { setResult(item); setShowHistory(false); setCurrentView('test'); }} 
                  className="p-6 bg-slate-800/40 border border-slate-700 rounded-2xl hover:border-indigo-500 hover:bg-slate-800/80 cursor-pointer group transition-all shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full shadow-sm ${item.isForgery ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                      {item.isForgery ? 'FORGERY' : 'AUTHENTIC'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-300 line-clamp-2 leading-snug group-hover:text-white transition-colors">{item.summary}</p>
                  <div className="mt-4 flex items-center justify-between text-[10px] font-black text-slate-500 group-hover:text-indigo-400 transition-colors">
                    <span className="uppercase tracking-widest">Confidence: {item.confidence}%</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              ))}
            </div>
            
            {history.length > 0 && (
              <button 
                onClick={() => { if(confirm('Purge history cache?')) { setHistory([]); localStorage.removeItem('project_history'); } }}
                className="mt-10 py-4 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-500/10 rounded-xl transition-all border border-red-500/20"
              >
                Flush Project Memory
              </button>
            )}
          </div>
        </div>
      )}

      <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-white font-black text-lg tracking-tighter uppercase">Veri-Logic Project</h4>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em]">CS-99 Final Submission | Academic Context</p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            <button onClick={() => setCurrentView('logic')} className="text-xs font-black text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-[0.2em]">Kernel Stats</button>
            <button onClick={() => setCurrentView('about')} className="text-xs font-black text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-[0.2em]">Citation List</button>
            <button className="text-xs font-black text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-[0.2em]">Privacy Shield</button>
          </div>
          <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Logic Node Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
