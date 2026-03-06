import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost } from "@/lib/content/posts";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-sm font-semibold text-brand-600">{post.category}</div>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{post.title}</h1>
      <p className="mt-4 text-lg text-slate-500">{post.excerpt}</p>
      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <p>{post.content}</p>
      </div>
      <div className="mt-8 rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
        <h2 className="text-xl font-semibold">Practice this now</h2>
        <p className="mt-2 text-sm text-slate-500">Every Academy article should lead players back into the product. This helps retention, internal linking, and future monetization.</p>
        <Link href="/play" className="mt-4 inline-block text-sm font-semibold text-brand-600">Open the Sudoku board →</Link>
      </div>
    </article>
  );
}
