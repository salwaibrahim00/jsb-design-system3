"use client";
import { useState, useEffect, useRef } from "react";
import { TrendingUp, Award, Users, Star, DollarSign, BarChart2, Target, Lightbulb } from "lucide-react";

function useCountUp(target: number, active: boolean, duration = 1300): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(eased * target);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function CardSection({ label, intent, children }: { label: string; intent: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "56px" }}>
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
      {children}
    </div>
  );
}

function HoverCard({ children, lift, dark, accent }: { children: React.ReactNode; lift?: boolean; dark?: boolean; accent?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        background: dark ? "#0A1A33" : "white",
        border: dark ? "none" : `1px solid ${hovered && accent ? accent + "40" : "rgba(20,34,53,0.08)"}`,
        borderRadius: "16px",
        padding: "28px",
        boxShadow: hovered
          ? lift ? "0 16px 40px rgba(16,35,63,0.14)" : "0 8px 24px rgba(16,35,63,0.09)"
          : "0 2px 12px rgba(16,35,63,0.04)",
        transform: hovered && lift ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

// ✅ useState hover instead of DOM manipulation
function LearnMoreLink({ accent }: { accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
        fontWeight: 700,
        color: hovered ? accent : "#0A1A33",
        textDecoration: "none",
        fontFamily: "var(--font-body)",
        transition: "color 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Learn more
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}


/* ── Animated Stat Card ──────────────────────────────────────────────── */
function StatCard({
  prefix = "", target, decimals = 0, suffix = "",
  label, sub, accent,
  Icon,
}: {
  prefix?: string; target: number; decimals?: number; suffix?: string;
  label: string; sub: string; accent: string;
  Icon: React.ElementType;
}) {
  const [active, setActive] = useState(false);
  const val = useCountUp(target, active, 1300);
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();

  return (
    <div
      onMouseEnter={() => setActive(true)}
      style={{
        background: "white",
        border: `1px solid ${active ? accent + "55" : "rgba(20,34,53,0.08)"}`,
        borderRadius: "16px",
        padding: "28px",
        boxShadow: active
          ? "0 16px 40px rgba(16,35,63,0.14)"
          : "0 2px 12px rgba(16,35,63,0.04)",
        transform: active ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
      }}
    >
      <Icon size={20} strokeWidth={1.6} style={{ color: accent, marginBottom: "10px" }} />
      <div style={{
        fontSize: "42px", fontWeight: 700, color: accent,
        fontFamily: "var(--font-heading)", lineHeight: 1,
        marginBottom: "10px", letterSpacing: "-0.03em",
        fontVariantNumeric: "tabular-nums",
        minWidth: "4ch",
      }}>
        {prefix}{display}{suffix}
      </div>
      <div style={{ fontSize: "15px", fontWeight: 700, color: "#0A1A33", fontFamily: "var(--font-body)", marginBottom: "6px" }}>
        {label}
      </div>
      <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
        {sub}
      </div>
    </div>
  );
}

/* ── Testimonial Carousel ────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "JSB gave us the clarity and structure we needed to make our biggest strategic decision with confidence.",
    name: "Marcus T.", role: "Founder, Detroit Manufacturing Co.",
    photo: "/headshot-mt.jpg", metric: "+41% revenue in 18 months", stars: 5,
  },
  {
    quote: "Working with JSB felt like having a seasoned CFO in the room. The financial roadmap they built changed everything.",
    name: "Denise R.", role: "CEO, Midwest Retail Group",
    photo: "/headshot-dr.jpg", metric: "Acquired second location in 14 months", stars: 5,
  },
  {
    quote: "We went from reactive to strategic in 90 days. JSB's process is unlike anything we experienced with traditional consultants.",
    name: "Kevin P.", role: "President, Northside Capital Group",
    photo: "/headshot-kp.jpg", metric: "$2.1M cost reduction identified", stars: 5,
  },
];

const CIRC = 2 * Math.PI * 21;

function TestimonialCarousel() {
  const [active, setActive]   = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused]   = useState(false);
  const n = TESTIMONIALS.length;
  const t = TESTIMONIALS[active];

  /* auto-advance with progress ring */
  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / 5000, 1);
      setProgress(p);
      if (p >= 1) { clearInterval(id); setActive(a => (a + 1) % n); }
    }, 40);
    return () => clearInterval(id);
  }, [active, paused]);

  const go = (i: number) => setActive(((i % n) + n) % n);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: "linear-gradient(145deg,#080f1e 0%,#0d1b34 100%)",
        borderRadius: "24px", padding: "40px 44px 36px",
        position: "relative", overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", width: "320px", height: "320px", borderRadius: "50%", top: "-80px", left: "-60px", background: "radial-gradient(circle,rgba(242,201,76,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Gold open-quote */}
      <div style={{ fontSize: "72px", lineHeight: 0.75, color: "#F2C94C", fontFamily: "Georgia,serif", marginBottom: "18px", userSelect: "none" }}>"</div>

      {/* Quote */}
      <p style={{ margin: "0 0 14px", fontSize: "16px", lineHeight: 1.85, color: "rgba(255,255,255,0.88)", fontFamily: "var(--font-body)", fontStyle: "italic", maxWidth: "680px" }}>
        {t.quote}
      </p>

      {/* Metric badge */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 14px", borderRadius: "100px", background: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.3)", marginBottom: "28px" }}>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "#F2C94C", fontFamily: "var(--font-body)", letterSpacing: "0.05em" }}>↑ {t.metric}</span>
      </div>

      {/* Attribution + nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>

        {/* Photo + ring + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* SVG countdown ring */}
          <div style={{ position: "relative", width: "50px", height: "50px", flexShrink: 0 }}>
            <svg width="50" height="50" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
              <circle cx="25" cy="25" r="21" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
              <circle cx="25" cy="25" r="21" fill="none" stroke="#F2C94C" strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC * (1 - progress)}
                style={{ transition: paused ? "none" : "stroke-dashoffset 0.08s linear" }}
              />
            </svg>
            <img src={t.photo} alt={t.name}
              style={{ position: "absolute", inset: "5px", width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
            />
          </div>

          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-body)" }}>{t.name}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.42)", fontFamily: "var(--font-body)", marginBottom: "4px" }}>{t.role}</div>
            <div style={{ display: "flex", gap: "3px" }}>
              {Array.from({ length: t.stars }).map((_, i) => (
                <span key={i} style={{ color: "#F2C94C", fontSize: "11px" }}>★</span>
              ))}
            </div>
          </div>
        </div>

        {/* Dots + arrows */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => go(i)} style={{
                width: i === active ? "22px" : "6px", height: "6px", borderRadius: "3px",
                background: i === active ? "#F2C94C" : "rgba(255,255,255,0.2)",
                border: "none", cursor: "pointer", padding: 0,
                boxShadow: i === active ? "0 0 8px rgba(242,201,76,0.55)" : "none",
                transition: "width 0.32s ease, background 0.3s, box-shadow 0.3s",
              }} />
            ))}
          </div>
          {(["←", "→"] as const).map((ch, di) => (
            <button key={ch} onClick={() => go(active + (di === 0 ? -1 : 1))} style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.55)", cursor: "pointer", fontSize: "14px",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}>{ch}</button>
          ))}
        </div>
      </div>

      {/* Pause label */}
      {paused && (
        <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontSize: "9px", color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-body)", letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          ⏸ paused
        </div>
      )}
    </div>
  );
}

