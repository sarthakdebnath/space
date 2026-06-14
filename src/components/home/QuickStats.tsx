"use client";

import { useISS } from "@/hooks/useISS";

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  accent?: "green" | "amber" | "cyan";
}

function StatCard({
  label,
  value,
  unit,
  accent = "green",
}: StatCardProps) {
  const colorMap = {
    green: "var(--green)",
    amber: "var(--amber)",
    cyan: "var(--cyan)",
  };

  const glowMap = {
    green: "var(--glow-green)",
    amber: "var(--glow-amber)",
    cyan: "var(--glow-cyan)",
  };

  return (
    <div className="telem-card">
      <div className="telem-label">{label}</div>

      <div
        className="telem-value"
        style={{
          color: colorMap[accent],
          textShadow: glowMap[accent],
        }}
      >
        {value}
      </div>

      <div className="telem-unit">{unit}</div>
    </div>
  );
}

export default function QuickStats() {
  const { data } = useISS();

  return (
    <div className="mc-panel">
      <div className="mc-panel-header">
        <span className="status-led cyan" />
        COMMAND OVERVIEW
      </div>

      <div
        className="mc-panel-body"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "0.75rem",
        }}
      >
        <StatCard
          label="MODULES ONLINE"
          value="05"
          unit="ACTIVE SYSTEMS"
        />

        <StatCard
          label="ISS ALTITUDE"
          value={
            data
              ? data.altitude.toFixed(0)
              : "---"
          }
          unit="KM"
          accent="cyan"
        />

        <StatCard
          label="ISS VELOCITY"
          value={
            data
              ? Math.round(data.velocity).toLocaleString()
              : "---"
          }
          unit="KM/H"
          accent="amber"
        />

        <StatCard
          label="CONSTELLATIONS"
          value="15"
          unit="CATALOGUED"
        />

        <StatCard
          label="SKY SYSTEM"
          value="ONLINE"
          unit="OBSERVATION READY"
          accent="cyan"
        />

        <StatCard
          label="PLANETS"
          value="ONLINE"
          unit="OBSERVATION READY"
          accent="amber"
        />
      </div>
    </div>
  );
}