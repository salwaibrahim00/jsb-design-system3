"use client";
import { useState } from "react";
import { Phone, ArrowRight } from "lucide-react";

export default function CTABanner() {
  const [btnHovered, setBtnHovered] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #091628 0%, #0f2748 45%, #091628 100%)",
        padding: "104px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "640px",
          height: "640px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(242,201,76,0.07) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "960px",
          height: "960px",
          borderRadius: "50%",
          border: "1px solid rgba(242,201,76,0.05)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          border: "1px solid rgba(242,201,76,0.04)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(242,201,76,0.1)",
            border: "1px solid rgba(242,201,76,0.22)",
            borderRadius: "999px",
            padding: "7px 18px",
            marginBottom: "28px",
          }}
        >
          <Phone size={12} strokeWidth={2} color="#F2C94C" />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#F2C94C",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Free 30-Min Strategy Call
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(32px, 5.5vw, 56px)",
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "var(--font-heading)",
            margin: "0 0 20px 0",
            letterSpacing: "-0.03em",
            lineHeight: 1.06,
          }}
        >
          Ready to make your next big
          <br />
          <span style={{ color: "#F2C94C" }}>business decision</span> with clarity?
        </h2>

        <p
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-body)",
            margin: "0 auto 44px auto",
            lineHeight: 1.75,
            maxWidth: "520px",
          }}
        >
          No commitment, no hard sell. Just an honest conversation with a senior
          JSB advisor who has seen your problem before.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              background: "#F2C94C",
              color: "#0A1A33",
              border: "none",
              borderRadius: "12px",
              padding: "16px 32px",
              fontWeight: 700,
              fontSize: "15px",
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "9px",
              boxShadow: btnHovered
                ? "0 14px 32px rgba(242,201,76,0.4)"
                : "0 6px 18px rgba(242,201,76,0.25)",
              transform: btnHovered ? "translateY(-3px)" : "translateY(0)",
              transition: "all 0.22s ease",
            }}
          >
            <Phone size={16} strokeWidth={2} />
            Book a Free Strategy Call
          </button>

          <a
            href="#about"
            onMouseEnter={() => setLinkHovered(true)}
            onMouseLeave={() => setLinkHovered(false)}
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: linkHovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s",
            }}
          >
            Learn about our process
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          {[
            "No commitment required",
            "Senior advisors only",
            "Detroit-based team",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.35)",
                fontFamily: "var(--font-body)",
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "rgba(242,201,76,0.5)",
                  flexShrink: 0,
                }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
