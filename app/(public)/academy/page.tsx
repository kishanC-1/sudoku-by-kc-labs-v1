import { PostCard } from "@/components/content/post-card";
import { posts } from "@/lib/content/posts";

export default function AcademyPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="max-w-2xl">
        <div className="text-sm font-semibold text-brand-600">Sudoku Academy</div>
        <h1 className="mt-1 text-4xl font-bold tracking-tight">Build the content layer around the game</h1>
        <p className="mt-4 text-slate-500">This section is intentionally included from v1 so the platform can grow into an AdSense-friendly knowledge hub instead of remaining just a game page.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => <PostCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
}
