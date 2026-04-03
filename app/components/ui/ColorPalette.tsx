"use client";
import { useState, useEffect, useRef } from "react";
import { Copy, Check, Gem, Sparkles } from "lucide-react";

/* ── In-view hook ─────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Section header ───────────────────────────────────────────────────── */
function Sec({ label, title, sub, children, delay = 0 }: {
  label: string; title: string; sub: string;
  children: React.ReactNode; delay?: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        marginBottom: "56px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6c7a8c", marginBottom: "4px", fontFamily: "var(--font-body)" }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: "17px", fontWeight: 700, color: "#142235", marginBottom: "3px" }}>
        {title}
      </div>
      <div style={{ fontSize: "12px", color: "#6c7a8c", marginBottom: "20px", fontFamily: "var(--font-body)" }}>
        {sub}
      </div>
      {children}
    </div>
  );
}

/* ── Floating Bubble ──────────────────────────────────────────────────── */
function Bubble({ hex, size, left, delay, duration }: { hex: string; size: number; left: string; delay: string; duration: string }) {
  return (
    <div
      className="cp-bubble"
      style={{
        position: "absolute",
        bottom: "-20px",
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 38% 35%, ${hex}ee 0%, ${hex}88 45%, ${hex}33 70%, transparent 85%)`,
        animationDuration: duration,
        animationDelay: delay,
        filter: "blur(1px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ── Color Orbit ──────────────────────────────────────────────────────── */
const PLANETS = [
  { color: "#0A1A33", name: "Navy",    label: "Foundation",  orbitClass: "cp-orbit-a", speed: "18s", r: "90px"  },
  { color: "#2f7a51", name: "Success", label: "Growth",      orbitClass: "cp-orbit-b", speed: "13s", r: "130px" },
  { color: "#b84040", name: "Alert",   label: "Urgency",     orbitClass: "cp-orbit-c", speed: "20s", r: "130px" },
  { color: "#3b82f6", name: "Info",    label: "Clarity",     orbitClass: "cp-orbit-d", speed: "15s", r: "170px" },
  { color: "#c27c00", name: "Warning", label: "Caution",     orbitClass: "cp-orbit-e", speed: "25s", r: "170px" },
];

function ColorOrbit() {
  const { ref, visible } = useInView(0.2);
  return (
    <div
      ref={ref}
      style={{
        borderRadius: "24px",
        background: "linear-gradient(135deg, #060d18 0%, #0A1A33 100%)",
        border: "1px solid rgba(242,201,76,0.12)",
        padding: "48px 32px",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        marginBottom: "56px",
      }}
    >
      {/* Background star dots */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        backgroundPosition: "20px 20px",
        animation: "cp-stars-drift 8s linear infinite",
        opacity: 0.35,
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>

        {/* Left: solar system */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative", width: "340px", height: "340px", display: "flex", alignItems: "center", justifyContent: "center" }}>

            {/* Orbit rings */}
            {[90, 130, 170].map((r) => (
              <div key={r} style={{
                position: "absolute",
                width: r * 2, height: r * 2,
                borderRadius: "50%",
                border: "1px dashed rgba(242,201,76,0.15)",
                pointerEvents: "none",
              }} />
            ))}

            {/* Sun — Gold accent */}
            <div
              className="cp-sun"
              style={{
                width: "56px", height: "56px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 38% 35%, #ffe082 0%, #c89b3c 55%, #8a6520 100%)",
                zIndex: 10,
                position: "relative",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "default",
              }}
            >
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#0A1A33", letterSpacing: "0.05em", fontFamily: "var(--font-body)" }}>GOLD</span>
            </div>

            {/* Planets */}
            {PLANETS.map((p) => (
              <div
                key={p.name}
                style={{
                  position: "absolute",
                  width: 0, height: 0,
                  animation: `${p.orbitClass} ${p.speed} linear infinite`,
                  ["--r" as string]: p.r,
                }}
              >
                <div
                  title={p.name}
                  style={{
                    width: "28px", height: "28px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 35% 35%, ${p.color}ee, ${p.color})`,
                    border: "2px solid rgba(255,255,255,0.2)",
                    boxShadow: `0 0 12px ${p.color}88`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transform: "translate(-14px, -14px)",
                    cursor: "default",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: legend */}
        <div>
          <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#F2C94C", marginBottom: "10px", fontFamily: "var(--font-body)" }}>
            Color System · Gravity
          </div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(18px,2vw,28px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: "0 0 12px 0" }}>
            Every color orbits <span style={{ color: "#F2C94C" }}>purpose.</span>
          </h3>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 28px 0", fontFamily: "var(--font-body)" }}>
            Gold is the gravitational center — it anchors the system. Every other token exists in relation to it, never competing, always serving.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { color: "#c89b3c", name: "Gold Accent",    role: "Attention · CTAs · Trust" },
              { color: "#0A1A33", name: "Navy",           role: "Authority · Depth · Structure" },
              { color: "#2f7a51", name: "Success Green",  role: "Growth · Confirmation · Safety" },
              { color: "#b84040", name: "Alert Red",      role: "Urgency · Error · Risk" },
              { color: "#3b82f6", name: "Info Blue",      role: "Clarity · Guidance · Data" },
              { color: "#c27c00", name: "Warning Amber",  role: "Caution · Attention · Review" },
            ].map((item) => (
              <div key={item.color} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: item.color, flexShrink: 0, boxShadow: `0 0 8px ${item.color}88` }} />
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-body)", minWidth: "110px" }}>{item.name}</span>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>{item.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Animated Brand Swatch ────────────────────────────────────────────── */
function AnimatedBrandSwatch({ hex, name, varName, role, big, pattern, onText, tagline, stats }: {
  hex: string; name: string; varName: string; role: string;
  big?: boolean; pattern: "gold" | "navy" | "border"; onText?: string;
  tagline: string;
  stats: { label: string; value: string }[];
}) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const fg = onText ?? "#fff";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setTilt({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top)  / rect.height - 0.5,
    });
  };

  const rotX = tilt.y * -14;
  const rotY = tilt.x *  14;
  const spotX = (tilt.x + 0.5) * 100;
  const spotY = (tilt.y + 0.5) * 100;

  const patternStyle: React.CSSProperties = pattern === "gold" ? {
    backgroundImage: `repeating-linear-gradient(105deg, transparent 0px, transparent 16px, rgba(255,255,255,0.1) 16px, rgba(255,255,255,0.1) 18px)`,
    backgroundSize: "180px 100%",
    animation: "cp-wave-move 3s linear infinite",
  } : pattern === "navy" ? {
    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.38) 1px, transparent 1px)",
    backgroundSize: "18px 18px",
    animation: "cp-stars-drift 5s linear infinite",
  } : {
    backgroundImage: `linear-gradient(rgba(20,34,53,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20,34,53,0.1) 1px, transparent 1px)`,
    backgroundSize: "14px 14px",
    animation: "cp-grid-march 2.5s linear infinite",
  };

  return (
    <div
      ref={ref}
      onClick={() => {
        navigator.clipboard.writeText(hex).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        background: hex,
        borderRadius: "22px",
        padding: big ? "32px 28px 28px" : "28px 22px 22px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        border: `1px solid ${onText ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.18)"}`,
        transform: hovered
          ? `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px) scale(1.045)`
          : "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 28px 64px ${hex}90, 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.2)`
          : `0 6px 20px ${hex}44`,
        transition: hovered
          ? "transform 0.12s ease-out, box-shadow 0.3s ease"
          : "transform 0.4s cubic-bezier(0.34,1.1,0.64,1), box-shadow 0.4s ease",
        color: fg,
        willChange: "transform",
      }}
    >
      {/* Animated background pattern */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "22px", pointerEvents: "none" }}>
        <div style={{
          ...patternStyle, position: "absolute", inset: 0,
          opacity: hovered ? 1 : 0.35,
          transition: "opacity 0.35s",
        }} />
      </div>

      {/* Mouse-position radial spotlight */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "22px",
        background: `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(255,255,255,${hovered ? 0.2 : 0}) 0%, transparent 55%)`,
        transition: hovered ? "background 0.08s" : "background 0.4s",
      }} />

      {/* Shimmer sweep */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%)",
        transform: hovered ? "translateX(110%)" : "translateX(-130%)",
        transition: "transform 0.65s ease",
        borderRadius: "22px",
      }} />

      {/* Copy badge */}
      <div style={{
        position: "absolute", top: "14px", right: "14px", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "30px", height: "30px", borderRadius: "9px",
        background: "rgba(0,0,0,0.25)",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-20deg)",
        transition: "opacity 0.2s, transform 0.3s cubic-bezier(0.34,1.2,0.64,1)",
      }}>
        {copied ? <Check size={13} color={fg} strokeWidth={2.5} /> : <Copy size={13} color={fg} strokeWidth={2} />}
      </div>

      {copied && (
        <div style={{
          position: "absolute", top: "14px", left: "14px", zIndex: 2,
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em",
          padding: "4px 10px", borderRadius: "6px",
          background: "rgba(0,0,0,0.3)", color: "#fff",
        }}>
          Copied!
        </div>
      )}

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Hex */}
        <div style={{
          fontFamily: "monospace",
          fontSize: big ? "26px" : "17px",
          fontWeight: 400,
          opacity: 0.88,
          marginBottom: "10px",
          letterSpacing: "-0.01em",
        }}>
          {hex}
        </div>

        {/* Name */}
        <div style={{
          fontFamily: "var(--font-heading)",
          fontSize: big ? "20px" : "14px",
          fontWeight: 700,
          marginBottom: "4px",
          letterSpacing: "-0.01em",
        }}>
          {name}
        </div>

        {/* Token */}
        <div style={{
          fontFamily: "monospace", fontSize: "9px",
          opacity: 0.48, marginBottom: "14px", letterSpacing: "0.02em",
        }}>
          {varName}
        </div>

        {/* Role pill */}
        <div style={{
          display: "inline-flex", alignItems: "center",
          padding: "5px 12px", borderRadius: "999px",
          background: "rgba(0,0,0,0.22)",
          fontSize: "11px", fontWeight: 600,
          fontFamily: "var(--font-body)",
        }}>
          {role}
        </div>

        {/* Tagline — slides in on hover */}
        <div style={{
          marginTop: "14px",
          fontSize: "12px",
          fontFamily: "var(--font-body)",
          fontStyle: "italic",
          lineHeight: 1.5,
          color: fg,
          opacity: hovered ? 0.75 : 0,
          transform: hovered ? "translateY(0px)" : "translateY(10px)",
          transition: "opacity 0.35s ease 0.08s, transform 0.4s cubic-bezier(0.34,1.1,0.64,1) 0.04s",
        }}>
          "{tagline}"
        </div>

        {/* Stats row — slides in on hover */}
        <div style={{
          display: "flex", gap: "16px",
          marginTop: "16px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0px)" : "translateY(12px)",
          transition: "opacity 0.35s ease 0.12s, transform 0.4s cubic-bezier(0.34,1.1,0.64,1) 0.08s",
        }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: big ? "18px" : "14px", fontWeight: 700, color: fg }}>{s.value}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "9px", opacity: 0.55, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandSwatches() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px" }}>
      <AnimatedBrandSwatch
        hex="#c89b3c" name="Gold Accent" varName="--color-accent"
        role="Primary brand signal" big pattern="gold"
        tagline="Every great brand earns one signature color. This is ours."
        stats={[{ label: "Used in", value: "CTAs" }, { label: "Contrast", value: "4.8:1" }, { label: "Hex", value: "#C89B" }]}
      />
      <AnimatedBrandSwatch
        hex="#0A1A33" name="Navy" varName="--color-navy"
        role="Foundation depth" pattern="navy"
        tagline="Deep, steady, unshakeable. The bedrock of the brand."
        stats={[{ label: "Contrast", value: "15:1" }, { label: "WCAG", value: "AAA" }]}
      />
      <AnimatedBrandSwatch
        hex="#d8d0c2" name="Warm Border" varName="--color-border"
        role="Structural lines" pattern="border" onText="#142235"
        tagline="The quiet one that holds everything together."
        stats={[{ label: "Usage", value: "Lines" }, { label: "Tone", value: "Warm" }]}
      />
    </div>
  );
}

