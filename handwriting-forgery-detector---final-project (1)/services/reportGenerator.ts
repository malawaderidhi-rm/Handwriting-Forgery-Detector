
import { jsPDF } from "jspdf";
import { AnalysisResult } from "../types";

export const generatePDFReport = (result: AnalysisResult) => {
  const doc = new jsPDF();
  const dateStr = new Date(result.timestamp).toLocaleString();
  
  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59); // Slate-800
  doc.text("Project Report: Handwriting Analysis", 20, 30);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.text("Student Project - Course ID: CS-2024-FOR", 20, 38);
  doc.text(`Report Generated: ${dateStr}`, 20, 43);
  doc.text(`Case Reference: ${result.id}`, 20, 48);
  
  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(20, 55, 190, 55);

  // Verdict Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text("Final Determination", 20, 65);
  
  const verdict = result.isForgery ? "DETECTED: FORGERY" : "VERIFIED: ORIGINAL";
  const verdictColor = result.isForgery ? [220, 38, 38] : [22, 163, 74];
  
  doc.setFontSize(18);
  doc.setTextColor(verdictColor[0], verdictColor[1], verdictColor[2]);
  doc.text(verdict, 20, 75);
  
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);
  doc.text(`Algorithm Confidence Score: ${result.confidence}%`, 20, 82);

  // Summary
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text("Logic Summary", 20, 95);
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(71, 85, 105);
  const splitSummary = doc.splitTextToSize(result.summary, 170);
  doc.text(splitSummary, 20, 102);

  // Detailed Analysis Table
  let currentY = 102 + (splitSummary.length * 6) + 10;
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text("Metric Breakdown", 20, currentY);
  currentY += 10;

  const metrics = [
    ["Trait", "Findings"],
    ["Pen Pressure", result.comparisons.pressure],
    ["Character Formation", result.comparisons.formation],
    ["Baseline Slant", result.comparisons.slant],
    ["Stroke Connectivity", result.comparisons.connectivity],
    ["Writing Flow", result.comparisons.flow],
    ["Stroke Terminations", result.comparisons.terminations]
  ];

  doc.setFontSize(10);
  metrics.forEach((row, index) => {
    if (index === 0) doc.setFont("helvetica", "bold");
    else doc.setFont("helvetica", "normal");
    
    doc.text(row[0], 25, currentY);
    const splitFindings = doc.splitTextToSize(row[1], 120);
    doc.text(splitFindings, 65, currentY);
    
    currentY += Math.max(8, splitFindings.length * 5);
    
    if (currentY > 270) {
      doc.addPage();
      currentY = 20;
    }
  });

  // Footer Note
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(148, 163, 184);
  doc.text("This report was generated using the student project Handwriting Detector. This is for academic purposes only.", 20, 285);

  doc.save(`Handwriting_Report_${result.id}.pdf`);
};
