import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/content/post-card";
import { posts } from "@/lib/content/posts";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-300">Premium web Sudoku</div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Simple gameplay. <span className="text-brand-600">Premium feel.</span></h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">Sudoku — by KC Labs is built to feel clean, fast, and smooth, while hidden analytics and monetization-ready architecture quietly power the platform underneath.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/play"><Button>Start playing</Button></Link>
            <Link href="/academy"><Button className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900">Explore Academy</Button></Link>
          </div>
        </div>
        <Card className="p-6">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 81 }, (_, i) => (
              <div key={i} className="aspect-square rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950" />
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-3">
        {[
          ["Fast UX", "Micro-animations, clean board interactions, and minimal friction."],
          ["Hidden admin", "Users see only the product. Admin analytics stay fully private."],
          ["AdSense-ready", "Monetization architecture is built in, but ads stay hidden until approval."],
        ].map(([title, desc]) => (
          <Card key={title} className="p-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-slate-500">{desc}</p>
          </Card>
        ))}
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-sm font-semibold text-brand-600">Sudoku Academy</div>
            <h2 className="text-3xl font-bold tracking-tight">Content that supports SEO, trust, and monetization</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </section>
    </div>
  );
}
