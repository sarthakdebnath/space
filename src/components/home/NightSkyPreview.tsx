"use client";

import Link from "next/link";

export default function NightSkyPreview() {
  return (
    <div className="mc-panel">
      <div className="mc-panel-header">
        <span className="status-led cyan" />
        LOCATION SKY MODULE

        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.65rem",
            letterSpacing: "3px",
            color: "rgba(0,255,136,0.45)",
          }}
        >
          OBSERVATION READY
        </span>
      </div>

      <div
        className="mc-panel-body"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1rem",
        }}
      >
        <div>
          <div className="section-eyebrow">
            CELESTIAL OBSERVATION SYSTEM
          </div>

          <h2
            style={{
              fontSize: "2.5rem",
              color: "var(--cyan)",
              textShadow: "var(--glow-cyan)",
            }}
          >
            NIGHT SKY
          </h2>

          <p
            style={{
              marginTop: "0.75rem",
              color: "rgba(0,255,136,0.75)",
              maxWidth: "700px",
            }}
          >
            Analyze sky visibility, moon phase,
            atmospheric conditions, planetary visibility,
            constellation activity and observation quality
            for any location on Earth.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: "0.75rem",
              marginTop: "1rem",
            }}
          >
            <div className="telem-card">
              <div className="telem-label">
                MOON TRACKING
              </div>

              <div
                className="telem-value"
                style={{
                  color: "var(--amber)",
                  textShadow: "var(--glow-amber)",
                  fontSize: "1.5rem",
                }}
              >
                ACTIVE
              </div>

              <div className="telem-unit">
                PHASE ANALYSIS
              </div>
            </div>

            <div className="telem-card">
              <div className="telem-label">
                PLANET VISIBILITY
              </div>

              <div
                className="telem-value"
                style={{
                  color: "var(--cyan)",
                  textShadow: "var(--glow-cyan)",
                  fontSize: "1.5rem",
                }}
              >
                READY
              </div>

              <div className="telem-unit">
                REAL-TIME ESTIMATION
              </div>
            </div>

            <div className="telem-card">
              <div className="telem-label">
                SKY CONDITIONS
              </div>

              <div
                className="telem-value"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                LIVE
              </div>

              <div className="telem-unit">
                WEATHER LINKED
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "1rem",
            background:
              "rgba(0,217,255,0.03)",
          }}
        >
          <div className="section-eyebrow">
            QUICK ACCESS
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                color: "var(--cyan)",
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                textShadow: "var(--glow-cyan)",
              }}
            >
              SKY ONLINE
            </div>

            <div
              style={{
                color: "rgba(0,255,136,0.65)",
                fontSize: "0.85rem",
              }}
            >
              Observation systems ready for
              location-based sky analysis.
            </div>

            <Link
              href="/night-sky"
              className="quick-btn"
            >
              OPEN NIGHT SKY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}