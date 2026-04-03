"use client";
import { useState } from "react";
import { Search, FileText, Compass, CheckCheck } from "lucide-react";

const STEPS = [
  {
    num: "01",
    Icon: Search,
    title: "Discovery",
    body: "We listen before we advise. A deep-dive into your business, finances, team, and goals uncovers what is really blocking progress.",
  },
  {
    num: "02",
    Icon: FileText,
    title: "Diagnosis",
    body: "We map your current state against where you want to be — identifying gaps, risks, and the highest-leverage opportunities available.",
  },
  {
    num: "03",
    Icon: Compass,
    title: "Roadmap",
    body: "A clear, prioritized action plan with owners, timelines, and milestones. No vague frameworks — just work that can actually be done.",
  },
  {
    num: "04",
    Icon: CheckCheck,
    title: "Execution",
    body: "We work alongside your team through implementation — tracking progress, adjusting course, and holding the standard throughout.",
  },
];

function StepCard({
  num,
  Icon,
  title,
  body,
  isLast,
}: {
  num: string;
  Icon: React.ElementType;
  title: string;
  body: string;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
      {!isLast && (
        <div
          style={{
            position: "absolute",
            top: "27px",
            left: "calc(50% + 34px)",
            right: "-16px",
            height: "1px",
            background:
              "linear-gradient(to right, rgba(242,201,76,0.35), rgba(242,201,76,0.04))",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 12px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            background: hovered
              ? "rgba(242,201,76,0.14)"
              : "rgba(242,201,76,0.07)",
            border: `1px solid ${
              hovered ? "rgba(242,201,76,0.45)" : "rgba(242,201,76,0.18)"
            }`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px auto",
            transition: "all 0.25s ease",
            boxShadow: hovered
              ? "0 0 20px rgba(242,201,76,0.2)"
              : "none",
          }}
        >
          <Icon
            size={20}
            strokeWidth={1.6}
            color={hovered ? "#F2C94C" : "rgba(242,201,76,0.4)"}
            style={{ transition: "color 0.25s" }}
          />
        </div>

        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "rgba(242,201,76,0.4)",
            fontFamily: "var(--font-body)",
            marginBottom: "8px",
            textTransform: "uppercase",
          }}
        >
          Step {num}
        </div>

        <h3
          style={{
            fontSize: "16px",
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
            fontSize: "13px",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-body)",
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section
      id="process"
      style={{ background: "#0B1E3F", padding: "96px 24px" }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "64px",
          }}
        >
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
            How We Work
          </p>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              margin: "0 0 16px 0",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            A process built on straight talk
            <br />
            and real work.
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.42)",
              fontFamily: "var(--font-body)",
              maxWidth: "520px",
              lineHeight: 1.75,
              margin: "0 auto",
            }}
          >
            Four steps. No filler. Senior advisors every step of the way.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          {STEPS.map((step, i) => (
            <StepCard
              key={step.title}
              {...step}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
