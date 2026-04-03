"use client";
import { useState } from "react";
import { Ruler } from "lucide-react";

/* ── Data ─────────────────────────────────────────────────────────────── */
type CatKey = "micro" | "component" | "layout" | "section";

const CATS: Record<CatKey, {
  color: string; color2: string; bg: string; border: string;
  desc: string; icon: string; iconSvg: React.ReactNode;
  tokens: { px: number; token: string; usage: string; barW: number }[];
}> = {
  micro: {
    color: "#a78bfa", color2: "#c4b5fd",
    bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.25)",
    desc: "Used inside components. The difference between feeling cramped and feeling precise.",
    icon: "⬡",
    iconSvg: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 12.2,4 12.2,10 7,13 1.8,10 1.8,4" stroke="#a78bfa" strokeWidth="1.4" fill="rgba(167,139,250,0.15)"/>
        <circle cx="7" cy="7" r="1.5" fill="#a78bfa"/>
      </svg>
    ),
    tokens: [
      { px: 4,  token: "--space-1", usage: "Icon gaps, tight inline adjustments",   barW: 24 },
      { px: 8,  token: "--space-2", usage: "Compact gaps inside small UI elements", barW: 36 },
      { px: 12, token: "--space-3", usage: "Label and helper text spacing",         barW: 48 },
    ],
  },
  component: {
    color: "#34d399", color2: "#6ee7b7",
    bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.25)",
    desc: "Used within cards, forms, and UI blocks. Creates breathing room without breaking density.",
    icon: "⬢",
    iconSvg: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 12.2,4 12.2,10 7,13 1.8,10 1.8,4" stroke="#34d399" strokeWidth="1.4" fill="rgba(52,211,153,0.15)"/>
        <rect x="4.5" y="4.5" width="5" height="5" rx="1" stroke="#34d399" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
    tokens: [
      { px: 16, token: "--space-4",  usage: "Default internal component padding",   barW: 36 },
      { px: 20, token: "--space-5",  usage: "Balanced spacing for grouped content", barW: 48 },
      { px: 24, token: "--space-6",  usage: "Comfortable card and panel padding",   barW: 60 },
      { px: 32, token: "--space-8",  usage: "Component separation and grouping",    barW: 72 },
    ],
  },
  layout: {
    color: "#60a5fa", color2: "#93c5fd",
    bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.25)",
    desc: "Used between content groups. Controls rhythm and tells the reader where one idea ends and another begins.",
    icon: "⬣",
    iconSvg: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 12.2,4 12.2,10 7,13 1.8,10 1.8,4" stroke="#60a5fa" strokeWidth="1.4" fill="rgba(96,165,250,0.15)"/>
        <line x1="2.5" y1="5" x2="11.5" y2="5" stroke="#60a5fa" strokeWidth="1"/>
        <line x1="2.5" y1="7" x2="11.5" y2="7" stroke="#60a5fa" strokeWidth="1"/>
        <line x1="2.5" y1="9" x2="11.5" y2="9" stroke="#60a5fa" strokeWidth="1"/>
      </svg>
    ),
    tokens: [
      { px: 40, token: "--space-10", usage: "Larger gaps between content groups",          barW: 44 },
      { px: 48, token: "--space-12", usage: "Generous spacing before subsections",         barW: 56 },
      { px: 64, token: "--space-16", usage: "Major separation between related sections",   barW: 72 },
    ],
  },
  section: {
    color: "#c89b3c", color2: "#e8b84b",
    bg: "rgba(200,155,60,0.12)", border: "rgba(200,155,60,0.25)",
    desc: "Used between page sections. Creates the luxury of whitespace — signals premium, unhurried design.",
    icon: "⬟",
    iconSvg: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 12.2,4 12.2,10 7,13 1.8,10 1.8,4" stroke="#c89b3c" strokeWidth="1.4" fill="rgba(200,155,60,0.15)"/>
        <line x1="7" y1="3.5" x2="7" y2="10.5" stroke="#c89b3c" strokeWidth="1.2"/>
        <line x1="4.5" y1="3.5" x2="9.5" y2="3.5" stroke="#c89b3c" strokeWidth="1"/>
        <line x1="4.5" y1="10.5" x2="9.5" y2="10.5" stroke="#c89b3c" strokeWidth="1"/>
      </svg>
    ),
    tokens: [
      { px: 80, token: "--space-20", usage: "Primary section rhythm across pages",              barW: 56 },
      { px: 96, token: "--space-24", usage: "Large-scale breathing room for hero layouts",      barW: 72 },
    ],
  },
};

