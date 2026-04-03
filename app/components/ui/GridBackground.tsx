"use client";
import { useEffect, useRef } from "react";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const cellSize = 48;

      offset = (offset + 0.12) % cellSize;

      // Minor grid lines
      ctx.beginPath();
      ctx.strokeStyle = "rgba(242,201,76,0.055)";
      ctx.lineWidth = 0.5;

      for (let x = (offset % cellSize) - cellSize; x < w + cellSize; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = (offset % cellSize) - cellSize; y < h + cellSize; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Major grid lines (every 4 cells)
      const majorSize = cellSize * 4;
      const majorOffset = offset % majorSize;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(242,201,76,0.11)";
      ctx.lineWidth = 1;

      for (let x = (majorOffset % majorSize) - majorSize; x < w + majorSize; x += majorSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = (majorOffset % majorSize) - majorSize; y < h + majorSize; y += majorSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Crosshair accents at major intersections
      const crossSize = 6;
      ctx.strokeStyle = "rgba(242,201,76,0.22)";
      ctx.lineWidth = 1;

      for (let x = (majorOffset % majorSize) - majorSize; x < w + majorSize; x += majorSize) {
        for (let y = (majorOffset % majorSize) - majorSize; y < h + majorSize; y += majorSize) {
          ctx.beginPath();
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
          ctx.stroke();
        }
      }

      // Fade edges with a vignette using gradient overlay
      const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.9);
      vignette.addColorStop(0, "rgba(10,26,51,0)");
      vignette.addColorStop(1, "rgba(6,13,24,0.7)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

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
