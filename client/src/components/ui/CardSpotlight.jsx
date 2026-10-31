import React, { useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export const CardSpotlight = ({
  children,
  className = '',
  radius = 280,
  color = 'rgba(200, 164, 92, 0.15)',
  ...props
}) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-[rgba(242,244,248,0.08)] bg-[rgba(16,19,25,0.7)] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(200,164,92,0.35)]',
        className
      )}
      {...props}
    >
      {/* Dynamic mouse spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${color}, transparent 80%)`
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
