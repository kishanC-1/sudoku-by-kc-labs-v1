import { MetricCard } from "@/components/admin/metric-card";
import { Card } from "@/components/ui/card";

async function getOverview() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/admin/overview`, { cache: "no-store" });
  return res.json();
}

export default async function AdminPage() {
  const data = await getOverview();
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <div className="text-sm font-semibold text-brand-600">Admin intelligence</div>
        <h1 className="mt-1 text-4xl font-bold tracking-tight">Overview</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Visitors" value={data.visitors} />
        <MetricCard title="Sessions" value={data.sessions} />
        <MetricCard title="Games started" value={data.gamesStarted} />
        <MetricCard title="Completion rate" value={`${data.completionRate}%`} />
      </div>
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold">V1 dashboard note</h2>
        <p className="mt-2 text-sm text-slate-500">This is intentionally kept focused: product health, gameplay metrics, and technical visibility. Revenue analytics can be added later once AdSense goes live.</p>
      </Card>
    </div>
  );
}
