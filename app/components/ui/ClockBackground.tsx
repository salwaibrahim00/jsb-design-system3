"use client";
import { useEffect, useRef } from "react";

export default function ClockBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function drawClock(cx: number, cy: number, r: number, alpha: number) {
      if (!ctx) return;
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);

      // Outer ring
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(242,201,76,0.18)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.92, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(242,201,76,0.08)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Hour ticks
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const outer = r * 0.92;
        const inner = r * 0.82;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
        ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
        ctx.strokeStyle = "rgba(242,201,76,0.35)";
        ctx.lineWidth = i % 3 === 0 ? 2 : 0.8;
        ctx.stroke();
      }

      // Minute ticks
      for (let i = 0; i < 60; i++) {
        if (i % 5 === 0) continue;
        const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const outer = r * 0.92;
        const inner = r * 0.88;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
        ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Hour hand
      const hrAngle = (hr / 12) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(hrAngle) * r * 0.52, Math.sin(hrAngle) * r * 0.52);
      ctx.strokeStyle = "rgba(242,201,76,0.7)";
      ctx.lineWidth = r * 0.022;
      ctx.lineCap = "round";
      ctx.stroke();

      // Minute hand
      const minAngle = (min / 60) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(minAngle) * r * 0.72, Math.sin(minAngle) * r * 0.72);
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = r * 0.014;
      ctx.lineCap = "round";
      ctx.stroke();

      // Second hand
      const secAngle = (sec / 60) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(secAngle + Math.PI) * r * 0.2, Math.sin(secAngle + Math.PI) * r * 0.2);
      ctx.lineTo(Math.cos(secAngle) * r * 0.78, Math.sin(secAngle) * r * 0.78);
      ctx.strokeStyle = "rgba(242,201,76,0.9)";
      ctx.lineWidth = r * 0.007;
      ctx.lineCap = "round";
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.03, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(242,201,76,0.8)";
      ctx.fill();

      ctx.restore();
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Large primary clock — right-center
      drawClock(w * 0.72, h * 0.5, Math.min(w, h) * 0.42, 0.55);

      // Small secondary clock — top-left area
      drawClock(w * 0.08, h * 0.18, Math.min(w, h) * 0.1, 0.2);

      // Tiny ghost clock — bottom-right
      drawClock(w * 0.95, h * 0.88, Math.min(w, h) * 0.07, 0.12);

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
