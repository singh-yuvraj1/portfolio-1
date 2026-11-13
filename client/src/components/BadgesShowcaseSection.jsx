import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Trophy,
  ShieldCheck,
  Code2,
  Cloud,
  Brain,
  Star,
  Flame,
  Terminal,
  ChevronLeft,
  ChevronRight,
  ImagePlus
} from 'lucide-react';
import AnimatedHeading from './ui/AnimatedHeading';

/**
 * HOW TO ADD YOUR BADGE IMAGES LATER:
 * 1. Put your badge images inside `client/src/assets/` (import them at the top)
 *    OR put them in `client/public/badges/` and reference them like `'/badges/aws.png'`.
 * 2. Replace `image: null` on any item below with your image import or path string.
 */
const BADGES_DATA = [
  {
    id: 'badge-01',
    code: '# 01',
    title: 'LeetCode 50 Days ',
    subtitle: 'Solving problems for 50days',
    issuer: 'LeetCode',
    year: '2026',
    accent: '#C8A45C',
    surface: 'from-[#1C170D] via-[#121318] to-[#0B0C0F]',
    posterText: ['50 DAYS', 'CONSISTENT', 'DSA'],
    icon: Trophy,
    image: null // e.g. '/badges/sih-2024.png'
  },
  {
    id: 'badge-02',
    code: '# 02',
    title: 'Leetcode 100 Days',
    subtitle: 'Solving problems for 100days',
    issuer: 'Leetcode',
    year: '2026',
    accent: '#2F8D46',
    surface: 'from-[#0D1E14] via-[#101518] to-[#0B0C0F]',
    posterText: ['100 DAYS', 'CONSISTENT', 'DSA'],
    icon: Code2,
    image: null // e.g. '/badges/gfg-rank1.png'
  },
  {
    id: 'badge-03',
    code: '# 03',
    title: 'Leetcode 200 Days',
    subtitle: 'Solving problems for 200days',
    issuer: 'Leetcode',
    year: '2026',
    accent: '#E05D44',
    surface: 'from-[#22100E] via-[#141115] to-[#0B0C0F]',
    posterText: ['200 DAYS', 'CONSISTENT', 'DSA'],
    icon: Flame,
    image: null // e.g. '/badges/gfg-160.png'
  },
  {
    id: 'badge-04',
    code: '# 04',
    title: 'May Consistency Badge',
    subtitle: 'Consistency for the whole month of may',
    issuer: 'LeetCode',
    year: '2026',
    accent: '#FFA116',
    surface: 'from-[#23190B] via-[#141316] to-[#0B0C0F]',
    posterText: ['MAY', 'CONSISTENT', 'BADGE'],
    icon: Terminal,
    image: null // e.g. '/badges/leetcode.png'
  },
  {
    id: 'badge-05',
    code: '# 05',
    title: 'MongoDB overview',
    subtitle: 'MongoDB Overview',
    issuer: 'MongoDB',
    year: '2026',
    accent: '#D4B76A',
    surface: 'from-[#1F1A0E] via-[#151519] to-[#0B0C0F]',
    posterText: ['MONGODB', 'OVERVIEW', 'BADGE'],
    icon: Star,
    image: null // e.g. '/badges/hackerrank.png'
  },
  {
    id: 'badge-06',
    code: '# 06',
    title: 'AWS Cloud Practitioner',
    subtitle: 'Cloud Verified',
    issuer: 'Amazon Web Services',
    year: '2024',
    accent: '#38BDF8',
    surface: 'from-[#0D1B2A] via-[#11151E] to-[#0B0C0F]',
    posterText: ['AWS', 'CLOUD', 'VERIFIED'],
    icon: Cloud,
    image: null // e.g. '/badges/aws-cloud.png'
  },
  {
    id: 'badge-07',
    code: '# 07',
    title: 'Google Cloud GenAI',
    subtitle: 'Generative AI Skill Badge',
    issuer: 'Google Cloud',
    year: '2026',
    accent: '#A78BFA',
    surface: 'from-[#1A132B] via-[#13121C] to-[#0B0C0F]',
    posterText: ['GOOGLE', 'GEN AI', 'SKILL'],
    icon: Brain,
    image: null // e.g. '/badges/gcp-genai.png'
  },
  {
    id: 'badge-08',
    code: '# 08',
    title: 'Google Cloud Speech API',
    subtitle: 'Google Cloud Speech API',
    issuer: 'Google Cloud',
    year: '2026',
    accent: '#F43F5E',
    surface: 'from-[#250E16] via-[#151117] to-[#0B0C0F]',
    posterText: ['GOOGLE', 'SPEECH API', 'SKILL'],
    icon: Award,
    image: null // e.g. '/badges/code-champion.png'
  },
  {
    id: 'badge-09',
    code: '# 09',
    title: 'Gemini Application',
    subtitle: 'Gemini Enterprise Applications',
    issuer: 'Google Cloud',
    year: '2026',
    accent: '#60A5FA',
    surface: 'from-[#0E192E] via-[#11151D] to-[#0B0C0F]',
    posterText: ['GEMINI', 'APPLICATION', 'SKILL'],
    icon: ShieldCheck,
    image: null // e.g. '/badges/meta-frontend.png'
  }
];

