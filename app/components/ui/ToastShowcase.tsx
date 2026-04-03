"use client";
import { useEffect, useState, useRef } from "react";
import {
  CheckCircle2, XCircle, AlertTriangle, Info, Bell, Zap,
  Timer, X as XIcon, Ban, Layers, Flame, PenLine, Send,
} from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";
type Position  = "bottom-right" | "bottom-left" | "top-right" | "top-center";

const CONFIG: Record<ToastType, {
  accent: string; dark: string; border: string;
  Icon: React.ElementType; intent: string; title: string; message: string;
}> = {
  success: {
    accent: "#22c55e", dark: "#052e16", border: "rgba(34,197,94,0.35)",
    intent: "Confirms a completed action. Auto-dismisses — no decision needed.",
    title: "Changes Saved", message: "Your design token updates have been applied.",
    Icon: CheckCircle2,
  },
  error: {
    accent: "#f87171", dark: "#2d0a0a", border: "rgba(248,113,113,0.35)",
    intent: "Reports a failure. Be specific — 'Something went wrong' is never enough.",
    title: "Upload Failed", message: "The file exceeds the 10MB limit. Try compressing it first.",
    Icon: XCircle,
  },
  warning: {
    accent: "#fbbf24", dark: "#1c1200", border: "rgba(251,191,36,0.35)",
    intent: "Flags a risk without blocking the user. Disappears but shouldn't be ignored.",
    title: "Session Expiring", message: "You'll be logged out in 5 minutes. Save your work.",
    Icon: AlertTriangle,
  },
  info: {
    accent: "#60a5fa", dark: "#071a3e", border: "rgba(96,165,250,0.35)",
    intent: "Shares context without urgency. Use for background system activity.",
    title: "Sync in Progress", message: "Your data is syncing across devices. This may take a moment.",
    Icon: Info,
  },
};

const TYPES: ToastType[] = ["success", "error", "warning", "info"];
const DURATION = 4000;

const POSITIONS: { key: Position; label: string }[] = [
  { key: "bottom-right", label: "↘ Bottom right" },
  { key: "bottom-left",  label: "↙ Bottom left"  },
  { key: "top-right",    label: "↗ Top right"     },
  { key: "top-center",   label: "↑ Top center"    },
];

function posStyle(pos: Position): React.CSSProperties {
  switch (pos) {
    case "bottom-right": return { bottom: 24, right: 24, alignItems: "flex-end" };
    case "bottom-left":  return { bottom: 24, left: 24,  alignItems: "flex-start" };
    case "top-right":    return { top: 24,    right: 24,  alignItems: "flex-end", flexDirection: "column-reverse" };
    case "top-center":   return { top: 24,    left: "50%", transform: "translateX(-50%)", alignItems: "center", flexDirection: "column-reverse" };
  }
}

/* ── Live Toast ─────────────────────────────────────────────────────── */
interface ToastData { id: number; type: ToastType; title: string; message: string; }

