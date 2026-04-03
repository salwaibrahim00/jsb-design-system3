"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";
import {
  Zap, BookOpen, ChevronRight, Shield, Trash2, Lock,
  Download, Search, Send, FilePen, X, MousePointer,
  ArrowRight, RefreshCw, Bell,
} from "lucide-react";

/* ── Base styles ──────────────────────────────────────────────────────── */
const BASE: React.CSSProperties = {
  borderRadius: "10px",
  fontWeight: 600,
  fontFamily: "var(--font-body)",
  letterSpacing: "0.01em",
  cursor: "pointer",
  border: "1px solid transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "7px",
  lineHeight: 1,
  transition: "all 0.18s ease",
};

/* ── Variant data ─────────────────────────────────────────────────────── */
const VARIANTS = [
  {
    rank: 1, label: "Primary", example: "Get Started",
    Icon: Zap,
    style:  { background: "#F2C94C", color: "#0A1A33", boxShadow: "0 4px 14px rgba(242,201,76,0.35)" },
    hover:  { background: "#e6bc3a", boxShadow: "0 8px 24px rgba(242,201,76,0.45)", transform: "translateY(-2px)" },
    cardBg: "#fdf8ec", cardBorder: "#e8d9a0", rankColor: "#c89b3c",
    intent: "The dominant action. One per view — overuse destroys hierarchy.",
    rule:   "Never use two side by side.",
  },
  {
    rank: 2, label: "Secondary", example: "Save Draft",
    Icon: BookOpen,
    style:  { background: "#fff", color: "#0A1A33", border: "1.5px solid rgba(20,34,53,0.18)" },
    hover:  { background: "#f3f4f6", transform: "translateY(-1px)", boxShadow: "0 4px 12px rgba(20,34,53,0.1)" },
    cardBg: "#fff", cardBorder: "#d8d0c2", rankColor: "#6c7a8c",
    intent: "Supporting action. Pairs with Primary to offer an alternative without competing.",
    rule:   "Always partner, never lead.",
  },
  {
    rank: 3, label: "Ghost", example: "Cancel",
    Icon: ChevronRight,
    style:  { background: "transparent", color: "#4b5563" },
    hover:  { background: "rgba(20,34,53,0.05)", color: "#142235" },
    cardBg: "#fafaf9", cardBorder: "#e5e7eb", rankColor: "#9ca3af",
    intent: "Lowest visual weight. Used for tertiary actions like Cancel or Learn more.",
    rule:   "Steps back, never competes.",
  },
  {
    rank: 4, label: "Dark", example: "Learn More",
    Icon: Shield,
    style:  { background: "#0A1A33", color: "#fff" },
    hover:  { background: "#142235", transform: "translateY(-1px)", boxShadow: "0 8px 20px rgba(10,26,51,0.28)" },
    cardBg: "#f0f2f5", cardBorder: "#cbd5e1", rankColor: "#0A1A33",
    intent: "Brand authority. Used on light backgrounds when Primary feels too loud.",
    rule:   "Commands without gold.",
  },
  {
    rank: 5, label: "Destructive", example: "Delete File",
    Icon: Trash2,
    style:  { background: "#b84040", color: "#fff", boxShadow: "0 4px 12px rgba(184,64,64,0.2)" },
    hover:  { background: "#a23434", boxShadow: "0 6px 18px rgba(184,64,64,0.35)", transform: "translateY(-1px)" },
    cardBg: "#fef2f2", cardBorder: "#fecaca", rankColor: "#b84040",
    intent: "Signals irreversible action. Always paired with a confirmation step.",
    rule:   "Never use for reversible actions.",
  },
  {
    rank: 6, label: "Disabled", example: "Restricted",
    Icon: Lock,
    style:  { background: "#e5e7eb", color: "#9ca3af", cursor: "not-allowed", boxShadow: "none" },
    hover:  {},
    cardBg: "#f9fafb", cardBorder: "#e5e7eb", rankColor: "#d1d5db",
    intent: "Communicates unavailability. Never hide — disable so users understand why.",
    rule:   "Always visible, never hidden.",
    disabled: true,
  },
] as const;

const SIZES = [
  { label: "Small",   padding: "8px 14px",  fontSize: "12px", spec: "8px 14px · 12px" },
  { label: "Default", padding: "11px 20px", fontSize: "14px", spec: "11px 20px · 14px" },
  { label: "Large",   padding: "15px 28px", fontSize: "16px", spec: "15px 28px · 16px" },
];

/* ── Generic hover button ─────────────────────────────────────────────── */
function Btn({ v, pad, fs, children, pill }: {
  v: typeof VARIANTS[number]; pad: string; fs: string;
  children: React.ReactNode; pill?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      disabled={v.disabled as boolean | undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...BASE, ...v.style, ...(hov && !v.disabled ? v.hover : {}), padding: pad, fontSize: fs, borderRadius: pill ? "999px" : "10px" }}
    >
      {children}
    </button>
  );
}

/* ── Visual weight + glow per variant ─────────────────────────────────── */
const BUTTON_META: Record<string, { weight: number; glow: string }> = {
  Primary:     { weight: 5, glow: "rgba(242,201,76,0.55)"  },
  Secondary:   { weight: 4, glow: "rgba(20,34,53,0.22)"    },
  Ghost:       { weight: 2, glow: "rgba(75,85,99,0.14)"    },
  Dark:        { weight: 4, glow: "rgba(10,26,51,0.52)"    },
  Destructive: { weight: 3, glow: "rgba(184,64,64,0.52)"   },
  Disabled:    { weight: 1, glow: "rgba(100,100,100,0.06)" },
};

