import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Calendar,
  MapPin,
  Sparkles,
  Trophy,
  Award,
  CheckCircle2,
  ImagePlus,
  Maximize2,
  X,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  RotateCw,
  Layers
} from 'lucide-react';
import AnimatedHeading from './ui/AnimatedHeading';

/**
 * 1. INTERNSHIP CERTIFICATE CONFIGURATION:
 * Place your certificate in `client/public/certificates/` (e.g. `ansh-certificate.jpg`)
 * or import it from `client/src/assets/`, then set `image: '/certificates/ansh-certificate.jpg'`!
 */
export const INTERNSHIP_CERTIFICATE = {
  id: 'ansh-cert',
  title: 'MERN Stack Industrial Training Certificate',
  organization: 'Ansh Infotech • Ludhiana, Punjab',
  period: '45 Days Intensive Training',
  image: null, // e.g. '/certificates/ansh-infotech.jpg' or import certImg from '../assets/cert.jpg'
  credentialId: 'AIT-MERN-2026',
  accent: '#38BDF8'
};

/**
 * 2. REWARDS / GOODIES 3D FLIP CARD CONFIGURATION:
 * One single interactive 3D card slot with 2 flipping picture faces:
 *  - Front Face (Side A): Campus Kit & Swags
 *  - Back Face  (Side B): Tenure Goodies & Event Merchandise
 * Place your photos in `client/public/rewards/` and set their path below!
 */
export const REWARDS_FLIP_CARD = {
  front: {
    id: 'reward-front',
    title: 'GeeksforGeeks Campus Kit & Swags',
    category: 'Welcome Swag Kit',
    description: 'Official GFG Campus Mantri welcome kit with T-shirt, laptop bag, notebooks, and badges.',
    image: null, // e.g. '/rewards/gfg-swag-kit.jpg' or import swagImg from '../assets/swag.jpg'
    accent: '#2F8D46',
    faceName: 'Side A • Front Face',
    tag: 'SLOT 01 / FRONT'
  },
  back: {
    id: 'reward-back',
    title: 'Tenure Goodies & Organizer Merchandise',
    category: 'Tenure Rewards',
    description: 'Special community recognition rewards, premium drinkware, exclusive swag packs, and achievement tokens.',
    image: null, // e.g. '/rewards/gfg-goodies.jpg' or import goodiesImg from '../assets/goodies.jpg'
    accent: '#38BDF8',
    faceName: 'Side B • Back Face',
    tag: 'SLOT 02 / BACK'
  }
};

export const REWARDS_PHOTOS = [REWARDS_FLIP_CARD.front, REWARDS_FLIP_CARD.back];

const FLIP_DIRECTIONS = ['right', 'down', 'left', 'up'];