/* ── Neumorphic helpers ───────────────────────────────────────────────── */

function NeuBadge({
  Icon,
  shape,
  active,
}: {
  Icon: React.ElementType;
  shape: "square" | "circle";
  active: boolean;
}) {
  return (
    <div
      style={{
        width: "54px",
        height: "54px",
        borderRadius: shape === "circle" ? "50%" : "16px",
        background: "#091628",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "22px",
        flexShrink: 0,
        boxShadow: active
          ? [
              "0 0 18px rgba(242,201,76,0.35)",
              "5px 5px 14px rgba(0,0,0,0.55)",
              "-3px -3px 8px rgba(255,255,255,0.04)",
            ].join(", ")
          : [
              "5px 5px 14px rgba(0,0,0,0.55)",
              "-3px -3px 8px rgba(255,255,255,0.04)",
            ].join(", "),
        transition: "box-shadow 0.3s ease",
      }}
    >
      <Icon
        size={22}
        strokeWidth={1.6}
        color={active ? "#F2C94C" : "rgba(242,201,76,0.3)"}
        style={{ transition: "color 0.3s ease" }}
      />
    </div>
  );
}

function NeuCard({
  Icon,
  shape,
  title,
  body,
  statTarget,
  statPrefix = "",
  statSuffix = "",
  statDecimals = 0,
}: {
  Icon: React.ElementType;
  shape: "square" | "circle";
  title: string;
  body: string;
  statTarget?: number;
  statPrefix?: string;
  statSuffix?: string;
  statDecimals?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const val = useCountUp(statTarget ?? 0, hovered, 1200);
  const display = statDecimals > 0 ? val.toFixed(statDecimals) : Math.round(val).toLocaleString();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0B1E3F",
        borderRadius: "22px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered
          ? [
              "9px 9px 22px rgba(0,0,0,0.55)",
              "-4px -4px 12px rgba(255,255,255,0.05)",
              "0 0 0 1px rgba(242,201,76,0.18)",
            ].join(", ")
          : [
              "9px 9px 22px rgba(0,0,0,0.5)",
              "-4px -4px 12px rgba(255,255,255,0.04)",
            ].join(", "),
        transition: "box-shadow 0.3s ease",
        cursor: "default",
      }}
    >
      <NeuBadge Icon={Icon} shape={shape} active={hovered} />

      {statTarget !== undefined && (
        <div
          style={{
            fontSize: "32px",
            fontWeight: 700,
            fontFamily: "var(--font-heading)",
            color: "#F2C94C",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: "8px",
            fontVariantNumeric: "tabular-nums",
            minWidth: "3ch",
          }}
        >
          {statPrefix}{display}{statSuffix}
        </div>
      )}

      <h3
        style={{
          margin: "0 0 10px 0",
          fontSize: "16px",
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "var(--font-heading)",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.45)",
          fontFamily: "var(--font-body)",
          flex: 1,
        }}
      >
        {body}
      </p>
    </div>
  );
}

