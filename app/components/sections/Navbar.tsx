"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";

/* ── Mega-menu data ───────────────────────────────────────────────────── */
const MEGA = {
  Services: {
    cols: [
      {
        heading: "Advisory",
        items: [
          { label: "Business Strategy",   sub: "Long-range planning & positioning" },
          { label: "Financial Advisory",  sub: "Capital structure & performance" },
          { label: "M&A Consulting",      sub: "Due diligence & deal execution"   },
        ],
      },
      {
        heading: "Operations",
        items: [
          { label: "Process Optimization", sub: "Workflow efficiency & lean ops"   },
          { label: "Supply Chain",         sub: "End-to-end logistics strategy"    },
          { label: "Technology Alignment", sub: "Systems that scale with you"      },
        ],
      },
      {
        heading: "People",
        items: [
          { label: "HR Consulting",       sub: "Talent strategy & org design"     },
          { label: "Executive Coaching",  sub: "Leadership development programs"  },
          { label: "Culture & Change",    sub: "Managing transformation"          },
        ],
      },
    ],
  },
  About: {
    cols: [
      {
        heading: "Who We Are",
        items: [
          { label: "Our Story",           sub: "40+ years of Detroit-based growth" },
          { label: "Leadership Team",     sub: "Advisors who've walked the path"   },
          { label: "Detroit Roots",       sub: "Committed to the city we call home" },
        ],
      },
      {
        heading: "Our Values",
        items: [
          { label: "Integrity First",     sub: "Honest advice, always"            },
          { label: "Results Over Talk",   sub: "Measurable outcomes, every time"  },
          { label: "Careers",             sub: "Join the JSB team"               },
        ],
      },
    ],
  },
  Resources: {
    cols: [
      {
        heading: "Learn",
        items: [
          { label: "Insights Blog",       sub: "Strategy, ops & leadership takes" },
          { label: "Case Studies",        sub: "Real results from real clients"    },
          { label: "Whitepapers",         sub: "Deep-dive research & frameworks"  },
        ],
      },
      {
        heading: "Tools",
        items: [
          { label: "ROI Calculator",      sub: "Estimate your advisory return"    },
          { label: "Strategy Templates",  sub: "Download-ready planning tools"    },
          { label: "Events & Webinars",   sub: "Live and on-demand sessions"      },
        ],
      },
    ],
  },
} as const;

type MegaKey = keyof typeof MEGA;

const NAV_ITEMS: { label: string; href: string; mega?: MegaKey }[] = [
  { label: "Services",  href: "#services",  mega: "Services"  },
  { label: "About",     href: "#about",     mega: "About"     },
  { label: "Resources", href: "#resources", mega: "Resources" },
  { label: "Results",   href: "#results"                      },
  { label: "Process",   href: "#process"                      },
];

