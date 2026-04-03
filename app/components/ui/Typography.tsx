"use client";
import { useState, useEffect, useRef } from "react";
import { Type } from "lucide-react";

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

/* ── Section label / sub ──────────────────────────────────────────────── */
function SecMeta({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6c7a8c", marginBottom: "4px", fontFamily: "var(--font-body)" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: "17px", fontWeight: 700, color: "#142235", marginBottom: "2px" }}>{title}</div>
      <div style={{ fontSize: "12px", color: "#6c7a8c", fontFamily: "var(--font-body)" }}>{sub}</div>
    </div>
  );
}

/* ── Live specimen (typewriter) ───────────────────────────────────────── */
function LiveSpecimen() {
  const { ref, visible } = useInView(0.15);
  return (
    <div ref={ref} style={{ marginBottom: "52px" }}>
      <SecMeta
        label="Typography System"
        title="Two fonts. One voice. Built for trust."
        sub="Merriweather carries authority. Lato keeps it readable. Together they feel premium without being cold."
      />
      <div style={{
        background: "#142235",
        borderRadius: "16px",
        padding: "36px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle grid lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(90deg, rgba(200,155,60,0) 0px, rgba(200,155,60,0) 59px, rgba(200,155,60,0.04) 60px)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,155,60,0.6)", marginBottom: "20px", fontFamily: "var(--font-body)" }}>
            Live specimen
          </div>
          {/* Typewriter heading */}
          {visible && (
            <div className="ty-type-h" style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "12px" }}>
              Strategic guidance for serious decisions.
            </div>
          )}
          {/* Body fade-in */}
          {visible && (
            <div className="ty-fade-in-1" style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: "520px" }}>
              Our work is grounded in decades of experience across industries. We bring clarity to complex decisions and help organizations move forward with confidence — even in uncertain conditions.
            </div>
          )}
          {/* Meta chips */}
          {visible && (
            <div className="ty-fade-in-2" style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
              {["Merriweather · 700 · Headings", "Lato · 300 · Body", "Together since JSB v1.0"].map((chip) => (
                <span key={chip} style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(200,155,60,0.75)", padding: "4px 10px", background: "rgba(200,155,60,0.08)", border: "1px solid rgba(200,155,60,0.2)", borderRadius: "6px" }}>
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Font pairing stage ───────────────────────────────────────────────── */
function FontPairing() {
  const { ref, visible } = useInView(0.1);
  return (
    <div ref={ref} style={{ marginBottom: "52px" }}>
      <div style={{
        background: "#142235",
        borderRadius: "20px",
        padding: "40px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "repeating-linear-gradient(90deg,rgba(200,155,60,0) 0px,rgba(200,155,60,0) 59px,rgba(200,155,60,.04) 60px)" }} />
        {/* Center divider */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: "50%", width: "1px",
          background: "linear-gradient(to bottom, transparent, rgba(200,155,60,0.4), transparent)",
          zIndex: 1,
        }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "center", position: "relative", zIndex: 2 }}>
          {/* Merriweather block */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "100px", background: "rgba(200,155,60,0.15)", border: "1px solid rgba(200,155,60,0.3)", marginBottom: "14px" }}>
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c89b3c", fontFamily: "var(--font-body)" }}>
                ⬛ Merriweather — Headings
              </span>
            </div>
            <div className={visible ? "ty-reveal-serif" : ""} style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: 700, color: "#fff", lineHeight: 1.25 }}>
              Trusted by leaders who build for the long term.
            </div>
          </div>
          {/* Lato block */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "100px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", marginBottom: "14px" }}>
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
                ○ Lato — Body
              </span>
            </div>
            <div className={visible ? "ty-reveal-sans" : ""} style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
              Our work is grounded in decades of experience across industries. We bring clarity to complex decisions and help organizations move forward with confidence — even in uncertain conditions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Heading scale row ────────────────────────────────────────────────── */
const HEADING_ROWS = [
  { label: "Display",   spec: "48px · Bold", token: "--text-display", renderSize: "40px", sample: "Strategic business guidance",              note: "Commands authority. Hero statements that stop the reader.", dark: true  },
  { label: "Heading 1", spec: "36px · Bold", token: "--text-h1",      renderSize: "30px", sample: "Professional advisory built on trust",      note: "Anchors sections. Clear entry point for the eye.",           dark: false },
  { label: "Heading 2", spec: "28px · Bold", token: "--text-h2",      renderSize: "24px", sample: "A stronger visual hierarchy",               note: "Structures content. Signals a topic shift.",                 dark: false },
  { label: "Heading 3", spec: "22px · Bold", token: "--text-h3",      renderSize: "20px", sample: "Readable section titles",                   note: "Organizes detail. Keeps content scannable.",                 dark: false },
];

function HeadingRow({ row }: { row: typeof HEADING_ROWS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: row.dark ? "linear-gradient(135deg,#142235,#1e3042)" : "#fff",
        border: `1px solid ${hovered ? "#c89b3c" : row.dark ? "rgba(200,155,60,0.3)" : "#d8d0c2"}`,
        borderRadius: "14px",
        padding: "24px 28px",
        marginBottom: "10px",
        display: "grid",
        gridTemplateColumns: "110px 1fr 120px",
        alignItems: "center",
        gap: "20px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        boxShadow: hovered ? "0 4px 20px rgba(200,155,60,0.12)" : "none",
        transition: "border-color 0.3s, transform 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Gold left border bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "3px",
        background: "#c89b3c",
        transform: hovered ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "bottom",
        transition: "transform 0.3s cubic-bezier(0.34,1.2,0.64,1)",
        borderRadius: "14px 0 0 14px",
      }} />
      {/* Badge */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        <div style={{ fontFamily: "monospace", fontSize: "11px", color: row.dark ? "rgba(255,255,255,0.4)" : "#6c7a8c" }}>{row.label}</div>
        <div style={{ fontSize: "12px", color: "#c89b3c", fontWeight: 700, fontFamily: "var(--font-body)" }}>{row.spec}</div>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: row.dark ? "rgba(200,155,60,0.7)" : "#6c7a8c", background: row.dark ? "rgba(200,155,60,0.1)" : "rgba(20,34,53,0.06)", padding: "2px 6px", borderRadius: "4px", display: "inline-block", marginTop: "2px" }}>
          {row.token}
        </div>
      </div>
      {/* Sample */}
      <div style={{
        fontFamily: "var(--font-heading)",
        fontSize: row.renderSize,
        fontWeight: 700,
        color: row.dark ? "#fff" : "#142235",
        lineHeight: 1.15,
        transform: hovered ? "scale(1.01)" : "scale(1)",
        transition: "transform 0.2s",
      }}>
        {row.sample}
      </div>
      {/* Note */}
      <div style={{ fontSize: "11px", color: row.dark ? "rgba(255,255,255,0.35)" : "#6c7a8c", lineHeight: 1.5, textAlign: "right", fontFamily: "var(--font-body)" }}>
        {row.note}
      </div>
    </div>
  );
}

