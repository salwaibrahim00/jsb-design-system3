"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin, Shield, Users, CheckCircle } from "lucide-react";

const bulletIcons = [MapPin, Shield, Users, CheckCircle];

function useCountUp(target: number, active: boolean, duration = 1500): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

const METRICS = [
  { target: 94,  suffix: "%", label: "Client Retention Rate",      icon: "🤝" },
  { target: 15,  suffix: "+", label: "Industries Served",           icon: "🏭" },
  { target: 100, suffix: "%", label: "Senior-Led Engagements",      icon: "🎯" },
];

function MetricCard({ target, suffix, label, icon, active, delay }: {
  target: number; suffix: string; label: string; icon: string; active: boolean; delay: number;
}) {
  const count = useCountUp(target, active, 1600);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
      padding: "20px 24px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(242,201,76,0.18)",
      borderRadius: "14px",
      backdropFilter: "blur(8px)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.55s ease, transform 0.55s ease",
    }}>
      <div style={{ fontSize: "28px", lineHeight: 1, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{
          fontFamily: "var(--font-heading)",
          fontSize: "38px",
          fontWeight: 700,
          color: "#F2C94C",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}>
          {count}<span style={{ fontSize: "24px" }}>{suffix}</span>
        </div>
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.6)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginTop: "4px",
        }}>{label}</div>
      </div>
    </div>
  );
}

export default function About() {
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ padding: "96px 24px", background: "var(--color-background)" }}
    >
      <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}>

          {/* LEFT — Creative credibility panel */}
          <div style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            background: "linear-gradient(145deg, #0A1A33 0%, #060d1e 60%, #0f2040 100%)",
            padding: "48px 40px",
            minHeight: "480px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 24px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(242,201,76,0.12)",
            border: "1px solid rgba(242,201,76,0.12)",
          }}>

            {/* Detroit grid SVG background */}
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07, pointerEvents: "none" }}
              viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice"
            >
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="500" stroke="#F2C94C" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 18 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 30} x2="400" y2={i * 30} stroke="#F2C94C" strokeWidth="0.5" />
              ))}
              {/* Accent nodes at intersections */}
              {[
                [90, 90], [210, 60], [300, 150], [60, 240], [330, 270], [150, 360], [270, 420],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3" fill="#F2C94C" opacity="0.8" />
              ))}
            </svg>

            {/* Gold top-left corner accent */}
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: "80px", height: "80px",
              borderTop: "2px solid #F2C94C",
              borderLeft: "2px solid #F2C94C",
              borderRadius: "24px 0 0 0",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: "80px", height: "80px",
              borderBottom: "2px solid rgba(242,201,76,0.35)",
              borderRight: "2px solid rgba(242,201,76,0.35)",
              borderRadius: "0 0 24px 0",
              pointerEvents: "none",
            }} />

            {/* Top — Shield mark + tagline */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <path d="M22 3L4 10v12c0 10 8 18.5 18 21 10-2.5 18-11 18-21V10L22 3z"
                    fill="#0A1A33" stroke="#F2C94C" strokeWidth="1.5" />
                  <text x="22" y="28" textAnchor="middle" fill="#F2C94C"
                    fontFamily="serif" fontWeight="700" fontSize="13">JSB</text>
                </svg>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 700, color: "white", letterSpacing: "0.02em" }}>
                    Business Solutions Group
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(242,201,76,0.75)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>
                    Detroit · Advisor-Led
                  </div>
                </div>
              </div>

              {/* Pull quote */}
              <blockquote style={{
                fontFamily: "var(--font-heading)",
                fontSize: "21px",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.35,
                margin: "0 0 8px 0",
                letterSpacing: "-0.02em",
              }}>
                "Straight answers.
                <br />
                <span style={{ color: "#F2C94C" }}>Not vague frameworks.</span>"
              </blockquote>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                — JSB Founding Principle
              </div>
            </div>

            {/* Middle — Animated metric cards */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "12px", margin: "32px 0" }}>
              {METRICS.map((m, i) => (
                <MetricCard key={m.label} {...m} active={active} delay={i * 180} />
              ))}
            </div>

            {/* Bottom — Detroit badge */}
            <div style={{
              position: "relative", zIndex: 1,
              display: "flex", alignItems: "center", gap: "10px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(242,201,76,0.14)",
            }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#F2C94C",
                boxShadow: "0 0 8px 2px rgba(242,201,76,0.5)",
                animation: "pulse 2s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                Proudly rooted in Detroit, Michigan
              </span>
            </div>
          </div>

          {/* RIGHT — Text content */}
          <div>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              fontWeight: 700,
              margin: "0 0 16px 0",
              fontFamily: "var(--font-body)",
            }}>
              About JSB
            </p>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: "0 0 20px 0",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}>
              Detroit-based advisors who've built real businesses.
            </h2>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
              margin: "0 0 24px 0",
            }}>
              JSB Business Solutions Group was founded on a simple belief: business
              owners deserve straight answers, not vague frameworks. Our advisors
              bring decades of hands-on experience in operations, finance, HR, and
              growth strategy.
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
              margin: "0 0 36px 0",
            }}>
              We work alongside you — not above you — to make decisions that move
              your business forward with clarity and confidence.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}>
              {[
                { label: "Detroit-Based",   sub: "Rooted in the community we serve"       },
                { label: "Advisor-Led",     sub: "Senior experts on every engagement"   },
                { label: "Hands-On Approach", sub: "We work inside your business, not around it" },
                { label: "No Vague Advice", sub: "Practical decisions, real outcomes"   },
              ].map((item, i) => {
                const Icon = bulletIcons[i];
                return (
                  <div key={item.label} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    background: "white",
                    borderRadius: "14px",
                    padding: "18px",
                    border: "1px solid rgba(20,34,53,0.07)",
                    boxShadow: "0 2px 8px rgba(16,35,63,0.04)",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(16,35,63,0.09)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(16,35,63,0.04)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                  >
                    <div style={{
                      width: "38px", height: "38px",
                      borderRadius: "11px",
                      background: "rgba(242,201,76,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon size={18} strokeWidth={1.8} style={{ color: "#c89b3c" }} />
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px", fontWeight: 700,
                        color: "var(--color-text-primary)", marginBottom: "3px",
                      }}>{item.label}</div>
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.5,
                      }}>{item.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