/* ── Variant card ─────────────────────────────────────────────────────── */
function VarCard({ v }: { v: typeof VARIANTS[number] }) {
  const [hov, setHov] = useState(false);
  const { Icon } = v;
  const meta = BUTTON_META[v.label] ?? { weight: 3, glow: "rgba(20,34,53,0.2)" };

  // Deterministic gold dot stars (tiny glowing circles)
  const dots = Array.from({ length: 10 }, (_, i) => ({
    left:    `${((i * 41 + v.rank * 17) % 82) + 7}%`,
    top:     `${((i * 59 + v.rank * 23) % 76) + 6}%`,
    size:    ((i * 3 + v.rank) % 3) + 1,
    opacity: 0.16 + ((i * 7 + v.rank) % 5) * 0.07,
    delay:   `${(i * 0.06).toFixed(2)}s`,
  }));

  // Larger decorative ★ characters
  const bigStars = Array.from({ length: 4 }, (_, i) => ({
    left:    `${((i * 67 + v.rank * 29) % 72) + 12}%`,
    top:     `${((i * 43 + v.rank * 11) % 72) + 5}%`,
    size:    ((i * 4 + v.rank) % 4) + 6,
    opacity: 0.09 + i * 0.04,
  }));

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: "18px", overflow: "hidden",
        border: `1px solid ${v.cardBorder}`,
        transform: hov ? "translateY(-7px) scale(1.025)" : "translateY(0) scale(1)",
        boxShadow: hov
          ? `0 22px 52px rgba(20,34,53,0.15), 0 0 0 1px ${v.cardBorder}`
          : "0 2px 10px rgba(20,34,53,0.06)",
        transition: "transform 0.35s cubic-bezier(0.34,1.1,0.64,1), box-shadow 0.35s ease",
        cursor: "default",
      }}
    >
      {/* ── Dark stage (top) ── */}
      <div style={{ background: "#06101e", padding: "28px 20px 26px", position: "relative", overflow: "hidden" }}>

        {/* Diagonal gold stripes */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(45deg, transparent 0px, transparent 22px, rgba(200,155,60,0.07) 22px, rgba(200,155,60,0.07) 24px)",
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(45deg, transparent 0px, transparent 22px, rgba(200,155,60,0.09) 22px, rgba(200,155,60,0.09) 24px)",
          opacity: hov ? 1 : 0, transition: "opacity 0.4s ease",
        }} />

        {/* Tiny gold glowing dots */}
        {dots.map((d, i) => (
          <div key={i} style={{
            position: "absolute", left: d.left, top: d.top,
            width: d.size, height: d.size, borderRadius: "50%",
            background: "#F2C94C",
            boxShadow: `0 0 ${d.size * 3}px rgba(242,201,76,0.8)`,
            opacity: hov ? Math.min(d.opacity * 2.2, 0.85) : d.opacity,
            transition: `opacity ${0.28 + i * 0.04}s ease`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Big ★ characters */}
        {bigStars.map((s, i) => (
          <div key={i} style={{
            position: "absolute", left: s.left, top: s.top,
            fontSize: s.size, color: "#F2C94C",
            textShadow: hov ? `0 0 ${s.size * 2}px rgba(242,201,76,0.9)` : "none",
            opacity: hov ? s.opacity * 3.5 : s.opacity,
            transition: `opacity ${0.35 + i * 0.08}s ease, text-shadow ${0.35 + i * 0.08}s ease`,
            pointerEvents: "none", lineHeight: 1, userSelect: "none",
          }}>★</div>
        ))}

        {/* Rank pill — top right */}
        <div style={{
          position: "absolute", top: "12px", right: "12px", zIndex: 2,
          padding: "3px 8px", borderRadius: "100px",
          background: "rgba(200,155,60,0.12)",
          border: "1px solid rgba(200,155,60,0.28)",
          fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em",
          color: "rgba(200,155,60,0.8)", fontFamily: "monospace",
        }}>
          #{v.rank}
        </div>

        {/* Button + glow halo */}
        <div style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            borderRadius: "14px",
            boxShadow: hov ? `0 0 40px ${meta.glow}, 0 8px 28px ${meta.glow}` : "none",
            transition: "box-shadow 0.4s ease",
          }}>
            <Btn v={v} pad="11px 22px" fs="14px">
              <Icon size={14} strokeWidth={2.2} />
              {v.example}
            </Btn>
          </div>
        </div>
      </div>

      {/* ── Gold divider strip ── */}
      <div style={{
        height: "2px",
        background: hov
          ? "linear-gradient(90deg,transparent 0%,rgba(242,201,76,0.55) 25%,rgba(242,201,76,0.9) 50%,rgba(242,201,76,0.55) 75%,transparent 100%)"
          : "linear-gradient(90deg,transparent 0%,rgba(242,201,76,0.12) 30%,rgba(242,201,76,0.25) 50%,rgba(242,201,76,0.12) 70%,transparent 100%)",
        transition: "background 0.45s ease",
        boxShadow: hov ? "0 0 10px rgba(242,201,76,0.35)" : "none",
      }} />

      {/* ── Light info (bottom) ── */}
      <div style={{ background: v.cardBg, padding: "16px 20px 20px" }}>
        {/* Star rating + label */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px", marginBottom: "10px" }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{
              fontSize: "12px",
              color: i < meta.weight ? "#F2C94C" : "rgba(200,155,60,0.14)",
              textShadow: i < meta.weight ? "0 0 7px rgba(242,201,76,0.6)" : "none",
              lineHeight: 1,
            }}>★</span>
          ))}
          <span style={{
            fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
            color: v.rankColor, fontFamily: "var(--font-body)", fontWeight: 700,
            marginLeft: "8px",
          }}>{v.label}</span>
        </div>
        {/* Intent */}
        <div style={{
          fontFamily: "var(--font-heading)", fontSize: "13px", fontWeight: 700,
          color: "#142235", lineHeight: 1.45, marginBottom: "6px",
        }}>{v.intent}</div>
        {/* Rule */}
        <div style={{ fontSize: "10px", color: "#6c7a8c", fontStyle: "italic", fontFamily: "var(--font-body)" }}>
          ↳ {v.rule}
        </div>
      </div>
    </div>
  );
}

