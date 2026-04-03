"use client";
import { useState } from "react";
import {
  User, Mail, Briefcase, MessageSquare, ChevronDown,
  ChevronRight, ChevronLeft, CheckCircle, Loader2,
  TrendingUp, Settings2, Target, Rocket,
} from "lucide-react";

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  fontFamily: "var(--font-body)",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
  background: "white",
  color: "#0A1A33",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 700,
  fontSize: "13px",
  color: "#0A1A33",
  marginBottom: "6px",
  fontFamily: "var(--font-body)",
};

const hintStyle: React.CSSProperties = {
  fontSize: "12px",
  marginTop: "6px",
  fontFamily: "var(--font-body)",
  lineHeight: 1.5,
};

function Field({
  label,
  hint,
  error,
  success,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  success?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label && <label style={labelStyle}>{label}</label>}
      {children}
      {error && <p style={{ ...hintStyle, color: "#b84040" }}>⚠ {error}</p>}
      {success && <p style={{ ...hintStyle, color: "#2f7a51" }}>✓ {success}</p>}
      {!error && !success && hint && (
        <p style={{ ...hintStyle, color: "#9ca3af" }}>{hint}</p>
      )}
    </div>
  );
}

function FocusInput({
  type = "text",
  placeholder,
  state,
  defaultValue,
}: {
  type?: string;
  placeholder?: string;
  state?: "error" | "success" | "disabled";
  defaultValue?: string;
}) {
  const [focused, setFocused] = useState(false);

  const borderColor =
    state === "error" ? "#b84040"
    : state === "success" ? "#2f7a51"
    : focused ? "#0A1A33"
    : "rgba(20,34,53,0.18)";

  const boxShadow =
    state === "error" && focused ? "0 0 0 3px rgba(184,64,64,0.12)"
    : state === "success" && focused ? "0 0 0 3px rgba(47,122,81,0.12)"
    : focused ? "0 0 0 3px rgba(10,26,51,0.08)"
    : "none";

  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={state === "disabled"}
      style={{
        ...inputBase,
        border: `1.5px solid ${borderColor}`,
        boxShadow,
        background: state === "disabled" ? "#f3f4f6" : "white",
        color: state === "disabled" ? "#9ca3af" : "#0A1A33",
        cursor: state === "disabled" ? "not-allowed" : "text",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function IconInput({
  icon,
  type = "text",
  placeholder,
}: {
  icon: React.ReactNode;
  type?: string;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
        display: "flex", alignItems: "center", pointerEvents: "none", color: focused ? "#0A1A33" : "#9ca3af",
        transition: "color 0.2s",
      }}>
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          ...inputBase,
          paddingLeft: "40px",
          border: `1.5px solid ${focused ? "#0A1A33" : "rgba(20,34,53,0.18)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(10,26,51,0.08)" : "none",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

/* ── Floating Label Input ────────────────────────────────────────────── */
function FloatingLabelInput({
  label,
  type = "text",
  hint,
}: {
  label: string;
  type?: string;
  hint?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const up = focused || value.length > 0;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <label
          style={{
            position: "absolute",
            left: "14px",
            top: up ? "8px" : "50%",
            transform: up ? "translateY(0) scale(0.78)" : "translateY(-50%) scale(1)",
            transformOrigin: "left top",
            fontSize: "14px",
            color: focused ? "#0A1A33" : "#9ca3af",
            fontFamily: "var(--font-body)",
            fontWeight: up ? 700 : 400,
            pointerEvents: "none",
            transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 1,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...inputBase,
            paddingTop: up ? "22px" : "14px",
            paddingBottom: up ? "6px" : "14px",
            border: `1.5px solid ${focused ? "#0A1A33" : "rgba(20,34,53,0.18)"}`,
            boxShadow: focused ? "0 0 0 3px rgba(10,26,51,0.08)" : "none",
            transition: "border-color 0.2s, box-shadow 0.2s, padding 0.22s",
          }}
        />
      </div>
      {hint && <p style={{ ...hintStyle, color: "#9ca3af" }}>{hint}</p>}
    </div>
  );
}

/* ── Segmented Control ───────────────────────────────────────────────── */
function SegmentedControl({
  tabs,
  theme = "light",
}: {
  tabs: string[];
  theme?: "light" | "dark";
}) {
  const [active, setActive] = useState(0);
  const isDark = theme === "dark";

  return (
    <div
      style={{
        display: "inline-flex",
        background: isDark ? "rgba(255,255,255,0.09)" : "rgba(20,34,53,0.07)",
        borderRadius: "999px",
        padding: "4px",
        position: "relative",
        gap: 0,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "4px",
          bottom: "4px",
          left: `calc(4px + ${active} * (100% - 8px) / ${tabs.length})`,
          width: `calc((100% - 8px) / ${tabs.length})`,
          background: isDark ? "#ffffff" : "#0A1A33",
          borderRadius: "999px",
          transition: "left 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
        }}
      />
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          style={{
            position: "relative",
            zIndex: 1,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px 20px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: i === active ? 700 : 500,
            color:
              i === active
                ? isDark ? "#0A1A33" : "#ffffff"
                : isDark ? "rgba(255,255,255,0.5)" : "rgba(10,26,51,0.45)",
            fontFamily: "var(--font-body)",
            transition: "color 0.22s ease",
            whiteSpace: "nowrap",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

/* ── Range Slider ────────────────────────────────────────────────────── */
function RangeSlider({
  label,
  min = 0,
  max = 10,
  defaultValue = 5,
  unit = "",
  accentColor = "#0A1A33",
  trackColor = "rgba(20,34,53,0.12)",
}: {
  label: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  unit?: string;
  accentColor?: string;
  trackColor?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#0A1A33",
            fontFamily: "var(--font-body)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            background: accentColor,
            color: accentColor === "#0A1A33" ? "#F2C94C" : "#0A1A33",
            padding: "3px 12px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
            fontFamily: "var(--font-body)",
          }}
        >
          {value}
          {unit}
        </span>
      </div>
      <div style={{ position: "relative", height: "20px", display: "flex", alignItems: "center" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            height: "4px",
            background: trackColor,
            borderRadius: "999px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${pct}%`,
            height: "4px",
            background: accentColor,
            borderRadius: "999px",
            transition: "width 0.1s ease",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="jsb-range"
          style={{
            position: "absolute",
            width: "100%",
            opacity: 0,
            cursor: "pointer",
            height: "20px",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `calc(${pct}% - 10px)`,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: accentColor,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transition: "left 0.1s ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

/* ── Multi-Step Animated Form ────────────────────────────────────────── */
const SERVICES = [
  { id: "advisory", Icon: Briefcase,  title: "Business Advisory",    desc: "Strategic direction for founders" },
  { id: "ops",      Icon: Settings2,  title: "Operations Consulting", desc: "Streamline workflows and cut overhead" },
  { id: "finance",  Icon: TrendingUp, title: "Financial Readiness",   desc: "Books, forecasts, and funding prep" },
  { id: "growth",   Icon: Rocket,     title: "Growth Strategy",       desc: "Systems for next-stage expansion" },
];

const STEP_LABELS = ["Contact", "Service", "Message"];

function FloatingInput({
  label, type = "text", value, onChange,
}: { label: string; type?: string; value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  const up = focused || value.length > 0;
  return (
    <div style={{ position: "relative" }}>
      <label style={{
        position: "absolute", left: "14px",
        top: up ? "8px" : "50%",
        transform: up ? "translateY(0) scale(0.78)" : "translateY(-50%) scale(1)",
        transformOrigin: "left top", fontSize: "14px",
        color: focused ? "#0A1A33" : "#9ca3af",
        fontFamily: "var(--font-body)", fontWeight: up ? 700 : 400,
        pointerEvents: "none", transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", zIndex: 1,
      }}>
        {label}
      </label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          ...inputBase,
          paddingTop: up ? "22px" : "14px", paddingBottom: up ? "6px" : "14px",
          border: `1.5px solid ${focused ? "#0A1A33" : "rgba(20,34,53,0.18)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(10,26,51,0.08)" : "none",
          transition: "border-color 0.2s, box-shadow 0.2s, padding 0.22s",
        }}
      />
    </div>
  );
}

function MultiStepForm() {
  const [step, setStep]           = useState(0);
  const [dir, setDir]             = useState<"right" | "left">("right");
  const [stepKey, setStepKey]     = useState(0);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [company, setCompany]     = useState("");
  const [service, setService]     = useState("");
  const [message, setMessage]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]           = useState(false);
  const MAX = 200;

  const go = (next: number, d: "right" | "left") => {
    setDir(d);
    setStep(next);
    setStepKey(k => k + 1);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1600);
  };

  const reset = () => {
    setDir("right"); setStep(0); setStepKey(k => k + 1);
    setName(""); setEmail(""); setCompany(""); setService(""); setMessage("");
    setDone(false); setSubmitting(false);
  };

  // ── Progress bar ──────────────────────────────────────────────────────
  const Progress = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "36px", gap: 0 }}>
      {STEP_LABELS.map((label, i) => {
        const complete = i < step;
        const active   = i === step;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: complete ? "#0A1A33" : active ? "#F2C94C" : "rgba(20,34,53,0.08)",
                color: complete ? "#F2C94C" : active ? "#0A1A33" : "#9ca3af",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "13px", fontFamily: "var(--font-body)",
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: active ? "0 0 0 4px rgba(242,201,76,0.25)" : "none",
              }}>
                {complete ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span style={{
                fontSize: "11px", fontFamily: "var(--font-body)", fontWeight: active ? 700 : 500,
                color: active ? "#0A1A33" : "#9ca3af", transition: "color 0.3s",
              }}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div style={{ width: "80px", height: "2px", background: "rgba(20,34,53,0.08)", position: "relative", margin: "0 4px", marginBottom: "22px" }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, height: "100%",
                  width: i < step ? "100%" : "0%",
                  background: "#F2C94C",
                  transition: "width 0.45s cubic-bezier(0.22,1,0.36,1)",
                  borderRadius: "999px",
                }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ── Success screen ────────────────────────────────────────────────────
  if (done) return (
    <div className="fs-pop" style={{ textAlign: "center", padding: "64px 32px" }}>
      <div style={{
        width: "80px", height: "80px", borderRadius: "50%",
        background: "rgba(47,122,81,0.12)", display: "flex",
        alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="19" stroke="#2f7a51" strokeWidth="2" />
          <polyline
            points="11,21 17,27 29,14"
            stroke="#2f7a51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="30" strokeDashoffset="0"
            style={{ animation: "fs-check 0.45s 0.1s cubic-bezier(0.22,1,0.36,1) both" }}
          />
        </svg>
      </div>
      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "22px", color: "#0A1A33", margin: "0 0 10px" }}>
        Thanks, {name || "there"}!
      </h3>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#6b7280", margin: "0 0 28px" }}>
        We received your inquiry about <strong>{SERVICES.find(s => s.id === service)?.title || "your project"}</strong>.<br />
        We'll reach out within 24 hours.
      </p>
      <button
        onClick={reset}
        style={{
          background: "#0A1A33", color: "#F2C94C", border: "none",
          padding: "10px 24px", borderRadius: "999px", cursor: "pointer",
          fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "13px",
        }}
      >
        Submit another
      </button>
    </div>
  );

  // ── Main form ─────────────────────────────────────────────────────────
  return (
    <div>
      <Progress />
      <div
        key={stepKey}
        className={dir === "right" ? "fs-slide-right" : "fs-slide-left"}
      >
        {/* Step 1 — Contact */}
        {step === 0 && (
          <div style={{ display: "grid", gap: "18px" }}>
            <FloatingInput label="Full Name"    value={name}    onChange={setName} />
            <FloatingInput label="Email Address" type="email" value={email}   onChange={setEmail} />
            <FloatingInput label="Company Name" value={company} onChange={setCompany} />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
              <button
                onClick={() => go(1, "right")}
                disabled={!name || !email}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: name && email ? "#F2C94C" : "rgba(20,34,53,0.08)",
                  color: name && email ? "#0A1A33" : "#9ca3af",
                  border: "none", padding: "12px 28px", borderRadius: "999px",
                  cursor: name && email ? "pointer" : "not-allowed",
                  fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "14px",
                  transition: "all 0.25s ease",
                  boxShadow: name && email ? "0 4px 14px rgba(242,201,76,0.35)" : "none",
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Service */}
        {step === 1 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              {SERVICES.map(svc => {
                const active = service === svc.id;
                return (
                  <button
                    key={svc.id}
                    onClick={() => setService(svc.id)}
                    style={{
                      background: active ? "rgba(242,201,76,0.07)" : "white",
                      border: `2px solid ${active ? "#F2C94C" : "rgba(20,34,53,0.12)"}`,
                      borderRadius: "12px", padding: "18px 16px", cursor: "pointer",
                      textAlign: "left", transition: "all 0.22s ease",
                      transform: active ? "scale(1.025)" : "scale(1)",
                      boxShadow: active ? "0 4px 16px rgba(242,201,76,0.2)" : "none",
                    }}
                  >
                    <svc.Icon size={22} color={active ? "#d97706" : "#0A1A33"} style={{ marginBottom: "10px", display: "block" }} />
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#0A1A33", fontFamily: "var(--font-body)", marginBottom: "4px" }}>
                      {svc.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>
                      {svc.desc}
                    </div>
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => go(0, "left")}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "transparent", color: "#6b7280",
                  border: "1.5px solid rgba(20,34,53,0.15)", padding: "10px 20px",
                  borderRadius: "999px", cursor: "pointer",
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "13px",
                }}
              >
                <ChevronLeft size={15} /> Back
              </button>
              <button
                onClick={() => go(2, "right")}
                disabled={!service}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: service ? "#F2C94C" : "rgba(20,34,53,0.08)",
                  color: service ? "#0A1A33" : "#9ca3af",
                  border: "none", padding: "10px 24px", borderRadius: "999px",
                  cursor: service ? "pointer" : "not-allowed",
                  fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "13px",
                  transition: "all 0.25s ease",
                  boxShadow: service ? "0 4px 14px rgba(242,201,76,0.35)" : "none",
                }}
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Message */}
        {step === 2 && (
          <div>
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <textarea
                rows={5}
                placeholder="Tell us what you're working through — the more context, the better."
                value={message}
                onChange={e => setMessage(e.target.value.slice(0, MAX))}
                style={{
                  ...inputBase, resize: "none", lineHeight: 1.65,
                  border: `1.5px solid ${message.length > 0 ? "#0A1A33" : "rgba(20,34,53,0.18)"}`,
                  boxShadow: message.length > 0 ? "0 0 0 3px rgba(10,26,51,0.07)" : "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              />
              <div style={{
                position: "absolute", bottom: "10px", right: "14px",
                fontSize: "11px", color: message.length > MAX * 0.85 ? "#b84040" : "#9ca3af",
                fontFamily: "var(--font-body)",
              }}>
                {message.length}/{MAX}
              </div>
            </div>
            {/* Char progress bar */}
            <div style={{ height: "3px", background: "rgba(20,34,53,0.08)", borderRadius: "999px", marginBottom: "20px", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: "999px",
                width: `${(message.length / MAX) * 100}%`,
                background: message.length > MAX * 0.85 ? "#b84040" : "#F2C94C",
                transition: "width 0.15s ease, background 0.3s ease",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => go(1, "left")}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "transparent", color: "#6b7280",
                  border: "1.5px solid rgba(20,34,53,0.15)", padding: "10px 20px",
                  borderRadius: "999px", cursor: "pointer",
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "13px",
                }}
              >
                <ChevronLeft size={15} /> Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !message}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  width: submitting ? "56px" : "auto",
                  height: "44px",
                  padding: submitting ? "0" : "10px 32px",
                  borderRadius: submitting ? "50%" : "999px",
                  background: "#0A1A33",
                  color: "#F2C94C",
                  border: "none",
                  cursor: submitting ? "wait" : message ? "pointer" : "not-allowed",
                  fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "14px",
                  transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1), border-radius 0.4s cubic-bezier(0.34,1.56,0.64,1), padding 0.4s ease",
                  boxShadow: "0 4px 14px rgba(10,26,51,0.25)",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  opacity: !message ? 0.45 : 1,
                }}
              >
                {submitting
                  ? <Loader2 size={20} className="fs-spin" />
                  : "Submit Inquiry"
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CustomCheckbox({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        fontSize: "14px",
        color: "#374151",
        fontFamily: "var(--font-body)",
        userSelect: "none",
      }}
      onClick={() => setChecked(!checked)}
    >
      <div style={{
        width: "18px",
        height: "18px",
        borderRadius: "5px",
        border: `2px solid ${checked ? "#0A1A33" : "rgba(20,34,53,0.25)"}`,
        background: checked ? "#0A1A33" : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
        flexShrink: 0,
      }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      {label}
    </label>
  );
}

function CustomRadio({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        fontSize: "14px",
        color: "#374151",
        fontFamily: "var(--font-body)",
        userSelect: "none",
      }}
      onClick={() => setChecked(true)}
    >
      <div style={{
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        border: `2px solid ${checked ? "#0A1A33" : "rgba(20,34,53,0.25)"}`,
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
        flexShrink: 0,
      }}>
        {checked && (
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0A1A33" }} />
        )}
      </div>
      {label}
    </label>
  );
}

function SectionLabel({ label, intent }: { label: string; intent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "12px" }}>
      <div style={{
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#9ca3af",
        fontWeight: 700,
        fontFamily: "var(--font-body)",
        whiteSpace: "nowrap",
      }}>
        {label}
      </div>
      <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
        {intent}
      </div>
    </div>
  );
}

/* ── Dark Section Label ──────────────────────────────────────────────── */
function SectionLabelDark({ label, intent }: { label: string; intent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "14px", flexWrap: "wrap" }}>
      <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
        {label}
      </div>
      <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.32)", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
        {intent}
      </div>
    </div>
  );
}

/* ── EQ Column (vertical range slider) ──────────────────────────────── */
function EQColumn({ label, min = 0, max = 100, defaultValue = 50, accent = "#F2C94C", unit = "%" }: {
  label: string; min?: number; max?: number; defaultValue?: number; accent?: string; unit?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [dragging, setDragging] = useState(false);
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div style={{ fontSize: "15px", fontWeight: 700, color: accent, fontFamily: "var(--font-body)", letterSpacing: "0.04em", minHeight: "22px" }}>
        {value}{unit}
      </div>
      <div style={{ position: "relative", width: "44px", height: "200px", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "absolute", width: "8px", top: 0, bottom: 0, borderRadius: "4px", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", width: "8px", bottom: 0, height: `${pct}%`, borderRadius: "4px", background: `linear-gradient(to top, ${accent}, ${accent}bb)`, boxShadow: `0 0 14px ${accent}66`, transition: dragging ? "none" : "height 0.08s ease" }} />
        <div style={{ position: "absolute", bottom: `calc(${pct}% - 10px)`, width: "20px", height: "20px", borderRadius: "50%", background: accent, boxShadow: `0 0 18px ${accent}`, zIndex: 1, pointerEvents: "none", transition: dragging ? "none" : "bottom 0.08s ease" }} />
        <input
          type="range" min={min} max={max} value={value}
          onChange={e => setValue(Number(e.target.value))}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          style={{ position: "absolute", width: "200px", height: "44px", top: "calc(50% - 22px)", left: "calc(50% - 100px)", transform: "rotate(-90deg)", opacity: 0, cursor: "ns-resize", zIndex: 2 }}
        />
      </div>
      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)", textAlign: "center", maxWidth: "70px", lineHeight: 1.35, letterSpacing: "0.02em" }}>
        {label}
      </div>
    </div>
  );
}

/* ── Glow Checkbox ───────────────────────────────────────────────────── */
function GlowCheckbox({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <label onClick={() => setChecked(c => !c)} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", userSelect: "none" }}>
      <div style={{
        width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0,
        border: `2px solid ${checked ? "#F2C94C" : "rgba(255,255,255,0.16)"}`,
        background: checked ? "rgba(242,201,76,0.1)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: checked ? "0 0 16px rgba(242,201,76,0.45)" : "none",
        transition: "all 0.2s ease",
      }}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F2C94C" strokeWidth="3.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span style={{ fontSize: "14px", color: checked ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.38)", fontFamily: "var(--font-body)", transition: "color 0.2s" }}>
        {label}
      </span>
    </label>
  );
}

/* ── Glow Radio ──────────────────────────────────────────────────────── */
function GlowRadio({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <label onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", userSelect: "none" }}>
      <div style={{
        width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
        border: `2px solid ${checked ? "#F2C94C" : "rgba(255,255,255,0.16)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: checked ? "0 0 16px rgba(242,201,76,0.45)" : "none",
        transition: "all 0.2s ease",
      }}>
        {checked && (
          <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#F2C94C", boxShadow: "0 0 8px #F2C94C" }} />
        )}
      </div>
      <span style={{ fontSize: "14px", color: checked ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.38)", fontFamily: "var(--font-body)", transition: "color 0.2s" }}>
        {label}
      </span>
    </label>
  );
}

// ✅ useState hover instead of DOM manipulation
function SubmitButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#e6bc3a" : "#F2C94C",
        color: "#0A1A33",
        border: "none",
        borderRadius: "10px",
        padding: "13px 24px",
        fontWeight: 700,
        fontSize: "14px",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        boxShadow: hovered
          ? "0 8px 20px rgba(242,201,76,0.4)"
          : "0 4px 14px rgba(242,201,76,0.35)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        transition: "all 0.18s ease",
      }}
    >
      Submit Inquiry
    </button>
  );
}

export default function FormsShowcase() {
  const [submitted, setSubmitted] = useState(false);
  const [contactMethod, setContactMethod] = useState("Email");

  return (
    <section style={{ padding: "96px 24px", background: "#040c1a" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* ── HEADER ───────────────────────────────────────────────── */}
        <div style={{ marginBottom: "80px", position: "relative" }}>
          <div style={{ position: "absolute", inset: "-40px -60px", backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", width: "500px", height: "400px", top: "-100px", right: "-80px", background: "radial-gradient(circle,rgba(242,201,76,0.06) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#F2C94C", fontWeight: 700, margin: "0 0 16px", fontFamily: "var(--font-body)" }}>
              Forms
            </p>
            <h2 style={{ fontSize: "48px", lineHeight: 1.06, letterSpacing: "-0.03em", fontWeight: 700, margin: "0 0 18px", maxWidth: "720px", fontFamily: "var(--font-heading)", color: "#ffffff" }}>
              Forms earn trust or<br />lose it in seconds.
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.8, color: "rgba(255,255,255,0.42)", maxWidth: "560px", margin: "0 0 30px", fontFamily: "var(--font-body)" }}>
              Clear labels, immediate feedback, and consistent states reduce friction and signal professionalism.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {["Signal Lab", "Allocation Console", "Multi-Step", "Command Matrix"].map(chip => (
                <div key={chip} style={{ padding: "5px 14px", borderRadius: "100px", background: "rgba(242,201,76,0.08)", border: "1px solid rgba(242,201,76,0.22)", fontSize: "11px", fontWeight: 700, color: "#F2C94C", fontFamily: "var(--font-body)", letterSpacing: "0.06em" }}>
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SIGNAL LAB — Input States ──────────────────────────── */}
        <div style={{ marginBottom: "56px" }}>
          <SectionLabelDark label="Signal Lab — Input States" intent="Every state communicates. Focus confirms, error corrects, success reassures, disabled explains." />
          <div style={{ background: "#070e1c", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", overflow: "hidden" }}>
            {[
              { key: "DEFAULT",  dot: "rgba(255,255,255,0.22)", dotGlow: false, border: "rgba(255,255,255,0.12)", bg: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.22)", inputColor: "rgba(255,255,255,0.75)", hint: "Click to see focus state",      placeholder: "Full name",         dv: undefined,             disabled: false },
              { key: "FOCUS",    dot: "#60a5fa",                dotGlow: true,  border: "#60a5fa",                bg: "rgba(96,165,250,0.05)",  color: "#60a5fa",               inputColor: "rgba(255,255,255,0.88)", hint: "Ring activates on click",   placeholder: "Enter full name",   dv: undefined,             disabled: false },
              { key: "ERROR",    dot: "#f87171",                dotGlow: true,  border: "#f87171",                bg: "rgba(248,113,113,0.05)", color: "#f87171",               inputColor: "rgba(255,255,255,0.85)", hint: "⚠ This field is required.", placeholder: "Email address",     dv: "not@valid",           disabled: false },
              { key: "SUCCESS",  dot: "#4ade80",                dotGlow: true,  border: "#4ade80",                bg: "rgba(74,222,128,0.05)",  color: "#4ade80",               inputColor: "rgba(255,255,255,0.88)", hint: "✓ Looks good!",             placeholder: "",                  dv: "marcus@jsb.co",       disabled: false },
              { key: "DISABLED", dot: "rgba(255,255,255,0.1)",  dotGlow: false, border: "rgba(255,255,255,0.05)", bg: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.18)", inputColor: "rgba(255,255,255,0.2)", hint: "Field unavailable.",        placeholder: "Unavailable",       dv: "Read-only value",     disabled: true  },
            ].map((row, i, arr) => (
              <div key={row.key} style={{ display: "grid", gridTemplateColumns: "110px 1fr", alignItems: "center", gap: "20px", padding: "18px 28px", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: row.dot, boxShadow: row.dotGlow ? `0 0 8px ${row.dot}` : "none", flexShrink: 0 }} />
                  <span style={{ fontSize: "10px", fontWeight: 700, color: row.color, fontFamily: "var(--font-body)", letterSpacing: "0.08em" }}>{row.key}</span>
                </div>
                <div>
                  <input
                    placeholder={row.placeholder}
                    defaultValue={row.dv}
                    disabled={row.disabled}
                    style={{
                      width: "100%", padding: "11px 14px", borderRadius: "10px",
                      fontSize: "14px", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box",
                      background: row.bg, border: `1.5px solid ${row.border}`,
                      color: row.inputColor,
                      boxShadow: row.dotGlow ? `0 0 0 3px ${row.dot}22` : "none",
                      cursor: row.disabled ? "not-allowed" : "text",
                    }}
                  />
                  <p style={{ margin: "5px 0 0", fontSize: "11px", fontFamily: "var(--font-body)", color: row.color }}>{row.hint}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FLOATING LABELS ─────────────────────────────────────── */}
        <div style={{ marginBottom: "56px" }}>
          <SectionLabelDark label="Floating Labels" intent="Label lives inside the field at rest, animates above on focus or fill. No vertical space wasted." />
          <div style={{ background: "#070e1c", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <FloatingLabelInput label="Full Name" />
            <FloatingLabelInput label="Company Name" />
            <FloatingLabelInput label="Email Address" type="email" hint="We'll never share your email." />
            <FloatingLabelInput label="Phone Number" type="tel" hint="Optional — for call-back requests." />
          </div>
        </div>

        {/* ── SEGMENTED CONTROL ───────────────────────────────────── */}
        <div style={{ marginBottom: "56px" }}>
          <SectionLabelDark label="Segmented Control" intent="A sliding pill indicator shows active state without page reload. Use for filtering or view modes." />
          <div style={{ background: "#070e1c", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "32px 28px", display: "flex", flexDirection: "column", gap: "20px", alignItems: "flex-start" }}>
            <SegmentedControl tabs={["Account", "Notifications", "Sharing", "Billing"]} theme="dark" />
            <SegmentedControl tabs={["Overview", "Reports", "Activity"]} theme="dark" />
            <SegmentedControl tabs={["Monthly", "Quarterly", "Annual"]} theme="dark" />
          </div>
        </div>

        {/* ── ALLOCATION CONSOLE — EQ Sliders ─────────────────────── */}
        <div style={{ marginBottom: "56px" }}>
          <SectionLabelDark label="Allocation Console" intent="Drag each column to reallocate. Vertical sliders = instant visual clarity across multiple dimensions." />
          <div style={{ background: "#070e1c", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "40px 36px 36px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(242,201,76,0.3),transparent)", pointerEvents: "none" }} />
            <div style={{ fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-body)", marginBottom: "28px", textTransform: "uppercase" }}>
              ▸ Weekly Resource Allocation — drag columns to adjust
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", gap: "8px", flexWrap: "wrap" }}>
              <EQColumn label="Strategic Advisory"  accent="#F2C94C" defaultValue={70} unit="%" />
              <EQColumn label="Operations"           accent="#60a5fa" defaultValue={45} unit="%" />
              <EQColumn label="Financial Review"     accent="#4ade80" defaultValue={60} unit="%" />
              <EQColumn label="Client Calls"         accent="#f472b6" defaultValue={30} unit="h" max={40} />
              <EQColumn label="Business Dev"         accent="#fb923c" defaultValue={55} unit="%" />
              <EQColumn label="Team Capacity"        accent="#a78bfa" defaultValue={80} unit="%" />
            </div>
          </div>
        </div>

        {/* ── SELECT & TEXTAREA ───────────────────────────────────── */}
        <div style={{ marginBottom: "56px" }}>
          <SectionLabelDark label="Select & Textarea" intent="Dropdowns reduce typos. Textareas give room for context — limit to one per form." />
          <div style={{ background: "#070e1c", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "28px", display: "grid", gap: "24px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", marginBottom: "8px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Service Needed</label>
              <select style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", fontSize: "14px", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", cursor: "pointer" }}>
                <option style={{ background: "#0a1628" }}>Choose a service</option>
                <option style={{ background: "#0a1628" }}>Business Advisory</option>
                <option style={{ background: "#0a1628" }}>Operations Consulting</option>
                <option style={{ background: "#0a1628" }}>Financial Readiness</option>
                <option style={{ background: "#0a1628" }}>Growth Strategy</option>
              </select>
              <p style={{ margin: "6px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>Select the service closest to your current need.</p>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", marginBottom: "8px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Project Details</label>
              <textarea rows={4} placeholder="Tell us about your business and what you're trying to solve..." style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", fontSize: "14px", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", resize: "vertical", lineHeight: 1.6 }} />
              <p style={{ margin: "6px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>Describe your situation in 2–3 sentences. We read every submission.</p>
            </div>
          </div>
        </div>

        {/* ── COMMAND MATRIX — Selection Controls ─────────────────── */}
        <div style={{ marginBottom: "56px" }}>
          <SectionLabelDark label="Command Matrix — Selection Controls" intent="Radios enforce single choice. Checkboxes allow multiple. Each selection triggers a gold glow." />
          <div style={{ background: "#070e1c", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#F2C94C", fontFamily: "var(--font-body)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "18px" }}>Preferred Contact</div>
              <div style={{ display: "grid", gap: "14px" }}>
                {["Email", "Phone call", "Video meeting"].map(opt => (
                  <GlowRadio key={opt} label={opt} checked={contactMethod === opt} onClick={() => setContactMethod(opt)} />
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#F2C94C", fontFamily: "var(--font-body)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "18px" }}>Services of Interest</div>
              <div style={{ display: "grid", gap: "14px" }}>
                <GlowCheckbox label="Financial Readiness" defaultChecked />
                <GlowCheckbox label="Operations Support" />
                <GlowCheckbox label="Growth Planning" />
              </div>
            </div>
          </div>
        </div>

        {/* ── MULTI-STEP FORM ──────────────────────────────────────── */}
        <div style={{ marginBottom: "56px" }}>
          <SectionLabelDark label="Multi-Step Form — Animated" intent="Spring transitions between steps. Progress fills in real time. Submit morphs to spinner then success screen." />
          <div style={{ background: "#070e1c", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "24px", maxWidth: "568px" }}>
            <div style={{ background: "#f7f4ee", borderRadius: "14px", padding: "40px", overflow: "hidden" }}>
              <MultiStepForm />
            </div>
          </div>
        </div>

        {/* ── IN CONTEXT — Full Form (light contrast) ─────────────── */}
        <div>
          <SectionLabelDark label="In Context — Full Form" intent="Light-surface implementation — the same system, different environment. Contrast shows versatility." />
          <div style={{ background: "white", borderRadius: "20px", padding: "40px", maxWidth: "600px", boxShadow: "0 8px 40px rgba(0,0,0,0.28)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#dff5e8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f7a51" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#0A1A33", fontFamily: "var(--font-heading)", marginBottom: "8px" }}>Inquiry Submitted</div>
                <div style={{ fontSize: "14px", color: "#6b7280", fontFamily: "var(--font-body)", marginBottom: "24px" }}>We'll be in touch within one business day.</div>
                <button onClick={() => setSubmitted(false)} style={{ background: "transparent", border: "1.5px solid rgba(20,34,53,0.15)", borderRadius: "10px", padding: "10px 20px", fontSize: "13px", fontWeight: 600, color: "#0A1A33", cursor: "pointer", fontFamily: "var(--font-body)" }}>
                  Reset form
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Field label="First Name"><IconInput icon={<User size={15} strokeWidth={1.8} />} placeholder="Sarah" /></Field>
                  <Field label="Last Name"><IconInput icon={<User size={15} strokeWidth={1.8} />} placeholder="Johnson" /></Field>
                </div>
                <Field label="Email Address" hint="We'll send confirmation here.">
                  <IconInput type="email" icon={<Mail size={15} strokeWidth={1.8} />} placeholder="sarah@company.com" />
                </Field>
                <Field label="Service Needed">
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", pointerEvents: "none", color: "#9ca3af" }}><Briefcase size={15} strokeWidth={1.8} /></div>
                    <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", pointerEvents: "none", color: "#9ca3af" }}><ChevronDown size={15} strokeWidth={1.8} /></div>
                    <select style={{ ...inputBase, border: "1.5px solid rgba(20,34,53,0.18)", cursor: "pointer", paddingLeft: "40px", appearance: "none" }}>
                      <option>Choose a service</option>
                      <option>Business Advisory</option>
                      <option>Operations Consulting</option>
                      <option>Financial Readiness</option>
                      <option>Growth Strategy</option>
                    </select>
                  </div>
                </Field>
                <Field label="Tell us about your situation">
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "12px", top: "14px", display: "flex", alignItems: "center", pointerEvents: "none", color: "#9ca3af" }}><MessageSquare size={15} strokeWidth={1.8} /></div>
                    <textarea rows={4} placeholder="What challenge are you trying to solve?" style={{ ...inputBase, border: "1.5px solid rgba(20,34,53,0.18)", resize: "vertical", lineHeight: 1.6, paddingLeft: "40px" }} />
                  </div>
                </Field>
                <CustomCheckbox label="I agree to be contacted about my inquiry." />
                <SubmitButton onClick={() => setSubmitted(true)} />
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}