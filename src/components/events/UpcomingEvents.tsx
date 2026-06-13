"use client";

import eventsData from "../../data/events.json";
import EventCard from "./EventCard";

const UpcomingEvents = () => {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 slide-in-left">
        <span className="text-green-500 text-lg">◈</span>
        <h2 className="text-green-400 font-mono text-sm uppercase tracking-[0.3em] border-b border-green-800 pb-1 flex-1 crt-glow-dim">
          Upcoming Celestial Events — {eventsData.length} RECORDS FOUND
        </h2>
        <span className="text-green-700 text-[10px] font-mono animate-pulse">● LIVE</span>
      </div>

      {eventsData.length === 0 ? (
        <p className="text-green-700 font-mono text-xs tracking-widest">
          &gt; NO EVENTS FOUND IN STELLAR DATABASE_
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventsData.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;