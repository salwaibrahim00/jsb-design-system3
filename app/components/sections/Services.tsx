"use client";
import { useState } from "react";
import { TrendingUp, Target, Users, ShieldCheck, Rocket, Award } from "lucide-react";

const SERVICES = [
  {
    Icon: TrendingUp,
    tag: "Finance",
    title: "Financial Planning",
    body: "Budgeting, forecasting, and capital strategy to build long-term financial health and investor-readiness.",
  },
  {
    Icon: Target,
    tag: "Strategy",
    title: "Business Strategy",
    body: "Competitive positioning, market analysis, and direction-setting for companies serious about sustainable advantage.",
  },
  {
    Icon: Users,
    tag: "People",
    title: "HR & People Ops",
    body: "Recruitment frameworks, compensation planning, and culture systems that attract and retain the right talent.",
  },
  {
    Icon: ShieldCheck,
    tag: "Risk",
    title: "Risk Management",
    body: "Identify exposure, build contingency plans, and protect what you have built before a crisis forces your hand.",
  },
  {
    Icon: Rocket,
    tag: "Growth",
    title: "Growth & Scaling",
    body: "Operational infrastructure and go-to-market execution to grow confidently without losing control of the business.",
  },
  {
    Icon: Award,
    tag: "Leadership",
    title: "Leadership Development",
    body: "Executive coaching for founders and leaders to make decisions with clarity, confidence, and accountability.",
  },
];

function ServiceCard({
  Icon,
  tag,
  title,
  body,
}: {
  Icon: React.ElementType;
  tag: string;
  title: string;
  body: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(242,201,76,0.06)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? "rgba(242,201,76,0.28)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "20px",
        padding: "28px",
        transition: "all 0.25s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "14px",
          background: hovered ? "rgba(242,201,76,0.16)" : "rgba(242,201,76,0.11)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          transition: "background 0.25s",
        }}
      >
        <Icon
          size={22}
          strokeWidth={1.6}
          color={hovered ? "#F2C94C" : "rgba(242,201,76,0.75)"}
          style={{ transition: "color 0.25s" }}
        />
      </div>
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(242,201,76,0.45)",
          fontFamily: "var(--font-body)",
          marginBottom: "10px",
        }}
      >
        {tag}
      </div>
      <h3
        style={{
          fontSize: "17px",
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "var(--font-heading)",
          margin: "0 0 10px 0",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.42)",
          fontFamily: "var(--font-body)",
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" style={{ background: "#0A1A33", padding: "96px 24px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ marginBottom: "56px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#F2C94C",
              fontWeight: 700,
              margin: "0 0 14px 0",
              fontFamily: "var(--font-body)",
            }}
          >
            What We Do
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              margin: "0 0 16px 0",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: "640px",
            }}
          >
            Every engagement is different.
            <br />
            The standard of advice is not.
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-body)",
              maxWidth: "580px",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            We work across six core practice areas — always led by senior advisors,
            always focused on measurable outcomes.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
