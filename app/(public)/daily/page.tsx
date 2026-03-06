import { Card } from "@/components/ui/card";
import { GameShell } from "@/components/game/game-shell";
import { getDailyPuzzle } from "@/lib/game/puzzles";

export default function DailyPage() {
  const puzzle = getDailyPuzzle();
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Card className="mb-8 p-5">
        <div className="text-sm font-semibold text-brand-600">Daily challenge</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Today’s premium puzzle</h1>
        <p className="mt-2 text-sm text-slate-500">One highlighted puzzle per day, plus article-ready structure for future daily explanations and SEO content.</p>
      </Card>
      <GameShell initialPuzzle={puzzle} />
    </div>
  );
}
