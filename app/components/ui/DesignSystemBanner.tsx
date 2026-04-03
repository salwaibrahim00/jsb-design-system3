"use client";

import { useState } from "react";

const TOKENS = [
  { label: "#F2C94C", size: 44, top: "18%", left: "62%", delay: "0s"    },
  { label: "#3b82f6", size: 28, top: "55%", left: "71%", delay: "0.4s"  },
  { label: "#2f7a51", size: 36, top: "22%", left: "82%", delay: "0.8s"  },
  { label: "#b84040", size: 22, top: "66%", left: "60%", delay: "1.2s"  },
  { label: "#c4b5fd", size: 30, top: "38%", left: "90%", delay: "0.2s"  },
  { label: "#86efac", size: 18, top: "76%", left: "78%", delay: "0.6s"  },
  { label: "#f9a8d4", size: 24, top: "12%", left: "74%", delay: "1.0s"  },
];

export default function DesignSystemBanner() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        marginBottom: "48px",
        background: "linear-gradient(135deg, #060d18 0%, #0A1A33 55%, #0d1f3a 100%)",
        height: "220px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Animated floating color dots */}
      <style>{`
        @keyframes float-a {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-14px) rotate(5deg); }
          66%       { transform: translateY(8px) rotate(-4deg); }
        }
        @keyframes float-b {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-20px) rotate(-6deg); }
        }
      `}</style>

      {TOKENS.map((t, i) => (
        <div
          key={t.label}
          style={{
            position: "absolute",
            width: t.size,
            height: t.size,
            borderRadius: "50%",
            background: t.label,
            top: t.top,
            left: t.left,
            opacity: 0.55,
            animation: `${i % 2 === 0 ? "float-a" : "float-b"} ${2.8 + i * 0.4}s ease-in-out infinite`,
            animationDelay: t.delay,
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* Grid texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Fade right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "40%",
          background:
            "linear-gradient(to left, rgba(10,26,51,0.8) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Text */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 48px" }}>
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#F2C94C",
            fontWeight: 700,
            margin: "0 0 10px 0",
            fontFamily: "var(--font-body)",
          }}
        >
          Component Library
        </p>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(22px, 2.8vw, 36px)",
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 10px 0",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          JSB Design System
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "rgba(255,255,255,0.5)",
            margin: 0,
            maxWidth: "420px",
            lineHeight: 1.65,
          }}
        >
          A living component library for JSB Business Solutions Group — built for clarity, trust, and conversion.
        </p>
      </div>
    </div>
  );
}
