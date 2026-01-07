
import React from 'react';

interface FileUploadProps {
  label: string;
  id: string;
  preview: string | null;
  onFileChange: (file: File | null) => void;
  description: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, id, preview, onFileChange, description }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <div className="group/file">
      <div className="flex justify-between items-end mb-4 px-1">
        <div>
          <label htmlFor={id} className="text-[11px] font-black text-white uppercase tracking-[0.2em] block mb-1">
            {label}
          </label>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{description}</p>
        </div>
        {preview && (
          <button 
            onClick={() => onFileChange(null)}
            className="text-[9px] font-black text-red-400 uppercase tracking-widest hover:text-red-300 transition-colors flex items-center gap-1.5 bg-red-400/10 px-2 py-1 rounded border border-red-400/20"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            Purge
          </button>
        )}
      </div>
      
      <div className={`relative rounded-2xl transition-all duration-300 overflow-hidden ${
        preview 
          ? 'bg-slate-900 border-2 border-slate-700 shadow-2xl' 
          : 'border-2 border-dashed border-slate-700 bg-slate-800/40 hover:border-indigo-500/50 hover:bg-indigo-500/5'
      }`}>
        {preview ? (
          <div className="relative aspect-[4/3] w-full flex items-center justify-center p-8 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px]">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none"></div>
            <img 
              src={preview} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg border border-slate-700 ring-8 ring-slate-800 transition-transform group-hover/file:scale-105"
            />
            <div className="absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1.5 rounded-lg border border-indigo-400 text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              Synchronized
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center py-20 px-8 cursor-pointer group/label">
            <div className="mb-6 w-20 h-20 bg-slate-800 rounded-3xl shadow-xl border border-slate-700 flex items-center justify-center group-hover/label:scale-110 group-hover/label:rotate-3 transition-all duration-500 group-hover/label:border-indigo-500/50 group-hover/label:shadow-indigo-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-600 group-hover/label:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-center">
              <span className="text-[13px] text-white font-black uppercase tracking-[0.2em] block mb-2 group-hover/label:text-indigo-400 transition-colors">Select Visual Evidence</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Supports PNG, JPEG, TIFF</span>
            </div>
            <input 
              type="file" 
              id={id} 
              className="hidden" 
              accept="image/*" 
              onChange={handleChange} 
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
