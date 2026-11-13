import { motion } from 'framer-motion';

/**
 * AnimatedHeading
 * Staggered, kinetic word-by-word reveal for portfolio headings.
 * 
 * Order of appearance:
 * 1. Eyebrow badge / label appears first.
 * 2. Words in the heading slide up sequentially out of an overflow mask (Word 1 -> Word 2 -> Word 3...).
 * 3. Subtitle / description appears smoothly after.
 * 
 * Syntax:
 * - Words wrapped in `*...*` (e.g. `*work with.*`) automatically receive `text-gradient`.
 * - Or pass `gradientWords={['work', 'with.']}`.
 */
export const AnimatedHeading = ({
  eyebrow,
  title = '',
  subtitle,
  as = 'h2',
  align = 'left',
  className = '',
  gradientWords = [],
  delay = 0,
  stagger = 0.18,
  wordDuration = 0.95
}) => {
  // Parse title into word tokens with gradient detection
  const parseWords = (text) => {
    if (!text) return [];
    const words = [];
    const tokenRegex = /(\*[^*]+\*|\S+)/g;
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      const raw = match[0];
      if (raw.startsWith('*') && raw.endsWith('*')) {
        const inner = raw.slice(1, -1);
        inner.split(/\s+/).forEach((w) => {
          if (w) words.push({ text: w, isGradient: true });
        });
      } else {
        const isGrad = gradientWords.some((gw) =>
          raw.toLowerCase().includes(gw.toLowerCase())
        );
        words.push({ text: raw, isGradient: isGrad });
      }
    }
    return words;
  };

  const parsedWords = parseWords(title);
  const plainTitle = title.replace(/\*/g, '');
  const HeadingTag = as;

  // Staggered Container (Slow, deliberate pacing so each word's entrance is distinct)
  const delayChildren = delay + (eyebrow ? 0.22 : 0.08);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren
      }
    }
  };

  // Eyebrow variant (appears first with a gentle glide)
  const eyebrowVariants = {
    hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Word variant (masked upward slide with graceful, slowed deceleration)
  const wordVariants = {
    hidden: {
      y: '130%',
      opacity: 0,
      rotateZ: 2
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateZ: 0,
      transition: {
        duration: wordDuration,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Subtitle variant (appears gently after heading words complete)
  const subtitleDelay = delayChildren + parsedWords.length * stagger + 0.12;

  const subtitleVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: subtitleDelay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const headingSizeClass =
    as === 'h1'
      ? 'text-[clamp(36px,5.2vw,78px)] font-bold uppercase tracking-[0.08em] leading-[0.98]'
      : 'text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] leading-[1.08]';

  const alignClass =
    align === 'center'
      ? 'items-center text-center'
      : align === 'right'
      ? 'items-end text-right'
      : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {/* 1. Eyebrow badge / category label (appears first) */}
      {eyebrow && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={eyebrowVariants}
          className="mb-3"
        >
          {typeof eyebrow === 'string' ? (
            <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">
              {eyebrow}
            </span>
          ) : (
            <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase inline-flex items-center gap-2">
              {eyebrow}
            </span>
          )}
        </motion.div>
      )}

      {/* 2. Main Title (sequential word-by-word reveal) */}
      <HeadingTag
        aria-label={plainTitle}
        className={`${headingSizeClass} text-[#F2F4F8]`}
      >
        <motion.span
          aria-hidden="true"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="inline-flex flex-wrap items-baseline"
          style={{ justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}
        >
          {parsedWords.map((item, idx) => (
            <span
              key={`${item.text}-${idx}`}
              className="inline-block overflow-hidden align-top py-0.5"
            >
              <motion.span
                variants={wordVariants}
                className={`inline-block mr-[0.28em] ${
                  item.isGradient ? 'text-gradient' : 'text-[#F2F4F8]'
                }`}
              >
                {item.text}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </HeadingTag>

      {/* 3. Subtitle / Description (reveals after words complete) */}
      {subtitle && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={subtitleVariants}
          className="text-[#A7AFBA] text-sm md:text-base mt-4 leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedHeading;
