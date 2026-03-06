import { Card } from "@/components/ui/card";

export function MetricCard({ title, value, hint }: { title: string; value: string | number; hint?: string }) {
  return (
    <Card className="p-5">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
      {hint ? <div className="mt-2 text-xs text-slate-400">{hint}</div> : null}
    </Card>
  );
}