export const BadgesShowcaseSection = ({ sectionRef }) => {
  const [activeIndex, setActiveIndex] = useState(4);
  const [brokenImages, setBrokenImages] = useState({});

  const activeBadge = BADGES_DATA[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + BADGES_DATA.length) % BADGES_DATA.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % BADGES_DATA.length);
  };

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      ref={sectionRef}
      id="badges"
      className="relative w-full min-h-screen pt-28 pb-24 px-[4vw] md:px-[6vw] z-[60] bg-[#0B0C0F] flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle Ambient Accent Glow Matching Active Badge */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[420px] rounded-full blur-[150px] opacity-20 transition-colors duration-700"
        style={{ backgroundColor: activeBadge.accent }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Section Header with Word-by-Word Reveal */}
        <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <AnimatedHeading
            eyebrow={
              <>
                <Award size={14} />
                Badges & Milestones
              </>
            }
            title="Earned *Honors.*"
          />

          <div className="flex items-center gap-3 self-start sm:self-auto mb-1">
            <span className="font-mono text-xs text-[#A7AFBA] mr-1">
              {String(activeIndex + 1).padStart(2, '0')} / {String(BADGES_DATA.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-[rgba(242,244,248,0.12)] bg-[rgba(20,23,28,0.8)] flex items-center justify-center text-[#A7AFBA] hover:text-[#C8A45C] hover:border-[#C8A45C] transition-colors"
              aria-label="Previous badge"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-[rgba(242,244,248,0.12)] bg-[rgba(20,23,28,0.8)] flex items-center justify-center text-[#A7AFBA] hover:text-[#C8A45C] hover:border-[#C8A45C] transition-colors"
              aria-label="Next badge"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Skiper-style Expanding Horizontal Accordion Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-stretch justify-center gap-2 sm:gap-2.5 w-full md:h-[430px] lg:h-[480px]"
        >
          {BADGES_DATA.map((badge, idx) => {
            const isActive = idx === activeIndex;
            const Icon = badge.icon;
            const hasImage = Boolean(badge.image) && !brokenImages[badge.id];

            return (
              <motion.div
                key={badge.id}
                layout
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }
                }}
                aria-label={`${badge.title} — ${badge.subtitle}`}
                aria-pressed={isActive}
                transition={{
                  layout: { type: 'spring', stiffness: 260, damping: 28 },
                  duration: 0.45
                }}
                className={`relative overflow-hidden rounded-3xl cursor-pointer select-none border transition-colors duration-300 ${
                  isActive
                    ? 'h-[320px] md:h-full md:flex-[5.2] border-[rgba(200,164,92,0.45)] shadow-[0_24px_70px_rgba(0,0,0,0.65)]'
                    : 'h-[62px] md:h-full md:flex-[0.65] border-[rgba(242,244,248,0.1)] hover:border-[rgba(200,164,92,0.3)] opacity-85 hover:opacity-100'
                }`}
              >
                {/* Background Layer: User's Badge Photo OR Editorial Metallic Badge Poster */}
                {hasImage ? (
                  <>
                    <img
                      src={badge.image}
                      alt={badge.title}
                      onError={() => handleImageError(badge.id)}
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                        isActive ? 'scale-100' : 'scale-110 grayscale-[35%]'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isActive
                          ? 'bg-gradient-to-t from-[#0B0C0F]/90 via-[#0B0C0F]/25 to-transparent'
                          : 'bg-[#0B0C0F]/45'
                      }`}
                    />
                  </>
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${badge.surface}`}
                  >
                    {/* Subtle Grid Texture */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 1px 1px, rgba(242,244,248,0.22) 1px, transparent 0)',
                        backgroundSize: '20px 20px'
                      }}
                    />

                    {/* Accent Corner Halo */}
                    <div
                      className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-[70px] opacity-35 transition-opacity duration-500"
                      style={{ backgroundColor: badge.accent }}
                    />

                    {/* Oversized Editorial Poster Typography (mirrors visual richness of reference) */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-center px-6 sm:px-9 pointer-events-none transition-all duration-500 ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-50 md:opacity-75'
                      }`}
                    >
                      {isActive ? (
                        <div className="space-y-0.5 select-none">
                          {badge.posterText.map((word, lineIdx) => (
                            <div
                              key={word}
                              className={`font-serif font-bold uppercase tracking-[0.04em] leading-[0.9] ${
                                lineIdx === 1 ? 'italic font-light' : ''
                              }`}
                              style={{
                                fontSize: 'clamp(30px, 4vw, 56px)',
                                color:
                                  lineIdx === 1
                                    ? badge.accent
                                    : 'rgba(242, 244, 248, 0.16)'
                              }}
                            >
                              {word}
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Collapsed Vertical Strip Preview */
                        <div className="h-full w-full flex md:flex-col items-center justify-between py-3 md:py-6 px-1">
                          <span
                            className="font-mono text-[10px] tracking-[0.18em] uppercase"
                            style={{ color: badge.accent }}
                          >
                            {badge.code.replace('# ', '')}
                          </span>
                          <span className="md:[writing-mode:vertical-rl] md:rotate-180 font-mono text-[11px] tracking-[0.14em] uppercase text-[#F2F4F8]/80 truncate max-w-[180px] md:max-h-[240px]">
                            {badge.title}
                          </span>
                          <Icon size={15} style={{ color: badge.accent }} className="shrink-0" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Expanded Active Card Foreground Content */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="relative z-10 h-full w-full p-6 sm:p-8 flex flex-col justify-between"
                    >
                      {/* Top Row: Emblem + Photo Slot Indicator */}
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-md shadow-lg"
                          style={{
                            backgroundColor: `${badge.accent}20`,
                            borderColor: `${badge.accent}55`,
                            color: badge.accent
                          }}
                        >
                          <Icon size={22} />
                        </div>

                        {!hasImage && (
                          <div className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(242,244,248,0.14)] bg-[#0B0C0F]/70 px-3 py-1 backdrop-blur-md">
                            <ImagePlus size={12} className="text-[#C8A45C]" />
                            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#A7AFBA]">
                              Badge Pic Slot
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Row: Title, Issuer & `# 01` Index */}
                      <div className="flex items-end justify-between gap-4 pt-6 border-t border-[rgba(242,244,248,0.12)]">
                        <div className="min-w-0">
                          <span
                            className="font-mono text-[11px] tracking-[0.16em] uppercase block mb-1.5"
                            style={{ color: badge.accent }}
                          >
                            {badge.subtitle}
                          </span>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F2F4F8] leading-tight">
                            {badge.title}
                          </h3>
                          <p className="font-mono text-xs text-[#A7AFBA] mt-1.5">
                            {badge.issuer} • {badge.year}
                          </p>
                        </div>

                        <span className="font-mono text-sm sm:text-base font-semibold text-[#F2F4F8]/80 shrink-0">
                          {badge.code}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Interactive Pill Dock (Mirrors Reference Bottom Pill Style) */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(242,244,248,0.1)] bg-[#14171C]/90 px-4 py-2 backdrop-blur-md">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: activeBadge.accent,
                boxShadow: `0 0 8px ${activeBadge.accent}`
              }}
            />
            <span className="font-mono text-xs text-[#F2F4F8]">
              {activeBadge.title}
            </span>
            <span className="font-mono text-[11px] text-[#A7AFBA] hidden sm:inline">
              — {activeBadge.issuer}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {BADGES_DATA.map((badge, idx) => (
              <button
                key={badge.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Select badge ${idx + 1}: ${badge.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-6 bg-[#C8A45C]'
                    : 'w-1.5 bg-[rgba(242,244,248,0.2)] hover:bg-[rgba(242,244,248,0.45)]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BadgesShowcaseSection;

