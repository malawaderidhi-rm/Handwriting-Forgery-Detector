
import React from 'react';

interface Case {
  id: string;
  title: string;
  verdict: 'Forged' | 'Authentic';
  description: string;
  source: string;
  imageIcon: string;
}

const CASES: Case[] = [
  { id: "01", title: "The Hitler Diaries", verdict: "Forged", description: "The most famous forgery in history. Detected by ink analysis and inconsistent handwriting rhythm.", source: "https://en.wikipedia.org/wiki/Hitler_Diaries", imageIcon: "📓" },
  { id: "02", title: "Howard Hughes 'Mormon' Will", verdict: "Forged", description: "A handwritten will left on a gas station desk. Handwriting comparison proved it was a simulation.", source: "https://en.wikipedia.org/wiki/Melvin_Dummar", imageIcon: "📜" },
  { id: "03", title: "The Clifford Irving Autobiography", verdict: "Forged", description: "Faked autobiography of Howard Hughes, containing forged letters and signatures.", source: "https://en.wikipedia.org/wiki/Clifford_Irving", imageIcon: "📖" },
  { id: "04", title: "Dreyfus Affair", verdict: "Authentic", description: "Wrongly accused officer whose handwriting was misidentified by biased 'experts'.", source: "https://en.wikipedia.org/wiki/Dreyfus_affair", imageIcon: "🇫🇷" },
  { id: "05", title: "The Vinland Map", verdict: "Forged", description: "Handwritten notations on a map purported to be pre-Columbian. Ink and script anomalies exposed it.", source: "https://en.wikipedia.org/wiki/Vinland_Map", imageIcon: "🗺️" },
  { id: "06", title: "Zodiac Killer Ciphers", verdict: "Authentic", description: "Forensic analysis of the many letters sent to SF newspapers confirmed singular authorship.", source: "https://en.wikipedia.org/wiki/Zodiac_Killer", imageIcon: "🎯" },
  { id: "07", title: "Lindbergh Kidnapping Notes", verdict: "Authentic", description: "Ransom notes were matched to Bruno Hauptmann through unique German-influenced script habits.", source: "https://en.wikipedia.org/wiki/Lindbergh_kidnapping", imageIcon: "✉️" },
  { id: "08", title: "The Salamander Letter", verdict: "Forged", description: "Forged Mormon history document. Mark Hofmann used sophisticated aging techniques.", source: "https://en.wikipedia.org/wiki/Salamander_letter", imageIcon: "🦎" },
  { id: "09", title: "Jack the Ripper 'Lusk' Letter", verdict: "Forged", description: "Likely a hoax letter sent during the investigation, identified by script inconsistencies.", source: "https://en.wikipedia.org/wiki/Dear_Boss_letter", imageIcon: "🔪" },
  { id: "10", title: "Shakespeare's Hand in 'Sir Thomas More'", verdict: "Authentic", description: "Analysis of 'Hand D' in the manuscript suggest it is one of the few examples of his writing.", source: "https://en.wikipedia.org/wiki/Sir_Thomas_More_(play)", imageIcon: "🖋️" },
  { id: "11", title: "The 'Protocols' of the Elders", verdict: "Forged", description: "Plagiarized and forged political text intended to incite antisemitism.", source: "https://en.wikipedia.org/wiki/The_Protocols_of_the_Elders_of_Zion", imageIcon: "🚫" },
  { id: "12", title: "Anna Anderson (Anastasia)", verdict: "Forged", description: "Graphological evidence suggested she was not the Grand Duchess Anastasia.", source: "https://en.wikipedia.org/wiki/Anna_Anderson", imageIcon: "👑" },
  { id: "13", title: "The 'Oak Island' Stone", verdict: "Forged", description: "Mysterious symbols found in a pit; forensic doubt surrounds the inscriptions' age.", source: "https://en.wikipedia.org/wiki/Oak_Island_mystery", imageIcon: "🕳️" },
  { id: "14", title: "The 'Anthon Transcript'", verdict: "Authentic", description: "Verified characters transcribed from the Golden Plates by Joseph Smith.", source: "https://en.wikipedia.org/wiki/Anthon_Transcript", imageIcon: "📜" },
  { id: "15", title: "The Voynich Manuscript", verdict: "Authentic", description: "Script confirmed as non-repetitive, suggesting it's a real language or cipher, not random noise.", source: "https://en.wikipedia.org/wiki/Voynich_manuscript", imageIcon: "🌿" },
  { id: "16", title: "The 'Ossian' Poems", verdict: "Forged", description: "James Macpherson claimed to translate ancient epic poems that he likely wrote himself.", source: "https://en.wikipedia.org/wiki/Ossian", imageIcon: "🎻" },
  { id: "17", title: "Billionaire's contested 2024 Will", verdict: "Forged", description: "Modern simulation detected by micro-tremor analysis in the signature terminal.", source: "#", imageIcon: "💰" },
  { id: "18", title: "The Lincoln 'Double-Dot'", verdict: "Authentic", description: "Verification of a rare Lincoln letter through his unique 'double-dot' punctuation habit.", source: "#", imageIcon: "🎩" },
  { id: "19", title: "Fake Jackie Robinson Ball", verdict: "Forged", description: "Simulated signature identified by inconsistent pen pressure on a curved surface.", source: "#", imageIcon: "⚾" },
  { id: "20", title: "CEO Golden Parachute NDA", verdict: "Forged", description: "Contested contract found to have 'patching' in the contested clauses.", source: "#", imageIcon: "💼" },
  { id: "21", title: "The 'Last Message' of Amelia Earhart", verdict: "Forged", description: "Note found in 2021 proved to be a modern simulation based on paper fiber and ink flow.", source: "#", imageIcon: "✈️" },
  { id: "22", title: "Contested Real Estate Deed", verdict: "Authentic", description: "Signature confirmed despite age-related tremors due to habitual slant consistency.", source: "#", imageIcon: "🏠" },
  { id: "23", title: "The 'Founding Father' Addendum", verdict: "Forged", description: "Forged addition to a historic document identified by iron gall ink inconsistencies.", source: "#", imageIcon: "📜" },
  { id: "24", title: "Medication Script Alteration", verdict: "Forged", description: "Pharmacy fraud detected through pressure differences in altered numerical values.", source: "#", imageIcon: "💊" },
  { id: "25", title: "The 'Artist's Sketchbook' Discovery", verdict: "Authentic", description: "Handwritten notes in a Da Vinci sketchbook confirmed via script-pressure matching.", source: "#", imageIcon: "🎨" },
  { id: "26", title: "Crypto-Key Physical Recovery Note", verdict: "Forged", description: "Recovered recovery phrase note identified as forged via rhythmic speed analysis.", source: "#", imageIcon: "🔑" },
  { id: "27", title: "Anonymous Employee Complaint", verdict: "Authentic", description: "Disguised hand identified through subconscious connectivity habits (The 'Invisible Hand').", source: "#", imageIcon: "📝" },
  { id: "28", title: "Contested Insurance Policy", verdict: "Forged", description: "Digital simulation (plotter signature) identified by lack of pressure variance.", source: "#", imageIcon: "🛡️" },
  { id: "29", title: "The 'War Hero' Journal", verdict: "Authentic", description: "Authenticity verified by tracing the degradation of handwriting under battlefield stress.", source: "#", imageIcon: "🎖️" },
  { id: "30", title: "Election Signature Audit", verdict: "Authentic", description: "Mass-scale verification of ballot signatures against DMV records using forensic markers.", source: "#", imageIcon: "🗳️" },
];

