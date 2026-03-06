import { NextResponse } from "next/server";
import { getDailyPuzzle } from "@/lib/game/puzzles";

export function GET() {
  return NextResponse.json({ puzzle: getDailyPuzzle() });
}