/* ── Body scale ───────────────────────────────────────────────────────── */
const BODY_ROWS = [
  {
    label: "Body Large", spec: "20px · Regular", token: "--text-body-lg",
    renderSize: "19px", actualPx: 20, weight: 400, color: "#142235",
    sample: "Clear supporting text for key messaging that earns reader trust.",
    note: "Builds rapport. Introductions & hero support copy.",
    usage: ["Hero sub-headlines", "Intro paragraphs", "Feature callouts"],
    barPct: "100%",
  },
  {
    label: "Body", spec: "16px · Regular", token: "--text-body",
    renderSize: "15px", actualPx: 16, weight: 400, color: "#31445e",
    sample: "Standard reading size for paragraphs, labels, and interface copy.",
    note: "The workhorse. Optimized for long-form comprehension.",
    usage: ["Body paragraphs", "Form labels", "Card content"],
    barPct: "80%",
  },
  {
    label: "Small", spec: "14px · Regular", token: "--text-sm",
    renderSize: "13px", actualPx: 14, weight: 400, color: "#31445e",
    sample: "Helpful secondary text and supporting labels.",
    note: "Supports without competing. Keeps UI scannable.",
    usage: ["Secondary labels", "Helper text", "Sidebar items"],
    barPct: "70%",
  },
  {
    label: "Caption", spec: "12px · Regular", token: "--text-caption",
    renderSize: "12px", actualPx: 12, weight: 400, color: "#6c7a8c",
    sample: "Muted captions and metadata. Whispers context.",
    note: "Timestamps, helper text, footnotes.",
    usage: ["Timestamps", "Meta text", "Footnotes"],
    barPct: "60%",
  },
];

