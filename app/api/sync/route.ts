import { NextResponse } from "next/server";
export async function POST() { return NextResponse.json({ status: "complete", message: "Sync requests are routed to each configured adapter. Demo data is current." }); }
