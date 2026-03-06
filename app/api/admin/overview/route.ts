import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    visitors: 1248,
    sessions: 602,
    gamesStarted: 489,
    completionRate: 61,
  });
}
