"use client";
import { useState } from "react";
import { Globe, Share2, Mail, MapPin } from "lucide-react";

function FooterLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      style={{
        display: "block",
        fontFamily: "var(--font-body)",
        fontSize: "14px",
        color: hovered ? "#F2C94C" : "#9ca3af",
        textDecoration: "none",
        marginBottom: "10px",
        transition: "color 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  );
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        background: hovered ? "rgba(242,201,76,0.15)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${hovered ? "rgba(242,201,76,0.3)" : "rgba(255,255,255,0.08)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hovered ? "#F2C94C" : "#6b7280",
        transition: "all 0.15s",
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Colors", href: "#colors" },
  { label: "Typography", href: "#type" },
  { label: "Spacing", href: "#spacing" },
  { label: "Components", href: "#badges" },
];

const resourceLinks = [
  { label: "Buttons", href: "#buttons" },
  { label: "Cards", href: "#cards" },
  { label: "Forms", href: "#forms" },
  { label: "Modals", href: "#modals" },
  { label: "Toasts", href: "#toasts" },
];

export default function Footer() {
  const [emailHovered, setEmailHovered] = useState(false);

  return (
    <footer style={{
      background: "#0A1A33",
      color: "white",
      padding: "72px 24px 0",
      marginTop: "80px",
    }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

        {/* Top CTA banner */}
        <div style={{
          background: "rgba(242,201,76,0.07)",
          border: "1px solid rgba(242,201,76,0.15)",
          borderRadius: "20px",
          padding: "40px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
          flexWrap: "wrap",
          marginBottom: "64px",
        }}>
          <div>
            <h3 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "24px",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 8px 0",
              letterSpacing: "-0.02em",
            }}>
              Ready to make your next move with clarity?
            </h3>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "#9ca3af",
              margin: 0,
              lineHeight: 1.6,
            }}>
              Book a free 30-minute strategy call. No commitment — just an honest conversation.
            </p>
          </div>
          <button
            style={{
              background: "#F2C94C",
              color: "#0A1A33",
              border: "none",
              borderRadius: "10px",
              padding: "14px 26px",
              fontWeight: 700,
              fontSize: "14px",
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              boxShadow: "0 4px 14px rgba(242,201,76,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(242,201,76,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(242,201,76,0.3)";
            }}
          >
            Schedule a Free Strategy Call
          </button>
        </div>

        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
          gap: "48px",
          paddingBottom: "48px",
        }}>

          {/* Brand col */}
          <div>
            {/* Logo mark */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                background: "#F2C94C",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "13px",
                color: "#0A1A33",
                letterSpacing: "0.5px",
                flexShrink: 0,
              }}>
                JSB
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>
                  JSB Business Solutions Group
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#4b5563" }}>
                  Detroit, Michigan
                </div>
              </div>
            </div>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: 1.75,
              margin: "0 0 24px 0",
              maxWidth: "280px",
            }}>
              Helping entrepreneurs make better business decisions with real-world strategy and execution support.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "8px" }}>
              <SocialIcon href="#"><Globe size={15} strokeWidth={2} /></SocialIcon>
              <SocialIcon href="#"><Share2 size={15} strokeWidth={2} /></SocialIcon>
              <SocialIcon href="#"><Mail size={15} strokeWidth={2} /></SocialIcon>
            </div>
          </div>

          {/* Nav col */}
          <div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 700,
              color: "#4b5563",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>
              Design System
            </div>
            {navLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </div>

          {/* Resources col */}
          <div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 700,
              color: "#4b5563",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>
              Components
            </div>
            {resourceLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </div>

          {/* Contact col */}
          <div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 700,
              color: "#4b5563",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>
              Contact
            </div>
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              marginBottom: "14px",
            }}>
              <MapPin size={14} strokeWidth={2} color="#4b5563" style={{ marginTop: "1px", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>
                Detroit, Michigan
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Mail size={14} strokeWidth={2} color="#4b5563" style={{ flexShrink: 0 }} />
              <a
                href="mailto:info@jsbbsg.com"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: emailHovered ? "#F2C94C" : "#6b7280",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
              >
                info@jsbbsg.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "#4b5563",
          }}>
            © 2026 JSB Business Solutions Group. All rights reserved.
          </span>
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "#4b5563",
          }}>
            Built with the JSB Design System
          </span>
        </div>

      </div>
    </footer>
  );
}