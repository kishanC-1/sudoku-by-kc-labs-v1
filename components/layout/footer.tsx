import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 py-10 dark:border-slate-800/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-semibold">Sudoku — by KC Labs</div>
          <div className="mt-1 text-sm text-slate-500">Premium Sudoku experience with hidden analytics-ready admin.</div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/academy">Academy</Link>
        </div>
      </div>
    </footer>
  );
}
