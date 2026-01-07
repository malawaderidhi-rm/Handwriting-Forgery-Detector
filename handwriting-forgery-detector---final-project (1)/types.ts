
export interface EvidenceMarker {
  type: 'tremor' | 'retouching' | 'habit' | 'alignment' | 'pressure';
  subType: string; // e.g., 'vertical-shiver', 'patching', 'terminal-flick'
  description: string;
  confidence: number; // 0-100 score for this specific marker
  box_2d: [number, number, number, number]; // [ymin, xmin, ymax, xmax] normalized to 1000
}

export interface AnalysisResult {
  id: string;
  timestamp: number;
  isForgery: boolean;
  confidence: number;
  reasoning: string[];
  comparisons: {
    slant: string;
    pressure: string;
    formation: string;
    connectivity: string;
    flow: string;
    terminations: string;
  };
  summary: string;
  evidenceMarkers?: EvidenceMarker[];
}

export interface DocumentState {
  file: File | null;
  preview: string | null;
}
