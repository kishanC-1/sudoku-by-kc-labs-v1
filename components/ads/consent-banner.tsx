"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { adsConfig } from "@/lib/ads/config";

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!adsConfig.consentModeEnabled) return;
    setOpen(localStorage.getItem("kc-cookie-consent") !== "accepted");
  }, []);

  if (!adsConfig.consentModeEnabled || !open) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-premium dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-300">We use cookies to improve the experience and support future advertising features.</p>
        <Button onClick={() => { localStorage.setItem("kc-cookie-consent", "accepted"); setOpen(false); }}>Accept</Button>
      </div>
    </div>
  );
}
