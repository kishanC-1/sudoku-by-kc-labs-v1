import { Cell, Puzzle } from "@/types/game";

export function createBoard(puzzle: Puzzle): Cell[][] {
  return puzzle.initial.map((row) =>
    row.map((value) => ({
      value: value === 0 ? null : value,
      fixed: value !== 0,
      notes: [],
    })),
  );
}

export function isSolved(board: Cell[][], solution: number[][]) {
  return board.every((row, r) => row.every((cell, c) => cell.value === solution[r][c]));
}

export function cloneBoard(board: Cell[][]): Cell[][] {
  return board.map((row) => row.map((cell) => ({ ...cell, notes: [...cell.notes] })));
}
