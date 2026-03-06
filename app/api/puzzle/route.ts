import { NextRequest, NextResponse } from "next/server";
import { getPuzzleByDifficulty } from "@/lib/game/puzzles";

export function GET(req: NextRequest) {
  const difficulty = (req.nextUrl.searchParams.get("difficulty") || "easy") as "easy" | "medium" | "hard" | "expert";
  return NextResponse.json({ puzzle: getPuzzleByDifficulty(difficulty) });
}
