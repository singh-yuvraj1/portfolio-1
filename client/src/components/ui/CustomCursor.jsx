import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 350 });

  const dotX = useSpring(0, { damping: 40, stiffness: 700 });
  const dotY = useSpring(0, { damping: 40, stiffness: 700 });

  useEffect(() => {
    // Only enable custom cursor for non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleHoverCheck = (e) => {
      const target = e.target;
      const isClickable = target.closest('button, a, input, textarea, select, [role="button"], [data-cursor-hover]');
      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleHoverCheck);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleHoverCheck);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ambient glow circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          width: isHovered ? 48 : 26,
          height: isHovered ? 48 : 26,
          backgroundColor: isHovered ? 'rgba(200, 164, 92, 0.15)' : 'rgba(200, 164, 92, 0.06)',
          borderColor: isHovered ? 'rgba(200, 164, 92, 0.6)' : 'rgba(200, 164, 92, 0.25)',
          borderWidth: '1.5px',
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Tiny solid center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#C8A45C]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
          opacity: isHovered ? 0.9 : 0.6
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      />
    </>
  );
};
