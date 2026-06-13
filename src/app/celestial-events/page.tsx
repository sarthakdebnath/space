'use client';

import { useEffect, useState } from 'react';
import EventCalendar from '@/components/events/EventCalendar';
import UpcomingEvents from '@/components/events/UpcomingEvents';
import { Event } from '@/types/event';
import eventsData from '@/data/events.json';
// Import retro styles
import '@/styles/retro/crt.css';
import '@/styles/retro/scanlines.css';

interface Particle {
  id: number;
  left: number;
  delay: number;
}

interface Star {
  id: number;
}

interface FloatingStar {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
}

export default function CelestialEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [floatingStars, setFloatingStars] = useState<FloatingStar[]>([]);
  const [currentTime, setCurrentTime] = useState('');
  const [signalStrength, setSignalStrength] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  const fullText = '> CELESTIAL EVENTS DATABASE';

  // Initialize on client only
  useEffect(() => {
    setIsHydrated(true);

    // Generate particles
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles);

    // Generate stars
    const generatedStars = Array.from({ length: 10 }, (_, i) => ({
      id: i,
    }));
    setStars(generatedStars);

    // Generate floating background stars
    const generatedFloatingStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 8,
    }));
    setFloatingStars(generatedFloatingStars);

    // Set initial time and signal
    setCurrentTime(new Date().toLocaleTimeString());
    setSignalStrength(Math.floor(Math.random() * 40 + 60));
  }, []);

  // Typing effect for header
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [typedText]);

  // Load events
  useEffect(() => {
    setEvents(eventsData as Event[]);
  }, []);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Don't render until hydrated
  if (!isHydrated) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden relative">
      {/* Space Background */}
      <div className="space-background" />

      {/* Grid Background */}
      <div className="grid-background" />

      {/* Floating Background Stars */}
      <div className="absolute inset-0 pointer-events-none z-1">
        {floatingStars.map((star) => (
          <div
            key={`float-star-${star.id}`}
            className="floating-star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: '#fff',
              borderRadius: '50%',
              animationDelay: `${star.delay}s`,
              boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.6)`,
            }}
          />
        ))}
      </div>

      {/* Stars */}
      <div className="stars">
        {stars.map((star) => (
          <div key={star.id} className="star" />
        ))}
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            top: '0',
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Vignette Effect */}
      <div className="vignette" />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen">
        {/* CRT Monitor Container */}
        <div className="crt-monitor m-4 md:m-8 min-h-screen flex flex-col">
          {/* CRT Screen Content */}
          <div className="crt-screen p-6 md:p-8 flex-1 flex flex-col scanlines flicker">
            {/* Terminal Header */}
            <div className="mb-8 animate-fade-in">
              {/* Main Title with Typing Effect */}
              <div className="border-b-2 border-green-400 pb-4 mb-6">
                <h1 className="text-2xl md:text-4xl font-bold text-green-400 font-mono terminal-glow mb-4">
                  {typedText}
                  {!isTypingComplete && <span className="cursor-blink" />}
                </h1>

                {/* Status Lines */}
                <div className="space-y-2 text-xs md:text-sm text-green-400 font-mono opacity-90">
                  <div className="terminal-line">
                    &gt; CONNECTING TO DEEP SPACE NETWORK...
                  </div>
                  <div
                    className="terminal-line"
                    style={{ animationDelay: '0.5s' }}
                  >
                    &gt; ESTABLISHING SECURE CONNECTION...
                  </div>
                  <div
                    className="terminal-line"
                    style={{ animationDelay: '1s' }}
                  >
                    &gt; STATUS: <span className="text-green-400 glow-text">● ONLINE</span>
                  </div>
                  <div
                    className="terminal-line"
                    style={{ animationDelay: '1.5s' }}
                  >
                    &gt; MISSION TIME: {currentTime}
                  </div>
                </div>
              </div>

              {/* System Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 text-xs font-mono">
                <div className="border border-green-400 p-3 bg-black/50 text-green-400">
                  <div className="opacity-75">EVENTS</div>
                  <div className="text-lg font-bold">{events.length}</div>
                </div>
                <div className="border border-green-400 p-3 bg-black/50 text-green-400">
                  <div className="opacity-75">UPCOMING</div>
                  <div className="text-lg font-bold">
                    {events.filter((e) => new Date(e.date) > new Date()).length}
                  </div>
                </div>
                <div className="border border-green-400 p-3 bg-black/50 text-green-400">
                  <div className="opacity-75">SIGNAL</div>
                  <div className="text-lg font-bold">{signalStrength}%</div>
                </div>
                <div className="border border-green-400 p-3 bg-black/50 text-green-400">
                  <div className="opacity-75">SYSTEMS</div>
                  <div className="text-lg font-bold text-green-400">OK</div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 space-y-8 overflow-y-auto pr-4">
              {/* Calendar Section */}
              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <EventCalendar events={events} />
              </div>

              {/* Events Section */}
              <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <UpcomingEvents events={events} />
              </div>

              {/* Footer */}
              <div className="border-t-2 border-green-400 pt-6 mt-8 text-xs text-green-400 font-mono opacity-75 space-y-2">
                <div className="terminal-line">
                  &gt; END OF TRANSMISSION
                </div>
                <div
                  className="terminal-line"
                  style={{ animationDelay: '0.3s' }}
                >
                  &gt; AWAITING NEXT COMMAND...
                </div>
                <div
                  className="terminal-line"
                  style={{ animationDelay: '0.6s' }}
                >
                  &gt; SPACETIME COORDINATES: CELESTIAL EVENTS DATABASE v1.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .crt-monitor {
            margin: 8px;
          }
        }
      `}</style>
    </div>
  );
}
