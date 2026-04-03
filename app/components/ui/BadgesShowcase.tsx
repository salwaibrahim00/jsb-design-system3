"use client";
import { useState, useRef } from "react";
import { Tag } from "lucide-react";

/* ── Data ─────────────────────────────────────────────────────────────── */
const VARIANTS = [
  {
    key:        "default",
    varType:    "Default",
    varLabel:   "Neutral labeling",
    varBody:    "Used for categories, filters, and classification without implying urgency.",
    cardBg:     "#fcfaf6", cardBorder: "#d8d0c2",
    hoverShadow:"rgba(20,34,53,0.1)",
    badgeBg:    "#f0ece4", badgeColor: "#31445e", badgeBorder: "#d8d0c2",
    dotColor:   "#6c7a8c", dotClass:   "",
    typeColor:  "#6c7a8c", labelColor: "#142235",
    example:    "Industry",
    psyche:     "Calm · Informational",
  },
  {
    key:        "success",
    varType:    "Success",
    varLabel:   "Positive confirmation",
    varBody:    "Signals completion, approval, or healthy status. Triggers relief in the reader.",
    cardBg:     "#f0fdf4", cardBorder: "#bbf7d0",
    hoverShadow:"rgba(34,197,94,0.15)",
    badgeBg:    "#dcfce7", badgeColor: "#166534", badgeBorder: "#bbf7d0",
    dotColor:   "#22c55e", dotClass:   "bdg-success",
    typeColor:  "#166534", labelColor: "#14532d",
    example:    "Active",
    psyche:     "Relief · Trust",
  },
  {
    key:        "warning",
    varType:    "Warning",
    varLabel:   "Soft urgency",
    varBody:    "Draws attention without alarm. Used for pending states or items needing review.",
    cardBg:     "#fffbeb", cardBorder: "#fde68a",
    hoverShadow:"rgba(245,158,11,0.15)",
    badgeBg:    "#fef9c3", badgeColor: "#854d0e", badgeBorder: "#fde68a",
    dotColor:   "#f59e0b", dotClass:   "bdg-warning",
    typeColor:  "#92400e", labelColor: "#78350f",
    example:    "Pending",
    psyche:     "Attention · Caution",
  },
  {
    key:        "destructive",
    varType:    "Destructive",
    varLabel:   "Clear danger signal",
    varBody:    "Reserved for errors, rejections, or irreversible states. Use sparingly.",
    cardBg:     "#fef2f2", cardBorder: "#fecaca",
    hoverShadow:"rgba(239,68,68,0.15)",
    badgeBg:    "#fee2e2", badgeColor: "#991b1b", badgeBorder: "#fecaca",
    dotColor:   "#ef4444", dotClass:   "bdg-danger",
    typeColor:  "#991b1b", labelColor: "#7f1d1d",
    example:    "Expired",
    psyche:     "Urgency · Stop",
  },
  {
    key:        "outlined",
    varType:    "Outlined",
    varLabel:   "Minimal presence",
    varBody:    "Useful when color would compete with surrounding content.",
    cardBg:     "#fff", cardBorder: "#d8d0c2",
    hoverShadow:"rgba(20,34,53,0.08)",
    badgeBg:    "transparent", badgeColor: "#31445e", badgeBorder: "#d8d0c2",
    dotColor:   "#d8d0c2", dotClass:   "",
    typeColor:  "#6c7a8c", labelColor: "#142235",
    example:    "Optional",
    psyche:     "Quiet · Unobtrusive",
  },
  {
    key:        "accent",
    varType:    "Accent",
    varLabel:   "Brand emphasis",
    varBody:    "Reserved for featured, promoted, or highest-priority labels. Use once per view.",
    cardBg:     "linear-gradient(135deg,#fdf6e8,#fff9ed)", cardBorder: "#e8d9b0",
    hoverShadow:"rgba(200,155,60,0.2)",
    badgeBg:    "#c89b3c", badgeColor: "#fff", badgeBorder: "none",
    dotColor:   "rgba(255,255,255,0.65)", dotClass: "bdg-accent",
    typeColor:  "#92400e", labelColor: "#78350f",
    example:    "Featured",
    psyche:     "Premium · Priority",
  },
] as const;