const CAT_ORDER: CatKey[] = ["micro", "component", "layout", "section"];

/* ── Token Row ────────────────────────────────────────────────────────── */
function TokenRow({ tok, cat, isActive, onClick }: {
  tok: { px: number; token: string; usage: string; barW: number };
  cat: typeof CATS[CatKey];
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const active = isActive || hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center",
        marginBottom: "10px",
        borderRadius: "10px",
        overflow: "hidden",
        border: `1px solid ${isActive ? cat.color : hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"}`,
        cursor: "pointer",
        transform: hovered ? "translateX(3px)" : "translateX(0)",
        transition: "border-color 0.25s, transform 0.2s",
      }}
    >
      {/* Visual bar */}
      <div style={{
        width: `${tok.barW}px`,
        height: "56px",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        transition: "width 0.4s cubic-bezier(0.34,1.2,0.64,1)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(90deg, ${cat.color}, ${cat.color2})`,
          opacity: active ? 0.35 : 0.15,
          transition: "opacity 0.3s",
        }} />
        <div style={{
          position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
          width: "1px", height: "20px",
          background: "rgba(255,255,255,0.2)",
        }} />
      </div>
      {/* Info */}
      <div style={{
        flex: 1, padding: "10px 16px",
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        alignItems: "center", gap: "8px",
      }}>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 700, color: "#fff" }}>
          {tok.px}px
        </div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4, fontFamily: "var(--font-body)" }}>
          {tok.usage}
        </div>
        <div style={{
          fontFamily: "monospace", fontSize: "9px", color: `${cat.color}b3`,
          background: cat.bg, padding: "2px 7px", borderRadius: "4px",
          display: "inline-block", whiteSpace: "nowrap",
        }}>
          {tok.token}
        </div>
      </div>
    </div>
  );
}

