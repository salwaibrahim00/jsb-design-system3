"use client";
import { useState } from "react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const crumbs = [
  { label: "Home", id: "hero" },
  { label: "JSB Design System", id: "colors" },
  { label: "Component Library", id: null },
];

function ChevronIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ color: "#d1d5db", flexShrink: 0 }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export default function Breadcrumb() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{
      padding: "20px 24px 0",
      background: "var(--color-background)",
    }}>
      {/* ✅ maxWidth matches layout system */}
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <nav
          aria-label="Breadcrumb"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "white",
            border: "1px solid rgba(20,34,53,0.08)",
            borderRadius: "999px",
            padding: "8px 16px",
            boxShadow: "0 1px 4px rgba(16,35,63,0.04)",
          }}
        >
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            const isHovered = hovered === crumb.label;

            return (
              <span
                key={crumb.label}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                {i > 0 && <ChevronIcon />}

                {isLast ? (
                  <span style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0A1A33",
                    fontFamily: "var(--font-body)",
                  }}>
                    {crumb.label}
                  </span>
                ) : (
                  <button
                    onClick={() => crumb.id && scrollTo(crumb.id)}
                    onMouseEnter={() => setHovered(crumb.label)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      fontSize: "13px",
                      fontWeight: 500,
                      color: isHovered ? "#0A1A33" : "#9ca3af",
                      fontFamily: "var(--font-body)",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      transition: "color 0.15s",
                      cursor: "pointer",
                    }}
                  >
                    {i === 0 && <HomeIcon />}
                    {crumb.label}
                  </button>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}