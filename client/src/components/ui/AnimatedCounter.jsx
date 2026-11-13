import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export const AnimatedCounter = ({ value = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  // Parse leading prefix (#), numeric core, and trailing suffix (+)
  const match = String(value).match(/^([^0-9]*)(\d+)(.*)$/);
  const prefix = match ? match[1] : '';
  const target = match ? parseInt(match[2], 10) : null;
  const trailing = match ? match[3] : '';

  const [displayValue, setDisplayValue] = useState(target !== null ? 0 : value);

  useEffect(() => {
    if (target === null) return;

    if (!isInView) {
      setDisplayValue(0);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(target);
      return;
    }

    let frameId;
    const duration = 950;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {target !== null ? `${prefix}${displayValue}${trailing}` : value}
    </span>
  );
};

