"use client";
import { useState, useRef } from "react";
import { Bell, Sparkles, Zap } from "lucide-react";

/* ── Animated SVG icons (48px viewbox, scale freely via width/height) ── */
function AlertInfoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" overflow="visible">
      <g className="a-info-orbit">
        <circle cx="24" cy="4"  r="3"   fill="rgba(59,130,246,.5)" />
        <circle cx="44" cy="24" r="2.5" fill="rgba(59,130,246,.35)" />
      </g>
      <circle className="a-info-core" cx="24" cy="24" r="12" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <circle cx="24" cy="19" r="1.5" fill="#3b82f6" />
      <line x1="24" y1="23" x2="24" y2="30" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function AlertSuccessIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" overflow="visible">
      <circle className="a-s-burst"  cx="24" cy="24" r="18" fill="none" stroke="#22c55e" strokeWidth="1" />
      <circle className="a-s-burst2" cx="24" cy="24" r="18" fill="none" stroke="#22c55e" strokeWidth=".7" />
      <circle className="a-s-circle" cx="24" cy="24" r="12" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
      <polyline className="a-s-check" points="17,24 21,28 31,18" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertWarningIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" overflow="visible">
      <circle className="a-w-glow" cx="24" cy="28" r="14" fill="rgba(245,158,11,.2)" />
      <g className="a-w-tri">
        <polygon points="24,10 40,38 8,38" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />
        <line className="a-w-ex" x1="24" y1="22" x2="24" y2="30" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        <circle className="a-w-ex" cx="24" cy="34" r="1.5" fill="#f59e0b" />
      </g>
    </svg>
  );
}

function AlertErrorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" overflow="visible">
      <circle className="a-e-radar"  cx="24" cy="24" r="10" fill="none" stroke="rgba(239,68,68,.5)" strokeWidth="1.5" />
      <circle className="a-e-radar2" cx="24" cy="24" r="10" fill="none" stroke="rgba(239,68,68,.35)" strokeWidth="1" />
      <g className="a-e-icon">
        <circle cx="24" cy="24" r="12" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <line x1="18" y1="18" x2="30" y2="30" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="18" x2="18" y2="30" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* Info banner: signal broadcast icon */
function AlertInfoBannerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" overflow="visible">
      <circle className="a-sig1" cx="24" cy="24" r="8" fill="none" stroke="rgba(59,130,246,.5)"  strokeWidth="1.5" />
      <circle className="a-sig2" cx="24" cy="24" r="8" fill="none" stroke="rgba(59,130,246,.4)"  strokeWidth="1" />
      <circle className="a-sig3" cx="24" cy="24" r="8" fill="none" stroke="rgba(59,130,246,.3)"  strokeWidth=".7" />
      <g className="a-info-core">
        <circle cx="24" cy="24" r="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
        <rect className="a-scan-line" x="18" y="23" width="12" height="2" rx="1" fill="#3b82f6" />
      </g>
    </svg>
  );
}

/* Warning banner: ticking clock icon */
function AlertWarningBannerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" overflow="visible">
      <circle className="a-tick-dot" cx="24" cy="10" r="2" />
      <circle className="a-tick-dot" cx="38" cy="24" r="2" />
      <circle className="a-tick-dot" cx="24" cy="38" r="2" />
      <circle className="a-tick-dot" cx="10" cy="24" r="2" />
      <circle className="a-clock-face" cx="24" cy="24" r="13" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <line  className="a-clock-min" x1="24" y1="24" x2="24" y2="14" stroke="#f59e0b" strokeWidth="2"   strokeLinecap="round" />
      <line  className="a-clock-sec" x1="24" y1="24" x2="24" y2="13" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2" fill="#f59e0b" />
    </svg>
  );
}

const ALERT_ICON_MAP = {
  info:    AlertInfoIcon,
  success: AlertSuccessIcon,
  warning: AlertWarningIcon,
  error:   AlertErrorIcon,
} as const;

