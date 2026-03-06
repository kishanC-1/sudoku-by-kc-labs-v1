export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: "how-to-play-sudoku",
    title: "How to Play Sudoku: Beginner Guide",
    excerpt: "Learn the grid, the rules, and the clean logic behind every puzzle.",
    category: "Basics",
    publishedAt: "2026-03-05",
    content: `Sudoku is built on simple rules: each row, column, and 3x3 box must contain digits 1 through 9 exactly once. Start by scanning rows and columns with many fixed values. Look for cells where only one number can fit. Avoid guessing too early. Strong players move from certainty to certainty. Use notes to track candidates, remove impossible numbers, and let the puzzle narrow itself. The goal is not speed first. The goal is clean logic.`,
  },
  {
    slug: "naked-pairs-explained",
    title: "Naked Pairs Explained",
    excerpt: "One of the most useful intermediate Sudoku strategies.",
    category: "Strategy",
    publishedAt: "2026-03-05",
    content: `When two cells in a row, column, or box can only contain the same two candidates, those candidates can be removed from the rest of that unit. This is called a naked pair. It simplifies the board and often unlocks the next move. Use it when the puzzle seems stuck after basic elimination.`,
  },
  {
    slug: "why-daily-sudoku-helps-focus",
    title: "Why Daily Sudoku Helps Focus",
    excerpt: "Sudoku rewards deliberate thinking, patience, and attention.",
    category: "Brain Health",
    publishedAt: "2026-03-05",
    content: `Daily Sudoku builds concentration by forcing your mind to hold constraints, compare possibilities, and suppress random guesses. Even short sessions can help create a routine of focused reasoning. That makes Sudoku appealing not only as a game but also as a mental reset activity.`,
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