function BodyScale() {
  const [focused, setFocused] = useState<number | null>(null);
  return (
    <div style={{ background: "#fff", border: "1px solid #d8d0c2", borderRadius: "14px", overflow: "hidden" }}>
      {BODY_ROWS.map((row, i) => {
        const isActive  = focused === i;
        const isDimmed  = focused !== null && !isActive;
        const isLast    = i === BODY_ROWS.length - 1;
        return (
          <div
            key={row.token}
            onMouseEnter={() => setFocused(i)}
            onMouseLeave={() => setFocused(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "130px 1fr 130px",
              alignItems: isActive ? "flex-start" : "center",
              gap: "20px",
              padding: isActive ? "24px 28px 22px" : "20px 28px",
              borderBottom: isLast ? "none" : "1px solid #f0ece4",
              background: isActive ? "#142235" : "#fff",
              opacity: isDimmed ? 0.15 : 1,
              cursor: "default",
              position: "relative",
              transition: "background 0.35s ease, opacity 0.3s ease, padding 0.3s ease",
            }}
          >
            {/* Gold left indicator bar */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: isActive ? "4px" : "0px",
              background: "linear-gradient(180deg, #c89b3c 0%, #af842d 100%)",
              borderRadius: isLast ? "0 0 0 14px" : "0",
              transition: "width 0.3s ease",
            }} />

            {/* Left meta */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{
                fontFamily: "monospace", fontSize: "11px",
                color: isActive ? "rgba(255,255,255,0.4)" : "#6c7a8c",
                transition: "color 0.3s",
              }}>
                {row.label}
              </div>
              <div style={{ fontSize: "12px", color: "#c89b3c", fontWeight: 700, fontFamily: "var(--font-body)" }}>
                {row.spec}
              </div>
              <div style={{
                fontFamily: "monospace", fontSize: "9px",
                color: isActive ? "rgba(200,155,60,0.85)" : "#6c7a8c",
                background: isActive ? "rgba(200,155,60,0.12)" : "rgba(20,34,53,0.06)",
                padding: "2px 7px", borderRadius: "4px",
                display: "inline-block", marginTop: "2px",
                transition: "color 0.3s, background 0.3s",
              }}>
                {row.token}
              </div>

              {/* Proportional size bar */}
              <div style={{ marginTop: "8px" }}>
                <div style={{
                  height: "3px", borderRadius: "2px",
                  background: isActive ? "rgba(200,155,60,0.15)" : "rgba(20,34,53,0.07)",
                  transition: "background 0.3s",
                }}>
                  <div style={{
                    height: "100%", borderRadius: "2px",
                    width: isActive ? row.barPct : "0%",
                    background: "linear-gradient(90deg, #c89b3c, #f2c94c)",
                    boxShadow: isActive ? "0 0 6px rgba(200,155,60,0.5)" : "none",
                    transition: "width 0.55s cubic-bezier(0.34,1.1,0.64,1) 0.05s, box-shadow 0.3s",
                  }} />
                </div>
                <div style={{
                  fontSize: "8px",
                  color: isActive ? "rgba(200,155,60,0.55)" : "transparent",
                  fontFamily: "monospace", marginTop: "3px",
                  transition: "color 0.3s",
                }}>
                  {row.actualPx}px base
                </div>
              </div>
            </div>

            {/* Sample text block */}
            <div style={{ position: "relative" }}>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: row.renderSize,
                fontWeight: row.weight,
                color: isActive ? "#ffffff" : row.color,
                lineHeight: 1.6,
                transition: "color 0.35s ease",
              }}>
                {row.sample}
              </div>

              {/* Glowing gold underline */}
              <div style={{
                position: "absolute", bottom: -2, left: 0,
                height: "1.5px",
                width: isActive ? "100%" : "0%",
                background: "linear-gradient(90deg, #c89b3c 60%, transparent)",
                boxShadow: isActive ? "0 0 8px rgba(200,155,60,0.55)" : "none",
                transition: "width 0.5s cubic-bezier(0.34,1.1,0.64,1) 0.05s, box-shadow 0.3s",
              }} />

              {/* Usage chips */}
              <div style={{
                display: "flex", gap: "6px", flexWrap: "wrap",
                marginTop: isActive ? "14px" : "0",
                maxHeight: isActive ? "40px" : "0",
                overflow: "hidden",
                opacity: isActive ? 1 : 0,
                transition: "max-height 0.4s ease, opacity 0.3s ease 0.1s, margin-top 0.3s ease",
              }}>
                {row.usage.map((u) => (
                  <span key={u} style={{
                    fontFamily: "var(--font-body)", fontSize: "10px",
                    color: "rgba(200,155,60,0.9)",
                    background: "rgba(200,155,60,0.1)",
                    border: "1px solid rgba(200,155,60,0.22)",
                    padding: "3px 10px", borderRadius: "999px",
                    letterSpacing: "0.02em",
                  }}>
                    {u}
                  </span>
                ))}
              </div>
            </div>

            {/* Note */}
            <div style={{
              fontSize: "11px",
              color: isActive ? "rgba(255,255,255,0.35)" : "#6c7a8c",
              lineHeight: 1.55, textAlign: "right",
              fontFamily: "var(--font-body)",
              transition: "color 0.3s",
            }}>
              {row.note}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Orb ──────────────────────────────────────────────────────────────── */
function Orb({ hex, style, className }: { hex: string; style: React.CSSProperties; className?: string }) {
  return (
    <div className={className} style={{
      position: "absolute", borderRadius: "50%", pointerEvents: "none",
      background: `radial-gradient(circle at 38% 38%, ${hex}cc 0%, ${hex}66 40%, ${hex}22 65%, transparent 80%)`,
      filter: "blur(2px)", ...style,
    }} />
  );
}

/* ── Main ─────────────────────────────────────────────────────────────── */
export default function Typography() {
  return (
    <section id="typography" style={{ background: "var(--color-surface-elevated)" }}>

      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(135deg,#060d18 0%,#0A1A33 60%,#07122a 100%)",
        padding: "72px 48px 64px",
        position: "relative",
        overflow: "hidden",
      }}>
        <Orb hex="#F2C94C" className="orb-1" style={{ width: 380, height: 380, top: -80,  left: -60,   opacity: 0.3  }} />
        <Orb hex="#c89b3c" className="orb-2" style={{ width: 280, height: 280, bottom: -40, right: 80, opacity: 0.25 }} />
        <Orb hex="#3b82f6" className="orb-3" style={{ width: 260, height: 260, top: 60,   right: -40,  opacity: 0.2  }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.25)", borderRadius: "100px", padding: "5px 14px", marginBottom: "20px" }}>
            <Type size={12} strokeWidth={2} color="#F2C94C" />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#F2C94C", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
              Typography System
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 16px 0", maxWidth: "640px" }}>
            Two fonts. One voice.
            <br />
            <span style={{ color: "#F2C94C" }}>Built for trust.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0, maxWidth: "560px" }}>
            <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Merriweather</strong> carries authority in headings.{" "}
            <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Lato</strong> keeps body copy clean and readable.
            Together they create a system that feels premium without being cold.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "64px 48px 96px", maxWidth: "960px", margin: "0 auto" }}>

        {/* Live specimen */}
        <LiveSpecimen />

        {/* Font pairing */}
        <FontPairing />

        {/* Heading scale */}
        <div style={{ marginBottom: "52px" }}>
          <SecMeta
            label="Heading Scale"
            title="Merriweather"
            sub="Hover any row to feel the weight. Each size has exactly one job."
          />
          {HEADING_ROWS.map((row) => (
            <HeadingRow key={row.token} row={row} />
          ))}
        </div>

        {/* Body scale */}
        <div>
          <SecMeta
            label="Body Scale"
            title="Lato"
            sub="Hover any row — it spotlights in dark navy with usage chips and a glowing gold underline."
          />
          <BodyScale />
        </div>

      </div>
    </section>
  );
}