/* ── Config ─────────────────────────────────────────────────────────── */
const TYPES = [
  {
    key: "info",
    label: "Info",
    emoji: "💬",
    message: "Your account is being reviewed. This usually takes one business day.",
    intent: "Neutral system messages. No action required — just awareness.",
    action: "Learn more",
    accent: "#3b82f6",
    accentLight: "#dbeafe",
    accentMid: "#93c5fd",
    bg: "linear-gradient(135deg, #f0f6ff 0%, #ffffff 60%)",
    iconAnim: "alert-float",
  },
  {
    key: "success",
    label: "Success",
    emoji: "✅",
    message: "Your inquiry has been submitted. We'll be in touch within one business day.",
    intent: "Confirms a completed action. Should resolve on its own when possible.",
    action: "View submission",
    accent: "#16a34a",
    accentLight: "#dcfce7",
    accentMid: "#86efac",
    bg: "linear-gradient(135deg, #f0faf4 0%, #ffffff 60%)",
    iconAnim: "alert-bounce",
  },
  {
    key: "warning",
    label: "Warning",
    emoji: "⚠️",
    message: "Your session expires in 5 minutes. Save your work to avoid losing progress.",
    intent: "Soft urgency. The user can proceed but should be aware of a risk.",
    action: "Save now",
    accent: "#d97706",
    accentLight: "#fef3c7",
    accentMid: "#fcd34d",
    bg: "linear-gradient(135deg, #fffbeb 0%, #ffffff 60%)",
    iconAnim: "alert-ping",
  },
  {
    key: "error",
    label: "Error",
    emoji: "🚨",
    message: "We couldn't process your payment. Please check your details and try again.",
    intent: "Something failed. Be specific — vague errors erode trust immediately.",
    action: "Retry",
    accent: "#dc2626",
    accentLight: "#fee2e2",
    accentMid: "#fca5a5",
    bg: "linear-gradient(135deg, #fff5f5 0%, #ffffff 60%)",
    iconAnim: "alert-shake",
  },
] as const;

type AlertDef = (typeof TYPES)[number];

/* ── Live Toast ─────────────────────────────────────────────────────── */
interface ToastItem {
  id: number;
  def: AlertDef;
  progress: number;
}

function LiveToast({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {

  return (
    <div
      className="alert-slide-down"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        background: "white",
        borderRadius: "16px",
        padding: "16px 20px",
        border: `2px solid ${toast.def.accentLight}`,
        boxShadow: `0 8px 32px ${toast.def.accent}22, 0 2px 8px rgba(0,0,0,0.08)`,
        overflow: "hidden",
        marginBottom: "10px",
        minWidth: "340px",
        maxWidth: "440px",
      }}
    >
      {/* Left glow bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "5px",
        background: toast.def.accent, borderRadius: "16px 0 0 16px",
      }} />

      {/* Icon */}
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px",
        background: toast.def.accentLight,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginLeft: "8px",
        boxShadow: `0 0 0 4px ${toast.def.accent}22`,
        overflow: "hidden",
      }}>
        {(() => { const I = ALERT_ICON_MAP[toast.def.key as keyof typeof ALERT_ICON_MAP]; return <I size={34} />; })()}
      </div>

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "14px", fontWeight: 800, color: "#0A1A33", marginBottom: "4px", fontFamily: "var(--font-body)" }}>
          {toast.def.emoji} {toast.def.label}
        </div>
        <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.6, color: "#4b5563", fontFamily: "var(--font-body)" }}>
          {toast.def.message}
        </p>
        <button
          style={{
            marginTop: "10px",
            background: toast.def.accent, color: "white",
            border: "none", borderRadius: "8px",
            padding: "6px 14px", fontSize: "12px",
            fontWeight: 700, cursor: "pointer",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.02em",
          }}
        >
          {toast.def.action}
        </button>
      </div>

      {/* Dismiss */}
      <button
        onClick={onDismiss}
        style={{ background: "transparent", border: "none", cursor: "pointer", color: "#9ca3af", padding: "2px", flexShrink: 0 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Auto-progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, height: "3px", background: toast.def.accentMid, borderRadius: "0 0 16px 16px",
        animation: "alertProgressBar 3s linear forwards" }} />
    </div>
  );
}