/* ── Loading button ───────────────────────────────────────────────────── */
function LoadingBtn() {
  const [loading, setLoading] = useState(false);
  const [hov, setHov] = useState(false);
  const v = VARIANTS[0];
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2200); }}
      style={{ ...BASE, ...v.style, ...(hov ? v.hover : {}), padding: "11px 20px", fontSize: "14px", minWidth: "140px", opacity: loading ? 0.85 : 1 }}
    >
      {loading ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" style={{ animation: "spin 0.8s linear infinite" }}>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <circle cx="12" cy="12" r="10" stroke="#0A1A33" strokeWidth="3" fill="none" strokeDasharray="40" strokeDashoffset="10" />
          </svg>
          Saving…
        </>
      ) : (
        <><RefreshCw size={13} strokeWidth={2.2} />Click to Load</>
      )}
    </button>
  );
}

/* ── Animated toggle ──────────────────────────────────────────────────── */
function Toggle({ onColor, off = false, disabled = false }: { onColor: string; off?: boolean; disabled?: boolean }) {
  const [on, setOn] = useState(!off);
  return (
    <button
      onClick={() => !disabled && setOn(v => !v)}
      style={{ position: "relative", width: "52px", height: "28px", borderRadius: "999px", background: on ? onColor : "#d1d5db", border: "none", cursor: disabled ? "not-allowed" : "pointer", padding: 0, opacity: disabled ? 0.4 : 1, transition: "background 0.3s, box-shadow 0.3s", boxShadow: on ? `0 0 12px ${onColor}66` : "none" }}
    >
      <span style={{ position: "absolute", top: "2px", left: on ? "26px" : "2px", width: "24px", height: "24px", borderRadius: "50%", background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.22)", transition: "left 0.38s cubic-bezier(0.34,1.56,0.64,1)" }} />
    </button>
  );
}

const TOGGLES = [
  { label: "Active",  note: "Jitter green",    color: "#00d12a", IconEl: <Bell size={12} color="#00d12a" /> },
  { label: "Gold",    note: "Brand gold",       color: "#F2C94C", IconEl: <Zap size={12} color="#F2C94C" /> },
  { label: "Royal",   note: "Indigo",           color: "#6366f1", IconEl: <Shield size={12} color="#6366f1" /> },
  { label: "Danger",  note: "Destructive state",color: "#ef4444", IconEl: <Trash2 size={12} color="#ef4444" /> },
];

/* ── Animated gradient ripple ─────────────────────────────────────────── */
/* four shapes — parallelogram / cut-corner / hexagon / forward-arrow */
type RShape = "para" | "cut" | "hex" | "arrow";

const RIPPLE_BTNS: Array<{
  label: string; gradient: string; glow: string; text: string;
  Icon: typeof Zap; note: string; shape: RShape; dark: string;
}> = [
  { label: "Get Started", gradient: "linear-gradient(135deg,#c7b5f1,#493675,#6e0082)", glow: "rgba(110,0,130,0.45)",  text: "#fff",    Icon: Zap,       note: "Original",      shape: "para",  dark: "#3b0059" },
  { label: "Book a Call",  gradient: "linear-gradient(135deg,#F2C94C,#d97706,#b45309)", glow: "rgba(242,201,76,0.5)",  text: "#0A1A33", Icon: Bell,      note: "Brand gold",    shape: "cut",   dark: "#7c4508" },
  { label: "Learn More",   gradient: "linear-gradient(135deg,#60a5fa,#6366f1,#7c3aed)", glow: "rgba(99,102,241,0.45)", text: "#fff",    Icon: BookOpen,  note: "Ocean → Royal", shape: "hex",   dark: "#3730a3" },
  { label: "Get Access",   gradient: "linear-gradient(135deg,#34d399,#059669,#065f46)", glow: "rgba(5,150,105,0.45)",  text: "#fff",    Icon: ArrowRight,note: "Emerald",       shape: "arrow", dark: "#064e3b" },
];

const SHAPE_CLIP: Record<RShape, string> = {
  para:  "polygon(9% 0%, 100% 0%, 91% 100%, 0% 100%)",
  cut:   "polygon(0% 0%, 100% 0%, 100% 52%, 78% 100%, 0% 100%)",
  hex:   "polygon(0% 50%, 13% 0%, 87% 0%, 100% 50%, 87% 100%, 13% 100%)",
  arrow: "polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)",
};

const SHAPE_PAD: Record<RShape, { lg: string; sm: string }> = {
  para:  { lg: "14px 46px",         sm: "8px 26px"         },
  cut:   { lg: "14px 38px 22px 38px", sm: "8px 22px 15px 22px" },
  hex:   { lg: "14px 48px",         sm: "8px 28px"         },
  arrow: { lg: "14px 48px 14px 36px", sm: "8px 28px 8px 18px" },
};

function RippleBtn({ label, gradient, glow, text, Icon: BtnIcon, size = "md", shape, dark }: {
  label: string; gradient: string; glow: string; text: string;
  Icon: typeof Zap; size?: "sm" | "md" | "lg"; shape?: RShape; dark?: string;
}) {
  const [hov, setHov] = useState(false);
  const padSpec = shape ? SHAPE_PAD[shape] : null;
  const pad = padSpec
    ? (size === "lg" ? padSpec.lg : padSpec.sm)
    : (size === "lg" ? "14px 36px" : size === "sm" ? "8px 18px" : "12px 26px");
  const fs     = size === "lg" ? "16px" : size === "sm" ? "12px" : "14px";
  const iconSz = size === "lg" ? 15 : 12;
  const clip   = shape ? SHAPE_CLIP[shape] : undefined;

  /* 3D pop-out: drop-shadow follows clip-path boundary */
  const vy     = hov ? "3px"  : "7px";
  const vblur  = hov ? "2px"  : "0px";
  const darkShadow = dark ? `drop-shadow(0 ${vy} ${vblur} ${dark})` : "";
  const glowShadow = hov && dark ? ` drop-shadow(0 10px 20px ${glow})` : "";
  const filterVal  = darkShadow ? darkShadow + glowShadow : (hov ? `drop-shadow(0 10px 24px ${glow})` : "none");

  return (
    <div style={{
      display: "inline-block",
      filter: filterVal,
      transform: hov ? "translateY(4px)" : "translateY(-5px)",
      transition: "transform 0.24s cubic-bezier(0.34,1.2,0.64,1), filter 0.24s ease",
    }}>
      <button
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          ...BASE, position: "relative", overflow: "hidden",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.16)",
          color: hov ? text : "rgba(255,255,255,0.88)",
          padding: pad, fontSize: fs,
          borderRadius: "0",
          clipPath: clip,
          boxShadow: "none",
          transition: "color 0.25s ease",
          cursor: "pointer",
        }}
      >
        <span aria-hidden style={{
          position: "absolute", inset: 0,
          background: gradient,
          clipPath: hov ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
          transition: "clip-path 0.55s cubic-bezier(0.34,1.56,0.64,1)",
          zIndex: 0,
        }} />
        <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: "7px" }}>
          <BtnIcon size={iconSz} strokeWidth={2.2} />
          {label}
        </span>
      </button>
    </div>
  );
}

