"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }
    router.push("/admin");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center px-6 py-12">
      <Card className="w-full p-6">
        <div className="text-sm font-semibold text-brand-600">Private</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Admin login</h1>
        <p className="mt-2 text-sm text-slate-500">No admin links are exposed on the public site.</p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <Button type="submit">Sign in</Button>
        </form>
      </Card>
    </div>
  );
}
