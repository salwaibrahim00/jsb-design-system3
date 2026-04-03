"use client";

import { useEffect, useState } from "react";
import {
  Home, Layers, Type, Ruler, Tag,
  MousePointerClick, CreditCard, FileText,
  AlertCircle, Table2, Square, Bell, ExternalLink,
} from "lucide-react";

/* ── Nav data ─────────────────────────────────────────────────────────── */
const SITE_LINKS = [
  { label: "Overview", id: "hero", Icon: Home, color: "#F2C94C", glow: "rgba(242,201,76,0.3)" },
];

const DS_LINKS = [
  { label: "Colors",     id: "colors",  Icon: Layers,            color: "#60a5fa", glow: "rgba(96,165,250,0.25)"   },
  { label: "Typography", id: "type",    Icon: Type,              color: "#a78bfa", glow: "rgba(167,139,250,0.25)"  },
  { label: "Spacing",    id: "spacing", Icon: Ruler,             color: "#34d399", glow: "rgba(52,211,153,0.25)"   },
  { label: "Badges",     id: "badges",  Icon: Tag,               color: "#f9a8d4", glow: "rgba(249,168,212,0.25)"  },
  { label: "Buttons",    id: "buttons", Icon: MousePointerClick, color: "#fcd34d", glow: "rgba(252,211,77,0.25)"   },
  { label: "Cards",      id: "cards",   Icon: CreditCard,        color: "#c4b5fd", glow: "rgba(196,181,253,0.25)"  },
  { label: "Forms",      id: "forms",   Icon: FileText,          color: "#6ee7b7", glow: "rgba(110,231,183,0.25)"  },
  { label: "Alerts",     id: "alerts",  Icon: AlertCircle,       color: "#fca5a5", glow: "rgba(252,165,165,0.25)"  },
  { label: "Tables",     id: "tables",  Icon: Table2,            color: "#93c5fd", glow: "rgba(147,197,253,0.25)"  },
  { label: "Modals",     id: "modals",  Icon: Square,            color: "#d8b4fe", glow: "rgba(216,180,254,0.25)"  },
  { label: "Toasts",     id: "toasts",  Icon: Bell,              color: "#fde68a", glow: "rgba(253,230,138,0.25)"  },
];

const ALL_LINKS = [...SITE_LINKS, ...DS_LINKS];

function scrollTo(id: string) {
  const mainEl = document.querySelector("main") as HTMLElement;
  const target = document.getElementById(id);
  if (!mainEl || !target) return;
  mainEl.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
}

/* ── Shield SVG logo ──────────────────────────────────────────────────── */
function ShieldMark({ size = 38 }: { size?: number }) {
  const s = size / 36;
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 1L34 7.5V20C34 28.5 27 35.5 18 39C9 35.5 2 28.5 2 20V7.5L18 1Z" fill="#0d1c35" stroke="#c89b3c" strokeWidth="1.5" />
      <path d="M18 5L30 10.5V20C30 26.5 24.8 32 18 34.8C11.2 32 6 26.5 6 20V10.5L18 5Z" fill="none" stroke="#c89b3c" strokeWidth="0.6" strokeOpacity="0.4" />
      <text x="18" y="23" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="Georgia, serif" fill="#F2C94C" letterSpacing="0.5">JSB</text>
    </svg>
  );
}

/* ── Nav item ─────────────────────────────────────────────────────────── */
function NavItem({ label, id, Icon, color, glow, active, index }: {
  label: string; id: string; Icon: React.ElementType;
  color: string; glow: string; active: boolean; index: number;
}) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={() => scrollTo(id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: "11px",
        width: "100%", padding: "8px 10px 8px 8px",
        borderRadius: "10px", border: "none", cursor: "pointer",
        fontFamily: "var(--font-body)", fontSize: "13px",
        fontWeight: active ? 700 : 450, textAlign: "left",
        position: "relative", overflow: "hidden",
        background: active
          ? `linear-gradient(90deg, ${color}20 0%, ${color}08 100%)`
          : hov ? "rgba(255,255,255,0.04)" : "transparent",
        color: active ? "#fff" : hov ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.38)",
        transition: "all 0.18s ease",
        marginBottom: "2px",
        boxShadow: active ? `inset 0 0 0 1px ${color}22` : "none",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: "18%", bottom: "18%",
        width: "3px", borderRadius: "0 3px 3px 0",
        background: `linear-gradient(180deg, ${color}, ${color}88)`,
        opacity: active ? 1 : 0,
        boxShadow: active ? `0 0 8px ${glow}` : "none",
        transition: "opacity 0.18s, box-shadow 0.18s",
      }} />

      {/* Icon tile */}
      <div style={{
        width: "30px", height: "30px", borderRadius: "8px",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        background: active
          ? `linear-gradient(135deg, ${color}30, ${color}18)`
          : hov ? `${color}14` : "rgba(255,255,255,0.05)",
        boxShadow: active ? `0 0 12px ${glow}, inset 0 1px 0 ${color}30` : "none",
        transition: "all 0.18s ease",
        border: active ? `1px solid ${color}30` : "1px solid transparent",
      }}>
        <Icon size={14} strokeWidth={active ? 2.2 : 1.8}
          style={{ color: active ? color : hov ? `${color}cc` : "rgba(255,255,255,0.28)", transition: "color 0.18s" }} />
      </div>

      {/* Label */}
      <span style={{ flex: 1, letterSpacing: active ? "0.01em" : 0 }}>{label}</span>

      {/* Active dot */}
      {active && (
        <div style={{
          width: "5px", height: "5px", borderRadius: "50%",
          background: color, boxShadow: `0 0 6px ${glow}`,
          flexShrink: 0,
        }} />
      )}
    </button>
  );
}

