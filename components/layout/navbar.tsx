import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const links = [
  { href: "/play", label: "Play" },
  { href: "/daily", label: "Daily" },
  { href: "/academy", label: "Academy" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group">
          <div className="text-xl font-bold tracking-tight">Sudoku</div>
          <div className="text-xs text-slate-500 transition group-hover:text-brand-600 dark:text-slate-400">by KC Labs</div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
