import { GoogleGenAI } from "@google/genai";
import { planSchema, extractionSchema } from "@/lib/schemas";
import { detectConflicts, proposeSchedule } from "@/lib/planner-engine";
import type { PlannerItem } from "@/lib/types";

const parse = <T>(text: string | undefined, schema: { parse(value: unknown): T }) => schema.parse(JSON.parse(text ?? "{}"));
export async function planWithGemini(items: PlannerItem[], command: string) {
  const fallback = { summary: `I found ${items.filter((item) => !item.completed && item.dueAt).length} open deadlines and focused the plan on the highest-priority work.`, suggestions: proposeSchedule(items), conflicts: detectConflicts(items) };
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.gemini_api_key;
  if (!apiKey) return fallback;
  try { const ai = new GoogleGenAI({ apiKey }); const response = await ai.models.generateContent({ model: "gemini-3.6-flash", contents: `You are an academic planning assistant. Database items are the only source of truth; never invent or alter deadlines. The user asks: ${command}\nPlanner items: ${JSON.stringify(items)}\nReturn JSON with summary, suggestions (title,date,startTime,endTime,reason,relatedItemId) and conflicts (title,detail,severity). Suggestions must respect fixed events and may only propose new study blocks.`, config: { responseMimeType: "application/json" } }); return parse(response.text, planSchema); } catch { return fallback; }
}
export async function extractWithGemini(url: string, content: string) {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.gemini_api_key;
  if (!apiKey) return { items: [] };
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({ model: "gemini-3.6-flash", contents: `Extract only explicitly stated academic events, deadlines, exams or assignments from this public webpage. Current date: ${new Date().toISOString()}. Return ISO-8601 timestamps only when a date/time is explicit. Do not guess missing dates. Include confidence 0-1 and preserve the source URL. URL: ${url}\nContent:\n${content.slice(0, 20000)}`, config: { responseMimeType: "application/json" } });
  return parse(response.text, extractionSchema);
}
