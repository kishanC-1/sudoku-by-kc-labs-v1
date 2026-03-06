"use client";

import { create } from "zustand";
import { Cell, Difficulty, Puzzle } from "@/types/game";
import { createBoard, cloneBoard, isSolved } from "@/lib/game/board";

interface GameState {
  puzzle: Puzzle | null;
  board: Cell[][];
  selected: [number, number] | null;
  notesMode: boolean;
  mistakes: number;
  completed: boolean;
  history: Cell[][][];
  loadPuzzle: (puzzle: Puzzle) => void;
  selectCell: (row: number, col: number) => void;
  inputNumber: (value: number | null) => { mistake: boolean; completed: boolean };
  toggleNotes: () => void;
  undo: () => void;
  reset: () => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
}

const emptyBoard: Cell[][] = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => ({ value: null, fixed: false, notes: [] })),
);

export const useGameStore = create<GameState>((set, get) => ({
  puzzle: null,
  board: emptyBoard,
  selected: null,
  notesMode: false,
  mistakes: 0,
  completed: false,
  history: [],
  difficulty: "easy",
  setDifficulty: (difficulty) => set({ difficulty }),
  loadPuzzle: (puzzle) =>
    set({
      puzzle,
      board: createBoard(puzzle),
      selected: null,
      notesMode: false,
      mistakes: 0,
      completed: false,
      history: [],
      difficulty: puzzle.difficulty,
    }),
  selectCell: (row, col) => set({ selected: [row, col] }),
  toggleNotes: () => set((state) => ({ notesMode: !state.notesMode })),
  undo: () => {
    const { history } = get();
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    set({ board: previous, history: history.slice(0, -1) });
  },
  reset: () => {
    const puzzle = get().puzzle;
    if (!puzzle) return;
    set({ board: createBoard(puzzle), mistakes: 0, completed: false, history: [] });
  },
  inputNumber: (value) => {
    const { selected, board, puzzle, notesMode, history } = get();
    if (!selected || !puzzle) return { mistake: false, completed: false };
    const [row, col] = selected;
    if (board[row][col].fixed) return { mistake: false, completed: false };

    const next = cloneBoard(board);
    let mistake = false;
    if (notesMode && value) {
      const notes = new Set(next[row][col].notes);
      if (notes.has(value)) notes.delete(value); else notes.add(value);
      next[row][col].notes = Array.from(notes).sort();
    } else {
      next[row][col].value = value;
      next[row][col].notes = [];
      if (value !== null && value !== puzzle.solution[row][col]) {
        mistake = true;
      }
    }

    const completed = isSolved(next, puzzle.solution);
    set((state) => ({
      board: next,
      mistakes: state.mistakes + (mistake ? 1 : 0),
      completed,
      history: [...history, cloneBoard(board)],
    }));

    return { mistake, completed };
  },
}));