/* ── Gradient fill button ─────────────────────────────────────────────── */
const GRAD_FILLS = [
  { label: "Gold",    from: "#F2C94C", to: "#d97706", text: "#0A1A33", shadow: "rgba(242,201,76,0.45)",  Icon: Zap        },
  { label: "Royal",   from: "#a78bfa", to: "#6366f1", text: "#fff",    shadow: "rgba(99,102,241,0.4)",   Icon: Shield     },
  { label: "Emerald", from: "#34d399", to: "#059669", text: "#fff",    shadow: "rgba(5,150,105,0.4)",    Icon: ArrowRight },
  { label: "Sunset",  from: "#fbbf24", to: "#ef4444", text: "#fff",    shadow: "rgba(249,115,22,0.4)",   Icon: Bell       },
  { label: "Ocean",   from: "#38bdf8", to: "#6366f1", text: "#fff",    shadow: "rgba(56,189,248,0.38)",  Icon: BookOpen   },
  { label: "Rose",    from: "#fb7185", to: "#db2777", text: "#fff",    shadow: "rgba(219,39,119,0.38)",  Icon: MousePointer },
];

function GradFill({ label, from, to, text, shadow, Icon: GIcon, pill = false }: {
  label: string; from: string; to: string; text: string; shadow: string;
  Icon: typeof Zap; pill?: boolean;
}) {
  const [hov, setHov] = useState(false);

  if (!pill) {
    /* ── Circle orb — floating, 3D pop-out ── */
    return (
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "inline-flex", flexDirection: "column",
          alignItems: "center", gap: "10px", cursor: "pointer",
          /* outer wrapper carries the float + drop-shadow */
          filter: hov
            ? `drop-shadow(0 4px 2px ${to}) drop-shadow(0 10px 22px ${shadow})`
            : `drop-shadow(0 10px 0px ${to}) drop-shadow(0 4px 10px ${shadow})`,
          transform: hov ? "translateY(7px)" : "translateY(-7px)",
          transition: "transform 0.3s cubic-bezier(0.34,1.2,0.64,1), filter 0.3s ease",
        }}
      >
        <button style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: `linear-gradient(145deg,${from},${to})`,
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: text,
          filter: hov ? "brightness(1.12)" : "brightness(1)",
          transition: "filter 0.22s ease",
        }}>
          <GIcon size={28} strokeWidth={2} />
        </button>
        <span style={{
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: to,
          fontFamily: "var(--font-body)",
        }}>{label}</span>
      </div>
    );
  }

  /* ── Hexagon chip — different shape for the second row ── */
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-block",
        filter: hov
          ? `drop-shadow(0 3px 2px ${to}) drop-shadow(0 8px 18px ${shadow})`
          : `drop-shadow(0 8px 0px ${to}) drop-shadow(0 3px 8px ${shadow})`,
        transform: hov ? "translateY(5px)" : "translateY(-5px)",
        transition: "transform 0.28s cubic-bezier(0.34,1.2,0.64,1), filter 0.28s ease",
      }}
    >
      <button style={{
        fontFamily: "var(--font-body)", fontWeight: 700,
        letterSpacing: "0.02em", cursor: "pointer",
        background: `linear-gradient(135deg,${from},${to})`,
        color: text, border: "none",
        padding: "11px 30px",
        fontSize: "14px",
        clipPath: "polygon(0% 50%, 13% 0%, 87% 0%, 100% 50%, 87% 100%, 13% 100%)",
        display: "inline-flex", alignItems: "center", gap: "7px",
        filter: hov ? "brightness(1.1)" : "brightness(1)",
        transition: "filter 0.22s ease",
      }}>
        <GIcon size={13} strokeWidth={2.2} />
        {label}
      </button>
    </div>
  );
}

/* ── Gradient outline button ──────────────────────────────────────────── */
const GRAD_OUTLINES = [
  { label: "Gold",    from: "#F2C94C", to: "#d97706", text: "#b45309", Icon: Zap     },
  { label: "Royal",   from: "#a78bfa", to: "#6366f1", text: "#6366f1", Icon: Shield  },
  { label: "Ocean",   from: "#38bdf8", to: "#818cf8", text: "#0ea5e9", Icon: BookOpen },
  { label: "Emerald", from: "#34d399", to: "#059669", text: "#059669", Icon: ArrowRight },
];

function GradOutline({ label, from, to, text, Icon: OIcon, pill = false }: {
  label: string; from: string; to: string; text: string;
  Icon: typeof Zap; pill?: boolean;
}) {
  const [hov, setHov] = useState(false);
  const br = pill ? "999px" : "12px";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", padding: "2px", borderRadius: br,
        background: `linear-gradient(135deg,${from},${to})`,
        /* neon tube glow — intensifies on hover */
        boxShadow: hov
          ? `0 0 6px ${from}cc, 0 0 18px ${from}88, 0 0 40px ${from}44, 0 0 70px ${from}22, 0 6px 20px rgba(0,0,0,0.5)`
          : `0 0 4px ${from}66, 0 0 12px ${from}33`,
        transition: "box-shadow 0.4s ease",
        cursor: "pointer",
      }}
    >
      <button style={{
        ...BASE,
        background: hov ? `linear-gradient(135deg,${from}28,${to}28)` : "#060d18",
        color: hov ? "#fff" : from,
        border: "none", borderRadius: `calc(${br} - 2px)`,
        padding: "10px 22px", fontSize: "14px", gap: "7px",
        textShadow: hov ? `0 0 12px ${from}` : "none",
        transition: "background 0.35s ease, color 0.25s ease, text-shadow 0.35s ease",
        letterSpacing: "0.02em",
      }}>
        <OIcon size={13} strokeWidth={2.2} />
        {label}
      </button>
    </div>
  );
}

