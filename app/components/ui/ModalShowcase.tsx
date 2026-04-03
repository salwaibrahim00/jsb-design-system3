"use client";
import { useState, useEffect, useRef } from "react";
import {
  CalendarCheck, Trash2, ClipboardList, CheckCircle2, X,
  Clock, Star, Shield, Zap, Sparkles, FocusIcon,
} from "lucide-react";

type ModalType = "confirm" | "destructive" | "form" | "info" | null;

/* ── Confetti ────────────────────────────────────────────────────────── */
function Confetti() {
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 0.6,
    dur: 0.9 + Math.random() * 0.6,
    size: 6 + Math.random() * 6,
    color: ["#F2C94C", "#3b82f6", "#16a34a", "#f43f5e", "#a855f7", "#06b6d4"][i % 6],
    rotate: Math.random() * 360,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {pieces.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-10px",
            width: `${p.size}px`,
            height: `${p.size * 0.5}px`,
            background: p.color,
            borderRadius: "2px",
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall ${p.dur}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Modal ───────────────────────────────────────────────────────────── */
function Modal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  if (!type) return null;

  const maxWidth = type === "form" ? "520px" : "480px";

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0,
        background: `rgba(10,26,51,${visible ? 0.6 : 0})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px", zIndex: 1000,
        transition: "background 0.2s ease",
        backdropFilter: `blur(${visible ? 4 : 0}px)`,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth,
          background: "white", borderRadius: "24px",
          border: "1px solid rgba(20,34,53,0.08)",
          boxShadow: "0 32px 80px rgba(10,26,51,0.28)",
          overflow: "hidden",
          transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute", top: "16px", right: "16px", zIndex: 10,
            background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "8px",
            width: "32px", height: "32px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(4px)",
          }}
        >
          <X size={14} strokeWidth={2.5} />
        </button>

        {/* ── Confirmation ── */}
        {type === "confirm" && (
          <>
            {/* Header image band */}
            <div style={{
              background: "linear-gradient(135deg, #0A1A33 0%, #1a3a6b 100%)",
              padding: "40px 32px 32px",
              position: "relative", overflow: "hidden",
            }}>
              {/* bg orb */}
              <div style={{ position: "absolute", right: -30, top: -30, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, #F2C94C22 0%, transparent 70%)" }} />
              <div style={{ position: "absolute", left: -20, bottom: -20, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, #3b82f620 0%, transparent 70%)" }} />

              {/* Large icon */}
              <div style={{
                width: "72px", height: "72px", borderRadius: "20px",
                background: "rgba(242,201,76,0.15)", border: "2px solid rgba(242,201,76,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "20px",
              }}>
                <CalendarCheck size={34} color="#F2C94C" strokeWidth={1.8} />
              </div>

              <h3 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: 800, color: "white", fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>
                Confirm Strategy Session
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
                90-minute deep-dive with the JSB advisory team
              </p>

              {/* Session detail chips */}
              <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
                {[
                  { icon: Clock, text: "90 min" },
                  { icon: Star, text: "Strategy" },
                  { icon: Shield, text: "Confidential" },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "999px", padding: "4px 12px",
                    fontSize: "12px", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)", fontWeight: 600,
                  }}>
                    <Icon size={11} />
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Advisor card */}
            <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(20,34,53,0.07)", display: "flex", alignItems: "center", gap: "14px" }}>
              {/* Avatar */}
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0,
                background: "linear-gradient(135deg, #0A1A33, #1a3a6b)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px", fontWeight: 800, color: "#F2C94C", fontFamily: "var(--font-body)",
                boxShadow: "0 0 0 3px rgba(242,201,76,0.2)",
              }}>
                JB
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0A1A33", fontFamily: "var(--font-body)" }}>Jordan B., Lead Advisor</div>
                <div style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "var(--font-body)" }}>JSB Business Solutions Group · Detroit, MI</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}>
                {[1,2,3,4,5].map((s) => <Star key={s} size={12} fill="#F2C94C" color="#F2C94C" />)}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "20px 28px 28px" }}>
              <p style={{ margin: "0 0 24px 0", fontSize: "14px", lineHeight: 1.75, color: "#6b7280", fontFamily: "var(--font-body)" }}>
                A confirmation will be sent to your email address on file. You can reschedule up to 24 hours before the session begins.
              </p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button onClick={handleClose} style={{ background: "transparent", color: "#374151", border: "1.5px solid rgba(20,34,53,0.15)", borderRadius: "10px", padding: "10px 18px", fontWeight: 600, fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-body)" }}>
                  Cancel
                </button>
                <button onClick={handleClose} style={{ background: "#F2C94C", color: "#0A1A33", border: "none", borderRadius: "10px", padding: "10px 22px", fontWeight: 800, fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-body)", boxShadow: "0 4px 14px rgba(242,201,76,0.4)", display: "flex", alignItems: "center", gap: "7px" }}>
                  <CalendarCheck size={15} strokeWidth={2.5} />
                  Confirm Booking
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── Destructive ── */}
        {type === "destructive" && (
          <>
            <div style={{ background: "linear-gradient(135deg, #2d0a0a 0%, #450a0a 100%)", padding: "40px 32px 32px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -20, top: -20, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, #dc262622 0%, transparent 70%)" }} />
              <div
                className="alert-shake"
                style={{
                  width: "72px", height: "72px", borderRadius: "20px",
                  background: "rgba(220,38,38,0.2)", border: "2px solid rgba(220,38,38,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px", animationIterationCount: "2",
                }}
              >
                <Trash2 size={34} color="#f87171" strokeWidth={1.8} />
              </div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: 800, color: "white", fontFamily: "var(--font-heading)" }}>
                Delete Client Record
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
                This action is permanent and cannot be undone.
              </p>
            </div>

            {/* Warning strip */}
            <div style={{ background: "#fff5f5", borderTop: "none", borderBottom: "1px solid #fee2e2", padding: "14px 28px", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#dc2626", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: "#991b1b", fontFamily: "var(--font-body)", fontWeight: 600 }}>
                Marcus T. · Detroit Manufacturing Co. · $12,400 contract · all associated documents
              </span>
            </div>

            <div style={{ padding: "20px 28px 28px" }}>
              <p style={{ margin: "0 0 24px 0", fontSize: "14px", lineHeight: 1.75, color: "#6b7280", fontFamily: "var(--font-body)" }}>
                This will permanently remove the client record and all associated documents. Make sure you have a backup before proceeding.
              </p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button onClick={handleClose} style={{ background: "transparent", color: "#374151", border: "1.5px solid rgba(20,34,53,0.15)", borderRadius: "10px", padding: "10px 18px", fontWeight: 600, fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-body)" }}>
                  Keep Record
                </button>
                <button onClick={handleClose} style={{ background: "#dc2626", color: "white", border: "none", borderRadius: "10px", padding: "10px 22px", fontWeight: 800, fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-body)", boxShadow: "0 4px 14px rgba(220,38,38,0.35)", display: "flex", alignItems: "center", gap: "7px" }}>
                  <Trash2 size={15} strokeWidth={2.5} />
                  Delete Permanently
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── Form Modal ── */}
        {type === "form" && (
          <>
            <div style={{ background: "linear-gradient(135deg, #0f2444 0%, #163362 100%)", padding: "36px 32px 28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -20, top: -20, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, #F2C94C18 0%, transparent 70%)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "18px", background: "rgba(242,201,76,0.15)", border: "2px solid rgba(242,201,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ClipboardList size={28} color="#F2C94C" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "20px", fontWeight: 800, color: "white", fontFamily: "var(--font-heading)" }}>
                    Request a Consultation
                  </h3>
                  <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}>
                    We'll respond within one business day
                  </p>
                </div>
              </div>
            </div>

            <div style={{ padding: "24px 28px 28px" }}>
              <div style={{ display: "grid", gap: "16px", marginBottom: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {[{ label: "First Name", ph: "Sarah" }, { label: "Last Name", ph: "Johnson" }].map(({ label, ph }) => (
                    <div key={label}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#0A1A33", marginBottom: "6px", fontFamily: "var(--font-body)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>
                      <input placeholder={ph} style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1.5px solid rgba(20,34,53,0.13)", fontSize: "14px", fontFamily: "var(--font-body)", boxSizing: "border-box", outline: "none", transition: "border-color 0.15s", background: "#fafafa" }} onFocus={(e) => (e.target.style.borderColor = "#F2C94C")} onBlur={(e) => (e.target.style.borderColor = "rgba(20,34,53,0.13)")} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#0A1A33", marginBottom: "6px", fontFamily: "var(--font-body)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Service Needed</label>
                  <select style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1.5px solid rgba(20,34,53,0.13)", fontSize: "14px", fontFamily: "var(--font-body)", boxSizing: "border-box", background: "#fafafa" }}>
                    <option>Choose a service</option>
                    <option>Financial Readiness</option>
                    <option>Growth Strategy</option>
                    <option>Operations Consulting</option>
                    <option>HR Consulting</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#0A1A33", marginBottom: "6px", fontFamily: "var(--font-body)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Brief Description</label>
                  <textarea rows={3} placeholder="What are you trying to solve?" style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1.5px solid rgba(20,34,53,0.13)", fontSize: "14px", fontFamily: "var(--font-body)", boxSizing: "border-box", resize: "none", outline: "none", background: "#fafafa" }} onFocus={(e) => (e.target.style.borderColor = "#F2C94C")} onBlur={(e) => (e.target.style.borderColor = "rgba(20,34,53,0.13)")} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", borderTop: "1px solid rgba(20,34,53,0.07)", paddingTop: "20px" }}>
                <button onClick={handleClose} style={{ background: "transparent", color: "#374151", border: "1.5px solid rgba(20,34,53,0.15)", borderRadius: "10px", padding: "10px 18px", fontWeight: 600, fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-body)" }}>Cancel</button>
                <button onClick={handleClose} style={{ background: "#F2C94C", color: "#0A1A33", border: "none", borderRadius: "10px", padding: "10px 22px", fontWeight: 800, fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-body)", boxShadow: "0 4px 14px rgba(242,201,76,0.4)", display: "flex", alignItems: "center", gap: "7px" }}>
                  <Sparkles size={14} strokeWidth={2.5} />
                  Send Request
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── Info / Success ── */}
        {type === "info" && (
          <>
            {/* Confetti */}
            <Confetti />
            <div style={{ background: "linear-gradient(135deg, #052e16 0%, #14532d 100%)", padding: "48px 32px 36px", position: "relative", overflow: "hidden", textAlign: "center" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, #22c55e18 0%, transparent 65%)" }} />
              {/* Big bounce icon */}
              <div
                className="alert-bounce"
                style={{
                  width: "80px", height: "80px", borderRadius: "50%",
                  background: "rgba(34,197,94,0.2)", border: "3px solid rgba(34,197,94,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 0 40px rgba(34,197,94,0.25)",
                }}
              >
                <CheckCircle2 size={40} color="#4ade80" strokeWidth={1.8} />
              </div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: 800, color: "white", fontFamily: "var(--font-heading)" }}>
                Submission Received!
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
                Your business inquiry is in good hands.
              </p>
            </div>

            {/* Timeline */}
            <div style={{ padding: "24px 28px", borderBottom: "1px solid rgba(20,34,53,0.07)" }}>
              {[
                { icon: CheckCircle2, color: "#16a34a", label: "Inquiry submitted",        sub: "Just now",             done: true  },
                { icon: Clock,        color: "#d97706", label: "Advisor review",           sub: "Within 4 business hrs", done: false },
                { icon: CalendarCheck,color: "#3b82f6", label: "Schedule a session",       sub: "Within 1 business day", done: false },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: i < 2 ? "16px" : 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: step.done ? "#dcfce7" : "#f3f4f6", border: `2px solid ${step.done ? step.color : "#e5e7eb"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={15} color={step.done ? step.color : "#9ca3af"} strokeWidth={2} />
                      </div>
                      {i < 2 && <div style={{ width: "2px", height: "18px", background: "#e5e7eb", marginTop: "2px" }} />}
                    </div>
                    <div style={{ paddingTop: "4px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: step.done ? "#0A1A33" : "#6b7280", fontFamily: "var(--font-body)" }}>{step.label}</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "var(--font-body)" }}>{step.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: "20px 28px 28px", textAlign: "center" }}>
              <p style={{ margin: "0 0 20px 0", fontSize: "14px", lineHeight: 1.7, color: "#6b7280", fontFamily: "var(--font-body)" }}>
                A member of the JSB advisory team will review your request and reach out within one business day.
              </p>
              <button onClick={handleClose} style={{ background: "#0A1A33", color: "white", border: "none", borderRadius: "12px", padding: "12px 32px", fontWeight: 800, fontSize: "15px", cursor: "pointer", fontFamily: "var(--font-body)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={16} />
                Got it, thanks!
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Trigger Cards ───────────────────────────────────────────────────── */
const TRIGGERS: {
  type: ModalType;
  label: string;
  intent: string;
  icon: React.ElementType;
  headerBg: string;
  iconColor: string;
  iconBg: string;
  btnColor: string;
  btnText: string;
  tag: string;
}[] = [
  {
    type: "confirm", label: "Confirmation", tag: "booking",
    intent: "Used before any action that costs the user time or effort to undo. Reduces accidental submissions.",
    icon: CalendarCheck, headerBg: "linear-gradient(135deg, #0A1A33, #1a3a6b)",
    iconColor: "#F2C94C", iconBg: "rgba(242,201,76,0.15)",
    btnColor: "#F2C94C", btnText: "#0A1A33",
  },
  {
    type: "destructive", label: "Destructive", tag: "danger",
    intent: "Reserved for permanent or irreversible actions. The red signals danger before the user reads the title.",
    icon: Trash2, headerBg: "linear-gradient(135deg, #2d0a0a, #450a0a)",
    iconColor: "#f87171", iconBg: "rgba(220,38,38,0.15)",
    btnColor: "#dc2626", btnText: "#ffffff",
  },
  {
    type: "form", label: "Form Modal", tag: "input",
    intent: "Collects information in context without navigating away. Keep fields under 5.",
    icon: ClipboardList, headerBg: "linear-gradient(135deg, #0f2444, #163362)",
    iconColor: "#F2C94C", iconBg: "rgba(242,201,76,0.15)",
    btnColor: "#0A1A33", btnText: "#ffffff",
  },
  {
    type: "info", label: "Success / Info", tag: "feedback",
    intent: "Acknowledges a completed action. Often auto-dismissable. One button maximum.",
    icon: CheckCircle2, headerBg: "linear-gradient(135deg, #052e16, #14532d)",
    iconColor: "#4ade80", iconBg: "rgba(34,197,94,0.15)",
    btnColor: "#16a34a", btnText: "#ffffff",
  },
];

function TriggerCard({ t, onOpen }: { t: typeof TRIGGERS[0]; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  const Icon = t.icon;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "20px", overflow: "hidden",
        border: `2px solid ${hovered ? "rgba(242,201,76,0.4)" : "rgba(20,34,53,0.08)"}`,
        boxShadow: hovered ? "0 12px 40px rgba(10,26,51,0.12)" : "0 2px 12px rgba(10,26,51,0.05)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
        background: "white",
        cursor: "pointer",
      }}
      onClick={onOpen}
    >
      {/* Mini header preview */}
      <div style={{ background: t.headerBg, padding: "24px 20px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -10, top: -10, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${t.iconColor}18 0%, transparent 70%)` }} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: t.iconBg, border: `1.5px solid ${t.iconColor}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon size={22} color={t.iconColor} strokeWidth={1.8} />
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "white", fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>{t.label}</div>
            <span style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: t.iconColor, fontWeight: 700, fontFamily: "var(--font-body)" }}>
              {t.tag}
            </span>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "16px 20px 20px" }}>
        <p style={{ margin: "0 0 16px 0", fontSize: "13px", lineHeight: 1.65, color: "#6b7280", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
          {t.intent}
        </p>
        <button
          style={{
            width: "100%", padding: "10px", borderRadius: "10px",
            background: hovered ? t.btnColor : "transparent",
            color: hovered ? t.btnText : "#374151",
            border: `1.5px solid ${hovered ? t.btnColor : "rgba(20,34,53,0.12)"}`,
            fontWeight: 700, fontSize: "13px", cursor: "pointer",
            fontFamily: "var(--font-body)", transition: "all 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
          }}
        >
          <Icon size={13} />
          Preview {t.label}
        </button>
      </div>
    </div>
  );
}

/* ── Section Label ───────────────────────────────────────────────────── */
function SectionLabel({ label, intent }: { label: string; intent: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.25)", borderRadius: "100px", padding: "4px 14px", marginBottom: "10px" }}>
        <Zap size={11} color="#F2C94C" fill="#F2C94C" />
        <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, fontFamily: "var(--font-body)" }}>{label}</span>
      </div>
      <p style={{ margin: 0, fontSize: "14px", color: "#6b7280", fontFamily: "var(--font-body)", fontStyle: "italic" }}>{intent}</p>
    </div>
  );
}

/* ── Rule Card ───────────────────────────────────────────────────────── */
function RuleCard({ rule }: { rule: { label: string; note: string; color: string; bg: string; svg: React.ReactNode } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "linear-gradient(145deg, #0f1e33, #162a45)" : "var(--color-surface-raised, #111d2e)",
        border: `2px solid ${hovered ? rule.color + "66" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "20px",
        padding: "28px",
        boxShadow: hovered
          ? `0 16px 40px rgba(10,26,51,0.3), 0 0 0 1px ${rule.color}22, inset 0 1px 0 rgba(255,255,255,0.05)`
          : "0 2px 12px rgba(10,26,51,0.2)",
        display: "flex",
        flexDirection: "column" as const,
        gap: "18px",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "default",
      }}
    >
      {/* Icon badge */}
      <div style={{
        width: "72px", height: "72px", borderRadius: "18px",
        background: hovered ? `linear-gradient(135deg, ${rule.color}22, ${rule.color}10)` : "rgba(255,255,255,0.05)",
        border: `1.5px solid ${hovered ? rule.color + "44" : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hovered ? `0 0 20px ${rule.color}22` : "none",
        transition: "all 0.25s ease",
        transform: hovered ? "scale(1.06)" : "scale(1)",
      }}>
        {rule.svg}
      </div>

      <div>
        <div style={{
          fontSize: "16px", fontWeight: 800, color: hovered ? "white" : "rgba(255,255,255,0.9)",
          fontFamily: "var(--font-heading)", marginBottom: "7px",
          transition: "color 0.2s",
        }}>
          {rule.label}
        </div>
        <div style={{
          fontSize: "13px", color: hovered ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.45)",
          fontFamily: "var(--font-body)", lineHeight: 1.7,
          transition: "color 0.2s",
        }}>
          {rule.note}
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        height: "2px", borderRadius: "1px",
        background: `linear-gradient(to right, ${rule.color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.25s ease",
      }} />
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────────── */
export default function ModalShowcase() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const RULES: { label: string; note: string; color: string; bg: string; svg: React.ReactNode }[] = [
    {
      label: "Backdrop click", note: "Always closes the modal. Never trap the user.",
      color: "#3b82f6", bg: "#dbeafe",
      svg: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          {/* Ripple circles */}
          <circle className="ripple1" cx="24" cy="28" r="10" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.9" />
          <circle className="ripple2" cx="24" cy="28" r="10" stroke="#3b82f6" strokeWidth="1"   fill="none" opacity="0.7" />
          <circle className="ripple3" cx="24" cy="28" r="10" stroke="#3b82f6" strokeWidth="0.8" fill="none" opacity="0.5" />
          {/* Cursor arrow */}
          <g className="key-depress">
            <polygon points="14,10 14,30 19,25 23,35 26,34 22,24 28,24" fill="#3b82f6" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
          </g>
        </svg>
      ),
    },
    {
      label: "Escape key", note: "Keyboard dismissal is required for accessibility.",
      color: "#d97706", bg: "#fef3c7",
      svg: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          {/* Key body */}
          <g className="key-depress">
            <rect x="6" y="16" width="36" height="20" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <rect x="9" y="19" width="30" height="14" rx="3" fill="#fde68a" stroke="#d97706" strokeWidth="1"/>
            {/* ESC text */}
            <text x="24" y="30" textAnchor="middle" fontSize="9" fontWeight="800" fill="#92400e" fontFamily="monospace">ESC</text>
            {/* Key shadow at bottom */}
            <rect x="6" y="32" width="36" height="5" rx="4" fill="#d97706" opacity="0.25"/>
          </g>
          {/* Up arrow above key */}
          <path d="M24 8 L20 13 L28 13 Z" fill="#d97706" opacity="0.6"/>
        </svg>
      ),
    },
    {
      label: "Scroll lock", note: "Background should not scroll while modal is open.",
      color: "#16a34a", bg: "#dcfce7",
      svg: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          {/* Lock body */}
          <g className="lock-body">
            <rect x="11" y="24" width="26" height="18" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
            {/* Keyhole */}
            <circle cx="24" cy="32" r="3.5" fill="#16a34a"/>
            <rect x="22.5" y="32" width="3" height="5" rx="1" fill="#16a34a"/>
          </g>
          {/* Shackle */}
          <g className="shackle-anim" style={{ transformOrigin: "24px 24px" }}>
            <path d="M16 24 L16 18 Q16 10 24 10 Q32 10 32 18 L32 24" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </g>
        </svg>
      ),
    },
    {
      label: "Focus trap", note: "Tab key cycles only within the modal when open.",
      color: "#a855f7", bg: "#f3e8ff",
      svg: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          {/* Dashed spinning border */}
          <rect className="dash-rotate" x="6" y="6" width="36" height="36" rx="10"
            stroke="#a855f7" strokeWidth="2" strokeDasharray="8 4" fill="none"/>
          {/* Center target dot */}
          <circle cx="24" cy="24" r="5" fill="#a855f7" opacity="0.85"/>
          <circle cx="24" cy="24" r="9" stroke="#a855f7" strokeWidth="1.5" fill="none" opacity="0.4"/>
          {/* Tab arrow cycling */}
          <g className="arrow-cycle">
            <path d="M32 18 L36 18 L36 30 L28 30" stroke="#a855f7" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M28 27 L28 33 L34 30 Z" fill="#a855f7"/>
          </g>
        </svg>
      ),
    },
  ];

  return (
    <section style={{ padding: "96px 24px", background: "linear-gradient(to bottom, #f8f9fb 0%, #0a1220 60%)" }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

        {/* ── Header Banner ── */}
        <div style={{
          borderRadius: "28px",
          background: "linear-gradient(135deg, #0A1A33 0%, #142240 60%, #0d2040 100%)",
          padding: "64px 56px", marginBottom: "64px",
          position: "relative", overflow: "hidden",
        }}>
          {[
            { color: "#F2C94C", size: 240, top: -50, right: 60,   opacity: 0.1 },
            { color: "#3b82f6", size: 160, bottom: -40, right: 240, opacity: 0.1 },
            { color: "#a855f7", size: 120, top: 30, right: -30,   opacity: 0.08 },
          ].map((o, i) => (
            <div key={i} style={{
              position: "absolute", borderRadius: "50%", width: o.size, height: o.size,
              top: (o as any).top, bottom: (o as any).bottom, right: o.right,
              background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
              opacity: o.opacity, pointerEvents: "none",
              animation: `orbFloat${(i % 4) + 1} ${8 + i * 2}s ease-in-out infinite`,
            }} />
          ))}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242,201,76,0.15)", border: "1px solid rgba(242,201,76,0.3)", borderRadius: "100px", padding: "5px 16px", marginBottom: "24px" }}>
              <FocusIcon size={12} color="#F2C94C" />
              <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, fontFamily: "var(--font-body)" }}>Modals</span>
            </div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.08, fontWeight: 800, margin: "0 0 20px 0", maxWidth: "660px", fontFamily: "var(--font-heading)", color: "white", letterSpacing: "-0.03em" }}>
              Modals interrupt.{" "}
              <span style={{ color: "#F2C94C" }}>Use them only when the moment demands full attention.</span>
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "580px", margin: 0, fontFamily: "var(--font-body)" }}>
              A modal is a forced pause. It removes all other context and demands a decision.
              Use sparingly — every unnecessary modal trains users to dismiss without reading.
            </p>
          </div>
        </div>

        {/* ── Variant Cards ── */}
        <div style={{ marginBottom: "64px" }}>
          <SectionLabel label="Variants" intent="Click any card to preview. Press Escape or click the backdrop to dismiss." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
            {TRIGGERS.map((t) => (
              <TriggerCard key={t.type} t={t} onOpen={() => setActiveModal(t.type)} />
            ))}
          </div>
        </div>

        {/* ── Behavior Rules ── */}
        <div>
          <SectionLabel label="Behavior Rules" intent="These constraints are not optional — they define accessible, trustworthy modal patterns." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            {RULES.map((rule) => (
              <RuleCard key={rule.label} rule={rule} />
            ))}
          </div>
        </div>

      </div>

      {activeModal && <Modal type={activeModal} onClose={() => setActiveModal(null)} />}
    </section>
  );
}