/* ── Mega dropdown panel ──────────────────────────────────────────────── */
function MegaPanel({ data }: { data: typeof MEGA[MegaKey] }) {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 12px)", left: "50%",
      transform: "translateX(-50%)",
      background: "#111", border: "1px solid #2a2a2a",
      borderRadius: "14px", padding: "24px 28px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
      display: "flex", gap: "36px",
      minWidth: "480px", zIndex: 200,
      animation: "mega-in 0.18s cubic-bezier(0.22,1,0.36,1) both",
    }}>
      <style>{`@keyframes mega-in{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
      {data.cols.map((col) => (
        <div key={col.heading} style={{ minWidth: "160px" }}>
          <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#F2C94C", marginBottom: "14px", fontFamily: "var(--font-body)" }}>
            {col.heading}
          </div>
          {col.items.map((item) => (
            <a
              key={item.label}
              href="#"
              style={{ display: "block", padding: "8px 0", textDecoration: "none", borderBottom: "1px solid #1e1e1e" }}
              onMouseEnter={e => (e.currentTarget.querySelector(".mega-label") as HTMLElement).style.color = "#F2C94C"}
              onMouseLeave={e => (e.currentTarget.querySelector(".mega-label") as HTMLElement).style.color = "#fff"}
            >
              <div className="mega-label" style={{ fontSize: "13px", fontWeight: 600, color: "#fff", fontFamily: "var(--font-body)", transition: "color 0.15s" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "11px", color: "#666", marginTop: "2px", fontFamily: "var(--font-body)" }}>
                {item.sub}
              </div>
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Mobile drawer ────────────────────────────────────────────────────── */
function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [openSection, setOpenSection] = useState<MegaKey | null>(null);

  return (
    <div style={{ marginTop: "16px", border: "1px solid #222", borderRadius: "14px", background: "#0d0d0d", overflow: "hidden" }}>
      {NAV_ITEMS.map(({ label, href, mega }) => (
        <div key={label} style={{ borderBottom: "1px solid #1a1a1a" }}>
          {mega ? (
            <>
              <button
                onClick={() => setOpenSection(openSection === mega ? null : mega)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "14px 18px", background: "transparent", border: "none", cursor: "pointer", color: openSection === mega ? "#F2C94C" : "#cfcfcf", fontSize: "14px", fontWeight: 600, fontFamily: "var(--font-body)" }}
              >
                {label}
                <ChevronDown size={14} strokeWidth={2} style={{ transform: openSection === mega ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", color: openSection === mega ? "#F2C94C" : "#555" }} />
              </button>
              {openSection === mega && (
                <div style={{ background: "#111", padding: "4px 0 12px" }}>
                  {MEGA[mega].cols.map(col => (
                    <div key={col.heading} style={{ padding: "8px 18px 4px" }}>
                      <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#c89b3c", marginBottom: "8px", fontFamily: "var(--font-body)" }}>{col.heading}</div>
                      {col.items.map(item => (
                        <a key={item.label} href="#" onClick={onClose} style={{ display: "block", padding: "7px 0", textDecoration: "none", borderBottom: "1px solid #1e1e1e" }}>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#e5e7eb", fontFamily: "var(--font-body)" }}>{item.label}</div>
                          <div style={{ fontSize: "11px", color: "#555", marginTop: "1px", fontFamily: "var(--font-body)" }}>{item.sub}</div>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <a href={href} onClick={onClose} style={{ display: "flex", alignItems: "center", padding: "14px 18px", color: "#cfcfcf", textDecoration: "none", fontSize: "14px", fontWeight: 600, fontFamily: "var(--font-body)" }}>
              {label}
            </a>
          )}
        </div>
      ))}
      <div style={{ padding: "14px 18px" }}>
        <a href="#contact" onClick={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "#F2C94C", color: "#0A1A33", padding: "13px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", fontFamily: "var(--font-body)", textDecoration: "none" }}>
          <Phone size={14} strokeWidth={2} />
          Book a Free Strategy Call
        </a>
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaKey | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        width: "100%",
        padding: "20px 24px",
        background: "black",
        color: "white",
        borderBottom: "1px solid #222",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>

          {/* Logo — Shield Lettermark */}
          <a href="#hero" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", flexShrink: 0 }}>
            {/* SVG shield mark */}
            <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Shield outline */}
              <path
                d="M18 1L34 7.5V20C34 28.5 27 35.5 18 39C9 35.5 2 28.5 2 20V7.5L18 1Z"
                fill="#0d1c35"
                stroke="#c89b3c"
                strokeWidth="1.5"
              />
              {/* Inner shield bevel */}
              <path
                d="M18 5L30 10.5V20C30 26.5 24.8 32 18 34.8C11.2 32 6 26.5 6 20V10.5L18 5Z"
                fill="none"
                stroke="#c89b3c"
                strokeWidth="0.6"
                strokeOpacity="0.4"
              />
              {/* JSB text inside shield */}
              <text
                x="18" y="23"
                textAnchor="middle"
                fontSize="11"
                fontWeight="800"
                fontFamily="Georgia, serif"
                fill="#F2C94C"
                letterSpacing="0.5"
              >JSB</text>
            </svg>
            {/* Wordmark */}
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif", letterSpacing: "0.02em", lineHeight: 1 }}>Business Solutions Group</div>
              <div style={{ fontSize: "9px", color: "#8a7a5a", fontFamily: "var(--font-body)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "3px" }}>Detroit-based · Advisor-led</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
            {NAV_ITEMS.map(({ label, href, mega }) => (
              <div key={label} style={{ position: "relative" }}>
                <button
                  onClick={() => setActiveMega(mega && activeMega !== mega ? mega : null)}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    if (activeMega !== mega) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#cfcfcf";
                    }
                  }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    padding: "7px 13px", borderRadius: "6px",
                    color: activeMega === mega ? "#fff" : "#cfcfcf",
                    background: activeMega === mega ? "rgba(255,255,255,0.07)" : "transparent",
                    fontSize: "14px", fontFamily: "var(--font-body)",
                    cursor: "pointer", border: "none",
                    transition: "background 0.15s, color 0.15s",
                  }}
                >
                  {label}
                  {mega && (
                    <ChevronDown
                      size={12}
                      strokeWidth={2.2}
                      style={{ transform: activeMega === mega ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
                    />
                  )}
                </button>
                {mega && activeMega === mega && <MegaPanel data={MEGA[mega]} />}
              </div>
            ))}

            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "#F2C94C", color: "#0A1A33",
              border: "none", padding: "9px 16px",
              borderRadius: "8px", fontWeight: 700,
              fontSize: "14px", fontFamily: "var(--font-body)",
              textDecoration: "none", marginLeft: "8px", cursor: "pointer",
            }}>
              <Phone size={14} strokeWidth={2} />
              Book Call
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "transparent", color: "white",
              border: "1px solid #333", padding: "8px 10px",
              borderRadius: "8px", cursor: "pointer",
              display: "flex", alignItems: "center",
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && <MobileDrawer onClose={() => setMenuOpen(false)} />}
      </div>
    </nav>
  );
}