/* ── States showcase — dark arsenal grid ──────────────────────────────── */
const STATE_ITEMS = [
  { label: "Loading State",   sub: "Async feedback",      glow: "rgba(242,201,76,0.5)",   render: () => <LoadingBtn /> },
  { label: "Icon + Text",     sub: "Primary action",      glow: "rgba(242,201,76,0.5)",   render: () => <Btn v={VARIANTS[0]} pad="11px 20px" fs="14px"><Download size={13} strokeWidth={2.2} />Download</Btn> },
  { label: "Icon Only",       sub: "Compact slot",        glow: "rgba(20,34,53,0.55)",    render: () => <Btn v={VARIANTS[1]} pad="11px" fs="14px"><Search size={15} strokeWidth={2} /></Btn> },
  { label: "Dark CTA",        sub: "Authority action",    glow: "rgba(10,26,51,0.6)",     render: () => <Btn v={VARIANTS[3]} pad="11px 20px" fs="14px"><ArrowRight size={13} strokeWidth={2.2} />Get started</Btn> },
  { label: "Destructive",     sub: "Irreversible action", glow: "rgba(184,64,64,0.58)",   render: () => <Btn v={VARIANTS[4]} pad="11px 20px" fs="14px"><Trash2 size={13} strokeWidth={2.2} />Delete</Btn> },
  { label: "Disabled",        sub: "Unavailable state",   glow: "rgba(100,100,100,0.12)", render: () => <Btn v={VARIANTS[5]} pad="11px 20px" fs="14px"><Lock size={13} strokeWidth={2.2} />Restricted</Btn> },
] as const;

function StateTile({ item }: { item: typeof STATE_ITEMS[number] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: "14px", padding: "22px 16px",
        border: `1px solid ${hov ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.05)"}`,
        background: hov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
        position: "relative", overflow: "hidden",
        transform: hov ? "translateY(-7px)" : "translateY(0)",
        transition: "transform 0.32s cubic-bezier(0.34,1.1,0.64,1), border-color 0.3s, background 0.3s",
        cursor: "default",
      }}
    >
      {/* Radial glow orb behind the button */}
      <div style={{
        position: "absolute", width: "160px", height: "160px", borderRadius: "50%",
        top: "50%", left: "50%", transform: "translate(-50%, -55%)",
        background: `radial-gradient(circle, ${item.glow} 0%, transparent 70%)`,
        opacity: hov ? 1 : 0.35,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />
      {/* State label */}
      <div style={{
        fontSize: "8px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)",
        position: "relative", zIndex: 1,
      }}>{item.label}</div>
      {/* Button */}
      <div style={{ position: "relative", zIndex: 1 }}>{item.render()}</div>
      {/* Sub label */}
      <div style={{
        fontSize: "10px", color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-body)",
        fontStyle: "italic", position: "relative", zIndex: 1,
      }}>{item.sub}</div>
    </div>
  );
}

