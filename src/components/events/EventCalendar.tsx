"use client";

import { useState } from "react";
import eventsData from "../../data/events.json";

function getStatus(dateStr: string): "UPCOMING" | "ACTIVE" | "COMPLETED" {
  const diff = (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  if (diff < 0) return "COMPLETED";
  if (diff <= 1) return "ACTIVE";
  return "UPCOMING";
}

const statusDot: Record<string, string> = {
  UPCOMING:  "bg-green-400 shadow-green-400/60",
  ACTIVE:    "bg-yellow-300 shadow-yellow-300/60",
  COMPLETED: "bg-gray-600",
};

const statusLabel: Record<string, string> = {
  UPCOMING:  "text-green-400",
  ACTIVE:    "text-yellow-300",
  COMPLETED: "text-gray-600",
};

const EventCalendar = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sorted = [...eventsData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section className="w-full mb-10 slide-in-left">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-green-500 text-lg">◈</span>
        <h2 className="text-green-400 font-mono text-sm uppercase tracking-[0.3em] border-b border-green-800 pb-1 flex-1 crt-glow-dim">
          Mission Timeline — Deep Space Network
        </h2>
        <span className="text-green-700 font-mono text-[10px]">
          {new Date().toISOString().slice(0, 10)} UTC
        </span>
      </div>

      {/* Table */}
      <div className="border border-green-900 rounded bg-black/60 overflow-hidden">

        {/* Column labels */}
        <div className="grid grid-cols-12 px-4 py-2 text-green-800 text-[10px] uppercase tracking-widest font-mono border-b border-green-900/60">
          <span className="col-span-1">#</span>
          <span className="col-span-2">STATUS</span>
          <span className="col-span-3">DATE</span>
          <span className="col-span-4">MISSION</span>
          <span className="col-span-2 text-right">TYPE</span>
        </div>

        {/* Rows */}
        {sorted.map((event, index) => {
          const status = getStatus(event.date);
          const isHovered = hoveredId === event.id;

          const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
          });

          return (
            <div
              key={event.id}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-event-id={event.id}
              className={`
                border-b border-green-900/30 last:border-b-0
                px-4 py-3 font-mono text-xs cursor-default select-none
                transition-colors duration-150
                ${isHovered ? "bg-green-950/40" : "bg-transparent"}
              `}
            >
              <div className="grid grid-cols-12 items-center">
                {/* Index */}
                <span className="col-span-1 text-green-800">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Status */}
                <span className="col-span-2 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shadow-md ${statusDot[status]} ${status !== "COMPLETED" ? "animate-pulse" : ""}`} />
                  <span className={`text-[10px] tracking-wider ${statusLabel[status]}`}>
                    {status}
                  </span>
                </span>

                {/* Date */}
                <span className={`col-span-3 tracking-wide transition-colors duration-150 ${isHovered ? "text-green-300" : "text-green-600"}`}>
                  {formattedDate}
                </span>

                {/* Title */}
                <span className={`col-span-4 uppercase tracking-wider transition-colors duration-150 ${isHovered ? "text-green-200 crt-glow-dim" : "text-green-400"}`}>
                  {event.title}
                </span>

                {/* Type */}
                <span className="col-span-2 text-right text-green-700 text-[10px] uppercase tracking-wider">
                  {event.type}
                </span>
              </div>

              {/* Expandable detail */}
              <div className={`overflow-hidden transition-all duration-200 ${isHovered ? "max-h-20 opacity-100 pt-2 mt-1 border-t border-green-900/40" : "max-h-0 opacity-0"}`}>
                <p className="text-green-600 text-[11px] leading-relaxed">
                  &gt; {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2 px-1 font-mono text-[10px] text-green-800">
        <span>RECORDS: {sorted.length} / {sorted.length}</span>
        <span>SORT: CHRONOLOGICAL ASC</span>
        <span>SOURCE: STELLAR-DB v4.1</span>
      </div>
    </section>
  );
};

export default EventCalendar;