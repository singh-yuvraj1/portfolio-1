import { useState, useEffect } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

/**
 * MorphInflatingQuote
 * Inspired by Jitter's "Morph: Inflating Text" template.
 * Each character dynamically expands from a deflated bubble state into a plump,
 * 3D-styled balloon letter with realistic squash-and-stretch air inflation physics,
 * luminous glowing highlights, and interactive squish-on-hover reaction.
 */
const QUOTE_WORDS = [
  { word: "“A", type: "normal" },
  { word: "developer", type: "normal" },
  { word: "who", type: "normal" },
  { word: "knows", type: "normal" },
  { word: "how", type: "normal" },
  { word: "to", type: "normal" },
  { word: "build,", type: "cyan" }, // Electric cyan balloon style from Jitter template
  { word: "not", type: "normal" },
  { word: "just", type: "normal" },
  { word: "those", type: "normal" },
  { word: "who", type: "normal" },
  { word: "know", type: "normal" },
  { word: "how", type: "normal" },
  { word: "to", type: "normal" },
  { word: "code”", type: "gold" }  // Luminous amber gold balloon style
];

export const MorphInflatingQuote = ({ onComplete }) => {
  const [replayKey, setReplayKey] = useState(0);
  const [allInflated, setAllInflated] = useState(false);

  // Calculate total characters to know when inflation wave completes
  let totalChars = 0;
  QUOTE_WORDS.forEach(item => {
    totalChars += item.word.length;
  });

  const totalDurationMs = (totalChars * 34) + 2800; // stagger + single animation length

  useEffect(() => {
    setAllInflated(false);
    const timer = setTimeout(() => {
      setAllInflated(true);
      if (onComplete) onComplete();
    }, totalDurationMs);

    return () => clearTimeout(timer);
  }, [replayKey, totalDurationMs, onComplete]);

  const handleReplay = (e) => {
    e.stopPropagation();
    setReplayKey(prev => prev + 1);
  };

  let globalCharIndex = 0;

  return (
    <div key={replayKey} className="relative w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Morph Inflating Balloon Typography Block */}
      <blockquote
        className="morph-inflating-quote select-none text-[clamp(24px,3.8vw,44px)] font-black leading-[1.3] tracking-tight text-center flex flex-wrap justify-center items-center gap-y-2 font-algerian"
        style={{ fontFamily: "'Algerian', 'Cinzel Decorative', 'Cinzel', serif", letterSpacing: '0.04em' }}
      >
        {QUOTE_WORDS.map((item, wordIdx) => {
          const chars = item.word.split('');
          const wordType = item.type;

          return (
            <span
              key={`word-${wordIdx}`}
              className="inline-flex items-baseline whitespace-nowrap mx-[0.14em]"
            >
              {chars.map((char, charIdx) => {
                const charDelay = (globalCharIndex * 0.034).toFixed(3);
                globalCharIndex++;

                let styleClass = 'balloon-char-normal';
                if (wordType === 'cyan') styleClass = 'balloon-char-cyan';
                if (wordType === 'gold') styleClass = 'balloon-char-gold';

                return (
                  <span
                    key={`char-${wordIdx}-${charIdx}`}
                    className={`morph-inflating-char ${styleClass} ${allInflated ? 'is-inflated' : ''}`}
                    style={{
                      animationDelay: `${charDelay}s`,
                    }}
                    title="Hover to squish balloon!"
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </blockquote>

      {/* Interactive Helper & Replay Bar */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="font-mono text-[10px] text-[#A7AFBA]/60 tracking-wider uppercase inline-flex items-center gap-1.5">
          <Sparkles size={11} className="text-[#38BDF8] animate-pulse" />
        </span>
        <button
          type="button"
          onClick={handleReplay}
          className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-[rgba(200,164,92,0.3)] bg-[rgba(200,164,92,0.08)] text-[#C8A45C] hover:bg-[#C8A45C] hover:text-[#0B0C0F] transition-all inline-flex items-center gap-1"
          title="Replay inflating animation"
        >
          <RotateCcw size={10} />
          Replay
        </button>
      </div>
    </div>
  );
};

export default MorphInflatingQuote;
