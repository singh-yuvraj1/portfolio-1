import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const FlipWords = ({
  words = [],
  duration = 2800,
  className = ''
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (!words.length) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  const currentWord = words[currentWordIndex] || '';

  return (
    <span className={cn('inline-block relative overflow-hidden py-1 align-baseline', className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)', rotateX: 60 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 }}
          exit={{ opacity: 0, y: -30, filter: 'blur(8px)', rotateX: -60 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block bg-gradient-to-r from-[#E5C37A] via-[#F5E2B3] to-[#C8A45C] bg-clip-text text-transparent font-extrabold"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
