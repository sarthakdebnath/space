"use client";

import { useEffect, useState } from "react";
import { BootMessage } from "@/types/sky";

interface BootLoaderProps {
  messages: BootMessage[];
  onComplete?: () => void;
}

export default function BootLoader({ messages, onComplete }: BootLoaderProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const allDone = messages.every((m) => m.status === "done");
    if (allDone && messages.length > 0) {
      const t = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => onComplete?.(), 800);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [messages, onComplete]);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#000",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "32px",
      opacity: fadeOut ? 0 : 1,
      pointerEvents: fadeOut ? "none" : "all",
      transition: "opacity 0.8s ease",
    }}>

      {/* Scanlines overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>

        {/* Title */}
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          color: "#00ff88",
          letterSpacing: "8px",
          textShadow: "0 0 16px #00ff88, 0 0 32px rgba(0,255,136,0.4)",
          textAlign: "center",
        }}>
          ◈ NIGHT SKY UPLINK ◈
        </div>

        {/* City acquiring text */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.7rem",
          color: "rgba(0,255,136,0.45)",
          letterSpacing: "4px",
          textAlign: "center",
        }}>
          ACQUIRING STELLAR DATA...
        </div>

        {/* Progress bar */}
        <div style={{
          width: "clamp(200px, 40vw, 380px)",
          height: "4px",
          background: "rgba(0,255,136,0.1)",
          border: "1px solid rgba(0,255,136,0.25)",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            background: "#00ff88",
            boxShadow: "0 0 10px #00ff88, 0 0 20px rgba(0,255,136,0.5)",
            animation: "bootProgress 2.5s ease-out forwards",
          }} />
        </div>

        {/* Boot lines */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "clamp(0.65rem, 1.2vw, 0.78rem)",
          letterSpacing: "2px",
          minWidth: "clamp(200px, 40vw, 420px)",
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                opacity: msg.status === "pending" ? 0 : 1,
                color: msg.status === "done"
                  ? "rgba(0,255,136,0.7)"
                  : msg.status === "active"
                  ? "#00ff88"
                  : msg.status === "error"
                  ? "#ff4d4d"
                  : "rgba(0,255,136,0.35)",
                transform: msg.status === "pending" ? "translateX(-8px)" : "translateX(0)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                textShadow: msg.status === "active" ? "0 0 8px #00ff88" : "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: msg.status === "error" ? "#ff4d4d" : "#00ff88" }}>
                {msg.status === "done"  && "[  OK  ]"}
                {msg.status === "active" && "[  ..  ]"}
                {msg.status === "error" && "[ ERR  ]"}
                {msg.status === "pending" && "[      ]"}
              </span>
              <span>&gt; {msg.text}</span>
              {msg.status === "active" && (
                <span style={{
                  display: "inline-block",
                  animation: "blinkCursor 0.7s step-end infinite",
                  color: "#00ff88",
                }}>_</span>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes bootProgress {
          0%   { width: 0%; }
          60%  { width: 75%; }
          85%  { width: 90%; }
          100% { width: 100%; }
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