const DOC_ROWS = [
  { icon: "📊", iconBg: "#eff6ff", title: "Q3 Financial Review",    type: "Report",       status: "Active",   statusIdx: 1 },
  { icon: "🔍", iconBg: "#fffbeb", title: "Compliance Audit 2024",  type: "Audit",        status: "Pending",  statusIdx: 2 },
  { icon: "📋", iconBg: "#fdf6e8", title: "Board Strategy Deck",    type: "Presentation", status: "Featured", statusIdx: 5 },
  { icon: "📁", iconBg: "#fef2f2", title: "Legacy Contract Review", type: "Legal",        status: "Expired",  statusIdx: 3 },
];

/* ── Animated dot ─────────────────────────────────────────────────────── */
function Dot({ color, animClass, size = 7 }: { color: string; animClass?: string; size?: number }) {
  return (
    <span
      className={animClass}
      style={{ width: size, height: size, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }}
    />
  );
}

/* ── Inline badge ─────────────────────────────────────────────────────── */
function Badge({ bg, color, border, dot, dotClass, label, size = "md" }: {
  bg: string; color: string; border: string; dot: string; dotClass?: string;
  label: string; size?: "sm" | "md" | "lg";
}) {
  const p = size === "sm" ? "3px 9px" : size === "lg" ? "8px 18px" : "5px 12px";
  const fs = size === "sm" ? "10px" : size === "lg" ? "14px" : "12px";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: p, borderRadius: "100px",
      background: bg, color, border: `1px solid ${border}`,
      fontSize: fs, fontWeight: 700, letterSpacing: "0.03em",
      fontFamily: "var(--font-body)",
    }}>
      <Dot color={dot} animClass={dotClass} size={size === "sm" ? 5 : size === "lg" ? 8 : 6} />
      {label}
    </span>
  );
}

/* ── Emotional weight lookup ───────────────────────────────────────────── */
const EMOTION_WEIGHT: Record<string, { pct: number; label: string }> = {
  default:     { pct: 35,  label: "Emotional weight · Passive" },
  success:     { pct: 65,  label: "Emotional weight · Moderate" },
  warning:     { pct: 78,  label: "Emotional weight · Elevated" },
  destructive: { pct: 96,  label: "Emotional weight · Maximum" },
  outlined:    { pct: 20,  label: "Emotional weight · Minimal" },
  accent:      { pct: 82,  label: "Emotional weight · Premium" },
};