function StatesShowcase() {
  return (
    <div style={{
      background: "linear-gradient(135deg,#060d18 0%,#0a1428 100%)",
      borderRadius: "20px", marginBottom: "48px",
      padding: "28px 24px",
      position: "relative", overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />
      {/* Corner orbs */}
      <div style={{ position: "absolute", width: "280px", height: "280px", borderRadius: "50%", top: "-80px", right: "-60px", background: "radial-gradient(circle,rgba(242,201,76,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", bottom: "-60px", left: "-40px", background: "radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", position: "relative", zIndex: 1 }}>
        {STATE_ITEMS.map((item) => <StateTile key={item.label} item={item} />)}
      </div>
    </div>
  );
}

/* ── Power console — toggle redesign ──────────────────────────────────── */
function PowerRow({ t }: { t: typeof TOGGLES[number] }) {
  const [live, setLive] = useState(false);
  return (
    <div
      style={{
        borderRadius: "14px", padding: "16px 20px",
        background: live ? `linear-gradient(135deg, ${t.color}10 0%, transparent 100%)` : "rgba(255,255,255,0.02)",
        border: `1px solid ${live ? t.color + "3a" : "rgba(255,255,255,0.07)"}`,
        display: "flex", alignItems: "center", gap: "16px",
        position: "relative", overflow: "hidden",
        transition: "background 0.45s ease, border-color 0.45s ease",
      }}
    >
      {/* Vertical power bar */}
      <div style={{ width: "3px", height: "44px", borderRadius: "2px", background: "rgba(255,255,255,0.08)", flexShrink: 0, overflow: "hidden" }}>
        <div style={{
          width: "100%", height: live ? "100%" : "0%",
          background: t.color, borderRadius: "2px",
          boxShadow: `0 0 8px ${t.color}`,
          transition: "height 0.5s cubic-bezier(0.34,1.2,0.64,1)",
        }} />
      </div>

      {/* Icon + name */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
          <span style={{
            opacity: live ? 1 : 0.4,
            filter: live ? `drop-shadow(0 0 5px ${t.color})` : "none",
            transition: "opacity 0.35s, filter 0.35s",
          }}>{t.IconEl}</span>
          <span style={{
            fontSize: "13px", fontWeight: 700,
            color: live ? "#fff" : "rgba(255,255,255,0.6)",
            fontFamily: "var(--font-body)",
            transition: "color 0.3s",
          }}>{t.label}</span>
        </div>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-body)" }}>
          {t.note} · off / on / disabled
        </div>
      </div>

      {/* Three demo toggles */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Toggle onColor={t.color} off />
        <Toggle onColor={t.color} />
        <Toggle onColor={t.color} disabled />
      </div>

      {/* Live/Off badge — click to toggle row ambience */}
      <button
        onClick={() => setLive(v => !v)}
        style={{
          padding: "5px 12px", borderRadius: "100px", flexShrink: 0,
          background: live ? t.color + "22" : "rgba(255,255,255,0.04)",
          border: `1px solid ${live ? t.color + "55" : "rgba(255,255,255,0.1)"}`,
          fontSize: "8px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
          color: live ? t.color : "rgba(255,255,255,0.25)",
          fontFamily: "var(--font-body)", cursor: "pointer",
          boxShadow: live ? `0 0 12px ${t.color}30` : "none",
          transition: "all 0.4s ease",
        }}
      >
        {live ? "● LIVE" : "○ OFF"}
      </button>
    </div>
  );
}

/* ── Size carousel ────────────────────────────────────────────────────── */
const CAROUSEL_SIZES = [
  { label: "Small",   padding: "8px 14px",  fontSize: "12px", iconSize: 10, spec: "8px · 14px · 12px" },
  { label: "Default", padding: "11px 20px", fontSize: "14px", iconSize: 12, spec: "11px · 20px · 14px" },
  { label: "Large",   padding: "15px 28px", fontSize: "16px", iconSize: 14, spec: "15px · 28px · 16px" },
];

function SizeCarousel() {
  const [active, setActive] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (idx: number) => setActive(((idx % 3) + 3) % 3);

  useEffect(() => {
    timerRef.current = setTimeout(() => go(active + 1), 3200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active]);

  const prev = ((active - 1) + 3) % 3;
  const next = (active + 1) % 3;

  function Slot({ idx, role }: { idx: number; role: "prev" | "active" | "next" }) {
    const s   = CAROUSEL_SIZES[idx];
    const iSz = s.iconSize;
    const isActive = role === "active";
    return (
      <div
        onClick={() => !isActive && go(idx)}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
          flex: isActive ? "1" : "0 0 26%",
          padding: isActive ? "22px 16px" : "16px 8px",
          borderRadius: "14px",
          background: isActive ? "rgba(242,201,76,0.05)" : "transparent",
          border: isActive ? "1px solid rgba(242,201,76,0.22)" : "1px solid transparent",
          boxShadow: isActive ? "0 0 28px rgba(242,201,76,0.08)" : "none",
          transform: isActive ? "scale(1)" : "scale(0.72)",
          opacity: isActive ? 1 : 0.28,
          filter: isActive ? "none" : "blur(1.5px)",
          cursor: isActive ? "default" : "pointer",
          transition: "all 0.42s cubic-bezier(0.34,1.1,0.64,1)",
          pointerEvents: isActive ? "none" : "auto",
          userSelect: "none",
        }}
      >
        {/* Size label + spec */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontFamily: "monospace", fontSize: isActive ? "11px" : "9px",
            fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: isActive ? "#F2C94C" : "#6c7a8c",
            transition: "color 0.35s, font-size 0.35s",
          }}>{s.label}</span>
          {isActive && (
            <span style={{ fontFamily: "monospace", fontSize: "9px", color: "#9ca3af" }}>{s.spec}</span>
          )}
        </div>

        {/* Buttons row */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          <Btn v={VARIANTS[0]} pad={s.padding} fs={s.fontSize}>
            <Zap size={iSz} strokeWidth={2.2} />Primary
          </Btn>
          <Btn v={VARIANTS[1]} pad={s.padding} fs={s.fontSize}>
            <BookOpen size={iSz} strokeWidth={2} />Secondary
          </Btn>
          <Btn v={VARIANTS[2]} pad={s.padding} fs={s.fontSize}>
            <ChevronRight size={iSz} strokeWidth={2} />Ghost
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff", border: "1px solid #d8d0c2", borderRadius: "16px",
      overflow: "hidden", marginBottom: "48px", position: "relative",
      padding: "20px 0 24px",
    }}>
      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "16px" }}>
        {CAROUSEL_SIZES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === active ? "22px" : "6px", height: "6px", borderRadius: "3px",
              background: i === active ? "#F2C94C" : "#d8d0c2",
              border: "none", cursor: "pointer", padding: 0,
              boxShadow: i === active ? "0 0 8px rgba(242,201,76,0.5)" : "none",
              transition: "width 0.35s ease, background 0.35s ease, box-shadow 0.35s ease",
            }}
          />
        ))}
      </div>

      {/* Track — three slots */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 40px", gap: "6px" }}>
        <Slot idx={prev}   role="prev"   />
        <Slot idx={active} role="active" />
        <Slot idx={next}   role="next"   />
      </div>

      {/* Arrow buttons */}
      {(["prev", "next"] as const).map((dir) => (
        <button
          key={dir}
          onClick={() => go(dir === "prev" ? active - 1 : active + 1)}
          style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            [dir === "prev" ? "left" : "right"]: "10px",
            width: "30px", height: "30px", borderRadius: "50%",
            background: "#fff", border: "1px solid #d8d0c2",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", color: "#142235",
            boxShadow: "0 2px 8px rgba(20,34,53,0.08)",
            zIndex: 10, transition: "box-shadow 0.2s, background 0.2s",
          }}
        >
          {dir === "prev" ? "←" : "→"}
        </button>
      ))}
    </div>
  );
}

/* ── Hierarchy Demo — interactive scenario switcher ──────────────────── */
const SCENARIOS = [
  {
    id: "submit", tab: "Submit Report",
    Icon: Send, accent: "#F2C94C",
    title: "Submit Quarterly Report",
    body: "Review your Q3 financial summary before submitting. This action cannot be undone.",
    primary: { label: "Submit Report", Icon: Send },
    secondary: { label: "Save Draft",  Icon: FilePen },
    ghost:     { label: "Cancel",      Icon: X },
  },
  {
    id: "delete", tab: "Delete File",
    Icon: Trash2, accent: "#ef4444",
    title: "Delete 'Q3-Summary.pdf'",
    body: "This file will be permanently removed from your workspace. There is no recovery path.",
    primary:   { label: "Delete File",     Icon: Trash2    },
    secondary: { label: "Move to Archive", Icon: Download  },
    ghost:     { label: "Keep File",       Icon: X         },
  },
  {
    id: "checkout", tab: "Checkout",
    Icon: ArrowRight, accent: "#34d399",
    title: "Complete Your Order",
    body: "You're purchasing the JSB Growth Package. A receipt will be sent to your registered email.",
    primary:   { label: "Confirm & Pay", Icon: ArrowRight },
    secondary: { label: "Edit Cart",     Icon: FilePen    },
    ghost:     { label: "Cancel",        Icon: X          },
  },
  {
    id: "deploy", tab: "Deploy",
    Icon: Zap, accent: "#818cf8",
    title: "Deploy to Production",
    body: "This pushes live immediately. Ensure QA has signed off — all users will see these changes.",
    primary:   { label: "Deploy Now",  Icon: Zap     },
    secondary: { label: "Stage First", Icon: Shield  },
    ghost:     { label: "Abort",       Icon: X       },
  },
] as const;