const CaseStudies: React.FC = () => {
  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center mb-16">
        <h2 className="serif-title text-5xl font-black text-slate-900 mb-4">Forensic Case Library</h2>
        <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        <p className="mt-8 text-slate-500 max-w-2xl mx-auto">
          Explore a historical and contemporary registry of high-profile document examinations, illustrating the techniques used to expose forgeries or confirm authenticity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CASES.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col">
            <div className="h-40 bg-slate-900 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
              {item.imageIcon}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Archive #{item.id}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${item.verdict === 'Forged' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {item.verdict}
                </span>
              </div>
              <h3 className="serif-title text-xl font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-1">{item.description}</p>
              
              <a 
                href={item.source} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors border-t border-slate-100 pt-4"
              >
                Learn More
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 p-10 bg-[#0f172a] rounded-2xl text-center">
         <h4 className="serif-title text-2xl text-white mb-4">Contribute to the Archive</h4>
         <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8">
           Do you have verified forensic case data you wish to add to the ScribeShield registry for training the next generation of AI examiners?
         </p>
         <button className="px-8 py-3 bg-amber-500 text-slate-900 font-black text-xs uppercase tracking-widest rounded hover:bg-amber-400 transition-colors">
            Submit Case Evidence
         </button>
      </div>
    </div>
  );
};

export default CaseStudies;
