# Veri-Logic: Handwriting Forgery Detector
### CS Final Research Project | Case Study #99

Veri-Logic is a digital forensic tool designed to analyze and compare handwriting specimens to detect potential forgeries. By leveraging high-precision pattern recognition and behavioral habit analysis, the platform identifies micro-anomalies that differentiate authentic rhythmic writing from hesitant simulated forgeries.

## 🚀 Features

- **Dual-Specimen Analysis**: Compare a "Master Specimen" (Authentic) against a "Questioned Specimen" (Suspect) in real-time.
- **Forensic Visualization Suite**: 
  - **Comparative View**: Side-by-side analysis with marked evidence.
  - **Digital Overlay**: Spectral difference mode with adjustable blend intensity to spot alignment deviations.
- **Detailed Metric Breakdown**: Statistical variance analysis covering:
  - Pen Pressure & Terminations
  - Baseline Slant & Angle of Attack
  - Stroke Connectivity & Writing Flow
- **Automated Reporting**: Generate professional PDF reports of forensic findings using `jsPDF`.
- **Local Registry**: Secure local storage archive of previous case studies and analysis history.
- **Logic Kernel Console**: Real-time diagnostic logging of the heuristic comparison process.

## 🛠️ Technical Stack

- **Frontend**: React (ES6 Modules)
- **Styling**: Tailwind CSS with custom "Deep Dark Blue" laboratory theme.
- **Intelligence**: Google Gemini 3 Pro (Vision & Reasoning)
  - Utilizes a high `thinkingBudget` for complex pattern matching.
  - Normalized 2D coordinate mapping for evidence markers.
- **Documentation**: jsPDF for dynamic report generation.
- **Icons**: Lucide-inspired SVG components for a clean, academic look.

## 🔬 Methodology

The system operates on the hypothesis that handwriting is a subconscious neurological process. Forgeries often exhibit "Simulation Tremor"—jagged lines caused by the slow, conscious drawing of shapes rather than rapid muscle memory recall. Veri-Logic scans for:
1. **Shaky Vectors**: Identifying hesitation points.
2. **Neural Slant**: Measuring the consistency of letter angles.
3. **Pen Ballistics**: Analyzing how strokes start, connect, and lift.

## 📂 Project Structure

- `App.tsx`: Main application logic and view routing.
- `services/analysisEngine.ts`: Integration with the Gemini API for forensic computation.
- `services/reportGenerator.ts`: PDF generation logic.
- `components/ForensicViewer.tsx`: Interactive image analysis and overlay system.
- `components/AnalysisDisplay.tsx`: Results visualization and grading rubric.
- `types.ts`: TypeScript definitions for forensic markers and analysis results.

---
*Disclaimer: This project is for academic research purposes only. Forensic determinations are probabilistic based on visual pattern matching.*