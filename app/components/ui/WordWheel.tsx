"use client";
import { useEffect, useRef, useState } from "react";

const DEFAULT_WORDS = [
  "Strategy", "Clarity", "Growth", "Results",
  "Legacy", "Direction", "Vision", "Purpose",
  "Insight", "Leadership", "Impact",
];

const SIZE = 340;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RADIUS = 138;
const SPOKE_LEN = RADIUS - 22;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function coord(n: number): string {
  return n.toFixed(3);
}

function calcPositions(words: string[], offsetDeg: number) {
  const n = words.length;
  const stepDeg = 360 / n;
  return words.map((_, i) => {
    const angleDeg = i * stepDeg + offsetDeg;
    const angleRad = toRad(angleDeg);
    return {
      x: coord(CX + RADIUS * Math.cos(angleRad)),
      y: coord(CY + RADIUS * Math.sin(angleRad)),
      sx: coord(CX + SPOKE_LEN * Math.cos(angleRad)),
      sy: coord(CY + SPOKE_LEN * Math.sin(angleRad)),
    };
  });
}

export function WordWheel({ words = DEFAULT_WORDS }: { words?: string[] }) {
  const n = words.length;
  const stepDeg = 360 / n;

  const [displayOffset, setDisplayOffset] = useState(0);
  const [active, setActive] = useState(0);

  const targetOffset = useRef(0);
  const currentOffset = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      const diff = targetOffset.current - currentOffset.current;
      if (Math.abs(diff) > 0.02) {
        currentOffset.current += diff * 0.07;
        setDisplayOffset(currentOffset.current);
        rafRef.current = requestAnimationFrame(animate);
      } else {
        currentOffset.current = targetOffset.current;
        setDisplayOffset(targetOffset.current);
      }
    };

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % n);
      targetOffset.current -= stepDeg;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }, 1500);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(rafRef.current);
    };
  }, [n, stepDeg]);

  const positions = calcPositions(words, displayOffset);

  return (
    <div className="ww-scene">
      <div className="ww-ring ww-ring-outer" />
      <div className="ww-ring ww-ring-mid" />
      <div className="ww-ring ww-ring-inner" />
      <div className="ww-hub" />

      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
      >
        {/* Spoke lines */}
        {words.map((w, i) => {
          const { sx, sy } = positions[i];
          const isActive = i === active;
          return (
            <line
              key={"line-" + w}
              x1={CX}
              y1={CY}
              x2={sx}
              y2={sy}
              stroke={isActive ? "rgba(242,201,76,0.55)" : "rgba(255,255,255,0.18)"}
              strokeWidth={isActive ? 1.5 : 0.8}
              style={{ transition: "stroke 0.5s ease, stroke-width 0.5s ease" }}
            />
          );
        })}

        {/* Word labels */}
        {words.map((w, i) => {
          const { x, y } = positions[i];
          const isActive = i === active;
          return (
            <text
              key={w}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: isActive ? "15px" : "11px",
                fontWeight: 700,
                fill: isActive ? "#F2C94C" : "rgba(255,255,255,0.55)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                transition: "fill 0.5s ease, font-size 0.5s ease, filter 0.5s ease",
                filter: isActive
                  ? "drop-shadow(0 0 8px rgba(242,201,76,0.65))"
                  : "none",
                userSelect: "none",
                cursor: "default",
              }}
            >
              {w}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