/* ── 1. Background fan demo ───────────────────────────────────────────── */
function BgPeelDemo() {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const layers = [
    { bg: "#f7f4ee", hex: "#F7F4EE", name: "Background",        token: "--color-background",        role: "Page canvas",       depth: "Layer 0" },
    { bg: "#ffffff", hex: "#FFFFFF", name: "Surface",           token: "--color-surface",           role: "Component surface", depth: "Layer 1" },
    { bg: "#fcfaf6", hex: "#FCFAF6", name: "Elevated",          token: "--color-surface-elevated",  role: "Raised cards",      depth: "Layer 2" },
  ];

  /* Fan positions when open */
  const fanOut = [
    { tx: -200, ty: 28,  rot: -18 },
    { tx: 0,    ty: -30, rot:   0 },
    { tx: 200,  ty: 28,  rot:  18 },
  ];
  /* Stacked positions when closed */
  const stacked = [
    { tx: 0, ty: 20,   rot: -3 },
    { tx: 0, ty: 6,    rot:  0 },
    { tx: 0, ty: -8,   rot:  3 },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top)  / rect.height - 0.5,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        height: "280px",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        perspective: "900px",
        overflow: "visible",
      }}
    >
      {layers.map((layer, i) => {
        const pos  = hovered ? fanOut[i]   : stacked[i];
        const tiltX = mouse.y * -10;
        const tiltY = mouse.x *  10;
        const delay = hovered ? i * 0.04 : (2 - i) * 0.03;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "200px",
              height: "148px",
              borderRadius: "18px",
              background: layer.bg,
              border: "1px solid rgba(20,34,53,0.12)",
              boxShadow: hovered
                ? `0 ${16 + i * 10}px ${32 + i * 16}px rgba(20,34,53,${0.08 + i * 0.05}), inset 0 1px 0 rgba(255,255,255,0.9)`
                : `0 ${2 + i * 2}px ${8 + i * 4}px rgba(20,34,53,0.07)`,
              transform: `translate(${pos.tx}px, ${pos.ty}px) rotate(${pos.rot + tiltY * 0.4}deg) rotateX(${tiltX * 0.4}deg)`,
              transition: `transform ${0.45 + delay}s cubic-bezier(0.34,1.18,0.64,1), box-shadow 0.4s ease`,
              zIndex: hovered ? i + 1 : 3 - i,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "16px 18px",
            }}
          >
            {/* Top — depth label + gold dot */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{
                fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "rgba(20,34,53,0.28)",
                fontFamily: "monospace",
              }}>{layer.depth}</span>
              <div style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: hovered ? "#F2C94C" : "rgba(20,34,53,0.15)",
                boxShadow: hovered ? "0 0 6px 2px rgba(242,201,76,0.45)" : "none",
                transition: "background 0.3s ease, box-shadow 0.3s ease",
              }} />
            </div>

            {/* Center — color swatch preview */}
            <div style={{
              flex: 1,
              margin: "10px 0",
              borderRadius: "10px",
              background: `repeating-linear-gradient(45deg, rgba(20,34,53,0.03) 0px, rgba(20,34,53,0.03) 1px, transparent 1px, transparent 8px)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: layer.bg,
                border: "2px solid rgba(20,34,53,0.15)",
                boxShadow: "0 2px 8px rgba(20,34,53,0.1)",
              }} />
            </div>

            {/* Bottom — token info */}
            <div>
              <div style={{
                fontSize: "12px", fontWeight: 700, color: "#142235",
                fontFamily: "var(--font-body)", marginBottom: "2px",
              }}>
                {layer.hex} <span style={{ color: "#c89b3c" }}>—</span> {layer.name}
              </div>
              <div style={{ fontSize: "9px", color: "#6c7a8c", fontFamily: "monospace" }}>
                {layer.token}
              </div>
              {hovered && (
                <div style={{
                  fontSize: "10px", color: "#c89b3c", fontWeight: 600,
                  fontFamily: "var(--font-body)", marginTop: "4px",
                  opacity: 1, transition: "opacity 0.2s ease",
                }}>
                  {layer.role}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Connecting arc lines when fanned open */}
      {hovered && (
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
          viewBox="0 0 600 280"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d="M 100 200 Q 300 100 500 200" fill="none" stroke="rgba(242,201,76,0.2)" strokeWidth="1" strokeDasharray="4 6" />
        </svg>
      )}

      {/* Hint label */}
      {!hovered && (
        <div style={{
          position: "absolute", bottom: "12px", left: "50%",
          transform: "translateX(-50%)",
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "rgba(20,34,53,0.2)",
          fontFamily: "var(--font-body)", pointerEvents: "none", whiteSpace: "nowrap",
        }}>
          Hover to fan apart
        </div>
      )}
    </div>
  );
}

/* ── 2. Text hierarchy — spotlight editorial demo ─────────────────────── */
function TextHierarchyDemo() {
  const [focused, setFocused] = useState<number | null>(null);

  const levels = [
    {
      tag: "H1",
      text: "Detroit-based advisors who've built real businesses.",
      fontSize: "22px", fontWeight: 700,
      hex: "#142235", role: "Primary", token: "--color-text-primary",
      contrast: "15.1:1", wcag: "AAA" as const,
      fontFamily: "var(--font-heading)",
    },
    {
      tag: "P",
      text: "Our advisors bring decades of hands-on experience in operations, finance, HR, and growth strategy. We work alongside you — not above you.",
      fontSize: "15px", fontWeight: 400,
      hex: "#31445e", role: "Secondary", token: "--color-text-secondary",
      contrast: "9.7:1", wcag: "AAA" as const,
      fontFamily: "var(--font-body)",
    },
    {
      tag: "CAPTION",
      text: "Last updated · April 2026 · JSB Business Solutions Group · Detroit, MI",
      fontSize: "11.5px", fontWeight: 400,
      hex: "#6c7a8c", role: "Muted", token: "--color-text-muted",
      contrast: "5.2:1", wcag: "AA" as const,
      fontFamily: "var(--font-body)",
    },
  ];

  return (
    <div style={{ background: "#fff", border: "1px solid #d8d0c2", borderRadius: "16px", padding: "32px 28px", overflow: "hidden" }}>
      {levels.map((level, i) => (
        <div
          key={i}
          onMouseEnter={() => setFocused(i)}
          onMouseLeave={() => setFocused(null)}
          style={{
            position: "relative",
            padding: "14px 0",
            borderBottom: i < 2 ? "1px solid rgba(20,34,53,0.06)" : "none",
            opacity: focused === null ? 1 : focused === i ? 1 : 0.12,
            transition: "opacity 0.35s ease",
            cursor: "default",
          }}
        >
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            {/* Tag badge */}
            <div style={{
              fontFamily: "monospace", fontSize: "9px", fontWeight: 700,
              color: level.hex,
              background: focused === i ? `${level.hex}14` : `${level.hex}09`,
              padding: "3px 7px", borderRadius: "5px",
              border: `1px solid ${level.hex}${focused === i ? "35" : "18"}`,
              flexShrink: 0, marginTop: "2px", letterSpacing: "0.07em",
              transition: "background 0.25s, border 0.25s",
            }}>
              {level.tag}
            </div>

            {/* Actual text at real sizes */}
            <div style={{
              fontFamily: level.fontFamily,
              fontSize: level.fontSize,
              fontWeight: level.fontWeight,
              color: level.hex,
              lineHeight: 1.45,
              flex: 1,
            }}>
              {level.text}
            </div>
          </div>

          {/* Info bar — revealed on focus */}
          <div style={{
            display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px",
            marginTop: focused === i ? "12px" : "0px",
            marginLeft: "50px",
            maxHeight: focused === i ? "60px" : "0px",
            overflow: "hidden",
            opacity: focused === i ? 1 : 0,
            transition: "max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease",
            padding: focused === i ? "10px 14px" : "0 14px",
            background: "rgba(20,34,53,0.03)",
            borderRadius: "8px",
            border: focused === i ? "1px solid rgba(20,34,53,0.07)" : "1px solid transparent",
          }}>
            {/* Color dot + hex */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: level.hex, flexShrink: 0 }} />
              <code style={{ fontSize: "11px", fontWeight: 700, color: level.hex, fontFamily: "monospace" }}>
                {level.hex}
              </code>
            </div>

            <span style={{ color: "#d8d0c2", fontSize: "11px" }}>·</span>

            {/* Token */}
            <code style={{ fontSize: "10px", color: "#6c7a8c", fontFamily: "monospace" }}>
              {level.token}
            </code>

            <span style={{ color: "#d8d0c2", fontSize: "11px" }}>·</span>

            {/* WCAG badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              padding: "2px 9px", borderRadius: "999px",
              background: level.wcag === "AAA" ? "rgba(34,197,94,0.09)" : "rgba(234,179,8,0.09)",
              border: `1px solid ${level.wcag === "AAA" ? "rgba(34,197,94,0.3)" : "rgba(234,179,8,0.3)"}`,
            }}>
              <span style={{
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em",
                color: level.wcag === "AAA" ? "#16a34a" : "#ca8a04",
                fontFamily: "var(--font-body)",
              }}>
                WCAG {level.wcag} · {level.contrast}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Hint */}
      <div style={{
        marginTop: "16px",
        opacity: focused === null ? 1 : 0,
        transition: "opacity 0.2s ease",
        textAlign: "center",
        fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "rgba(20,34,53,0.2)",
        fontFamily: "var(--font-body)",
      }}>
        Hover a text level to spotlight it
      </div>
    </div>
  );
}

/* ── 3. Semantic cards ────────────────────────────────────────────────── */
function SemCard({ bg, border, barColor, icon, status, statusColor, title, titleColor, msg, msgColor, token, mood, scenario }: {
  bg: string; border: string; barColor: string;
  icon: React.ReactNode; status: string; statusColor: string;
  title: string; titleColor: string; msg: string; msgColor: string;
  token: string; mood: string;
  scenario: { label: string; lines: string[] };
}) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setTilt({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top)  / rect.height - 0.5,
    });
  };

  const rotX = tilt.y * -10;
  const rotY = tilt.x *  10;
  const spotX = (tilt.x + 0.5) * 100;
  const spotY = (tilt.y + 0.5) * 100;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        borderRadius: "18px",
        padding: "22px",
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${border}`,
        background: bg,
        transform: hovered
          ? `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-7px) scale(1.03)`
          : "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 24px 56px ${barColor}40, 0 0 0 1px ${barColor}20`
          : `0 2px 8px ${barColor}14`,
        transition: hovered
          ? "transform 0.12s ease-out, box-shadow 0.3s ease"
          : "transform 0.4s cubic-bezier(0.34,1.1,0.64,1), box-shadow 0.4s ease",
        cursor: "default",
        willChange: "transform",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "4px",
        background: `linear-gradient(180deg, ${barColor} 0%, ${barColor}55 100%)`,
        borderRadius: "18px 0 0 18px",
        transition: "width 0.25s",
      }} />

      {/* Mouse spotlight */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "18px",
        background: `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(255,255,255,${hovered ? 0.4 : 0}) 0%, transparent 55%)`,
        transition: hovered ? "background 0.08s" : "background 0.5s",
      }} />

      {/* Icon box */}
      <div style={{
        width: "48px", height: "48px", borderRadius: "14px",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "14px",
        background: `${barColor}18`,
        border: `1px solid ${barColor}28`,
        transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1) rotate(0deg)",
        boxShadow: hovered ? `0 6px 20px ${barColor}40` : "none",
        transition: "transform 0.35s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s ease",
      }}>
        {icon}
      </div>

      {/* Status with pulsing dot */}
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        fontSize: "9px", fontWeight: 700, letterSpacing: "0.13em",
        textTransform: "uppercase", color: statusColor,
        marginBottom: "4px", fontFamily: "var(--font-body)",
      }}>
        <span style={{
          display: "inline-block", width: "6px", height: "6px", borderRadius: "50%",
          background: barColor, flexShrink: 0,
          animation: hovered ? "cp-s-pulse 1.1s ease-in-out infinite" : "none",
        }} />
        {status}
      </div>

      {/* Title */}
      <div style={{
        fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 700,
        color: titleColor, marginBottom: "6px", letterSpacing: "-0.01em",
      }}>
        {title}
      </div>

      {/* Message */}
      <div style={{
        fontSize: "12px", lineHeight: 1.65, color: msgColor,
        fontFamily: "var(--font-body)", marginBottom: "12px",
      }}>
        {msg}
      </div>

      {/* Token pill */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        fontFamily: "monospace", fontSize: "9px", color: statusColor,
        padding: "4px 10px", borderRadius: "6px",
        background: `${barColor}12`,
        border: `1px solid ${barColor}28`,
        letterSpacing: "0.03em",
      }}>
        {token}
      </div>

      {/* Scenario reveal */}
      <div style={{
        marginTop: "0",
        maxHeight: hovered ? "100px" : "0",
        overflow: "hidden",
        opacity: hovered ? 1 : 0,
        transition: "max-height 0.45s cubic-bezier(0.34,1.1,0.64,1), opacity 0.3s ease 0.1s",
      }}>
        <div style={{
          marginTop: "14px",
          padding: "10px 13px",
          background: `${barColor}0e`,
          borderRadius: "10px",
          border: `1px dashed ${barColor}30`,
        }}>
          <div style={{
            fontSize: "8px", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: statusColor,
            marginBottom: "6px", fontFamily: "var(--font-body)",
          }}>
            {scenario.label}
          </div>
          {scenario.lines.map((line, i) => (
            <div key={i} style={{
              fontSize: "11px", color: msgColor,
              fontFamily: "var(--font-body)", lineHeight: 1.5,
              opacity: 1 - i * 0.2,
            }}>
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Mood emoji */}
      <div style={{
        position: "absolute", top: "14px", right: "14px",
        fontSize: "22px",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1) rotate(0deg)" : "scale(0.3) rotate(-35deg)",
        transition: "opacity 0.25s ease 0.05s, transform 0.4s cubic-bezier(0.34,1.2,0.64,1)",
      }}>
        {mood}
      </div>
    </div>
  );
}

function SemanticCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <SemCard
        bg="#f0fdf4" border="#bbf7d0" barColor="#2f7a51"
        status="✓ Success" statusColor="#2f7a51" title="Operation completed" titleColor="#14532d"
        msg="Your changes have been saved." msgColor="#166534" token="#2F7A51 · --color-success"
        mood="🌱"
        scenario={{ label: "When to use", lines: ["Form saves, confirmations, positive outcomes.", "Use sparingly — reserve for genuine success."] }}
        icon={
          <svg width="44" height="44" viewBox="0 0 44 44" overflow="visible">
            <circle className="cp-s-ring" cx="22" cy="22" r="13" fill="rgba(47,122,81,.1)" stroke="#2f7a51" strokeWidth="1.5"/>
            <polyline className="cp-s-check" points="15,22 19,26 29,16" fill="none" stroke="#2f7a51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      />
      <SemCard
        bg="#fffbeb" border="#fde68a" barColor="#c27c00"
        status="⚠ Warning" statusColor="#c27c00" title="Review required" titleColor="#78350f"
        msg="Some fields need attention." msgColor="#92400e" token="#C27C00 · --color-warning"
        mood="⚡"
        scenario={{ label: "When to use", lines: ["Validation errors, risky actions, expiring states.", "User action required but not yet blocking."] }}
        icon={
          <svg width="44" height="44" viewBox="0 0 44 44" overflow="visible">
            <g className="cp-w-tri">
              <polygon points="22,8 36,34 8,34" fill="rgba(194,124,0,.1)" stroke="#c27c00" strokeWidth="1.8" strokeLinejoin="round"/>
              <line className="cp-w-ex" x1="22" y1="18" x2="22" y2="26" stroke="#c27c00" strokeWidth="2.5" strokeLinecap="round"/>
              <circle className="cp-w-ex" cx="22" cy="30" r="1.5" fill="#c27c00"/>
            </g>
          </svg>
        }
      />
      <SemCard
        bg="#fef2f2" border="#fecaca" barColor="#b84040"
        status="✕ Destructive" statusColor="#b84040" title="Action failed" titleColor="#7f1d1d"
        msg="Please try again or contact support." msgColor="#991b1b" token="#B84040 · --color-destructive"
        mood="🚨"
        scenario={{ label: "When to use", lines: ["Errors, deletions, irreversible operations.", "Always pair with clear recovery guidance."] }}
        icon={
          <svg width="44" height="44" viewBox="0 0 44 44" overflow="visible">
            <circle className="cp-d-r1" cx="22" cy="22" r="8" fill="none" stroke="rgba(184,64,64,.5)" strokeWidth="1.5"/>
            <circle className="cp-d-r2" cx="22" cy="22" r="8" fill="none" stroke="rgba(184,64,64,.3)" strokeWidth="1"/>
            <g className="cp-d-icon">
              <circle cx="22" cy="22" r="11" fill="rgba(184,64,64,.1)" stroke="#b84040" strokeWidth="1.8"/>
              <line x1="17" y1="17" x2="27" y2="27" stroke="#b84040" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="27" y1="17" x2="17" y2="27" stroke="#b84040" strokeWidth="2.5" strokeLinecap="round"/>
            </g>
          </svg>
        }
      />
      <SemCard
        bg="#eff6ff" border="#bfdbfe" barColor="#3b82f6"
        status="ℹ Info" statusColor="#3b82f6" title="Info available" titleColor="#1e3a8a"
        msg="New features are live in this release." msgColor="#1d4ed8" token="#3B82F6 · --color-info"
        mood="💡"
        scenario={{ label: "When to use", lines: ["Announcements, tips, neutral system messages.", "Low urgency — never competes with warnings."] }}
        icon={
          <svg width="44" height="44" viewBox="0 0 44 44" overflow="visible">
            <g className="cp-i-orbit">
              <circle cx="22" cy="7"  r="3"   fill="rgba(59,130,246,.5)"/>
              <circle cx="37" cy="22" r="2"   fill="rgba(59,130,246,.35)"/>
            </g>
            <g className="cp-i-core">
              <circle cx="22" cy="22" r="11"  fill="rgba(59,130,246,.1)" stroke="#3b82f6" strokeWidth="1.8"/>
              <circle cx="22" cy="17" r="1.5" fill="#3b82f6"/>
              <line x1="22" y1="21" x2="22" y2="28" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
            </g>
          </svg>
        }
      />
    </div>
  );
}

