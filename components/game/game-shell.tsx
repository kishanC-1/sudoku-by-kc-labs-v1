"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Puzzle, Difficulty } from "@/types/game";
import { useGameStore } from "@/store/game-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/track";

function DifficultyPicker() {
  const difficulty = useGameStore((s) => s.difficulty);
  const setDifficulty = useGameStore((s) => s.setDifficulty);
  const items: Difficulty[] = ["easy", "medium", "hard", "expert"];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item}
          className={`rounded-full border px-3 py-1 text-sm capitalize transition ${difficulty === item ? "border-brand-600 bg-brand-600 text-white" : "border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/80"}`}
          onClick={async () => {
            setDifficulty(item);
            await trackEvent("difficulty_selected", { difficulty: item });
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function Timer() {
  const completed = useGameStore((s) => s.completed);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (completed) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [completed]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return <div className="text-sm font-medium text-slate-500">{mm}:{ss}</div>;
}

function SudokuBoard() {
  const { board, selected, selectCell } = useGameStore((s) => ({ board: s.board, selected: s.selected, selectCell: s.selectCell }));
  return (
    <div className="grid grid-cols-9 overflow-hidden rounded-[1.35rem] border-2 border-slate-900 bg-white dark:border-slate-200 dark:bg-slate-950">
      {board.flatMap((row, r) =>
        row.map((cell, c) => {
          const isSelected = selected?.[0] === r && selected?.[1] === c;
          const thickRight = c === 2 || c === 5;
          const thickBottom = r === 2 || r === 5;
          return (
            <motion.button
              key={`${r}-${c}`}
              whileTap={{ scale: 0.96 }}
              onClick={() => selectCell(r, c)}
              className={`relative aspect-square border border-slate-200 text-sm font-semibold transition sm:text-lg dark:border-slate-800 ${thickRight ? "border-r-2 border-r-slate-900 dark:border-r-slate-200" : ""} ${thickBottom ? "border-b-2 border-b-slate-900 dark:border-b-slate-200" : ""} ${isSelected ? "bg-brand-100 dark:bg-brand-500/20" : "bg-white dark:bg-slate-950"} ${cell.fixed ? "text-slate-900 dark:text-slate-100" : "text-brand-700 dark:text-brand-300"}`}
            >
              {cell.value ? (
                cell.value
              ) : (
                <span className="grid h-full w-full grid-cols-3 grid-rows-3 p-1 text-[8px] text-slate-400 sm:text-[10px]">
                  {Array.from({ length: 9 }, (_, index) => index + 1).map((n) => (
                    <span key={n} className="flex items-center justify-center">{cell.notes.includes(n) ? n : ""}</span>
                  ))}
                </span>
              )}
            </motion.button>
          );
        }),
      )}
    </div>
  );
}

function NumberPad() {
  const inputNumber = useGameStore((s) => s.inputNumber);
  const mistakes = useGameStore((s) => s.mistakes);
  const completed = useGameStore((s) => s.completed);
  const buttons = useMemo(() => [...Array.from({ length: 9 }, (_, i) => i + 1), "Erase"] as const, []);

  async function handle(value: number | null) {
    const result = inputNumber(value);
    if (value === null) await trackEvent("erase_used");
    else await trackEvent("cell_filled", { value });
    if (result.mistake) await trackEvent("mistake_made");
    if (result.completed) await trackEvent("game_completed");
  }

  return (
    <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
      {buttons.map((item) => (
        <button
          key={item}
          onClick={() => handle(item === "Erase" ? null : item)}
          disabled={completed || mistakes >= 4}
          className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-premium disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/90"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function Toolbar() {
  const notesMode = useGameStore((s) => s.notesMode);
  const toggleNotes = useGameStore((s) => s.toggleNotes);
  const undo = useGameStore((s) => s.undo);
  const reset = useGameStore((s) => s.reset);
  const board = useGameStore((s) => s.board);
  const puzzle = useGameStore((s) => s.puzzle);
  const selected = useGameStore((s) => s.selected);
  const inputNumber = useGameStore((s) => s.inputNumber);

  const hint = async () => {
    if (!selected || !puzzle) return;
    const [r, c] = selected;
    const correct = puzzle.solution[r][c];
    inputNumber(correct);
    await trackEvent("hint_used", { row: r, col: c });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button className={notesMode ? "bg-slate-900 dark:bg-slate-100 dark:text-slate-900" : ""} onClick={async () => { toggleNotes(); await trackEvent("notes_toggled", { enabled: !notesMode }); }}>Notes</Button>
      <Button className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900" onClick={async () => { undo(); await trackEvent("undo_used"); }}>Undo</Button>
      <Button className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900" onClick={hint}>Hint</Button>
      <Button className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900" onClick={reset}>Restart</Button>
    </div>
  );
}

export function GameShell({ initialPuzzle }: { initialPuzzle: Puzzle }) {
  const { loadPuzzle, mistakes, completed, difficulty } = useGameStore((s) => ({
    loadPuzzle: s.loadPuzzle,
    mistakes: s.mistakes,
    completed: s.completed,
    difficulty: s.difficulty,
  }));

  useEffect(() => {
    loadPuzzle(initialPuzzle);
    void trackEvent("game_started", { difficulty: initialPuzzle.difficulty, puzzleId: initialPuzzle.id });
  }, [initialPuzzle, loadPuzzle]);

  useEffect(() => {
    async function refresh() {
      const response = await fetch(`/api/puzzle?difficulty=${difficulty}`);
      const data = (await response.json()) as { puzzle: Puzzle };
      loadPuzzle(data.puzzle);
      await trackEvent("game_started", { difficulty: data.puzzle.difficulty, puzzleId: data.puzzle.id });
    }
    if (difficulty !== initialPuzzle.difficulty) void refresh();
  }, [difficulty, initialPuzzle.difficulty, loadPuzzle]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
      <Card className="p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-brand-600">Premium play</div>
            <h1 className="text-2xl font-bold tracking-tight">Play Sudoku</h1>
          </div>
          <Timer />
        </div>
        <SudokuBoard />
      </Card>
      <div className="space-y-5">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-500">Difficulty</div>
              <div className="text-lg font-semibold capitalize">{difficulty}</div>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800">Mistakes {mistakes}/4</div>
          </div>
          <DifficultyPicker />
        </Card>
        <Card className="p-5">
          <div className="mb-4 text-sm font-medium text-slate-500">Controls</div>
          <Toolbar />
        </Card>
        <Card className="p-5">
          <div className="mb-4 text-sm font-medium text-slate-500">Number pad</div>
          <NumberPad />
        </Card>
        <Card className="p-5">
          <div className="text-sm text-slate-500">Status</div>
          <div className="mt-2 text-lg font-semibold">
            {completed ? "Puzzle completed" : mistakes >= 4 ? "Game over — too many mistakes" : "Keep going"}
          </div>
          <p className="mt-2 text-sm text-slate-500">Designed to feel premium, clean, and fast — with admin analytics running invisibly in the background.</p>
        </Card>
      </div>
    </div>
  );
}
