'use client';

import { useEffect, useState } from 'react';
import { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function EventCard({ event }: EventCardProps) {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [eventStatus, setEventStatus] = useState<'upcoming' | 'active' | 'completed'>('upcoming');

  useEffect(() => {
    const updateCountdown = () => {
      const eventDate = new Date(event.date).getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference < 0) {
        setEventStatus('completed');
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else if (difference < 86400000) {
        // Less than 1 day
        setEventStatus('active');
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        setCountdown({ days: 0, hours, minutes, seconds });
      } else {
        setEventStatus('upcoming');
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [event.date]);

  const getTypeColor = (type: string): { border: string; text: string; badge: string } => {
    switch (type) {
      case 'solar':
        return {
          border: 'border-yellow-400',
          text: 'text-yellow-400',
          badge: 'badge-upcoming',
        };
      case 'lunar':
        return {
          border: 'border-blue-400',
          text: 'text-blue-400',
          badge: 'badge-upcoming',
        };
      case 'meteor_shower':
        return {
          border: 'border-red-400',
          text: 'text-red-400',
          badge: 'badge-upcoming',
        };
      case 'planet_conjunction':
        return {
          border: 'border-cyan-400',
          text: 'text-cyan-400',
          badge: 'badge-upcoming',
        };
      default:
        return {
          border: 'border-green-400',
          text: 'text-green-400',
          badge: 'badge-upcoming',
        };
    }
  };

  const getStatusBadgeClass = (): string => {
    switch (eventStatus) {
      case 'active':
        return 'badge-active';
      case 'completed':
        return 'badge-completed';
      default:
        return 'badge-upcoming';
    }
  };

  const getStatusText = (): string => {
    switch (eventStatus) {
      case 'active':
        return 'ACTIVE';
      case 'completed':
        return 'COMPLETED';
      default:
        return 'UPCOMING';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const colors = getTypeColor(event.type);

  return (
    <div
      className={`stagger-item border-2 ${colors.border} p-4 bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all duration-300 font-mono text-sm relative overflow-hidden group hover-glow hover-scale`}
    >
      {/* Animated glow background */}
      <div
        className={`absolute inset-0 ${colors.text} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 pointer-events-none`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with title and status badge */}
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className={`font-bold text-base flex-1 leading-tight ${colors.text}`}>
            {event.title}
          </h3>
          <div
            className={`flex-shrink-0 px-2 py-1 border border-current text-xs font-bold uppercase whitespace-nowrap badge-pulse ${getStatusBadgeClass()}`}
          >
            {getStatusText()}
          </div>
        </div>

        {/* Event type tag */}
        <div className={`mb-3 text-xs ${colors.text} opacity-75`}>
          <span className={`inline-block px-2 py-1 border border-current ${colors.text}`}>
            [{event.type.replace(/_/g, ' ')}]
          </span>
        </div>

        {/* Date */}
        <div className={`mb-3 text-xs ${colors.text} opacity-75 font-bold`}>
          <span className="block">📅 {formatDate(event.date)}</span>
        </div>

        {/* Description */}
        <p className={`text-xs leading-relaxed ${colors.text} opacity-90 mb-4 min-h-[40px]`}>
          {event.description}
        </p>

        {/* Countdown Timer */}
        {eventStatus !== 'completed' && (
          <div className={`border-t ${colors.text} pt-3 mt-3 text-xs`}>
            <div className={`${colors.text} opacity-75 mb-2`}>⏱️ EVENT STARTS IN:</div>
            <div className="grid grid-cols-4 gap-1 text-center font-bold">
              <div className={`bg-black/50 p-2 border border-current ${colors.text}`}>
                <div className="text-sm">{countdown.days}</div>
                <div className={`text-xs ${colors.text} opacity-75`}>DAYS</div>
              </div>
              <div className={`bg-black/50 p-2 border border-current ${colors.text}`}>
                <div className="text-sm">{String(countdown.hours).padStart(2, '0')}</div>
                <div className={`text-xs ${colors.text} opacity-75`}>HRS</div>
              </div>
              <div className={`bg-black/50 p-2 border border-current ${colors.text}`}>
                <div className="text-sm">{String(countdown.minutes).padStart(2, '0')}</div>
                <div className={`text-xs ${colors.text} opacity-75`}>MIN</div>
              </div>
              <div className={`bg-black/50 p-2 border border-current ${colors.text}`}>
                <div className="text-sm">{String(countdown.seconds).padStart(2, '0')}</div>
                <div className={`text-xs ${colors.text} opacity-75`}>SEC</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`mt-3 pt-3 border-t border-current ${colors.text} opacity-50 text-xs`}>
          ID: {event.id}
        </div>
      </div>
    </div>
  );
}
