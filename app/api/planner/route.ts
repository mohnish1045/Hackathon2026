import { NextResponse } from "next/server";
import { createPlannerItem, getPlannerItems } from "@/lib/data";
import { plannerItemInput } from "@/lib/schemas";
export async function GET() { return NextResponse.json(await getPlannerItems()); }
export async function POST(request: Request) { const parsed = plannerItemInput.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 }); const item = await createPlannerItem({ ...parsed.data, source: "manual", sourceId: null, startAt: parsed.data.startAt ?? null, endAt: parsed.data.endAt ?? null, dueAt: parsed.data.dueAt ?? null, isFixed: false, metadata: null, url: null }); return NextResponse.json(item, { status: 201 }); }
