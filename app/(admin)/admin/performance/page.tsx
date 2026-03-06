import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-sm font-semibold text-brand-600">Admin</div>
      <h1 className="mt-1 text-4xl font-bold tracking-tight">Performance</h1>
      <Card className="mt-6 p-6">
        <p className="text-sm text-slate-500">This section is scaffolded and ready to connect to richer analytics queries as you expand beyond V1.</p>
      </Card>
    </div>
  );
}