export const ExperienceSection = ({ sectionRef }) => {
  const [modalItem, setModalItem] = useState(null); // certificate or reward to view in lightbox
  const [isFlipped, setIsFlipped] = useState(false);
  const [directionIdx, setDirectionIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeDirection = FLIP_DIRECTIONS[directionIdx % FLIP_DIRECTIONS.length];

  // Automatic 3D Flip in all 4 directions (Right -> Down -> Left -> Up)
  useEffect(() => {
    if (isHovered) return; // Pause on hover while inspecting

    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
      setDirectionIdx((prev) => (prev + 1) % FLIP_DIRECTIONS.length);
    }, 3600);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleManualFlip = () => {
    setIsFlipped((prev) => !prev);
    setDirectionIdx((prev) => (prev + 1) % FLIP_DIRECTIONS.length);
  };

  const getContainerTransform = () => {
    if (!isFlipped) {
      return 'rotateX(0deg) rotateY(0deg)';
    }
    switch (activeDirection) {
      case 'right':
        return 'rotateY(180deg) rotateX(0deg)';
      case 'down':
        return 'rotateX(-180deg) rotateY(0deg)';
      case 'left':
        return 'rotateY(-180deg) rotateX(0deg)';
      case 'up':
        return 'rotateX(180deg) rotateY(0deg)';
      default:
        return 'rotateY(180deg)';
    }
  };

  const getBackFaceTransform = () => {
    switch (activeDirection) {
      case 'right':
        return 'rotateY(180deg)';
      case 'down':
        return 'rotateX(-180deg)';
      case 'left':
        return 'rotateY(-180deg)';
      case 'up':
        return 'rotateX(180deg)';
      default:
        return 'rotateY(180deg)';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full py-20 sm:py-24 px-[4vw] md:px-[6vw] z-30 bg-[#0B0C0F] overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute -top-28 left-1/4 w-[420px] h-[420px] rounded-full bg-[#38BDF8]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-8 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00E5FF]/10 blur-[140px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Kinetic Section Header */}
        <div className="mb-10 sm:mb-12">
          <AnimatedHeading
            eyebrow="Experience &amp; Leadership"
            title="Where I've *worked &amp; led.*"
            subtitle="Industrial full-stack software training and two consecutive tenures as GeeksforGeeks Campus Ambassador."
            className="max-w-xl"
          />
        </div>

        {/* Fit, Compact 2-Column Experience Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-14">
          {/* Card 1: Ansh Infotech (Ludhiana) with Certificate Photo Slot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-2xl border border-[rgba(242,244,248,0.1)] bg-[rgba(16,19,26,0.7)] backdrop-blur-xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[rgba(200,164,92,0.4)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Header: Badges & Period */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-[rgba(200,164,92,0.35)] bg-[rgba(200,164,92,0.1)] text-[#C8A45C] font-semibold uppercase tracking-wider">
                  Industrial Training
                </span>
                <span className="font-mono text-xs text-[#A7AFBA] flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#C8A45C]" />
                  45 Days Intensive
                </span>
              </div>

              {/* Title & Organization */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#F2F4F8] tracking-tight group-hover:text-[#E5C37A] transition-colors">
                MERN Stack Trainee
              </h3>

              <div className="flex flex-wrap items-center gap-2 mt-1.5 mb-4 font-mono text-xs text-[#A7AFBA]">
                <span className="flex items-center gap-1.5 text-[#F2F4F8]">
                  <Building2 size={13} className="text-[#C8A45C]" />
                  Ansh Infotech
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#A7AFBA]">
                  <MapPin size={13} />
                  Ludhiana, Punjab
                </span>
              </div>

              {/* Concise Highlights */}
              <div className="space-y-2.5 mb-5">
                {[
                  'Engineered full-stack applications using MongoDB, Express.js, React.js, and Node.js.',
                  'Developed reusable component architectures in React with hooks & responsive layouts.',
                  'Constructed and tested secure RESTful API endpoints and CRUD operations with Postman.'
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-[#C8A45C]" />
                    <p className="text-xs sm:text-[13px] text-[#F2F4F8]/85 leading-relaxed font-light">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dedicated Internship Certificate Photo Slot */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] text-[#C8A45C] tracking-wide uppercase inline-flex items-center gap-1.5 font-medium">
                    <FileCheck2 size={13} />
                    Internship Certificate
                  </span>
                  <span className="font-mono text-[10px] text-[#A7AFBA]/60">
                    Click to inspect
                  </span>
                </div>

                <div
                  onClick={() =>
                    setModalItem({
                      title: INTERNSHIP_CERTIFICATE.title,
                      category: INTERNSHIP_CERTIFICATE.organization,
                      description: `${INTERNSHIP_CERTIFICATE.period} • Hands-on MERN stack engineering verification.`,
                      image: INTERNSHIP_CERTIFICATE.image,
                      accent: INTERNSHIP_CERTIFICATE.accent
                    })
                  }
                  className={`group/cert relative rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                    INTERNSHIP_CERTIFICATE.image
                      ? 'border-[rgba(200,164,92,0.35)] bg-[#0B0C0F] hover:border-[#C8A45C] hover:shadow-[0_10px_30px_rgba(200,164,92,0.2)]'
                      : 'border-dashed border-[rgba(200,164,92,0.3)] bg-[rgba(200,164,92,0.04)] hover:border-[rgba(200,164,92,0.6)] hover:bg-[rgba(200,164,92,0.08)]'
                  } p-3.5 flex items-center justify-between gap-3`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(200,164,92,0.12)] border border-[rgba(200,164,92,0.3)] flex items-center justify-center text-[#C8A45C] shrink-0 group-hover/cert:scale-105 transition-transform">
                      {INTERNSHIP_CERTIFICATE.image ? (
                        <FileCheck2 size={18} />
                      ) : (
                        <ImagePlus size={18} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-xs font-semibold text-[#F2F4F8] block truncate group-hover/cert:text-[#E5C37A] transition-colors">
                        {INTERNSHIP_CERTIFICATE.image
                          ? 'Ansh Infotech Certificate'
                          : 'Upload Certificate Photo'}
                      </span>
                      <span className="font-mono text-[10px] text-[#A7AFBA] block truncate">
                        {INTERNSHIP_CERTIFICATE.image
                          ? 'Verified Completion • 45 Days Training'
                          : 'Slot Ready • Drop jpg/png in assets/ or public/'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-[#F2F4F8]/80 shrink-0 group-hover/cert:border-[#C8A45C]/40">
                    <span>{INTERNSHIP_CERTIFICATE.image ? 'View' : 'Add Pic'}</span>
                    <Maximize2 size={11} className="text-[#C8A45C]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Badges */}
            <div className="pt-4 border-t border-[rgba(242,244,248,0.08)] flex flex-wrap gap-1.5">
              {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'Postman', 'Git'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-[rgba(242,244,248,0.08)] bg-[rgba(242,244,248,0.03)] text-[#F2F4F8]/75"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Card 2: GeeksforGeeks Campus Mantri (2 Consecutive Tenures) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-2xl border border-[rgba(242,244,248,0.1)] bg-[rgba(16,19,26,0.7)] backdrop-blur-xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[rgba(47,141,70,0.45)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
          >
            <div>
              {/* Header: Badges & Period */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-[rgba(47,141,70,0.4)] bg-[rgba(47,141,70,0.12)] text-[#34D399] font-semibold uppercase tracking-wider">
                  Campus Leadership
                </span>
                <span className="font-mono text-xs text-[#A7AFBA] flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#C8A45C]" />
                  2 Consecutive Tenures • 1 Year
                </span>
              </div>

              {/* Title & Organization */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#F2F4F8] tracking-tight group-hover:text-[#34D399] transition-colors">
                Campus Mantri (Student Lead)
              </h3>

              <div className="flex flex-wrap items-center gap-2 mt-1.5 mb-4 font-mono text-xs text-[#A7AFBA]">
                <span className="flex items-center gap-1.5 text-[#F2F4F8]">
                  <Building2 size={13} className="text-[#C8A45C]" />
                  GeeksforGeeks (GFG)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#A7AFBA]">
                  <MapPin size={13} />
                  RIMT University Campus
                </span>
              </div>

              {/* Dual Tenure Compact Pill Bar */}
              <div className="grid grid-cols-2 gap-2 mb-4 p-2 rounded-xl border border-[rgba(47,141,70,0.25)] bg-[rgba(47,141,70,0.05)]">
                <div className="px-2.5 py-1.5 rounded-lg bg-[#0B0C0F]/80 border border-[rgba(242,244,248,0.06)] flex items-center justify-between gap-1">
                  <div>
                    <span className="font-mono text-[9px] font-bold text-[#34D399] uppercase block">
                      Tenure 01
                    </span>
                    <span className="font-mono text-[10px] text-[#F2F4F8]">
                      Jan 2026 – Jun 2026
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#A7AFBA] px-1.5 py-0.5 rounded bg-white/5">
                    6 Mos
                  </span>
                </div>

                <div className="px-2.5 py-1.5 rounded-lg bg-[#0B0C0F]/80 border border-[rgba(242,244,248,0.06)] flex items-center justify-between gap-1">
                  <div>
                    <span className="font-mono text-[9px] font-bold text-[#34D399] uppercase block">
                      Tenure 02
                    </span>
                    <span className="font-mono text-[10px] text-[#F2F4F8]">
                      Jul 2026 – Dec 2026
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#A7AFBA] px-1.5 py-0.5 rounded bg-white/5">
                    6 Mos
                  </span>
                </div>
              </div>

              {/* Concise Highlights */}
              <div className="space-y-2.5 mb-5">
                {[
                  'Appointed twice consecutively as official technical student ambassador representing GeeksforGeeks.',
                  'Organized coding competitions, algorithmic speed challenges, and DSA workshops for 500+ students.',
                  'Mentored collegiate developers in daily problem solving streaks and platform mastery.'
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-[#34D399]" />
                    <p className="text-xs sm:text-[13px] text-[#F2F4F8]/85 leading-relaxed font-light">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Badges */}
            <div className="pt-4 border-t border-[rgba(242,244,248,0.08)] flex flex-wrap gap-1.5">
              {['Community Leadership', 'DSA Mentorship', 'Event Organizing', 'Technical Advocacy', 'GeeksforGeeks'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-[rgba(242,244,248,0.08)] bg-[rgba(242,244,248,0.03)] text-[#F2F4F8]/75"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Interactive 3D Card Flip Showcase (Jitter-inspired) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[rgba(200,164,92,0.22)] bg-[rgba(16,19,26,0.55)] backdrop-blur-xl p-5 sm:p-7 relative overflow-hidden"
        >
          {/* Header Row without buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase inline-flex items-center gap-1.5 font-medium">
                <Trophy size={13} className="text-[#C8A45C]" />
                Rewards &amp; Recognition • 3D Showcase
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-[#F2F4F8] mt-1">
                Campus Mantri <span className="text-gradient">Goodies &amp; Swags.</span>
              </h4>
            </div>

            {/* Live Directional Status Pill (No buttons) */}
            <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[11px] px-3.5 py-1.5 rounded-full border border-[rgba(200,164,92,0.25)] bg-[rgba(200,164,92,0.06)] text-[#E5C37A] select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
              <span className="tracking-wider uppercase text-[10px]">
                Auto 3D Flip • {activeDirection === 'right' ? '→ Right' : activeDirection === 'down' ? '↓ Down' : activeDirection === 'left' ? '← Left' : '↑ Up'}
              </span>
            </div>
          </div>

          {/* Single Centered 3D Flip Card Container */}
          <div className="max-w-2xl mx-auto py-2">
            <div className="perspective-1200 w-full">
              <div
                onClick={handleManualFlip}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full aspect-[16/11] sm:aspect-[16/10] cursor-pointer flip-card-inner group"
                style={{
                  transform: getContainerTransform()
                }}
              >
                {/* ---------------- FRONT FACE (Side A: Campus Kit) ---------------- */}
                <div className="absolute inset-0 w-full h-full rounded-2xl border border-[rgba(200,164,92,0.3)] bg-[rgba(14,17,23,0.92)] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col justify-between overflow-hidden backface-hidden transition-all group-hover:border-[#2F8D46] group-hover:shadow-[0_25px_60px_rgba(47,141,70,0.15)]">
                  {/* Photo Canvas or Placeholder */}
                  <div className="relative w-full h-[70%] bg-[#0B0C0F] overflow-hidden flex items-center justify-center">
                    {REWARDS_FLIP_CARD.front.image ? (
                      <>
                        <img
                          src={REWARDS_FLIP_CARD.front.image}
                          alt={REWARDS_FLIP_CARD.front.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] via-transparent to-transparent opacity-80" />
                      </>
                    ) : (
                      <div className="text-center flex flex-col items-center justify-center p-4">
                        <div className="w-12 h-12 rounded-2xl border border-dashed border-[#2F8D46]/50 bg-[#2F8D46]/10 flex items-center justify-center text-[#34D399] mb-2.5 group-hover:scale-110 transition-transform">
                          <ImagePlus size={22} />
                        </div>
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#F2F4F8] block">
                          Reward Photo 01 (Front Face)
                        </span>
                        <span className="font-mono text-[10px] text-[#A7AFBA]/80 uppercase tracking-wider block mt-1">
                          Drop Campus Kit Pic in client/public/rewards/
                        </span>
                      </div>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full border border-[#2F8D46]/40 bg-[#0B0C0F]/85 backdrop-blur-md font-mono text-[9px] sm:text-[10px] text-[#34D399] font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                      SIDE A • FRONT
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalItem(REWARDS_FLIP_CARD.front);
                      }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#0B0C0F]/80 backdrop-blur-md border border-[rgba(242,244,248,0.15)] flex items-center justify-center text-[#E5C37A] hover:bg-[#C8A45C] hover:text-[#0B0C0F] transition-all"
                      title="Inspect full image"
                    >
                      <Maximize2 size={13} />
                    </button>
                  </div>

                  {/* Caption & Status Prompt */}
                  <div className="p-3.5 sm:p-4.5 flex items-center justify-between gap-3 border-t border-[rgba(242,244,248,0.06)] bg-[rgba(14,17,23,0.95)]">
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] text-[#34D399] tracking-wider uppercase block font-semibold mb-0.5">
                        {REWARDS_FLIP_CARD.front.category}
                      </span>
                      <h5 className="text-sm sm:text-base font-bold text-[#F2F4F8] truncate">
                        {REWARDS_FLIP_CARD.front.title}
                      </h5>
                      <p className="text-[11px] text-[#A7AFBA] line-clamp-1 mt-0.5 font-light">
                        {REWARDS_FLIP_CARD.front.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[rgba(200,164,92,0.2)] bg-[rgba(200,164,92,0.06)] text-[#C8A45C] font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                      <span>{isHovered ? 'Click to Flip' : 'Auto 3D Flip'}</span>
                    </div>
                  </div>
                </div>

                {/* ---------------- BACK FACE (Side B: Tenure Rewards) ---------------- */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl border border-[rgba(200,164,92,0.3)] bg-[rgba(14,17,23,0.92)] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col justify-between overflow-hidden backface-hidden transition-all group-hover:border-[#C8A45C] group-hover:shadow-[0_25px_60px_rgba(200,164,92,0.15)]"
                  style={{ transform: getBackFaceTransform() }}
                >
                  {/* Photo Canvas or Placeholder */}
                  <div className="relative w-full h-[70%] bg-[#0B0C0F] overflow-hidden flex items-center justify-center">
                    {REWARDS_FLIP_CARD.back.image ? (
                      <>
                        <img
                          src={REWARDS_FLIP_CARD.back.image}
                          alt={REWARDS_FLIP_CARD.back.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] via-transparent to-transparent opacity-80" />
                      </>
                    ) : (
                      <div className="text-center flex flex-col items-center justify-center p-4">
                        <div className="w-12 h-12 rounded-2xl border border-dashed border-[#C8A45C]/50 bg-[#C8A45C]/10 flex items-center justify-center text-[#E5C37A] mb-2.5 group-hover:scale-110 transition-transform">
                          <ImagePlus size={22} />
                        </div>
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#F2F4F8] block">
                          Reward Photo 02 (Back Face)
                        </span>
                        <span className="font-mono text-[10px] text-[#A7AFBA]/80 uppercase tracking-wider block mt-1">
                          Drop Tenure Rewards Pic in client/public/rewards/
                        </span>
                      </div>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full border border-[#C8A45C]/40 bg-[#0B0C0F]/85 backdrop-blur-md font-mono text-[9px] sm:text-[10px] text-[#E5C37A] font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5C37A] animate-pulse" />
                      SIDE B • BACK
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalItem(REWARDS_FLIP_CARD.back);
                      }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#0B0C0F]/80 backdrop-blur-md border border-[rgba(242,244,248,0.15)] flex items-center justify-center text-[#E5C37A] hover:bg-[#C8A45C] hover:text-[#0B0C0F] transition-all"
                      title="Inspect full image"
                    >
                      <Maximize2 size={13} />
                    </button>
                  </div>

                  {/* Caption & Status Prompt */}
                  <div className="p-3.5 sm:p-4.5 flex items-center justify-between gap-3 border-t border-[rgba(242,244,248,0.06)] bg-[rgba(14,17,23,0.95)]">
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] text-[#E5C37A] tracking-wider uppercase block font-semibold mb-0.5">
                        {REWARDS_FLIP_CARD.back.category}
                      </span>
                      <h5 className="text-sm sm:text-base font-bold text-[#F2F4F8] truncate">
                        {REWARDS_FLIP_CARD.back.title}
                      </h5>
                      <p className="text-[11px] text-[#A7AFBA] line-clamp-1 mt-0.5 font-light">
                        {REWARDS_FLIP_CARD.back.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[rgba(200,164,92,0.2)] bg-[rgba(200,164,92,0.06)] text-[#C8A45C] font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                      <span>{isHovered ? 'Click to Flip' : 'Auto 3D Flip'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal for Photo / Certificate Inspection */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalItem(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-2xl border border-[rgba(200,164,92,0.3)] bg-[#0B0C0F] p-4 sm:p-6 overflow-hidden shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setModalItem(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#14171C] border border-[rgba(242,244,248,0.15)] flex items-center justify-center text-[#A7AFBA] hover:text-[#C8A45C] transition-colors"
                aria-label="Close modal"
              >
                <X size={15} />
              </button>

              <div className="rounded-xl overflow-hidden mb-4 aspect-video bg-[#14171C] flex items-center justify-center">
                {modalItem.image ? (
                  <img
                    src={modalItem.image}
                    alt={modalItem.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-6 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl border border-dashed border-[rgba(200,164,92,0.4)] bg-[rgba(200,164,92,0.08)] flex items-center justify-center text-[#C8A45C] mb-3">
                      <ImagePlus size={26} />
                    </div>
                    <p className="font-mono text-sm text-[#F2F4F8] font-semibold">
                      Photo Upload Slot
                    </p>
                    <p className="font-mono text-xs text-[#A7AFBA] mt-1 max-w-sm">
                      Drop your photo in <code className="text-[#C8A45C]">client/public/rewards/</code> or <code className="text-[#C8A45C]">client/public/certificates/</code> and set its path to display it here.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <span
                  className="font-mono text-[10px] uppercase tracking-wider block mb-1 font-semibold"
                  style={{ color: modalItem.accent || '#C8A45C' }}
                >
                  {modalItem.category}
                </span>
                <h4 className="text-lg font-bold text-[#F2F4F8]">
                  {modalItem.title}
                </h4>
                <p className="text-xs text-[#A7AFBA] mt-1.5 font-light">
                  {modalItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceSection;
