"use client";
import { useState, useEffect } from "react";
import { WordWheel } from "../ui/WordWheel";
import { MapPin, BarChart2, Handshake } from "lucide-react";

const SUN_RAYS: string[] = Array.from({ length: 18 }, (_, i) => {
  const angleDeg = i * (360 / 18);
  const halfW = i % 2 === 0 ? 13 : 5;
  const len = 900;
  const r1 = ((angleDeg - halfW) * Math.PI) / 180;
  const r2 = ((angleDeg + halfW) * Math.PI) / 180;
  return `0,0 ${len * Math.cos(r1)},${len * Math.sin(r1)} ${len * Math.cos(r2)},${len * Math.sin(r2)}`;
});

function StatCard({
  stat,
  label,
  sub,
  accent,
}: {
  stat?: string;
  label: string;
  sub: string;
  accent?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "rgba(242,201,76,0.3)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "14px",
        padding: "22px 24px",
        background: hovered ? "rgba(242,201,76,0.04)" : "rgba(255,255,255,0.03)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease",
        cursor: "default",
      }}
    >
      {stat && (
        <div style={{
          fontFamily: "var(--font-heading)",
          fontSize: "36px",
          fontWeight: 700,
          color: "#F2C94C",
          lineHeight: 1,
          marginBottom: "6px",
          letterSpacing: "-0.03em",
        }}>
          {stat}
        </div>
      )}
      <div style={{
        fontFamily: "var(--font-body)",
        fontSize: "14px",
        fontWeight: 700,
        color: "#e8eaef",
        marginBottom: "6px",
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "var(--font-body)",
        fontSize: "13px",
        color: "rgba(255,255,255,0.45)",
        lineHeight: 1.65,
      }}>
        {sub}
      </div>
    </div>
  );
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#F2C94C",
        color: "#0A1A33",
        border: "none",
        borderRadius: "10px",
        padding: "15px 28px",
        fontWeight: 700,
        fontSize: "15px",
        fontFamily: "var(--font-body)",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 10px 28px rgba(242,201,76,0.4)"
          : "0 4px 14px rgba(242,201,76,0.25)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.07)" : "transparent",
        color: "#e8eaef",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "10px",
        padding: "15px 28px",
        fontWeight: 600,
        fontSize: "15px",
        fontFamily: "var(--font-body)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </button>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      style={{
        padding: "120px 24px",
        background: "transparent",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dark overlay — keeps text legible over the grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, rgba(6,13,24,0.88) 0%, rgba(10,26,51,0.72) 55%, rgba(6,13,24,0.32) 100%)",
        zIndex: 0,
      }} />
      {/* ── Sun — client-only to avoid SSR hydration mismatch ── */}
      {mounted && (
        <div style={{
          position: "absolute",
          left: "50%", top: "30%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none", zIndex: 0,
          width: 0, height: 0,
        }}>
          {/* Rotating rays */}
          <svg
            className="hero-sun-rays"
            style={{ position: "absolute", left: "-700px", top: "-700px", overflow: "visible" }}
            width="1400" height="1400" viewBox="-700 -700 1400 1400"
          >
            <defs>
              <radialGradient id="ray-grad" cx="0" cy="0" r="700" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#F2C94C" stopOpacity="0.16" />
                <stop offset="50%"  stopColor="#F2C94C" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#F2C94C" stopOpacity="0"    />
              </radialGradient>
            </defs>
            {SUN_RAYS.map((pts, i) => (
              <polygon key={i} points={pts} fill="url(#ray-grad)" />
            ))}
          </svg>

          {/* Counter-rotating dashed halo rings */}
          <svg
            className="hero-sun-halo"
            style={{ position: "absolute", left: "-110px", top: "-110px", overflow: "visible" }}
            width="220" height="220" viewBox="-110 -110 220 220"
          >
            <circle cx="0" cy="0" r="68"  fill="none" stroke="rgba(242,201,76,0.22)" strokeWidth="1"   strokeDasharray="6 10" />
            <circle cx="0" cy="0" r="90"  fill="none" stroke="rgba(242,201,76,0.12)" strokeWidth="0.8" strokeDasharray="3 14" />
            <circle cx="0" cy="0" r="108" fill="none" stroke="rgba(242,201,76,0.06)" strokeWidth="0.6" strokeDasharray="2 18" />
          </svg>

          {/* Bloom glow */}
          <div style={{
            position: "absolute",
            left: "-180px", top: "-160px",
            width: "360px", height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(242,201,76,0.28) 0%, rgba(242,201,76,0.08) 45%, transparent 75%)",
          }} />

          {/* Pulsing core */}
          <div className="hero-sun-core" style={{
            position: "absolute",
            left: "-28px", top: "-28px",
            width: "56px", height: "56px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,252,220,0.95) 0%, rgba(242,201,76,0.7) 40%, rgba(242,201,76,0) 100%)",
          }}>
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%,-50%)",
              width: "10px", height: "10px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 0 8px 4px rgba(255,248,200,0.8)",
            }} />
          </div>
        </div>
      )}

      {/* Decorative gold glow — left corner */}
      <div style={{
        position: "absolute",
        top: "-120px", left: "-80px",
        width: "500px", height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(242,201,76,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "1120px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1.2fr 0.9fr",
        gap: "72px",
        alignItems: "flex-start",
        position: "relative",
        zIndex: 1,
      }}>

        {/* LEFT */}
        <div>
          {/* Eyebrow */}
          <div className="hero-animate" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(242,201,76,0.1)",
            border: "1px solid rgba(242,201,76,0.2)",
            borderRadius: "999px",
            padding: "6px 14px 6px 8px",
            marginBottom: "28px",
            animationDelay: "0.1s",
          }}>
            <div style={{
              width: "22px", height: "22px", borderRadius: "50%",
              background: "#F2C94C",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0A1A33" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: 700,
              color: "#F2C94C",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              JSB Business Solutions Group
            </span>
          </div>

          {/* H1 */}
          <h1 className="hero-animate" style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(40px, 5vw, 64px)",
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            margin: "0 0 24px 0",
            maxWidth: "680px",
            animationDelay: "0.25s",
          }}>
            Strategic guidance for entrepreneurs making{" "}
            <span style={{ color: "#F2C94C" }}>serious decisions.</span>
          </h1>

          {/* Body */}
          <p className="hero-animate" style={{
            fontFamily: "var(--font-body)",
            fontSize: "19px",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.72)",
            maxWidth: "580px",
            margin: "0 0 40px 0",
            animationDelay: "0.42s",
          }}>
            We help business owners strengthen operations, improve financial
            readiness, and build sustainable growth strategies backed by
            real experience.
          </p>

          {/* CTAs */}
          <div className="hero-animate" style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "48px", animationDelay: "0.56s" }}>
            <PrimaryButton>Schedule a Free Strategy Call</PrimaryButton>
            <GhostButton>View Services</GhostButton>
          </div>

          {/* Trust bar */}
          <div className="hero-animate" style={{
            display: "flex",
            gap: "28px",
            flexWrap: "wrap",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            marginBottom: "36px",
            animationDelay: "0.72s",
          }}>
            {[
              { Icon: MapPin,    text: "Detroit-based" },
              { Icon: BarChart2, text: "40+ years experience" },
              { Icon: Handshake, text: "Advisor-led" },
            ].map(({ Icon, text }) => (
              <div key={text} style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.55)",
              }}>
                <Icon size={14} strokeWidth={1.8} style={{ color: "#F2C94C", flexShrink: 0 }} />
                {text}
              </div>
            ))}
          </div>

          {/* Stat cards */}
          <div className="hero-animate" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            animationDelay: "0.88s",
          }}>
            <StatCard stat="40+" label="Years Experience" sub="Decades of boots-on-the-ground advisory" />
            <StatCard stat="200+" label="Clients Served" sub="From startups to established enterprises" />
            <StatCard stat="$2B+" label="Capital Advised" sub="Transactions, raises & restructures" />
          </div>
        </div>

        {/* RIGHT — Word Wheel */}
        <div className="hero-animate" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          animationDelay: "0.38s",
        }}>
          {/* Label */}
          <div style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            alignSelf: "flex-start",
          }}>
            What we deliver
          </div>

          {/* The wheel */}
          <WordWheel />

          {/* CTA nudge */}
          <div style={{
            width: "100%",
            background: "rgba(242,201,76,0.08)",
            border: "1px solid rgba(242,201,76,0.18)",
            borderRadius: "14px",
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 700, color: "#F2C94C", marginBottom: "2px" }}>
                Free 30-min strategy call
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
                No commitment. Just clarity.
              </div>
            </div>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#F2C94C",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A1A33" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}