/* ── Split Card (dark, animated halves) ─────────────────────────────── */
function SplitCard({ icon, type, title, meta, body }: {
  icon: React.ReactNode;
  type: string;
  title: string;
  meta: string;
  body: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(200,155,60,0.4)" : "rgba(255,255,255,0.08)"}`,
        transition: "border-color 0.3s",
        height: "210px",
      }}
    >
      {/* Gap glow */}
      <div style={{
        position: "absolute", top: "50%", left: 0, right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(200,155,60,0.65), transparent)",
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.4s ease",
        zIndex: 3,
        pointerEvents: "none",
      }} />

      {/* Top half */}
      <div style={{
        height: "50%",
        padding: "20px 22px 12px",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        position: "relative",
        zIndex: 2,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.34,1.2,0.64,1)",
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "9px", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(200,155,60,0.12)", border: "1px solid rgba(200,155,60,0.2)",
        }}>
          {icon}
        </div>
        <div>
          <div style={{
            fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "rgba(200,155,60,0.7)",
            marginBottom: "2px", fontFamily: "var(--font-body)",
          }}>{type}</div>
          <div style={{
            fontFamily: "var(--font-heading)", fontSize: "15px",
            fontWeight: 700, color: "#fff",
          }}>{title}</div>
        </div>
      </div>

      {/* Bottom half */}
      <div style={{
        height: "50%",
        padding: "12px 22px 20px",
        position: "relative",
        zIndex: 2,
        transform: hovered ? "translateY(4px)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.34,1.2,0.64,1)",
      }}>
        <div style={{
          fontSize: "11px", color: "rgba(255,255,255,0.3)",
          marginBottom: "6px", fontFamily: "var(--font-body)",
        }}>{meta}</div>
        <div style={{
          fontSize: "12px", color: "rgba(255,255,255,0.45)",
          lineHeight: 1.6, fontFamily: "var(--font-body)",
        }}>{body}</div>
      </div>
    </div>
  );
}

