import { GameShell } from "@/components/game/game-shell";
import { getPuzzleByDifficulty } from "@/lib/game/puzzles";

export default function PlayPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <GameShell initialPuzzle={getPuzzleByDifficulty("easy")} />
    </div>
  );
}
