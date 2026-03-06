"use client";

import { useEffect } from "react";
import { adsConfig } from "@/lib/ads/config";

declare global {
  interface Window { adsbygoogle?: unknown[] }
}

export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  useEffect(() => {
    if (!adsConfig.adsEnabled) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // no-op
    }
  }, []);

  if (!adsConfig.adsEnabled || !process.env.NEXT_PUBLIC_AD_CLIENT) return null;

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_AD_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