/* ── Animated Spectrum Bar ────────────────────────────────────────────── */
const SPECTRUM = ["#f7f4ee","#ffffff","#fcfaf6","#142235","#31445e","#6c7a8c","#c89b3c","#af842d","#d8d0c2","#2f7a51","#c27c00","#b84040","#3b82f6"];

function SpectrumBar() {
  return (
    <div style={{ marginBottom: "48px" }}>
      <div style={{
        height: "8px", borderRadius: "4px",
        background: `linear-gradient(to right, ${SPECTRUM.join(",")})`,
        backgroundSize: "200% 100%",
        animation: "cp-aurora 8s ease infinite",
        opacity: 0.9,
        boxShadow: "0 2px 12px rgba(200,155,60,0.2)",
      }} />
    </div>
  );
}

/* ── Color Mood Strip ─────────────────────────────────────────────────── */
function MoodStrip() {
  const moods = [
    { color: "#142235", emoji: "🌃", word: "Authority" },
    { color: "#c89b3c", emoji: "✨", word: "Trust" },
    { color: "#2f7a51", emoji: "🌱", word: "Growth" },
    { color: "#3b82f6", emoji: "💧", word: "Clarity" },
    { color: "#b84040", emoji: "🔥", word: "Urgency" },
    { color: "#c27c00", emoji: "⚡", word: "Caution" },
  ];
  const [active, setActive] = useState<number | null>(null);
  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "56px" }}>
      {moods.map((m, i) => (
        <div
          key={m.color}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          style={{
            flex: active === i ? 3 : 1,
            height: "80px",
            borderRadius: "14px",
            background: m.color,
            display: "flex",
            alignItems: "center",
            justifyContent: active === i ? "flex-start" : "center",
            padding: active === i ? "0 20px" : "0",
            cursor: "default",
            overflow: "hidden",
            transition: "flex 0.4s cubic-bezier(0.34,1.1,0.64,1)",
            boxShadow: active === i ? `0 8px 24px ${m.color}66` : "none",
          }}
        >
          <span style={{ fontSize: active === i ? "24px" : "20px", transition: "font-size 0.2s", flexShrink: 0 }}>{m.emoji}</span>
          {active === i && (
            <span style={{
              marginLeft: "12px",
              fontFamily: "var(--font-heading)",
              fontSize: "16px",
              fontWeight: 700,
              color: "#fff",
              whiteSpace: "nowrap",
              opacity: active === i ? 1 : 0,
              transition: "opacity 0.2s 0.1s",
            }}>{m.word}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────── */
export default function ColorPalette() {
  return (
    <section id="colors" style={{ background: "var(--color-surface-elevated)" }}>

      {/* ── Hero banner with aurora + floating bubbles ── */}
      <div
        className="cp-aurora-bg"
        style={{
          padding: "72px 48px 64px",
          position: "relative",
          overflow: "hidden",
          minHeight: "420px",
        }}
      >
        {/* Floating color bubbles */}
        <Bubble hex="#F2C94C" size={80}  left="8%"  delay="0s"   duration="7s"  />
        <Bubble hex="#3b82f6" size={50}  left="22%" delay="1.5s" duration="9s"  />
        <Bubble hex="#2f7a51" size={65}  left="40%" delay="0.8s" duration="11s" />
        <Bubble hex="#b84040" size={40}  left="60%" delay="2.2s" duration="8s"  />
        <Bubble hex="#c27c00" size={55}  left="75%" delay="1s"   duration="10s" />
        <Bubble hex="#F2C94C" size={35}  left="88%" delay="3s"   duration="6s"  />
        <Bubble hex="#0A1A33" size={90}  left="50%" delay="4s"   duration="14s" />
        <Bubble hex="#3b82f6" size={28}  left="15%" delay="5s"   duration="8s"  />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.25)", borderRadius: "100px", padding: "5px 14px", marginBottom: "20px" }}>
            <Sparkles size={12} strokeWidth={2} color="#F2C94C" />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#F2C94C", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
              Color System
            </span>
          </div>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 16px 0", maxWidth: "640px" }}>
            Color is the first thing felt.
            <br />
            <span style={{ color: "#F2C94C" }}>And the last thing noticed.</span>
          </h2>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: "0 0 40px 0", maxWidth: "560px" }}>
            Every token has a psychological job. Backgrounds layer depth. Text creates hierarchy.
            The accent directs attention. Semantic colors communicate state before a word is read.
          </p>

          {/* Animated swatch pills */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Backgrounds", accent: "#c89b3c", colors: ["#f7f4ee","#ffffff","#fcfaf6"] },
              { label: "Text",        accent: "#3b82f6", colors: ["#142235","#31445e","#6c7a8c"] },
              { label: "Brand",       accent: "#c89b3c", colors: ["#c89b3c","#af842d","#d8d0c2"] },
              { label: "Semantic",    accent: "#2f7a51", colors: ["#2f7a51","#c27c00","#b84040","#3b82f6"] },
            ].map((g) => (
              <div key={g.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: g.accent, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body)", minWidth: "90px" }}>
                  {g.label}
                </span>
                <div style={{ display: "flex", gap: "6px" }}>
                  {g.colors.map((c) => (
                    <div
                      key={c}
                      title={c}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.35) translateY(-3px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${c}99`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                      style={{ width: "32px", height: "32px", borderRadius: "8px", background: c, border: "2px solid rgba(255,255,255,0.1)", transition: "transform 0.18s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.18s", cursor: "default", flexShrink: 0 }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "64px 48px 96px", maxWidth: "960px", margin: "0 auto" }}>

        <SpectrumBar />

        {/* Color Orbit */}
        <ColorOrbit />

        {/* Mood strip */}
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6c7a8c", marginBottom: "8px", fontFamily: "var(--font-body)" }}>
            Emotion Map — Hover to expand
          </div>
        </div>
        <MoodStrip />

        <p style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "var(--font-body)", marginBottom: "56px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Copy size={12} strokeWidth={2} />
          Click any brand swatch to copy its hex value
        </p>

        <Sec label="Backgrounds" title="Layered surfaces create depth without shadow." sub="Hover to peel the layers apart." delay={0}>
          <BgPeelDemo />
        </Sec>

        <Sec label="Text Hierarchy" title="Contrast is not just visual — it's cognitive." sub="Hover each row to feel the weight difference." delay={0.05}>
          <TextHierarchyDemo />
        </Sec>

        <Sec label="Brand Palette" title="Three colors. One unmistakable identity." sub="Patterns embedded in each swatch show the token's structural role." delay={0.1}>
          <BrandSwatches />
        </Sec>

        <Sec label="Semantic Colors" title="State before language." sub="Each color carries a universal meaning — hover to reveal the emotion." delay={0.15}>
          <SemanticCards />
        </Sec>

      </div>
    </section>
  );
}