/* ── Progress bar for DS completion ──────────────────────────────────── */
function DSProgress({ active, total }: { active: string; total: number }) {
  const idx = DS_LINKS.findIndex(l => l.id === active);
  const pct = idx < 0 ? 0 : Math.round(((idx + 1) / total) * 100);
  const link = DS_LINKS[idx] ?? DS_LINKS[0];
  return (
    <div style={{ padding: "10px 12px", marginBottom: "4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
        <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}>Progress</span>
        <span style={{ fontSize: "9px", fontWeight: 700, color: link?.color ?? "#F2C94C", fontFamily: "monospace" }}>{pct}%</span>
      </div>
      <div style={{ height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, borderRadius: "2px", background: `linear-gradient(90deg, ${link?.color ?? "#F2C94C"}, ${link?.color ?? "#F2C94C"}88)`, transition: "width 0.5s cubic-bezier(0.34,1.56,0.64,1), background 0.4s" }} />
      </div>
    </div>
  );
}

/* ── Main sidebar ─────────────────────────────────────────────────────── */
export default function Sidebar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const mainEl = document.querySelector("main") as HTMLElement;
    if (!mainEl) return;
    const ids = ALL_LINKS.map(l => l.id);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { root: mainEl, threshold: 0.15 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const activeColor = ALL_LINKS.find(l => l.id === active)?.color ?? "#F2C94C";

  return (
    <aside style={{
      width: "230px", minWidth: "230px", height: "100vh",
      position: "sticky", top: 0,
      background: "#060d18",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      display: "flex", flexDirection: "column",
      overflowY: "auto",
      /* thin gold left accent */
    }}>
      {/* Ambient glow that tracks active color */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "180px", pointerEvents: "none",
        background: `radial-gradient(ellipse 80% 120% at 50% -20%, ${activeColor}18 0%, transparent 70%)`,
        transition: "background 0.6s ease", zIndex: 0,
      }} />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, position: "relative", zIndex: 1 }}>
        {/* Shield + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
          <div style={{ filter: "drop-shadow(0 4px 16px rgba(200,155,60,0.5))", flexShrink: 0 }}>
            <ShieldMark size={48} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "16px", color: "#fff", fontFamily: "Georgia, serif", letterSpacing: "0.04em", lineHeight: 1.1 }}>JSB</div>
            <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)", letterSpacing: "0.16em", textTransform: "uppercase", marginTop: "4px" }}>Design System</div>
          </div>
        </div>

        {/* Tagline card */}
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "8px 10px", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c89b3c", fontFamily: "var(--font-body)", marginBottom: "2px" }}>Business Solutions Group</div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>Detroit-based · Advisor-led · 40+ yrs</div>
        </div>
      </div>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav style={{ padding: "12px 10px", flex: 1, minHeight: 0, position: "relative", zIndex: 1 }}>

        {/* Overview */}
        {SITE_LINKS.map((link, i) => (
          <NavItem key={link.id} {...link} active={active === link.id} index={i} />
        ))}

        {/* Design System section label */}
        <div style={{ margin: "14px 2px 8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
            Design System
          </span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.18)", fontFamily: "monospace", flexShrink: 0 }}>{DS_LINKS.length}</span>
        </div>

        {/* DS links */}
        {DS_LINKS.map((link, i) => (
          <NavItem key={link.id} {...link} active={active === link.id} index={i} />
        ))}
      </nav>

      {/* ── Progress tracker ─────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, position: "relative", zIndex: 1 }}>
        <DSProgress active={active} total={DS_LINKS.length} />

        {/* Footer */}
        <div style={{ padding: "10px 14px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.7)", animation: "sidebar-pulse 2s ease-in-out infinite" }} />
            <style>{`@keyframes sidebar-pulse{0%,100%{box-shadow:0 0 8px rgba(34,197,94,0.7)}50%{box-shadow:0 0 14px rgba(34,197,94,0.4)}}`}</style>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-body)" }}>live</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.18)", fontFamily: "monospace" }}>v1.0</span>
            <a href="#" style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.2)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F2C94C"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.2)"}
            >
              <ExternalLink size={11} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