function HierarchyDemo() {
  const [active, setActive] = useState(0);
  const s = SCENARIOS[active];
  const go = (i: number) => setActive(((i % 4) + 4) % 4);

  const RANKS = [
    { key: "primary",   rank: "P1", label: s.primary.label,   Icon: s.primary.Icon,   v: VARIANTS[0], lineOp: 1   },
    { key: "secondary", rank: "P2", label: s.secondary.label, Icon: s.secondary.Icon, v: VARIANTS[1], lineOp: 0.3 },
    { key: "ghost",     rank: "P3", label: s.ghost.label,     Icon: s.ghost.Icon,     v: VARIANTS[2], lineOp: 0.1 },
  ] as const;

  return (
    <div style={{
      borderRadius: "20px", overflow: "hidden",
      background: "linear-gradient(145deg,#060d18 0%,#0b1628 100%)",
      border: "1px solid rgba(255,255,255,0.07)",
      position: "relative",
    }}>
      {/* Top nav bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}>
        {/* Pill dots — scenario selector */}
        <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
          {SCENARIOS.map((sc, i) => (
            <button key={sc.id} onClick={() => go(i)} style={{
              width: i === active ? "26px" : "7px", height: "7px", borderRadius: "4px",
              background: i === active ? sc.accent : "rgba(255,255,255,0.18)",
              border: "none", cursor: "pointer", padding: 0,
              boxShadow: i === active ? `0 0 10px ${sc.accent}` : "none",
              transition: "width 0.35s ease, background 0.3s, box-shadow 0.3s",
            }} />
          ))}
          <span style={{ marginLeft: "8px", fontSize: "9px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>
            {s.tab}
          </span>
        </div>
        {/* Arrow nav */}
        <div style={{ display: "flex", gap: "5px" }}>
          {(["←","→"] as const).map((ch, di) => (
            <button key={ch} onClick={() => go(active + (di === 0 ? -1 : 1))} style={{
              width: "26px", height: "26px", borderRadius: "50%",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}>{ch}</button>
          ))}
        </div>
      </div>

      {/* Body — split panel */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* LEFT — scenario brief */}
        <div style={{
          padding: "28px 24px 32px",
          borderRight: `1px solid ${s.accent}25`,
          position: "relative", overflow: "hidden",
        }}>
          {/* Subtle accent glow behind icon */}
          <div style={{
            position: "absolute", width: "180px", height: "180px", borderRadius: "50%",
            top: "-40px", left: "-40px",
            background: `radial-gradient(circle, ${s.accent}12 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
          {/* Icon box */}
          <div style={{
            width: "54px", height: "54px", borderRadius: "14px",
            background: `${s.accent}18`, border: `1px solid ${s.accent}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "18px",
            boxShadow: `0 0 24px ${s.accent}20`,
            position: "relative", zIndex: 1,
          }}>
            {React.createElement(s.Icon, { size: 22, color: s.accent, strokeWidth: 1.8 })}
          </div>
          <div style={{
            fontFamily: "var(--font-heading)", fontSize: "17px", fontWeight: 700,
            color: "#fff", marginBottom: "10px", lineHeight: 1.3,
            position: "relative", zIndex: 1,
          }}>{s.title}</div>
          <div style={{
            fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.75,
            fontFamily: "var(--font-body)", position: "relative", zIndex: 1,
          }}>{s.body}</div>
        </div>

        {/* RIGHT — command hierarchy */}
        <div style={{ padding: "28px 24px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            fontSize: "8px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-body)", marginBottom: "18px",
          }}>Command Hierarchy</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {RANKS.map(({ key, rank, label, Icon: RIcon, v, lineOp }) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Rank + connector line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0", flexShrink: 0 }}>
                  <span style={{
                    fontSize: "8px", fontWeight: 800, letterSpacing: "0.06em",
                    color: rank === "P1" ? s.accent : "rgba(255,255,255,0.2)",
                    fontFamily: "var(--font-body)", lineHeight: 1,
                  }}>{rank}</span>
                </div>
                {/* Vertical accent bar */}
                <div style={{
                  width: "2px", height: "32px", borderRadius: "1px", flexShrink: 0,
                  background: rank === "P1"
                    ? `linear-gradient(to bottom, ${s.accent}, ${s.accent}30)`
                    : `rgba(255,255,255,${lineOp * 0.4})`,
                  transition: "background 0.4s ease",
                }} />
                {/* Button */}
                <Btn v={v} pad="10px 16px" fs="13px">
                  <RIcon size={12} strokeWidth={2.2} />{label}
                </Btn>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent streak */}
      <div style={{
        height: "3px",
        background: `linear-gradient(to right, transparent, ${s.accent}, transparent)`,
        transition: "background 0.4s ease",
      }} />
    </div>
  );
}

/* ── Section meta ─────────────────────────────────────────────────────── */
function Sec({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6c7a8c", marginBottom: "4px", fontFamily: "var(--font-body)" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 700, color: "#142235", marginBottom: "2px" }}>{title}</div>
      <div style={{ fontSize: "12px", color: "#6c7a8c", fontStyle: "italic", fontFamily: "var(--font-body)" }}>{sub}</div>
    </div>
  );
}

function DarkSec({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,155,60,0.6)", marginBottom: "4px", fontFamily: "var(--font-body)" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{title}</div>
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontStyle: "italic", fontFamily: "var(--font-body)" }}>{sub}</div>
    </div>
  );
}