/* ── Dark Service Card (tilt + spinning border + particles) ──────────── */
interface ParticleDef {
  tx: number; ty: number; d: number; del: number; top: string; left: string;
}

function DarkServiceCard({ num, icon, title, body, particles }: {
  num: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  particles: ParticleDef[];
}) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.width / 2;
    const cy = r.height / 2;
    setTilt({
      rx: ((e.clientY - r.top  - cy) / cy) * -10,
      ry: ((e.clientX - r.left - cx) / cx) *  10,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={(e) => { setHovered(true); handleMouseMove(e); }}
      onMouseLeave={() => { setHovered(false); setTilt({ rx: 0, ry: 0 }); }}
      className={hovered ? "scard-spin-border" : ""}
      style={{
        borderRadius: "20px",
        padding: "1px",
        position: "relative",
        cursor: "pointer",
        background: hovered ? undefined : "rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,155,60,0.15)"
          : "none",
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)${hovered ? " scale(1.02)" : ""}`,
        transition: hovered
          ? "transform 0.1s ease, box-shadow 0.3s"
          : "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s",
        willChange: "transform",
      }}
    >
      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className={hovered ? "scard-particle" : ""}
          style={{
            position: "absolute",
            width: "3px", height: "3px", borderRadius: "50%",
            background: "rgba(200,155,60,0.65)",
            pointerEvents: "none",
            top: p.top, left: p.left,
            ["--tx" as string]: `${p.tx}px`,
            ["--ty" as string]: `${p.ty}px`,
            ["--d"  as string]: `${p.d}s`,
            ["--del" as string]: `${p.del}s`,
          }}
        />
      ))}

      {/* Inner panel */}
      <div style={{
        background: "#0c1117", borderRadius: "19px",
        padding: "32px 28px 28px",
        display: "flex", flexDirection: "column", gap: "14px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Ghost number */}
        <div style={{
          position: "absolute", top: "12px", right: "20px",
          fontFamily: "var(--font-heading)", fontSize: "80px", fontWeight: 700,
          color: hovered ? "rgba(200,155,60,0.07)" : "rgba(255,255,255,0.03)",
          lineHeight: 1,
          transform: hovered ? "scale(1.1) translateY(-4px)" : "scale(1) translateY(0)",
          transition: "color 0.3s, transform 0.3s",
          userSelect: "none", pointerEvents: "none",
        }}>{num}</div>

        {/* Tag */}
        <div style={{
          display: "inline-flex", alignItems: "center",
          padding: "3px 10px", borderRadius: "999px",
          background: hovered ? "rgba(200,155,60,0.15)" : "rgba(200,155,60,0.08)",
          border: `1px solid ${hovered ? "rgba(200,155,60,0.35)" : "rgba(200,155,60,0.15)"}`,
          fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hovered ? "#c89b3c" : "rgba(200,155,60,0.6)",
          width: "fit-content",
          transition: "all 0.3s",
          fontFamily: "var(--font-body)",
        }}>Core Service</div>

        {/* Icon */}
        <div
          className={hovered ? "scard-icon-glow" : ""}
          style={{
            width: "56px", height: "56px", borderRadius: "14px",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: hovered ? "rgba(200,155,60,0.2)" : "rgba(200,155,60,0.1)",
            border: `1px solid ${hovered ? "rgba(200,155,60,0.5)" : "rgba(200,155,60,0.2)"}`,
            transform: hovered ? "rotate(-6deg) scale(1.1)" : "rotate(0deg) scale(1)",
            transition: "all 0.3s",
            flexShrink: 0,
            color: "#c89b3c",
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <div style={{
          fontFamily: "var(--font-heading)", fontSize: "20px",
          fontWeight: 700, color: "#fff", lineHeight: 1.2,
        }}>{title}</div>

        {/* Body */}
        <div style={{
          fontSize: "13px", color: "rgba(255,255,255,0.45)",
          lineHeight: 1.7, flex: 1, fontFamily: "var(--font-body)",
        }}>{body}</div>

        {/* CTA */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          fontSize: "13px", fontWeight: 700,
          color: hovered ? "#c89b3c" : "rgba(200,155,60,0.6)",
          position: "relative", paddingBottom: "12px",
          transition: "color 0.3s", marginTop: "4px",
          fontFamily: "var(--font-body)",
        }}>
          Learn more
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: hovered ? "translateX(5px)" : "translateX(0)", transition: "transform 0.3s" }}>
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            height: "1px", background: "rgba(200,155,60,0.4)",
            width: hovered ? "100%" : "0%",
            transition: "width 0.4s cubic-bezier(0.34,1,0.64,1)",
          }} />
        </div>
      </div>
    </div>
  );
}

export default function CardsShowcase() {
  return (
    <section style={{ padding: "96px 24px", background: "var(--color-surface)" }}>
      {/* ✅ maxWidth fixed to 960px */}
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-accent)", // ✅ accessible contrast
            fontWeight: 700,
            margin: "0 0 14px 0",
            fontFamily: "var(--font-body)",
          }}>
            Cards
          </p>
          <h2 style={{
            fontSize: "42px",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            fontWeight: 700,
            margin: "0 0 16px 0",
            maxWidth: "700px",
            fontFamily: "var(--font-heading)",
            color: "#0A1A33",
          }}>
            Cards contain. They don't just decorate.
          </h2>
          <p style={{
            fontSize: "18px",
            lineHeight: 1.75,
            color: "#6b7280",
            maxWidth: "640px",
            margin: 0,
            fontFamily: "var(--font-body)",
          }}>
            Each card type has a role. Default holds content. Service sells.
            Testimonial builds trust. Stat earns credibility. Using the wrong
            type sends the wrong signal.
          </p>
        </div>

        {/* Default Card */}
        <CardSection
          label="Default Card"
          intent="Content-first containers. No visual hierarchy implied — the content inside carries the weight."
        >
          <div style={{
            background: "#0d1117",
            borderRadius: "20px",
            padding: "24px",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}>
            <SplitCard
              type="Document"
              title="Project Overview"
              meta="Last updated 3 days ago"
              body="A general-purpose card for layout structure, dashboards, and content grouping across the interface."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c89b3c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              }
            />
            <SplitCard
              type="Document"
              title="Meeting Notes"
              meta="Q3 Strategy Session"
              body="Use default cards when the content itself defines the context and no additional visual signaling is needed."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c89b3c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              }
            />
          </div>
        </CardSection>

        {/* Service Card */}
        <CardSection
          label="Service Card"
          intent="These cards need to convert. Visual weight is higher than default — every element earns its place."
        >
          <div style={{
            background: "#0d1117",
            borderRadius: "20px",
            padding: "24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}>
            <DarkServiceCard
              num="01"
              title="Financial Planning"
              body="Build a roadmap for sustainable growth with forecasting, budgeting, and risk analysis tailored to your business."
              icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
              particles={[
                { tx: 15,  ty: -40, d: 1.8, del: 0,   top: "40%", left: "20%" },
                { tx: -10, ty: -30, d: 1.4, del: 0.3, top: "60%", left: "40%" },
                { tx: 20,  ty: -50, d: 2.0, del: 0.6, top: "50%", left: "60%" },
              ]}
            />
            <DarkServiceCard
              num="02"
              title="Business Strategy"
              body="Clarify your market position, competitive advantage, and long-term direction with expert advisory support."
              icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
              particles={[
                { tx: -15, ty: -45, d: 1.6, del: 0.1, top: "45%", left: "30%" },
                { tx: 10,  ty: -35, d: 2.0, del: 0.4, top: "55%", left: "55%" },
                { tx: 25,  ty: -55, d: 1.7, del: 0.7, top: "35%", left: "70%" },
              ]}
            />
            <DarkServiceCard
              num="03"
              title="Risk Management"
              body="Identify vulnerabilities, build contingency plans, and protect what you've built with structured risk frameworks."
              icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
              particles={[
                { tx: 12,  ty: -38, d: 1.9, del: 0.2, top: "42%", left: "25%" },
                { tx: -18, ty: -42, d: 1.5, del: 0.5, top: "58%", left: "50%" },
                { tx: 22,  ty: -48, d: 2.1, del: 0.8, top: "38%", left: "65%" },
              ]}
            />
          </div>
        </CardSection>

        {/* Testimonial Card */}
        <CardSection
          label="Testimonial Card"
          intent="Auto-cycles every 5 s — hover to pause. The gold ring around the photo counts down. Arrows and dots for manual navigation."
        >
          <TestimonialCarousel />
        </CardSection>

        {/* Stat Card */}
        <CardSection
          label="Stat Card"
          intent="Hover any card — the number counts up from zero. Earns credibility through specificity."
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}>
            <StatCard target={40}  suffix="+"  label="Years Combined Experience" sub="Across finance, ops, and strategy"       accent="#F2C94C"  Icon={Award}      />
            <StatCard target={200} suffix="+"  label="Businesses Advised"        sub="From startups to mid-market firms"       accent="#86efac"  Icon={Users}      />
            <StatCard target={94}  suffix="%"  label="Client Retention Rate"     sub="Built on trust and measurable results"   accent="#93c5fd"  Icon={Star}       />
            <StatCard target={1.2} decimals={1} prefix="$" suffix="B+" label="Capital Navigated" sub="Across funding rounds and acquisitions" accent="#f9a8d4" Icon={DollarSign} />
          </div>
        </CardSection>

        {/* Neumorphic Card */}
        <CardSection
          label="Neumorphic Card"
          intent="Depth through shadow — no borders. Icon badges respond to hover with a gold glow. Built for dark-theme contexts."
        >
          <div
            style={{
              background: "#091628",
              borderRadius: "28px",
              padding: "28px",
              boxShadow: "inset 2px 2px 8px rgba(0,0,0,0.4), inset -2px -2px 6px rgba(255,255,255,0.03)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
              }}
            >
              {[
                { Icon: BarChart2,  shape: "square" as const, statTarget: 2400, statSuffix: "+", title: "Strategy Sessions",   body: "One-on-one advisory meetings completed across every industry we serve." },
                { Icon: Target,     shape: "circle" as const, statTarget: 18,   statSuffix: "",  title: "Sectors Covered",     body: "Manufacturing, retail, healthcare, tech, hospitality, real estate — and more." },
                { Icon: Lightbulb,  shape: "square" as const, statTarget: 31,   statSuffix: "%", title: "Avg. Revenue Lift",   body: "Average revenue growth reported by clients in the first 12 months of engagement." },
                { Icon: TrendingUp, shape: "circle" as const, statTarget: 2008, statSuffix: "",  title: "Detroit Founded",     body: "Built in Detroit. Rooted in the region's grit, resilience, and industrial backbone." },
              ].map((card) => (
                <NeuCard
                  key={card.title}
                  Icon={card.Icon}
                  shape={card.shape}
                  statTarget={card.statTarget}
                  statSuffix={card.statSuffix}
                  title={card.title}
                  body={card.body}
                />
              ))}
            </div>
          </div>
        </CardSection>

      </div>
    </section>
  );
}