/* ── Variant card ─────────────────────────────────────────────────────── */
function VarCard({ v }: { v: typeof VARIANTS[number] }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const ew = EMOTION_WEIGHT[v.key];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setTilt({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top)  / rect.height - 0.5,
    });
  };

  const rotX = tilt.y * -12;
  const rotY = tilt.x *  12;
  const spotX = (tilt.x + 0.5) * 100;
  const spotY = (tilt.y + 0.5) * 100;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        borderRadius: "20px",
        padding: "22px 20px 20px",
        border: `1px solid ${v.cardBorder}`,
        background: v.cardBg,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        transform: hovered
          ? `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-9px) scale(1.04)`
          : "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 24px 56px ${v.hoverShadow}, 0 0 0 1px ${v.cardBorder}`
          : `0 2px 8px rgba(20,34,53,0.05)`,
        transition: hovered
          ? "transform 0.12s ease-out, box-shadow 0.3s ease"
          : "transform 0.4s cubic-bezier(0.34,1.1,0.64,1), box-shadow 0.4s ease",
        willChange: "transform",
      }}
    >
      {/* Mouse-position spotlight */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "20px",
        background: `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(255,255,255,${hovered ? 0.38 : 0}) 0%, transparent 55%)`,
        transition: hovered ? "background 0.08s" : "background 0.4s",
      }} />

      {/* Shimmer sweep */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "20px",
        background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.32) 50%, transparent 80%)",
        transform: hovered ? "translateX(110%)" : "translateX(-130%)",
        transition: "transform 0.6s ease",
      }} />

      {/* Badge — grows on hover */}
      <div style={{
        display: "flex", alignItems: "center",
        minHeight: "64px",
        marginBottom: "14px",
      }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          padding: hovered ? "9px 20px" : "6px 14px",
          borderRadius: "100px",
          background: v.badgeBg,
          color: v.badgeColor,
          border: v.badgeBorder !== "none" ? `1.5px solid ${v.badgeBorder}` : "none",
          fontSize: hovered ? "15px" : "12px",
          fontWeight: 700, letterSpacing: "0.03em",
          fontFamily: "var(--font-body)",
          boxShadow: hovered ? `0 6px 22px ${v.dotColor}55` : "none",
          transition: "all 0.4s cubic-bezier(0.34,1.2,0.64,1)",
        }}>
          <Dot color={v.dotColor} animClass={v.dotClass} size={hovered ? 9 : 6} />
          {v.example}
        </span>
      </div>

      {/* Type label */}
      <div style={{
        fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color: v.typeColor,
        marginBottom: "4px", fontFamily: "var(--font-body)",
      }}>
        {v.varType}
      </div>

      {/* Variant label */}
      <div style={{
        fontFamily: "var(--font-heading)", fontSize: "15px", fontWeight: 700,
        color: v.labelColor, marginBottom: "6px",
        transform: hovered ? "translateX(3px)" : "translateX(0)",
        transition: "transform 0.3s ease",
      }}>
        {v.varLabel}
      </div>

      {/* Description */}
      <div style={{
        fontSize: "12px", lineHeight: 1.6,
        color: v.typeColor, opacity: 0.72,
        fontFamily: "var(--font-body)", marginBottom: "10px",
      }}>
        {v.varBody}
      </div>

      {/* Psyche tag */}
      <div style={{
        fontSize: "10px", color: v.typeColor,
        fontStyle: "italic", opacity: 0.55,
        fontFamily: "var(--font-body)",
      }}>
        {v.psyche}
      </div>

      {/* Emotional weight bar — slides in on hover */}
      <div style={{
        maxHeight: hovered ? "40px" : "0",
        overflow: "hidden",
        opacity: hovered ? 1 : 0,
        transition: "max-height 0.4s ease, opacity 0.3s ease 0.1s",
      }}>
        <div style={{ marginTop: "14px" }}>
          <div style={{
            height: "3px", borderRadius: "2px",
            background: "rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${ew.pct}%`,
              background: v.dotColor === "#d8d0c2" ? "#6c7a8c" : v.dotColor,
              borderRadius: "2px",
              boxShadow: `0 0 8px ${v.dotColor}70`,
              transition: "width 0.65s cubic-bezier(0.34,1.1,0.64,1) 0.08s",
            }} />
          </div>
          <div style={{
            fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase",
            color: v.typeColor, opacity: 0.45,
            fontFamily: "var(--font-body)", marginTop: "5px",
          }}>
            {ew.label} · {ew.pct}%
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Size data ────────────────────────────────────────────────────────── */
const SIZE_DATA = [
  { key: "sm", label: "Small",   sizeName: "sm" as const, fillPct: 33,  spec: "10px · 3px 9px",   useCase: ["Tables", "Inline lists", "Dense data"] },
  { key: "md", label: "Default", sizeName: "md" as const, fillPct: 60,  spec: "12px · 5px 12px",  useCase: ["Body labels", "Form fields", "Card content"] },
  { key: "lg", label: "Large",   sizeName: "lg" as const, fillPct: 100, spec: "14px · 8px 18px",  useCase: ["Hero callouts", "Feature badges", "Banners"] },
];

