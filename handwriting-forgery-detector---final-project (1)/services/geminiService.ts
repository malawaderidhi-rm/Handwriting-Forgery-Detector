
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

/**
 * Resizes and compresses an image to reduce API latency.
 */
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // Use quality 0.7 for a good balance of detail and size
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl.split(',')[1]);
      };
    };
  });
};

/**
 * Retries a function with exponential backoff.
 */
async function withRetry<T>(fn: () => Promise<T>, retries = 2, initialDelay = 500): Promise<T> {
  let currentDelay = initialDelay;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      const isRetryable = error.status === 429 || (error.status >= 500 && error.status <= 599);
      if (i === retries - 1 || !isRetryable) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, currentDelay));
      currentDelay *= 1.5;
    }
  }
  throw new Error("Maximum retries reached during forensic analysis.");
}

export async function analyzeHandwriting(
  authentic: File,
  suspect: File
): Promise<AnalysisResult> {
  // Ensure API key is present
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Forensic analysis cannot proceed.");
  }

  try {
    // Compress both images in parallel for speed
    const [authData, suspData] = await Promise.all([
      compressImage(authentic),
      compressImage(suspect)
    ]);

    return await withRetry(async () => {
      // Use process.env.API_KEY directly for initialization as per SDK guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const prompt = `
        You are the VERISCRIPT Forensic Engine, powered by the VERISCRIPT-1000 CORE dataset. 
        Perform a FAST, high-precision comparative analysis.
        Sample A: Known Authentic. Sample B: Questioned.

        TASK: 
        1. Identify tremors (forgery signs) vs fluid motion (authentic).
        2. Detect retouching or patching.
        3. Compare slant, pressure, and letter formations based on VeriScript behavioral clusters.
        4. Return evidence markers with normalized coordinates.

        Priority: Speed and accuracy. Leverage your deep training on 1,000+ verified specimens.
      `;

      // Use gemini-3-pro-preview for complex reasoning tasks in forensic analysis
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview", 
        contents: {
          parts: [
            { text: prompt },
            { inlineData: { mimeType: "image/jpeg", data: authData } },
            { inlineData: { mimeType: "image/jpeg", data: suspData } }
          ]
        },
        config: {
          // Setting a thinking budget to allow for detailed pattern matching
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

      // Directly accessing the .text property
      if (!response.text) {
        throw new Error("Forensic engine failed to generate a report.");
      }

      const result = JSON.parse(response.text);
      return {
        ...result,
        id: crypto.randomUUID(),
        timestamp: Date.now()
      } as AnalysisResult;
    });
  } catch (err: any) {
    throw err;
  }
}
