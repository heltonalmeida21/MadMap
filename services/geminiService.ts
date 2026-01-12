
import { GoogleGenAI, Type } from "@google/genai";
import { Subject, StudySession } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStudyPlan = async (subjects: Subject[], dailyMinutes: number): Promise<Partial<StudySession>[]> => {
  if (!process.env.API_KEY) return [];

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the following subjects and their parameters, generate a smart weekly study plan. 
    Maximize for Spaced Repetition and Active Recall. 
    Total daily study time: ${dailyMinutes} minutes.
    Subjects: ${JSON.stringify(subjects)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            subjectId: { type: Type.STRING },
            plannedMinutes: { type: Type.NUMBER },
            date: { type: Type.STRING, description: "ISO date format" },
            notes: { type: Type.STRING }
          },
          required: ["subjectId", "plannedMinutes", "date"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return [];
  }
};

export const getStudyInsights = async (sessions: StudySession[], subjects: Subject[]): Promise<string> => {
  if (!process.env.API_KEY) return "Complete some sessions to get AI insights!";

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze my study history and provide 3 brief, actionable insights to improve my learning efficiency.
    Sessions: ${JSON.stringify(sessions.slice(-10))}
    Subjects: ${JSON.stringify(subjects)}`,
    config: {
      systemInstruction: "You are an expert academic advisor. Keep insights punchy and data-driven."
    }
  });

  return response.text || "Keep up the great work!";
};
