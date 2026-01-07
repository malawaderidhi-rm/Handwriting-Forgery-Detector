
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center">
        <h2 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase">Methodology</h2>
        <div className="w-32 h-1.5 bg-indigo-500 mx-auto rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] mt-6 text-xs">Research Thesis Documentation</p>
      </div>

      <div className="academic-card p-12 space-y-10 bg-slate-900 border-slate-700">
        <section>
          <h3 className="text-2xl font-black text-white mb-6 tracking-tight">Project Hypothesis</h3>
          <p className="text-slate-400 leading-relaxed text-lg serif-text italic bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50">
            "By analyzing the micro-tremors, pressure gradients, and habitual letter formations within digital specimens, the logic kernel can differentiate between natural rhythmic handwriting and the hesitant 'simulation' common in forgeries."
          </p>
        </section>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { 
              title: "Shaky Vectors", 
              desc: "Forgeries often exhibit 'Simulation Tremor' - jagged lines caused by the slow, conscious drawing of shapes rather than rapid neurological recall.",
              icon: "〽️"
            },
            { 
              title: "Neural Slant", 
              desc: "Authentic writers maintain a highly consistent angle of attack (slant) which is deep-seated in their muscle memory and difficult to fake.",
              icon: "📐"
            },
            { 
              title: "Pen Ballistics", 
              desc: "How a pen starts, connects, and lifts (terminations) creates a unique signature of the writer's physical momentum.",
              icon: "🖋️"
            }
          ].map(card => (
            <div key={card.title} className="p-8 bg-slate-800/40 border border-slate-700 rounded-3xl group hover:border-indigo-500/50 transition-all hover:bg-slate-800">
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{card.icon}</div>
              <h4 className="font-black text-white mb-3 uppercase tracking-widest text-sm group-hover:text-indigo-400 transition-colors">{card.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-bold">{card.desc}</p>
            </div>
          ))}
        </div>

        <section className="pt-6">
          <h3 className="text-2xl font-black text-white mb-6 tracking-tight">System Architecture</h3>
          <div className="bg-indigo-600/10 border border-indigo-500/20 p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium relative z-10">
              The comparison engine processes high-resolution image data, mapping behavioral markers to a localized grid. By cross-referencing these markers between the Master Specimen and the Questioned Specimen, the logic kernel derives a statistical probability of authenticity.
            </p>
            <div className="flex gap-4 relative z-10">
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/30">V4-CORE</span>
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/30">Pattern Logic</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
