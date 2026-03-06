import Script from "next/script";
import { adsConfig } from "@/lib/ads/config";

export function AdProvider() {
  if (!adsConfig.adsEnabled || !process.env.NEXT_PUBLIC_AD_CLIENT) return null;
  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_AD_CLIENT}`}
    />
  );
}