/* ── Single size row ──────────────────────────────────────────────────── */
function SizeRowNew({
  row, active, dimmed, last, onEnter, onLeave,
}: {
  row: typeof SIZE_DATA[number];
  active: boolean; dimmed: boolean; last: boolean;
  onEnter(): void; onLeave(): void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        display: "flex", alignItems: "center", gap: "20px",
        padding: active ? "24px 28px 20px" : "20px 28px",
        borderBottom: last ? "none" : "1px solid #f0ece4",
        background: active ? "#0A1A33" : "#fff",
        opacity: dimmed ? 0.14 : 1,
        transition: "background 0.35s ease, opacity 0.3s ease, padding 0.3s ease",
        cursor: "default", overflow: "hidden",
      }}
    >
      {/* Gold left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: active ? "4px" : "0px",
        background: "linear-gradient(180deg,#F2C94C,#c89b3c)",
        boxShadow: active ? "0 0 12px rgba(242,201,76,0.65)" : "none",
        transition: "width 0.35s ease, box-shadow 0.35s ease",
        borderRadius: "0 2px 2px 0",
      }} />

      {/* Size label */}
      <div style={{
        fontFamily: "monospace",
        fontSize: active ? "11px" : "10px",
        fontWeight: active ? 700 : 400,
        color: active ? "#F2C94C" : "#6c7a8c",
        width: "64px", flexShrink: 0,
        letterSpacing: active ? "0.07em" : "0",
        textTransform: active ? "uppercase" : "none",
        transition: "color 0.3s, font-size 0.25s, letter-spacing 0.3s",
      }}>
        {row.label}
      </div>

      {/* Badges + use-case chips */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <Badge
            bg={active ? "rgba(255,255,255,0.08)" : "#f0ece4"}
            color={active ? "rgba(255,255,255,0.85)" : "#31445e"}
            border={active ? "rgba(255,255,255,0.18)" : "#d8d0c2"}
            dot={active ? "rgba(255,255,255,0.45)" : "#6c7a8c"}
            label="Industry" size={row.sizeName}
          />
          <Badge
            bg={active ? "rgba(134,239,172,0.12)" : "#dcfce7"}
            color={active ? "#86efac" : "#166534"}
            border={active ? "rgba(134,239,172,0.28)" : "#bbf7d0"}
            dot={active ? "#86efac" : "#22c55e"} dotClass="bdg-success"
            label="Active" size={row.sizeName}
          />
          <Badge
            bg="#c89b3c" color="#fff" border="none"
            dot="rgba(255,255,255,0.6)" dotClass="bdg-accent"
            label="Featured" size={row.sizeName}
          />
        </div>

        {/* Use-case chips — slide in on hover */}
        <div style={{
          display: "flex", gap: "6px", flexWrap: "wrap",
          maxHeight: active ? "28px" : "0",
          overflow: "hidden",
          opacity: active ? 1 : 0,
          marginTop: active ? "10px" : "0",
          transition: "max-height 0.4s ease, opacity 0.3s ease 0.12s, margin-top 0.3s ease",
        }}>
          {row.useCase.map((uc) => (
            <span key={uc} style={{
              display: "inline-block",
              padding: "3px 10px", borderRadius: "100px",
              background: "rgba(242,201,76,0.10)",
              border: "1px solid rgba(242,201,76,0.28)",
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "#F2C94C",
              fontFamily: "var(--font-body)",
            }}>
              {uc}
            </span>
          ))}
        </div>
      </div>

      {/* Fill bar + spec */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px", width: "88px", flexShrink: 0 }}>
        <div style={{
          width: "80px",
          height: active ? "6px" : "4px",
          borderRadius: "3px",
          background: active ? "rgba(255,255,255,0.10)" : "#f0ece4",
          overflow: "hidden",
          transition: "height 0.3s ease, background 0.3s ease",
        }}>
          <div style={{
            height: "100%", width: `${row.fillPct}%`,
            background: active ? "linear-gradient(90deg,#F2C94C,#c89b3c)" : "#d8d0c2",
            borderRadius: "3px",
            boxShadow: active ? "0 0 10px rgba(242,201,76,0.55)" : "none",
            transition: "background 0.35s ease, box-shadow 0.35s ease",
          }} />
        </div>
        <div style={{
          fontFamily: "monospace", fontSize: "9px",
          color: active ? "rgba(255,255,255,0.45)" : "#6c7a8c",
          textAlign: "right",
          transition: "color 0.3s ease",
        }}>
          {row.spec}
        </div>
      </div>
    </div>
  );
}

/* ── Sizes section (spotlight controller) ─────────────────────────────── */
function SizesSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <div style={{ background: "#fff", border: "1px solid #d8d0c2", borderRadius: "16px", overflow: "hidden", marginBottom: "48px" }}>
      {SIZE_DATA.map((row, i) => (
        <SizeRowNew
          key={row.key}
          row={row}
          active={activeIdx === i}
          dimmed={activeIdx !== null && activeIdx !== i}
          last={i === SIZE_DATA.length - 1}
          onEnter={() => setActiveIdx(i)}
          onLeave={() => setActiveIdx(null)}
        />
      ))}
    </div>
  );
}

