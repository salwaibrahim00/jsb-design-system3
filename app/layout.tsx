import type { Metadata } from "next";
import { Merriweather, Lato } from "next/font/google";
import "./globals.css";
import GridBackground from "./components/ui/GridBackground";

const merriweather = Merriweather({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JSB Design System",
  description: "A comprehensive design system for JSB Business Solutions Group — covering typography, color, spacing, and components.",
  keywords: ["design system", "JSB", "business", "UI components"],
  authors: [{ name: "JSB Business Solutions Group" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} ${lato.variable}`}
      suppressHydrationWarning
    >
      <body style={{ background: "#060d18" }}>
        {/* Fixed animated gold grid — sits behind all page content */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <GridBackground />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
