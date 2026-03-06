export type Difficulty = "easy" | "medium" | "hard" | "expert";

export type Cell = {
  value: number | null;
  fixed: boolean;
  notes: number[];
};

export type Puzzle = {
  id: string;
  difficulty: Difficulty;
  initial: number[][];
  solution: number[][];
  isDaily?: boolean;
};