/* ── Orb ──────────────────────────────────────────────────────────────── */
function Orb({ hex, style, className }: { hex: string; style: React.CSSProperties; className?: string }) {
  return (
    <div className={className} style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", background: `radial-gradient(circle at 38% 38%,${hex}cc 0%,${hex}55 45%,transparent 75%)`, filter: "blur(2px)", ...style }} />
  );
}

/* ── Main ─────────────────────────────────────────────────────────────── */
export default function ButtonsShowcase() {
  return (
    <section id="buttons" style={{ background: "var(--color-surface-elevated)" }}>

      {/* Hero banner */}
      <div style={{ background: "linear-gradient(135deg,#060d18 0%,#0A1A33 60%,#07122a 100%)", padding: "72px 48px 64px", position: "relative", overflow: "hidden" }}>
        <Orb hex="#F2C94C" className="orb-1" style={{ width: 380, height: 380, top: -80,  left: -60,  opacity: 0.3  }} />
        <Orb hex="#6366f1" className="orb-2" style={{ width: 280, height: 280, bottom: -40, right: 80, opacity: 0.25 }} />
        <Orb hex="#34d399" className="orb-3" style={{ width: 220, height: 220, top: 40, right: -20,  opacity: 0.18 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.25)", borderRadius: "100px", padding: "5px 14px", marginBottom: "20px" }}>
            <MousePointer size={12} strokeWidth={2} color="#F2C94C" />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#F2C94C", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Actions</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 16px 0", maxWidth: "640px" }}>
            Buttons direct attention.
            <br /><span style={{ color: "#F2C94C" }}>Every variant has a rank.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: "0 0 36px 0", maxWidth: "540px" }}>
            Visual weight is hierarchy made visible. Primary commands. Secondary supports. Ghost steps back. The system only works when each role is respected.
          </p>
          {/* Hero preview row */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <button style={{ ...BASE, background: "#F2C94C", color: "#0A1A33", padding: "12px 24px", fontSize: "14px", boxShadow: "0 4px 14px rgba(242,201,76,0.4)" }}>
              <Zap size={14} strokeWidth={2.2} />Get Started
            </button>
            <button style={{ ...BASE, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.18)", padding: "12px 24px", fontSize: "14px" }}>
              <BookOpen size={14} strokeWidth={2} />Learn More
            </button>
            <button style={{ ...BASE, background: "transparent", color: "rgba(255,255,255,0.5)", padding: "12px 24px", fontSize: "14px" }}>
              <ChevronRight size={14} strokeWidth={2} />Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "48px 48px 96px", maxWidth: "960px", margin: "0 auto" }}>

        {/* Variants 3×2 grid */}
        <Sec label="Variants" title="Each button has a rank." sub="Never use two Primary buttons side by side." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "48px" }}>
          {VARIANTS.map((v) => <VarCard key={v.label} v={v} />)}
        </div>

        {/* Sizes */}
        <Sec label="Sizes" title="Match button size to context density." sub="Cycles automatically — or click the sides to rotate." />
        <SizeCarousel />

        {/* States */}
        <Sec label="States" title="Loading, icon+text, icon-only, and destructive." sub="Every state has a purpose — hover each to see it illuminate." />
        <StatesShowcase />

        {/* Animated Toggle */}
        <div style={{ background: "#0B1E3F", borderRadius: "16px", padding: "28px 32px", marginBottom: "48px", boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
          <DarkSec label="Animated Toggle" title="Spring-animated pill toggle." sub="Click LIVE / OFF to activate the power ambience. Click any toggle to switch state." />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {TOGGLES.map((t) => <PowerRow key={t.label} t={t} />)}
          </div>
        </div>

        {/* Ripple fill */}
        <div style={{ background: "#0B1E3F", borderRadius: "16px", padding: "28px 32px", marginBottom: "48px", boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
          <DarkSec label="Animated Gradient — Ripple Fill" title="Gradient floods from center on hover." sub="Clip-path circle expands on hover. Feel the spring." />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", marginBottom: "20px" }}>
            {RIPPLE_BTNS.map((b) => <RippleBtn key={b.label} {...b} size="lg" />)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            {RIPPLE_BTNS.map((b) => <RippleBtn key={b.label + "-sm"} {...b} size="sm" />)}
          </div>
        </div>

        {/* Gradient fills */}
        <Sec label="Gradient Fills" title="Rich two-tone gradients." sub="Row 1 — floating orbs (hover to press in). Row 2 — hexagon chips." />
        {/* Orb row — extra vertical padding so floating drop-shadows don't clip */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-end", padding: "20px 0 28px", marginBottom: "8px" }}>
          {GRAD_FILLS.map((g) => <GradFill key={g.label} {...g} />)}
        </div>
        {/* Hexagon row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", padding: "12px 0 16px", marginBottom: "40px" }}>
          {GRAD_FILLS.map((g) => <GradFill key={g.label + "-hex"} {...g} pill />)}
        </div>

        {/* Gradient outlines — neon arcade */}
        <Sec label="Gradient Outlines" title="Neon-glow gradient border." sub="Hover to ignite the tube — each color has its own charge." />
        <div style={{
          background: "linear-gradient(135deg,#050d1a 0%,#090f22 100%)",
          borderRadius: "18px", padding: "28px 24px", marginBottom: "56px",
          border: "1px solid rgba(255,255,255,0.05)",
          position: "relative", overflow: "hidden",
        }}>
          {/* dot grid */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "14px", position: "relative", zIndex: 1 }}>
            {GRAD_OUTLINES.map((g) => <GradOutline key={g.label} {...g} />)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", position: "relative", zIndex: 1 }}>
            {GRAD_OUTLINES.map((g) => <GradOutline key={g.label + "-pill"} {...g} pill />)}
          </div>
        </div>

        {/* In Context — Hierarchy Demo */}
        <Sec label="In Context — Hierarchy Demo" title="One Primary. One Secondary. One Ghost." sub="Switch scenarios to see how hierarchy adapts — the pattern never changes." />
        <HierarchyDemo />

      </div>
    </section>
  );
}