/* ── Live UI Preview ──────────────────────────────────────────────────── */
function LivePreview({ sp, catColor }: { sp: number; catColor: string }) {
  const clampedSp = Math.min(sp, 40);
  const spPx = `${clampedSp}px`;

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px",
      overflow: "hidden",
      flex: 1,
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Nav bar */}
      <div style={{
        height: "40px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", gap: "8px",
        padding: `0 ${spPx}`,
        transition: "padding 0.4s cubic-bezier(0.34,1.2,0.64,1)",
      }}>
        {[1,2,3].map(d => (
          <div key={d} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
        ))}
        <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.1)", width: "40px" }} />
        <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.1)", width: "28px", marginLeft: "auto" }} />
      </div>
      {/* Body */}
      <div style={{
        flex: 1,
        padding: spPx,
        display: "flex", flexDirection: "column", gap: spPx,
        transition: "padding 0.4s cubic-bezier(0.34,1.2,0.64,1), gap 0.4s cubic-bezier(0.34,1.2,0.64,1)",
      }}>
        {[3, 2].map((lines, ci) => (
          <div key={ci} style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "8px",
            padding: spPx,
            transition: "padding 0.4s cubic-bezier(0.34,1.2,0.64,1)",
          }}>
            <div style={{
              height: "8px", borderRadius: "4px",
              background: `linear-gradient(90deg, ${catColor}66, rgba(255,255,255,0.12))`,
              marginBottom: spPx, width: "60%",
              transition: "margin-bottom 0.4s cubic-bezier(0.34,1.2,0.64,1), background 0.4s",
            }} />
            {Array.from({ length: lines }).map((_, li) => (
              <div key={li} style={{
                height: "6px", borderRadius: "3px",
                background: "rgba(255,255,255,0.08)",
                marginBottom: li < lines - 1 ? spPx : 0,
                width: li === lines - 1 ? "75%" : "100%",
                transition: "margin-bottom 0.4s cubic-bezier(0.34,1.2,0.64,1)",
              }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────── */
export default function SpacingScale() {
  const [activeCat, setActiveCat] = useState<CatKey>("micro");
  const [selected, setSelected] = useState<{ px: number; token: string; usage: string } | null>(
    { px: 4, token: "--space-1", usage: "Icon gaps, tight inline adjustments" }
  );

  const cat = CATS[activeCat];
  const rulerPct = selected ? Math.min((selected.px / 96) * 100, 100) : 16;

  return (
    <section id="spacing" style={{ background: "#0d1117", fontFamily: "var(--font-body)" }}>

      {/* Hero */}
      <div style={{
        padding: "52px 36px 40px",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(200,155,60,0.06), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242,201,76,0.1)", border: "1px solid rgba(242,201,76,0.2)", borderRadius: "100px", padding: "5px 14px", marginBottom: "12px" }}>
            <Ruler size={11} color="#c89b3c" strokeWidth={2} />
            <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(200,155,60,0.7)" }}>Spacing System</span>
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "#fff", marginBottom: "8px", lineHeight: 1.2 }}>
            Space is not emptiness —<br /><span style={{ color: "#c89b3c" }}>it's intention.</span>
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: "480px" }}>
            Every token has a job. Click any token to see it applied live to a real UI. Watch the interface breathe.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", padding: "0 36px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        overflowX: "auto",
        maxWidth: "100%",
      }}>
        {CAT_ORDER.map((key) => {
          const c = CATS[key];
          const isActive = activeCat === key;
          return (
            <div
              key={key}
              onClick={() => { setActiveCat(key); setSelected(null); }}
              style={{
                padding: "14px 20px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: isActive ? c.color : "rgba(255,255,255,0.3)",
                cursor: "pointer",
                borderBottom: `2px solid ${isActive ? c.color : "transparent"}`,
                transition: "color 0.2s, border-color 0.2s",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
            >
              {c.iconSvg}
              {c.icon} {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", maxWidth: "100%", minHeight: "480px" }}>

        {/* Left: tokens */}
        <div style={{ padding: "28px 36px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Category badge + desc */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 12px", borderRadius: "100px",
              background: cat.bg, border: `1px solid ${cat.border}`,
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: cat.color,
            }}>
              {cat.iconSvg}
              {activeCat.charAt(0).toUpperCase() + activeCat.slice(1)}
            </span>
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: "24px", fontStyle: "italic" }}>
            {cat.desc}
          </div>
          {cat.tokens.map((tok) => (
            <TokenRow
              key={tok.token}
              tok={tok}
              cat={cat}
              isActive={selected?.token === tok.token}
              onClick={() => setSelected({ px: tok.px, token: tok.token, usage: tok.usage })}
            />
          ))}
        </div>

        {/* Right: playground */}
        <div style={{
          padding: "28px 24px",
          background: "rgba(255,255,255,0.02)",
          display: "flex", flexDirection: "column", gap: "20px",
        }}>
          <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
            Live UI Preview
          </div>

          {/* Info card */}
          <div style={{
            background: "rgba(200,155,60,0.06)",
            border: "1px solid rgba(200,155,60,0.15)",
            borderRadius: "10px",
            padding: "14px",
          }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "32px", fontWeight: 700, color: "#c89b3c", lineHeight: 1 }}>
              {selected ? `${selected.px}px` : "—"}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(200,155,60,0.6)", marginTop: "4px", marginBottom: "8px" }}>
              {selected?.token ?? "Select a token"}
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>
              {selected?.usage ?? "Click any token to see it applied live to this UI."}
            </div>
          </div>

          {/* Ruler */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", minWidth: "28px", whiteSpace: "nowrap" }}>
              {selected ? `${selected.px}px` : "0px"}
            </div>
            <div style={{
              flex: 1, height: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "4px", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                height: "100%", borderRadius: "3px",
                background: `linear-gradient(90deg, ${cat.color}88, ${cat.color}33)`,
                width: `${rulerPct}%`,
                transition: "width 0.4s cubic-bezier(0.34,1.2,0.64,1), background 0.4s",
              }} />
              <div style={{
                position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)",
                fontFamily: "monospace", fontSize: "9px", color: `${cat.color}cc`,
              }}>
                {selected ? `${selected.px}px` : ""}
              </div>
            </div>
          </div>

          {/* Live UI */}
          <LivePreview sp={selected?.px ?? 16} catColor={cat.color} />
        </div>
      </div>
    </section>
  );
}
