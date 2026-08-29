import { NextResponse } from "next/server";
import { getPlannerItems } from "@/lib/data";
import { planWithGemini } from "@/lib/gemini";
import { z } from "zod";
const input = z.object({ command: z.string().min(1).max(1000) });
export async function POST(request: Request) { const parsed = input.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Enter a planning question." }, { status: 400 }); return NextResponse.json(await planWithGemini(await getPlannerItems(), parsed.data.command)); }
