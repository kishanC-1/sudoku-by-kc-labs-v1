import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Post } from "@/lib/content/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="p-5 transition hover:-translate-y-1">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">{post.category}</div>
      <h3 className="mt-2 text-xl font-semibold tracking-tight">{post.title}</h3>
      <p className="mt-2 text-sm text-slate-500">{post.excerpt}</p>
      <div className="mt-4">
        <Link href={`/academy/${post.slug}`} className="text-sm font-semibold text-brand-600">Read article →</Link>
      </div>
    </Card>
  );
}