function LiveToast({ toast, onRemove, pos }: { toast: ToastData; onRemove: (id: number) => void; pos: Position }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const startRef = useRef<number | null>(null);
  const rafRef   = useRef<number | null>(null);
  const cfg = CONFIG[toast.type];

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const pct = Math.max(0, 100 - ((now - startRef.current) / DURATION) * 100);
      setProgress(pct);
      if (pct > 0) rafRef.current = requestAnimationFrame(tick);
      else dismiss();
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const dismiss = () => { setVisible(false); setTimeout(() => onRemove(toast.id), 220); };

  const slideDir = pos.includes("right") ? "110%" : pos === "top-center" ? "0, -60px" : "-110%";
  const enterTransform = pos === "top-center" ? "translateY(0) scale(1)" : "translateX(0) scale(1)";
  const exitTransform  = pos === "top-center"
    ? "translateY(-60px) scale(0.95)"
    : pos.includes("right") ? "translateX(110%) scale(0.95)" : "translateX(-110%) scale(0.95)";

  return (
    <div style={{
      background: "white",
      border: `1.5px solid ${cfg.border}`,
      borderRadius: "16px",
      boxShadow: `0 12px 40px rgba(10,26,51,0.2), 0 0 0 1px ${cfg.accent}18`,
      overflow: "hidden",
      transform: visible ? enterTransform : exitTransform,
      opacity: visible ? 1 : 0,
      transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
      minWidth: "300px", maxWidth: "380px",
      position: "relative",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: cfg.accent }} />
      <div style={{ padding: "14px 16px 14px 22px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: `${cfg.accent}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <cfg.Icon size={16} color={cfg.accent} strokeWidth={2} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "13px", fontWeight: 800, color: "#0A1A33", fontFamily: "var(--font-body)", marginBottom: "2px" }}>{toast.title}</div>
          <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>{toast.message}</div>
        </div>
        <button onClick={dismiss} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#9ca3af", flexShrink: 0 }}>
          <XIcon size={13} strokeWidth={2.5} />
        </button>
      </div>
      <div style={{ height: "3px", background: "rgba(20,34,53,0.06)" }}>
        <div style={{ height: "100%", background: cfg.accent, width: `${progress}%`, transition: "width 0.1s linear" }} />
      </div>
    </div>
  );
}

/* ── Animated SVG icons per type ─────────────────────────────────────── */
function SuccessIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" overflow="visible">
      <g transform="translate(16,16)">
        <line className="toast-spark" x1="0" y1="-14" x2="0" y2="-10" stroke="#4caf82" strokeWidth="2" strokeLinecap="round" />
        <line className="toast-spark" x1="12" y1="-7" x2="9" y2="-4" stroke="#4caf82" strokeWidth="2" strokeLinecap="round" />
        <line className="toast-spark" x1="-12" y1="-7" x2="-9" y2="-4" stroke="#4caf82" strokeWidth="2" strokeLinecap="round" />
        <line className="toast-spark" x1="12" y1="7" x2="9" y2="4" stroke="#4caf82" strokeWidth="2" strokeLinecap="round" />
      </g>
      <circle className="check-circle" cx="16" cy="16" r="10" fill="rgba(76,175,130,.2)" stroke="#4caf82" strokeWidth="2" />
      <polyline className="check-mark" points="10,16 14,20 22,11" fill="none" stroke="#4caf82" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ErrorIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" overflow="visible">
      <circle className="error-wave"  cx="16" cy="16" r="10" fill="none" stroke="rgba(224,85,85,.4)"  strokeWidth="1.5" />
      <circle className="error-wave2" cx="16" cy="16" r="10" fill="none" stroke="rgba(224,85,85,.3)"  strokeWidth="1" />
      <g className="x-icon">
        <circle cx="16" cy="16" r="10" fill="rgba(224,85,85,.15)" stroke="#e05555" strokeWidth="2" />
        <line x1="11" y1="11" x2="21" y2="21" stroke="#e05555" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="21" y1="11" x2="11" y2="21" stroke="#e05555" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
function WarningIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" overflow="visible">
      <ellipse className="warn-glow" cx="16" cy="17" rx="10" ry="7" fill="rgba(232,160,32,.2)" />
      <g className="warn-tri">
        <polygon points="16,5 28,25 4,25" fill="rgba(232,160,32,.18)" stroke="#e8a020" strokeWidth="2" strokeLinejoin="round" />
        <line className="warn-exclaim" x1="16" y1="13" x2="16" y2="19" stroke="#e8a020" strokeWidth="2.5" strokeLinecap="round" />
        <circle className="warn-exclaim" cx="16" cy="22" r="1.2" fill="#e8a020" />
      </g>
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" overflow="visible">
      <g className="orbit-dot1"><circle cx="16" cy="16" r="2.5" fill="rgba(96,165,250,.7)" /></g>
      <g className="orbit-dot2"><circle cx="16" cy="16" r="2"   fill="rgba(96,165,250,.5)" /></g>
      <g className="info-core">
        <circle cx="16" cy="16" r="9" fill="rgba(96,165,250,.12)" stroke="#60a5fa" strokeWidth="2" />
        <line x1="16" y1="13" x2="16" y2="13" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="16" y1="16" x2="16" y2="21" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

const ICON_MAP: Record<ToastType, React.FC> = {
  success: SuccessIcon, error: ErrorIcon, warning: WarningIcon, info: InfoIcon,
};

/* ── Variant Card ────────────────────────────────────────────────────── */
function VariantCard({ type, count, onFire }: { type: ToastType; count: number; onFire: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [shimming, setShimming] = useState(false);
  const cfg = CONFIG[type];
  const IconComp = ICON_MAP[type];

  const handleEnter = () => {
    setHovered(true);
    setShimming(false);
    requestAnimationFrame(() => setShimming(true));
  };
  const handleLeave = () => { setHovered(false); setShimming(false); };

  const hasBar = type === "success" || type === "warning";
  const barClass = type === "success" ? "toast-fill-success" : "toast-fill-warning";

  return (
    <div
      onClick={onFire}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        alignItems: "center",
        gap: "24px",
        background: hovered ? `rgba(255,255,255,0.05)` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? cfg.border : "rgba(255,255,255,0.07)"}`,
        borderRadius: "14px",
        padding: "20px 24px",
        cursor: "pointer",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "border-color .25s, background .25s, transform .15s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shimmer sweep */}
      <div
        className={shimming ? "card-shimmer" : ""}
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
          transform: shimming ? undefined : "translateX(-100%)",
        }}
      />

      {/* LEFT: icon box + label */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "52px", height: "52px", borderRadius: "12px", flexShrink: 0,
          background: `${cfg.accent}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          <IconComp />
          {count > 0 && (
            <div style={{
              position: "absolute", top: -7, right: -7,
              minWidth: "20px", height: "20px", borderRadius: "999px",
              background: cfg.accent, color: "#0A1A33",
              fontSize: "10px", fontWeight: 800, fontFamily: "var(--font-body)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 4px", boxShadow: `0 2px 6px ${cfg.accent}66`,
            }}>
              {count}×
            </div>
          )}
        </div>
        <span style={{
          fontFamily: "var(--font-heading)", fontSize: "17px", fontWeight: 700,
          color: cfg.accent,
        }}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>

      {/* RIGHT: description */}
      <div style={{
        fontSize: "13px", lineHeight: 1.65,
        color: "rgba(255,255,255,0.45)",
        fontFamily: "var(--font-body)", fontStyle: "italic",
      }}>
        {cfg.intent}
      </div>

      {/* Progress bar (success + warning only) */}
      {hasBar && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <div className={barClass} style={{ height: "100%", background: cfg.accent, width: "0%", borderRadius: "2px" }} />
        </div>
      )}
    </div>
  );
}

/* ── Rules ──────────────────────────────────────────────────────────── */
const RULES = [
  { icon: Timer,  color: "#60a5fa", label: "Auto-dismiss",        note: "4 seconds default. Error toasts may stay longer since they signal action." },
  { icon: XIcon,  color: "#f87171", label: "Always dismissible",  note: "Never remove the X. Users must always be able to close immediately." },
  { icon: Layers, color: "#fbbf24", label: "Stack, don't replace", note: "Multiple toasts stack vertically. Never overwrite an existing toast." },
  { icon: Ban,    color: "#a78bfa", label: "No decisions",         note: "If a response is required, use an alert or modal — not a toast." },
];

function RuleChip({ item }: { item: typeof RULES[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1.5px solid ${hovered ? item.color + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "16px", padding: "20px",
        display: "flex", flexDirection: "column", gap: "12px",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease",
        boxShadow: hovered ? `0 8px 24px rgba(10,26,51,0.3)` : "none",
      }}
    >
      <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `${item.color}18`, border: `1px solid ${item.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <item.icon size={18} color={item.color} strokeWidth={1.8} />
      </div>
      <div>
        <div style={{ fontSize: "14px", fontWeight: 700, color: hovered ? "white" : "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)", marginBottom: "5px", transition: "color 0.15s" }}>
          {item.label}
        </div>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", lineHeight: 1.65 }}>
          {item.note}
        </div>
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────────── */
export default function ToastShowcase() {
  const [toasts, setToasts]   = useState<ToastData[]>([]);
  const [counts, setCounts]   = useState<Record<ToastType, number>>({ success: 0, error: 0, warning: 0, info: 0 });
  const [position, setPosition] = useState<Position>("bottom-right");
  const [composerType, setComposerType] = useState<ToastType>("success");
  const [composerMsg, setComposerMsg]   = useState("");
  const counterRef = useRef(0);

  const fire = (type: ToastType, customMsg?: string) => {
    const cfg = CONFIG[type];
    setToasts((prev) => [...prev, {
      id: counterRef.current++, type,
      title:   cfg.title,
      message: customMsg?.trim() || cfg.message,
    }]);
    setCounts((c) => ({ ...c, [type]: c[type] + 1 }));
  };

  const fireAll = () => {
    TYPES.forEach((t, i) => setTimeout(() => fire(t), i * 280));
  };

  const sendComposer = () => {
    fire(composerType, composerMsg);
    setComposerMsg("");
  };

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <section style={{ padding: "96px 24px", background: "#060d18" }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

        {/* ── Header Banner ── */}
        <div style={{
          borderRadius: "28px",
          background: "linear-gradient(135deg, #0A1A33 0%, #142240 60%, #0d2040 100%)",
          padding: "64px 56px", marginBottom: "64px",
          position: "relative", overflow: "hidden",
        }}>
          {[
            { color: "#22c55e", size: 200, top: -40, right: 80,    opacity: 0.1  },
            { color: "#fbbf24", size: 160, bottom: -30, right: 280, opacity: 0.1  },
            { color: "#f87171", size: 140, top: 50, right: -20,    opacity: 0.08 },
          ].map((o, i) => (
            <div key={i} style={{
              position: "absolute", borderRadius: "50%", width: o.size, height: o.size,
              top: (o as any).top, bottom: (o as any).bottom, right: o.right,
              background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
              opacity: o.opacity, pointerEvents: "none",
              animation: `orbFloat${(i % 4) + 1} ${9 + i * 2}s ease-in-out infinite`,
            }} />
          ))}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242,201,76,0.15)", border: "1px solid rgba(242,201,76,0.3)", borderRadius: "100px", padding: "5px 16px", marginBottom: "24px" }}>
              <Bell size={12} color="#F2C94C" fill="#F2C94C" />
              <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, fontFamily: "var(--font-body)" }}>Toasts</span>
            </div>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.08, fontWeight: 800, margin: "0 0 20px 0", maxWidth: "660px", fontFamily: "var(--font-heading)", color: "white", letterSpacing: "-0.03em" }}>
              Toasts inform.{" "}
              <span style={{ color: "#F2C94C" }}>They never ask for a decision.</span>
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "560px", margin: 0, fontFamily: "var(--font-body)" }}>
              A toast is ephemeral feedback — it appears, informs, and disappears. If the user needs to respond, use an alert or modal instead.
            </p>
          </div>
        </div>

        {/* ── Variants + Controls ── */}
        <div style={{ marginBottom: "56px" }}>
          {/* Label row with Fire All + Position picker */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.25)", borderRadius: "100px", padding: "4px 14px", marginBottom: "10px" }}>
                <Zap size={11} color="#F2C94C" fill="#F2C94C" />
                <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, fontFamily: "var(--font-body)" }}>Variants</span>
              </div>
              <p style={{ margin: 0, fontSize: "14px", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
                <span style={{ color: "rgba(255,255,255,0.45)" }}>Click any card to fire. Multiple toasts stack — </span>
                <span style={{ color: "#F2C94C" }}>try firing several.</span>
              </p>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              {/* Position picker */}
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as Position)}
                style={{
                  padding: "8px 12px", borderRadius: "10px", fontSize: "12px",
                  fontWeight: 700, fontFamily: "var(--font-body)",
                  background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer",
                  outline: "none",
                }}
              >
                {POSITIONS.map((p) => (
                  <option key={p.key} value={p.key} style={{ background: "#0A1A33" }}>{p.label}</option>
                ))}
              </select>

              {/* Fire All */}
              <button
                onClick={fireAll}
                style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  padding: "9px 18px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #d97706, #f59e0b)",
                  border: "none", cursor: "pointer",
                  color: "#0A1A33", fontWeight: 800, fontSize: "13px",
                  fontFamily: "var(--font-body)",
                  boxShadow: "0 4px 16px rgba(245,158,11,0.4)",
                }}
              >
                <Flame size={14} />
                Fire All 4
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {TYPES.map((type) => (
              <VariantCard key={type} type={type} count={counts[type]} onFire={() => fire(type)} />
            ))}
          </div>
        </div>

        {/* ── Custom Composer ── */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.25)", borderRadius: "100px", padding: "4px 14px", marginBottom: "10px" }}>
              <PenLine size={11} color="#F2C94C" />
              <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, fontFamily: "var(--font-body)" }}>Custom Composer</span>
            </div>
            <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
              Write your own message and fire it as any type.
            </p>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1.5px solid rgba(255,255,255,0.08)",
            borderRadius: "20px", padding: "28px",
            display: "flex", flexDirection: "column", gap: "16px",
          }}>
            {/* Type selector */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {TYPES.map((t) => {
                const cfg = CONFIG[t];
                const active = composerType === t;
                return (
                  <button
                    key={t}
                    onClick={() => setComposerType(t)}
                    style={{
                      display: "flex", alignItems: "center", gap: "7px",
                      padding: "7px 16px", borderRadius: "999px",
                      background: active ? `${cfg.accent}22` : "rgba(255,255,255,0.04)",
                      border: `1.5px solid ${active ? cfg.accent + "66" : "rgba(255,255,255,0.1)"}`,
                      color: active ? cfg.accent : "rgba(255,255,255,0.4)",
                      fontWeight: 700, fontSize: "12px",
                      cursor: "pointer", fontFamily: "var(--font-body)",
                      transition: "all 0.15s",
                    }}
                  >
                    <cfg.Icon size={12} />
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                );
              })}
            </div>

            {/* Message input + send */}
            <div style={{ display: "flex", gap: "12px" }}>
              <input
                value={composerMsg}
                onChange={(e) => setComposerMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && composerMsg.trim() && sendComposer()}
                placeholder={`Write a ${composerType} message… (press Enter to send)`}
                maxLength={120}
                style={{
                  flex: 1,
                  padding: "12px 18px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.05)",
                  border: `1.5px solid ${composerMsg ? CONFIG[composerType].accent + "55" : "rgba(255,255,255,0.1)"}`,
                  color: "white", fontSize: "14px",
                  fontFamily: "var(--font-body)", outline: "none",
                  transition: "border-color 0.15s",
                }}
              />
              <button
                onClick={sendComposer}
                disabled={!composerMsg.trim()}
                style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  padding: "12px 22px", borderRadius: "12px",
                  background: composerMsg.trim() ? CONFIG[composerType].accent : "rgba(255,255,255,0.06)",
                  border: "none", cursor: composerMsg.trim() ? "pointer" : "not-allowed",
                  color: composerMsg.trim() ? "#0A1A33" : "rgba(255,255,255,0.2)",
                  fontWeight: 800, fontSize: "14px",
                  fontFamily: "var(--font-body)",
                  boxShadow: composerMsg.trim() ? `0 4px 16px ${CONFIG[composerType].accent}44` : "none",
                  transition: "all 0.15s",
                }}
              >
                <Send size={14} />
                Send
              </button>
            </div>

            {/* Char count */}
            <div style={{ textAlign: "right", fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}>
              {composerMsg.length}/120
            </div>
          </div>
        </div>

        {/* ── Rules ── */}
        <div>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.25)", borderRadius: "100px", padding: "4px 14px", marginBottom: "10px" }}>
              <Zap size={11} color="#F2C94C" fill="#F2C94C" />
              <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, fontFamily: "var(--font-body)" }}>Rules</span>
            </div>
            <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
              Toasts have strict behavioral constraints — break them and they become noise.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px" }}>
            {RULES.map((item) => <RuleChip key={item.label} item={item} />)}
          </div>
        </div>

      </div>

      {/* ── Live toast stack ── */}
      <div style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 1000,
        ...posStyle(position),
      }}>
        {toasts.map((toast) => (
          <LiveToast key={toast.id} toast={toast} onRemove={remove} pos={position} />
        ))}
      </div>
    </section>
  );
}
