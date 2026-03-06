import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body?.eventType) {
    return NextResponse.json({ error: "eventType required" }, { status: 400 });
  }
  return NextResponse.json({ ok: true, received: body.eventType });
}