/* ── Variant Card ────────────────────────────────────────────────────── */
function VariantCard({ def, dismissed, onDismiss }: { def: AlertDef; dismissed: boolean; onDismiss: () => void }) {
  const [hovered, setHovered] = useState(false);
  const CardIcon = ALERT_ICON_MAP[def.key as keyof typeof ALERT_ICON_MAP];

  if (dismissed) return null;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: def.bg,
        borderRadius: "20px",
        padding: "28px 24px 24px 24px",
        border: `2px solid ${hovered ? def.accent : def.accentLight}`,
        boxShadow: hovered ? `0 16px 48px ${def.accent}28, 0 4px 16px rgba(0,0,0,0.06)` : "0 2px 12px rgba(16,35,63,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Accent blob */}
      <div style={{
        position: "absolute", top: -30, right: -30,
        width: "120px", height: "120px", borderRadius: "50%",
        background: `radial-gradient(circle, ${def.accent}18 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
            width: "52px", height: "52px", borderRadius: "16px",
            background: def.accentLight,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: hovered ? `0 0 0 8px ${def.accent}18` : `0 0 0 0px ${def.accent}18`,
            transition: "box-shadow 0.3s ease",
          }}
        >
          <CardIcon size={42} />
        </div>
        <div>
          <div style={{
            fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
            color: def.accent, fontWeight: 700, fontFamily: "var(--font-body)", marginBottom: "2px",
          }}>
            {def.emoji} {def.key}
          </div>
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#0A1A33", fontFamily: "var(--font-heading)" }}>
            {def.label}
          </div>
        </div>
        <button
          onClick={onDismiss}
          style={{ marginLeft: "auto", background: "transparent", border: "none", cursor: "pointer", color: "#9ca3af" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: `linear-gradient(to right, ${def.accent}30, transparent)` }} />

      {/* Message */}
      <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.7, color: "#374151", fontFamily: "var(--font-body)" }}>
        {def.message}
      </p>

      {/* Intent */}
      <p style={{ margin: 0, fontSize: "12px", lineHeight: 1.6, color: "#9ca3af", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
        {def.intent}
      </p>

      {/* Bottom bar accent */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "4px",
        background: `linear-gradient(to right, ${def.accent}, ${def.accentMid})`,
        borderRadius: "0 0 20px 20px",
        opacity: hovered ? 1 : 0.5,
        transition: "opacity 0.25s",
      }} />
    </div>
  );
}

/* ── Section Label ──────────────────────────────────────────────────── */
function SectionLabel({ label, intent }: { label: string; intent: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        background: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.25)",
        borderRadius: "100px", padding: "4px 14px", marginBottom: "10px",
      }}>
        <Zap size={11} color="#F2C94C" fill="#F2C94C" />
        <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, fontFamily: "var(--font-body)" }}>
          {label}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: "14px", color: "#6b7280", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
        {intent}
      </p>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────────── */
export default function AlertsShowcase() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const [actionDismissed, setActionDismissed] = useState<Record<string, boolean>>({});
  const toastIdRef = useRef(0);

  const fireToast = (def: AlertDef) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, def, progress: 100 }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <section style={{ padding: "96px 24px", background: "#f8f9fb" }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{
          borderRadius: "28px",
          background: "linear-gradient(135deg, #0A1A33 0%, #142240 60%, #0d2040 100%)",
          padding: "64px 56px",
          marginBottom: "64px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* bg orbs */}
          {[
            { color: "#3b82f6", size: 220, top: -60, right: 80, opacity: 0.15 },
            { color: "#F2C94C", size: 160, bottom: -40, right: 200, opacity: 0.12 },
            { color: "#16a34a", size: 120, top: 40, right: -30, opacity: 0.1 },
          ].map((o, i) => (
            <div key={i} style={{
              position: "absolute", borderRadius: "50%",
              width: o.size, height: o.size,
              top: o.top, bottom: (o as any).bottom, right: o.right,
              background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
              opacity: o.opacity, pointerEvents: "none",
              animation: `orbFloat${(i % 4) + 1} ${8 + i * 2}s ease-in-out infinite`,
            }} />
          ))}

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(242,201,76,0.15)", border: "1px solid rgba(242,201,76,0.3)",
              borderRadius: "100px", padding: "5px 16px", marginBottom: "24px",
            }}>
              <Bell size={12} color="#F2C94C" fill="#F2C94C" />
              <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, fontFamily: "var(--font-body)" }}>
                Feedback
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.08, fontWeight: 800,
              margin: "0 0 20px 0", maxWidth: "680px",
              fontFamily: "var(--font-heading)", color: "white", letterSpacing: "-0.03em",
            }}>
              Alerts speak when the system needs to.{" "}
              <span style={{ color: "#F2C94C" }}>Make them worth listening to.</span>
            </h2>

            <p style={{
              fontSize: "17px", lineHeight: 1.75, color: "rgba(255,255,255,0.6)",
              maxWidth: "600px", margin: "0 0 40px 0", fontFamily: "var(--font-body)",
            }}>
              Color, icon, and copy work together to communicate type before the user reads a word.
              Vague alerts destroy trust. Specific alerts build it.
            </p>

            {/* Stat chips */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {[
                { icon: "💬", label: "Info", color: "#3b82f6" },
                { icon: "✅", label: "Success", color: "#16a34a" },
                { icon: "⚠️", label: "Warning", color: "#d97706" },
                { icon: "🚨", label: "Error", color: "#dc2626" },
              ].map((chip) => (
                <div key={chip.label} style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: `${chip.color}22`,
                  border: `1px solid ${chip.color}44`,
                  borderRadius: "100px", padding: "6px 16px",
                }}>
                  <span style={{ fontSize: "14px" }}>{chip.icon}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: chip.color, fontFamily: "var(--font-body)" }}>
                    {chip.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Live Playground ── */}
        <div style={{ marginBottom: "64px" }}>
          <SectionLabel label="Live Playground" intent="Click any type to fire a real alert with its animation personality." />
          <div style={{
            background: "white",
            borderRadius: "24px",
            padding: "36px",
            border: "1px solid rgba(20,34,53,0.08)",
            boxShadow: "0 4px 24px rgba(16,35,63,0.06)",
          }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
              {TYPES.map((def) => (
                <button
                  key={def.key}
                  onClick={() => fireToast(def)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "12px 22px",
                    background: def.accentLight,
                    border: `2px solid ${def.accent}44`,
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700, fontSize: "14px",
                    color: def.accent,
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = def.accent;
                    (e.currentTarget as HTMLButtonElement).style.color = "white";
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = def.accentLight;
                    (e.currentTarget as HTMLButtonElement).style.color = def.accent;
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{def.emoji}</span>
                  Fire {def.label}
                </button>
              ))}
            </div>

            {/* Toast display area */}
            <div style={{
              minHeight: "80px",
              background: "rgba(20,34,53,0.03)",
              borderRadius: "16px",
              padding: "16px",
              border: "1.5px dashed rgba(20,34,53,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              {toasts.length === 0 ? (
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "10px", height: "80px", color: "#9ca3af",
                }}>
                  <Sparkles size={20} color="#9ca3af" />
                  <span style={{ fontSize: "13px", fontFamily: "var(--font-body)" }}>
                    Alerts appear here. Go ahead, fire one!
                  </span>
                </div>
              ) : (
                toasts.map((toast) => (
                  <LiveToast key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── Variants ── */}
        <div style={{ marginBottom: "64px" }}>
          <SectionLabel label="Variants" intent="Each type has a psychological role — hover any card to feel its personality." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {TYPES.map((def) => (
              <VariantCard
                key={def.key}
                def={def}
                dismissed={!!dismissed[def.key]}
                onDismiss={() => setDismissed((d) => ({ ...d, [def.key]: true }))}
              />
            ))}
          </div>
        </div>

        {/* ── With Actions ── */}
        <div style={{ marginBottom: "64px" }}>
          <SectionLabel label="With Actions" intent="When an alert requires a response, pair it with a clear CTA. One action maximum." />
          <div style={{ display: "grid", gap: "16px" }}>
            {[TYPES[2], TYPES[3]].map((def) => {
              const dismissed2 = !!actionDismissed[def.key + "-action"];
              if (dismissed2) return null;
              const ActionIcon = ALERT_ICON_MAP[def.key as keyof typeof ALERT_ICON_MAP];
              return (
                <div
                  key={def.key + "-action"}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "16px",
                    background: def.bg,
                    borderRadius: "20px", padding: "24px",
                    border: `2px solid ${def.accentLight}`,
                    position: "relative", overflow: "hidden",
                    boxShadow: `0 4px 20px ${def.accent}14`,
                  }}
                >
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "4px",
                    background: `linear-gradient(to right, ${def.accent}, ${def.accentMid})`,
                    borderRadius: "0 0 20px 20px",
                  }} />
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: def.accentLight,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <ActionIcon size={40} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: "#0A1A33", marginBottom: "6px", fontFamily: "var(--font-heading)" }}>
                      {def.emoji} {def.label}
                    </div>
                    <p style={{ margin: "0 0 16px 0", fontSize: "14px", lineHeight: 1.65, color: "#4b5563", fontFamily: "var(--font-body)" }}>
                      {def.message}
                    </p>
                    <button style={{
                      background: def.accent, color: "white",
                      border: "none", borderRadius: "10px",
                      padding: "9px 20px", fontSize: "13px",
                      fontWeight: 700, cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      boxShadow: `0 4px 12px ${def.accent}44`,
                      letterSpacing: "0.02em",
                    }}>
                      {def.action}
                    </button>
                  </div>
                  <button
                    onClick={() => setActionDismissed((d) => ({ ...d, [def.key + "-action"]: true }))}
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "#9ca3af" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Banner ── */}
        <div>
          <SectionLabel label="Banner" intent="Full-width alerts for page-level messages — maintenance, outages, or global announcements." />
          <div style={{ display: "grid", gap: "12px" }}>
            {[
              { def: TYPES[0], BannerIcon: AlertInfoBannerIcon,    label: "💬 Info — Broadcasting",     action: "Learn more" },
              { def: TYPES[2], BannerIcon: AlertWarningBannerIcon, label: "⚠️ Warning — Time Sensitive", action: "Save now" },
            ].map(({ def, BannerIcon, label, action }) => (
                <div
                  key={def.key + "-banner"}
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    background: def.bg,
                    border: `2px solid ${def.accentLight}`,
                    borderRadius: "16px", padding: "18px 24px",
                    position: "relative", overflow: "hidden",
                    boxShadow: `0 4px 16px ${def.accent}10`,
                  }}
                >
                  {/* Accent left bar */}
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: "6px",
                    background: `linear-gradient(to bottom, ${def.accent}, ${def.accentMid})`,
                    borderRadius: "16px 0 0 16px",
                  }} />
                  {/* faint bg accent */}
                  <div style={{
                    position: "absolute", right: -30, top: -30,
                    width: "120px", height: "120px", borderRadius: "50%",
                    background: `radial-gradient(circle, ${def.accent}15 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }} />

                  <div style={{
                    width: "52px", height: "52px", borderRadius: "12px",
                    background: def.accentLight,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginLeft: "12px",
                    boxShadow: `0 0 0 4px ${def.accent}18`,
                  }}>
                    <BannerIcon size={40} />
                  </div>

                  <div style={{ flex: 1, fontSize: "14px", fontFamily: "var(--font-body)", color: "#0A1A33", lineHeight: 1.55 }}>
                    <strong style={{ fontWeight: 800, color: def.accent }}>{label}: </strong>
                    {def.message}
                  </div>

                  <button style={{
                    background: def.accent, color: "white",
                    border: "none", borderRadius: "10px",
                    padding: "9px 18px", fontSize: "13px",
                    fontWeight: 700, cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    whiteSpace: "nowrap", flexShrink: 0,
                    boxShadow: `0 4px 12px ${def.accent}40`,
                  }}>
                    {action}
                  </button>
                </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
