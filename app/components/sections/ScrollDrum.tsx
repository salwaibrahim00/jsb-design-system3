"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    label: "Business Advisory",
    sub: "Strategic direction for every stage of growth",
    num: "01",
  },
  {
    label: "Operations Consulting",
    sub: "Streamline workflows and eliminate bottlenecks",
    num: "02",
  },
  {
    label: "Financial Readiness",
    sub: "Books, forecasts, and funding preparation",
    num: "03",
  },
  {
    label: "Growth Strategy",
    sub: "Scalable systems built around your market",
    num: "04",
  },
  {
    label: "HR & Team Building",
    sub: "Hire, structure, and retain great people",
    num: "05",
  },
  {
    label: "Technology Solutions",
    sub: "Tools and infrastructure that actually work",
    num: "06",
  },
];

const ITEM_H = 80;
const VISIBLE = 5;
const CONTAINER_H = ITEM_H * VISIBLE;
const CENTER_OFFSET = Math.floor(VISIBLE / 2) * ITEM_H;

function easeScale(dist: number): number {
  if (dist === 0) return 1.08;
  if (dist === 1) return 0.88;
  if (dist === 2) return 0.72;
  return 0.6;
}

function easeOpacity(dist: number): number {
  if (dist === 0) return 1;
  if (dist === 1) return 0.45;
  if (dist === 2) return 0.18;
  return 0.07;
}

export default function ScrollDrum() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % ITEMS.length);
    }, 2200);
  };

  useEffect(() => {
    if (!paused) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const handleClick = (i: number) => {
    setActive(i);
    setPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const translateY = CENTER_OFFSET - active * ITEM_H;

  return (
    <section
      style={{
        background: "#07122A",
        padding: "100px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        {/* Left: heading */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(242,201,76,0.10)",
              border: "1px solid rgba(242,201,76,0.22)",
              borderRadius: "100px",
              padding: "6px 16px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#F2C94C",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#F2C94C",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
              }}
            >
              What we do
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: "white",
              fontFamily: "var(--font-heading)",
              lineHeight: 1.15,
              margin: "0 0 20px 0",
              letterSpacing: "-0.02em",
            }}
          >
            Six disciplines.
            <br />
            <span style={{ color: "#F2C94C" }}>One firm.</span>
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              margin: "0 0 36px 0",
              fontFamily: "var(--font-body)",
              maxWidth: "380px",
            }}
          >
            From the first business plan to a nine-figure exit, JSB has the
            expertise to guide every phase of your journey.
          </p>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleClick(i)}
                style={{
                  width: i === active ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "100px",
                  background: i === active ? "#F2C94C" : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              />
            ))}
            <button
              onClick={() => setPaused((p) => !p)}
              style={{
                marginLeft: "8px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "6px",
                padding: "4px 10px",
                color: "rgba(255,255,255,0.5)",
                fontSize: "11px",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.05em",
              }}
            >
              {paused ? "▶ play" : "⏸ pause"}
            </button>
          </div>
        </div>

        {/* Right: drum */}
        <div style={{ position: "relative" }}>
          {/* Active item highlight bar */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "-24px",
              right: "-24px",
              height: `${ITEM_H}px`,
              transform: "translateY(-50%)",
              background: "rgba(242,201,76,0.06)",
              borderLeft: "3px solid #F2C94C",
              borderRadius: "0 12px 12px 0",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Fade top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "80px",
              background:
                "linear-gradient(to bottom, #07122A 0%, transparent 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Fade bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "80px",
              background:
                "linear-gradient(to top, #07122A 0%, transparent 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Scrolling list */}
          <div
            style={{
              height: `${CONTAINER_H}px`,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                transform: `translateY(${translateY}px)`,
                transition: "transform 0.55s cubic-bezier(0.34, 1.3, 0.64, 1)",
              }}
            >
              {ITEMS.map((item, i) => {
                const dist = Math.abs(i - active);
                const scale = easeScale(dist);
                const opacity = easeOpacity(dist);
                const isActive = dist === 0;

                return (
                  <div
                    key={item.label}
                    onClick={() => handleClick(i)}
                    style={{
                      height: `${ITEM_H}px`,
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      paddingLeft: "8px",
                      transform: `scale(${scale})`,
                      transformOrigin: "left center",
                      opacity,
                      transition: "transform 0.45s ease, opacity 0.45s ease",
                      cursor: "pointer",
                      position: "relative",
                      zIndex: 3,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: isActive ? "#F2C94C" : "rgba(255,255,255,0.3)",
                        fontFamily: "var(--font-body)",
                        letterSpacing: "0.1em",
                        minWidth: "24px",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {item.num}
                    </span>

                    <div>
                      <div
                        style={{
                          fontSize: isActive ? "20px" : "17px",
                          fontWeight: 700,
                          color: isActive ? "#F2C94C" : "white",
                          fontFamily: "var(--font-heading)",
                          lineHeight: 1.2,
                          marginBottom: "4px",
                          transition: "font-size 0.3s ease, color 0.3s ease",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.45)",
                          fontFamily: "var(--font-body)",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.sub}
                      </div>
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
