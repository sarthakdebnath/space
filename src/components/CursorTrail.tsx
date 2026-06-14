"use client";

import { useEffect } from "react";

export default function CursorTrail() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: fixed;
        left: ${e.clientX + 10}px;
        top: ${e.clientY + 10}px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(0, 255, 136, 0.25);
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%);
        transition: all 0.8s ease-out;
      `;
      document.body.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.opacity = "0";
        particle.style.transform = "translate(-50%, -50%) scale(2)";
      });

      setTimeout(() => particle.remove(), 800);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}