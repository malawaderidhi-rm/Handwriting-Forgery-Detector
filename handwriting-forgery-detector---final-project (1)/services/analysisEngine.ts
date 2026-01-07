
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const processSpecimen = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const BOUNDS = 1024;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > BOUNDS) {
            height *= BOUNDS / width;
            width = BOUNDS;
          }
        } else {
          if (height > BOUNDS) {
            width *= BOUNDS / height;
            height = BOUNDS;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(dataUrl.split(',')[1]);
      };
    };
  });
};

export async function runForensicScan(
  reference: File,
  questioned: File
): Promise<AnalysisResult> {
  // Check for API key presence
  if (!process.env.API_KEY) throw new Error("API_KEY environment variable is not configured.");

  try {
    const [refStream, qStream] = await Promise.all([
      processSpecimen(reference),
      processSpecimen(questioned)
    ]);

    // Use process.env.API_KEY directly in the constructor as per guidelines
    const engine = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const instructions = `
      HANDWRITING COMPARISON TOOL (PROJECT ASSIGNMENT):
      Task: Compare "Image A" (Real) with "Image B" (Suspect).
      
      Look for:
      - shaky lines in B (signs of forgery).
      - if the slant of letters matches.
      - how hard the pen was pressed.
      - if the connections between letters look natural.

      Output: A simple report on if it's likely a forgery or original.
    `;

    // Upgrade to gemini-3-pro-preview for advanced forensic reasoning tasks
    const result = await engine.models.generateContent({
      model: "gemini-3-pro-preview", 
      contents: {
        parts: [
          { text: instructions },
          { inlineData: { mimeType: "image/jpeg", data: refStream } },
          { inlineData: { mimeType: "image/jpeg", data: qStream } }
        ]
      },
      config: {
        // High thinking budget for detailed handwriting analysis
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isForgery: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            reasoning: { type: Type.ARRAY, items: { type: Type.STRING } },
            evidenceMarkers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, enum: ['tremor', 'retouching', 'habit', 'alignment', 'pressure'] },
                  subType: { type: Type.STRING },
                  description: { type: Type.STRING },
                  confidence: { type: Type.NUMBER },
                  box_2d: { type: Type.ARRAY, items: { type: Type.NUMBER } }
                },
                required: ["type", "subType", "description", "confidence", "box_2d"]
              }
            },
            comparisons: {
              type: Type.OBJECT,
              properties: {
                slant: { type: Type.STRING },
                pressure: { type: Type.STRING },
                formation: { type: Type.STRING },
                connectivity: { type: Type.STRING },
                flow: { type: Type.STRING },
                terminations: { type: Type.STRING }
              },
              required: ["slant", "pressure", "formation", "connectivity", "flow", "terminations"]
            }
          },
          required: ["isForgery", "confidence", "summary", "reasoning", "comparisons", "evidenceMarkers"]
        }
      }
    });

    // Access .text property directly instead of as a function
    if (!result.text) throw new Error("Forensic engine failed to return a report.");
    const payload = JSON.parse(result.text);
    return {
      ...payload,
      id: `PROJ-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      timestamp: Date.now()
    } as AnalysisResult;
  } catch (err: any) {
    throw err;
  }
}
