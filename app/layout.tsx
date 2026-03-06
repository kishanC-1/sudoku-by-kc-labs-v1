import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdProvider } from "@/components/ads/ad-provider";
import { ConsentBanner } from "@/components/ads/consent-banner";

export const metadata: Metadata = {
  title: "Sudoku — by KC Labs",
  description: "Premium Sudoku experience with hidden admin analytics and AdSense-ready architecture.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AdProvider />
          <Navbar />
          <main className="min-h-[calc(100vh-144px)]">{children}</main>
          <Footer />
          <ConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
