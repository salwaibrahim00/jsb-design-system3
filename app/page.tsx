"use client";

import { useEffect, useRef } from "react";
import Sidebar from "./components/sections/Sidebar";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import HorizontalServices from "./components/sections/HorizontalServices";
import Process from "./components/sections/Process";
import CTABanner from "./components/sections/CTABanner";
import Footer from "./components/sections/Footer";
import MarqueeStrip from "./components/ui/MarqueeStrip";
import Breadcrumb from "./components/ui/Breadcrumb";
import DesignSystemBanner from "./components/ui/DesignSystemBanner";
import ColorPalette from "./components/ui/ColorPalette";
import Typography from "./components/ui/Typography";
import SpacingScale from "./components/ui/SpacingScale";
import BadgesShowcase from "./components/ui/BadgesShowcase";
import ButtonsShowcase from "./components/ui/ButtonsShowcase";
import CardsShowcase from "./components/ui/CardsShowcase";
import FormsShowcase from "./components/ui/FormsShowcase";
import AlertsShowcase from "./components/ui/AlertsShowcase";
import TableShowcase from "./components/ui/TableShowcase";
import ModalShowcase from "./components/ui/ModalShowcase";
import ToastShowcase from "./components/ui/ToastShowcase";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const elements = main.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: main,
        threshold: 0.06,
        rootMargin: "0px 0px -32px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "var(--color-background)",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <main
        ref={mainRef}
        style={{
          flex: 1,
          overflowY: "auto",
          minHeight: 0,
          minWidth: 0,
        }}
      >
        <Navbar />

        <Hero />

        <div data-reveal><MarqueeStrip dark /></div>

        <div data-reveal><About /></div>

        <HorizontalServices />

        <MarqueeStrip dark />

        <div data-reveal><Process /></div>

        <div
          style={{
            background: "#0A1A33",
            padding: "32px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <div style={{ height: "1px", flex: 1, maxWidth: "220px", background: "rgba(255,255,255,0.07)" }} />
          <div
            style={{
              padding: "8px 22px",
              border: "1px solid rgba(242,201,76,0.22)",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(242,201,76,0.65)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              background: "rgba(242,201,76,0.05)",
            }}
          >
            Design System
          </div>
          <div style={{ height: "1px", flex: 1, maxWidth: "220px", background: "rgba(255,255,255,0.07)" }} />
        </div>

        <Breadcrumb />

        <div id="design-system-banner" style={{ padding: "48px 24px 0", maxWidth: "960px", margin: "0 auto" }}>
          <DesignSystemBanner />
        </div>

        <div id="colors"   data-reveal><ColorPalette /></div>
        <div id="type"     data-reveal><Typography /></div>
        <div id="spacing"  data-reveal><SpacingScale /></div>
        <div id="badges"   data-reveal><BadgesShowcase /></div>
        <div id="buttons"  data-reveal><ButtonsShowcase /></div>
        <div id="cards"    data-reveal><CardsShowcase /></div>
        <div id="forms"    data-reveal><FormsShowcase /></div>
        <div id="alerts"   data-reveal><AlertsShowcase /></div>
        <div id="tables"   data-reveal><TableShowcase /></div>
        <div id="modals"   data-reveal><ModalShowcase /></div>
        <div id="toasts"   data-reveal><ToastShowcase /></div>

        <div data-reveal><CTABanner /></div>

        <Footer />
      </main>
    </div>
  );
}
