"use client";

import { useEffect, useRef } from "react";
import { TrendingUp, Target, Users, ShieldCheck, Rocket, Award, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    tag: "Finance",
    Icon: TrendingUp,
    title: "Financial Planning",
    body: "Budgeting, forecasting, and capital strategy to build long-term financial health and investor-readiness.",
    accent: "#F2C94C",
    photo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&fit=crop",
  },
  {
    num: "02",
    tag: "Strategy",
    Icon: Target,
    title: "Business Strategy",
    body: "Competitive positioning, market analysis, and direction-setting for companies serious about sustainable advantage.",
    accent: "#93c5fd",
    photo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&fit=crop",
  },
  {
    num: "03",
    tag: "People",
    Icon: Users,
    title: "HR & People Ops",
    body: "Recruitment frameworks, compensation planning, and culture systems that attract and retain the right talent.",
    accent: "#86efac",
    photo: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&fit=crop",
  },
  {
    num: "04",
    tag: "Risk",
    Icon: ShieldCheck,
    title: "Risk Management",
    body: "Identify exposure, build contingency plans, and protect what you have built before a crisis forces your hand.",
    accent: "#f9a8d4",
    photo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80&fit=crop",
  },
  {
    num: "05",
    tag: "Growth",
    Icon: Rocket,
    title: "Growth & Scaling",
    body: "Operational infrastructure and go-to-market execution to grow confidently without losing control of the business.",
    accent: "#fcd34d",
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&fit=crop",
  },
  {
    num: "06",
    tag: "Leadership",
    Icon: Award,
    title: "Leadership Development",
    body: "Executive coaching, board advisory, and leadership pipeline programs that build resilient organisations.",
    accent: "#c4b5fd",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80&fit=crop",
  },
];

const CARD_W = 420;
const CARD_GAP = 24;
const SIDE_PAD = 60;

export default function HorizontalServices() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef   = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number | null>(null);

  useEffect(() => {
    const main = document.querySelector("main") as HTMLElement | null;
    if (!main) return;

    const tick = () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      const bar   = barRef.current;
      if (!outer || !track || !bar) { rafRef.current = requestAnimationFrame(tick); return; }

      const rect     = outer.getBoundingClientRect();
      const outerH   = outer.offsetHeight;
      const stickyH  = window.innerHeight;
      const scrollable = outerH - stickyH;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

      const totalW    = SERVICES.length * CARD_W + (SERVICES.length - 1) * CARD_GAP + SIDE_PAD * 2;
      const maxShift  = Math.max(0, totalW - window.innerWidth);
      const shift     = progress * maxShift;

      track.style.transform = `translateX(-${shift}px)`;
      bar.style.width = `${progress * 100}%`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div ref={outerRef} style={{ height: "380vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#060d18",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Progress bar */}
        <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <div
            ref={barRef}
            style={{
              height: "100%",
              width: "0%",
              background: "linear-gradient(90deg, #F2C94C, #c89b3c)",
              borderRadius: "0 2px 2px 0",
              transition: "width 0.05s linear",
            }}
          />
        </div>

        {/* Header row */}
        <div style={{
          padding: "36px 60px 24px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F2C94C", fontFamily: "var(--font-body)", marginBottom: "8px" }}>
              What We Do
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>
              Our Practice Areas
            </h2>
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)", textAlign: "right", maxWidth: "240px", lineHeight: 1.6 }}>
            Scroll to explore →
          </div>
        </div>

        {/* Card track */}
        <div
          ref={trackRef}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "stretch",
            gap: `${CARD_GAP}px`,
            padding: `0 ${SIDE_PAD}px`,
            willChange: "transform",
          }}
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>

        {/* Bottom padding */}
        <div style={{ height: "36px", flexShrink: 0 }} />
      </div>
    </div>
  );
}

function ServiceCard({ service: s, index }: { service: typeof SERVICES[0]; index: number }) {
  const { Icon } = s;

  return (
    <div
      style={{
        width: `${CARD_W}px`,
        flexShrink: 0,
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        cursor: "default",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "#0a1628",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${s.accent}55`;
        el.style.transform = "translateY(-4px)";
        el.style.transition = "transform 0.3s ease, border-color 0.3s ease";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Photo — top 58% */}
      <div style={{ position: "relative", height: "58%", overflow: "hidden" }}>
        <img
          src={s.photo}
          alt={s.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.82) saturate(0.9)",
          }}
        />
        {/* Dark fade into card body */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: "linear-gradient(to bottom, transparent, #0a1628)",
        }} />

        {/* Top-left number */}
        <div style={{
          position: "absolute",
          top: "16px",
          left: "20px",
          fontFamily: "var(--font-heading)",
          fontSize: "13px",
          fontWeight: 700,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.08em",
        }}>
          {s.num}
        </div>

        {/* Top-right tag pill */}
        <div style={{
          position: "absolute",
          top: "14px",
          right: "16px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          background: `${s.accent}22`,
          border: `1px solid ${s.accent}44`,
          borderRadius: "100px",
          padding: "4px 10px",
          backdropFilter: "blur(8px)",
        }}>
          <Icon size={11} strokeWidth={2} color={s.accent} />
          <span style={{ fontSize: "10px", fontWeight: 700, color: s.accent, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
            {s.tag}
          </span>
        </div>
      </div>

      {/* Content — bottom 42% */}
      <div style={{
        height: "42%",
        padding: "20px 24px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a1628",
      }}>
        <div>
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "22px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            margin: "0 0 10px 0",
          }}>
            {s.title}
          </h3>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
            margin: 0,
          }}>
            {s.body}
          </p>
        </div>

        {/* Bottom CTA */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "16px",
          paddingTop: "14px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{ fontSize: "12px", color: s.accent, fontWeight: 700, fontFamily: "var(--font-body)", letterSpacing: "0.04em" }}>
            Learn more
          </span>
          <div style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: `${s.accent}18`,
            border: `1px solid ${s.accent}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <ArrowRight size={13} strokeWidth={2} color={s.accent} />
          </div>
        </div>
      </div>
    </div>
  );
}