/* ── Doc context — dark split-panel badge inspector ───────────────────── */
function DocContextSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const activeDoc    = activeIdx !== null ? DOC_ROWS[activeIdx]               : null;
  const activeVar    = activeDoc          ? VARIANTS[activeDoc.statusIdx]      : null;

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "55% 45%",
      borderRadius: "20px", overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.07)",
      background: "#060d18",
      minHeight: "300px",
    }}>

      {/* ── Left: document list ── */}
      <div style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        {/* List header */}
        <div style={{
          padding: "16px 24px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#22c55e", boxShadow: "0 0 6px #22c55e",
          }} />
          <span style={{
            fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)", fontWeight: 700,
          }}>
            4 documents · hover to inspect
          </span>
        </div>

        {/* Rows */}
        {DOC_ROWS.map((row, i) => {
          const sv  = VARIANTS[row.statusIdx];
          const on  = activeIdx === i;
          return (
            <div
              key={row.title}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "15px 24px",
                borderBottom: i < DOC_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                background: on ? "rgba(255,255,255,0.05)" : "transparent",
                cursor: "default",
                transition: "background 0.25s",
                position: "relative",
              }}
            >
              {/* Status color bar */}
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0,
                width: on ? "3px" : "0",
                background: sv.dotColor,
                boxShadow: on ? `0 0 10px ${sv.dotColor}` : "none",
                transition: "width 0.25s ease, box-shadow 0.25s ease",
                borderRadius: "0 2px 2px 0",
              }} />

              {/* Icon */}
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", flexShrink: 0,
                border: on ? `1px solid ${sv.dotColor}44` : "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.3s",
              }}>
                {row.icon}
              </div>

              {/* Title + badges */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "var(--font-heading)", fontSize: "13px", fontWeight: 700,
                  color: on ? "#fff" : "rgba(255,255,255,0.6)",
                  marginBottom: "6px",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  transition: "color 0.2s",
                }}>
                  {row.title}
                </div>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <Badge
                    bg="rgba(255,255,255,0.07)" color="rgba(255,255,255,0.5)"
                    border="rgba(255,255,255,0.12)" dot="rgba(255,255,255,0.25)"
                    label={row.type} size="sm"
                  />
                  <Badge
                    bg={sv.badgeBg} color={sv.badgeColor}
                    border={sv.badgeBorder !== "none" ? sv.badgeBorder : "transparent"}
                    dot={sv.dotColor} dotClass={sv.dotClass}
                    label={row.status} size="sm"
                  />
                </div>
              </div>

              {/* Date + arrow */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-body)" }}>
                  Apr 2025
                </span>
                <span style={{
                  fontSize: "14px", color: "rgba(255,255,255,0.22)",
                  opacity: on ? 1 : 0.4,
                  transform: on ? "translateX(3px)" : "translateX(0)",
                  transition: "transform 0.2s, opacity 0.2s",
                }}>→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Right: badge inspector ── */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "32px 28px", position: "relative", overflow: "hidden",
        minHeight: "300px",
      }}>
        {/* Idle state */}
        {!activeVar && (
          <div style={{ textAlign: "center", opacity: 0.2, userSelect: "none" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px", transform: "rotate(-10deg)" }}>🏷</div>
            <div style={{
              fontSize: "10px", fontFamily: "var(--font-body)", color: "#fff",
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              Badge inspector
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", marginTop: "4px" }}>
              ← hover a document
            </div>
          </div>
        )}

        {/* Active: reveal panel */}
        {activeVar && (
          <>
            {/* Colored radial glow behind badge */}
            <div style={{
              position: "absolute",
              width: "240px", height: "240px", borderRadius: "50%",
              top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle at 50% 50%, ${activeVar.dotColor}28 0%, transparent 70%)`,
              pointerEvents: "none",
              transition: "background 0.5s ease",
            }} />

            {/* Grid lines (subtle) */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }} />

            {/* Variant type pill */}
            <div style={{
              fontSize: "8px", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-body)",
              marginBottom: "18px",
              position: "relative", zIndex: 1,
            }}>
              {activeVar.varType} variant
            </div>

            {/* Big badge — hero of the panel */}
            <div style={{ position: "relative", zIndex: 1, marginBottom: "20px" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "9px",
                padding: "12px 28px", borderRadius: "100px",
                background: activeVar.badgeBg, color: activeVar.badgeColor,
                border: activeVar.badgeBorder !== "none" ? `2px solid ${activeVar.badgeBorder}` : "none",
                fontSize: "18px", fontWeight: 700, letterSpacing: "0.03em",
                fontFamily: "var(--font-body)",
                boxShadow: `0 0 36px ${activeVar.dotColor}50, 0 4px 20px rgba(0,0,0,0.4)`,
              }}>
                <Dot color={activeVar.dotColor} animClass={activeVar.dotClass} size={10} />
                {activeVar.example}
              </span>
            </div>

            {/* Label */}
            <div style={{
              fontFamily: "var(--font-heading)", fontSize: "15px", fontWeight: 700,
              color: "#fff", marginBottom: "7px", textAlign: "center",
              position: "relative", zIndex: 1,
            }}>
              {activeVar.varLabel}
            </div>

            {/* Body */}
            <div style={{
              fontSize: "11px", lineHeight: 1.7, color: "rgba(255,255,255,0.42)",
              textAlign: "center", maxWidth: "210px",
              fontFamily: "var(--font-body)", marginBottom: "14px",
              position: "relative", zIndex: 1,
            }}>
              {activeVar.varBody}
            </div>

            {/* Psyche */}
            <div style={{
              fontSize: "10px", fontStyle: "italic",
              color: activeVar.dotColor, opacity: 0.85,
              fontFamily: "var(--font-body)",
              position: "relative", zIndex: 1,
            }}>
              {activeVar.psyche}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Section meta header ──────────────────────────────────────────────── */
function SecMeta({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <div style={{ padding: "36px 0 0" }}>
      <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6c7a8c", marginBottom: "4px", fontFamily: "var(--font-body)" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 700, color: "#142235", marginBottom: "3px" }}>{title}</div>
      <div style={{ fontSize: "12px", color: "#6c7a8c", marginBottom: "24px", fontStyle: "italic", fontFamily: "var(--font-body)" }}>{sub}</div>
    </div>
  );
}

/* ── Orb ──────────────────────────────────────────────────────────────── */
function Orb({ hex, style, className }: { hex: string; style: React.CSSProperties; className?: string }) {
  return (
    <div className={className} style={{
      position: "absolute", borderRadius: "50%", pointerEvents: "none",
      background: `radial-gradient(circle at 38% 38%, ${hex}cc 0%, ${hex}55 45%, transparent 75%)`,
      filter: "blur(2px)", ...style,
    }} />
  );
}

/* ── Main ─────────────────────────────────────────────────────────────── */
export default function BadgesShowcase() {
  return (
    <section id="badges" style={{ background: "var(--color-surface-elevated)" }}>

      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(135deg, #060d18 0%, #0A1A33 60%, #07122a 100%)",
        padding: "72px 48px 64px",
        position: "relative",
        overflow: "hidden",
      }}>
        <Orb hex="#F2C94C" className="orb-1" style={{ width: 360, height: 360, top: -80,  left: -60,   opacity: 0.3  }} />
        <Orb hex="#22c55e" className="orb-2" style={{ width: 260, height: 260, bottom: -40, right: 80, opacity: 0.2  }} />
        <Orb hex="#ef4444" className="orb-3" style={{ width: 220, height: 220, top: 40,   right: -20,  opacity: 0.18 }} />
        <Orb hex="#f59e0b" className="orb-4" style={{ width: 180, height: 180, bottom: 20, left: "45%", opacity: 0.15 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.25)", borderRadius: "100px", padding: "5px 14px", marginBottom: "20px" }}>
            <Tag size={12} strokeWidth={2} color="#F2C94C" />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#F2C94C", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
              Status & Labels
            </span>
          </div>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 16px 0", maxWidth: "640px" }}>
            Badges communicate status
            <br />
            <span style={{ color: "#F2C94C" }}>before the reader reads a word.</span>
          </h2>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: "0 0 36px 0", maxWidth: "540px" }}>
            Color carries meaning before text is processed. Every variant triggers a different psychological response — calm, attention, urgency, or trust.
          </p>

          {/* Live floating badges in hero */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {VARIANTS.map((v) => (
              <span
                key={v.key}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "6px 14px", borderRadius: "100px",
                  background: v.badgeBg, color: v.badgeColor,
                  border: v.badgeBorder !== "none" ? `1px solid ${v.badgeBorder}` : "1px solid rgba(255,255,255,0.1)",
                  fontSize: "12px", fontWeight: 700,
                  fontFamily: "var(--font-body)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Dot color={v.dotColor} animClass={v.dotClass} size={6} />
                {v.example}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 48px 80px", maxWidth: "960px", margin: "0 auto" }}>

        {/* Semantic Variants */}
        <SecMeta
          label="Semantic Variants"
          title="Each color has a psychological job."
          sub="Never use them interchangeably — the meaning is the message."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "48px" }}>
          {VARIANTS.map((v) => <VarCard key={v.key} v={v} />)}
        </div>

        {/* Sizes */}
        <SecMeta
          label="Sizes"
          title="Match badge size to content density."
          sub="Hover a row to see it in action — Small for tables, Large for hero callouts."
        />
        <SizesSection />

        {/* In Context */}
        <SecMeta
          label="In Context"
          title="Hover a document. Watch its badge come alive."
          sub="Each status badge triggers a live inspection panel — the meaning decoded in real time."
        />
        <DocContextSection />

      </div>
    </section>
  );
}
