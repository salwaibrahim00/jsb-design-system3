"use client";

const WORDS = [
  "STRATEGY",
  "OPERATIONS",
  "FINANCE",
  "DETROIT",
  "LEADERSHIP",
  "CLARITY",
  "GROWTH",
  "RESULTS",
  "VISION",
  "IMPACT",
  "ACCOUNTABILITY",
  "EXECUTION",
];

const SEGMENT = WORDS.join("   ·   ");

export default function MarqueeStrip({ dark = false }: { dark?: boolean }) {
  const color = dark ? "rgba(242,201,76,0.35)" : "#0A1A33";
  const bg = dark ? "#091628" : "#F2C94C";
  const borderColor = dark ? "rgba(242,201,76,0.08)" : "transparent";

  return (
    <div
      style={{
        background: bg,
        overflow: "hidden",
        padding: "14px 0",
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          animation: "marquee 36s linear infinite",
          willChange: "transform",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              fontSize: "10.5px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              fontFamily: "var(--font-body)",
              color,
              paddingRight: "48px",
            }}
          >
            {SEGMENT}
          </span>
        ))}
      </div>
    </div>
  );
}
