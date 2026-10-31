import React from 'react';
import { cn } from '../../lib/utils';

export const Marquee = ({
  items = [],
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className = ''
}) => {
  // Speed variations
  const animationClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';

  return (
    <div
      className={cn(
        'group flex overflow-hidden p-2 mask-gradient-x relative',
        className
      )}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 items-center justify-around gap-6',
          animationClass,
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 rounded-full border border-[rgba(242,244,248,0.09)] bg-[rgba(18,21,27,0.7)] px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-[#C8A45C] hover:bg-[rgba(200,164,92,0.12)] hover:scale-105"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color || '#C8A45C', boxShadow: `0 0 8px ${item.color || '#C8A45C'}` }}
            />
            <span className="font-mono text-xs tracking-wider text-[#F2F4F8] whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className={cn(
          'flex min-w-full shrink-0 items-center justify-around gap-6',
          animationClass,
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <div
            key={`duplicate-${idx}`}
            className="flex items-center gap-2.5 rounded-full border border-[rgba(242,244,248,0.09)] bg-[rgba(18,21,27,0.7)] px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-[#C8A45C] hover:bg-[rgba(200,164,92,0.12)] hover:scale-105"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color || '#C8A45C', boxShadow: `0 0 8px ${item.color || '#C8A45C'}` }}
            />
            <span className="font-mono text-xs tracking-wider text-[#F2F4F8] whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
