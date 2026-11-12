import { motion } from 'framer-motion';
import {
  Code2,
  Layers,
  Server,
  Wrench,
  Cpu,
  Sparkles
} from 'lucide-react';

const TECH_FIELDS = [
  {
    id: 'languages',
    category: 'Programming Languages',
    icon: Code2,
    color: '#E5C37A',
    direction: 'left',
    baseDuration: 34, // at 0.5x => 68s
    skills: [
      { name: 'Python', dot: '#3776AB' },
      { name: 'JavaScript', dot: '#F7DF1E' },
      { name: 'Java', dot: '#EA2D2E' },
      { name: 'C++', dot: '#00599C' }
    ]
  },
  {
    id: 'frontend',
    category: 'Frontend',
    icon: Layers,
    color: '#60A5FA',
    direction: 'right',
    baseDuration: 36, // at 0.5x => 72s
    skills: [
      { name: 'React', dot: '#61DAFB' },
      { name: 'Tailwind CSS', dot: '#06B6D4' },
      { name: 'GSAP', dot: '#88CE02' },
      { name: 'HTML / CSS', dot: '#E34F26' }
    ]
  },
  {
    id: 'backend',
    category: 'Backend',
    icon: Server,
    color: '#34D399',
    direction: 'left',
    baseDuration: 34, // at 0.5x => 68s
    skills: [
      { name: 'Node.js', dot: '#339933' },
      { name: 'Flask', dot: '#F2F4F8' },
      { name: 'Express', dot: '#A7AFBA' },
      { name: 'REST APIs', dot: '#C8A45C' }
    ]
  },
  {
    id: 'tools',
    category: 'Tools & Platforms',
    icon: Wrench,
    color: '#F59E0B',
    direction: 'right',
    baseDuration: 42, // at 0.5x => 84s
    skills: [
      { name: 'Git', dot: '#F05032' },
      { name: 'Figma', dot: '#A259FF' },
      { name: 'Vite', dot: '#646CFF' },
      { name: 'Vercel', dot: '#FFFFFF' },
      { name: 'Render', dot: '#46E3B7' },
      { name: 'GitHub Actions', dot: '#2088FF' }
    ]
  },
  {
    id: 'learning',
    category: 'Currently Learning',
    icon: Cpu,
    color: '#A78BFA',
    direction: 'left',
    baseDuration: 38, // at 0.5x => 76s
    skills: [
      { name: 'Rust', dot: '#DEA584' },
      { name: 'Three.js', dot: '#FFFFFF' },
      { name: 'WebGL', dot: '#EF4444' },
      { name: 'PostgreSQL', dot: '#4169E1' },
      { name: 'Next.js', dot: '#F2F4F8' }
    ]
  }
];

// Speed locked cleanly at 0.5x
const LOCKED_SPEED = 0.5;

const FieldMarqueeRow = ({ field, index }) => {
  const Icon = field.icon;
  const durationSeconds = Math.round(field.baseDuration / LOCKED_SPEED);

  // Repeat items enough times per half-track so there is never a gap on wide viewports
  const repeatedSkills = [
    ...field.skills,
    ...field.skills,
    ...field.skills,
    ...field.skills
  ];

  const renderPill = (skill, key) => (
    <div
      key={key}
      className="group/pill flex items-center gap-2.5 rounded-full border border-[rgba(242,244,248,0.1)] bg-[rgba(20,23,28,0.75)] px-4 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-[#C8A45C] hover:bg-[rgba(200,164,92,0.1)] hover:-translate-y-0.5 shrink-0 cursor-default"
    >
      <span
        className="w-2 h-2 rounded-full shrink-0 transition-transform duration-300 group-hover/pill:scale-125"
        style={{
          backgroundColor: skill.dot,
          boxShadow: `0 0 8px ${skill.dot}`
        }}
      />
      <span className="font-mono text-xs sm:text-sm font-medium text-[#F2F4F8] whitespace-nowrap group-hover/pill:text-[#E5C37A] transition-colors">
        {skill.name}
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group/row flex flex-col md:flex-row md:items-center gap-3 md:gap-6 rounded-2xl border border-[rgba(242,244,248,0.08)] bg-[rgba(16,19,24,0.55)] p-4 sm:px-6 sm:py-4 transition-colors duration-300 hover:border-[rgba(200,164,92,0.28)]"
    >
      {/* Clear Field Label on the Left */}
      <div className="flex items-center justify-between md:justify-start gap-3 md:w-64 lg:w-72 shrink-0 md:border-r md:border-[rgba(242,244,248,0.08)] md:pr-5">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0"
            style={{
              backgroundColor: `${field.color}14`,
              borderColor: `${field.color}38`,
              color: field.color
            }}
          >
            <Icon size={17} />
          </div>
          <div className="min-w-0">
            <span className="font-mono text-[10px] text-[#A7AFBA]/70 block">
              0{index + 1}
            </span>
            <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-[#F2F4F8] truncate">
              {field.category}
            </h3>
          </div>
        </div>

        <span className="md:hidden font-mono text-[10px] text-[#A7AFBA] px-2 py-0.5 rounded bg-white/5">
          {field.skills.length}
        </span>
      </div>

      {/* Smooth 0.5x Locked Marquee Track */}
      <div
        className="relative flex-1 overflow-hidden py-1"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)'
        }}
      >
        <div
          className={`flex w-max items-center ${
            field.direction === 'left' ? 'field-marquee-left' : 'field-marquee-right'
          } group-hover/row:[animation-play-state:paused]`}
          style={{
            animationDuration: `${durationSeconds}s`
          }}
        >
          <div className="flex items-center gap-3 pr-3">
            {repeatedSkills.map((skill, idx) => renderPill(skill, `a-${idx}`))}
          </div>
          <div className="flex items-center gap-3 pr-3" aria-hidden="true">
            {repeatedSkills.map((skill, idx) => renderPill(skill, `b-${idx}`))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TechStackSection = ({ sectionRef }) => {
  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative w-full pt-28 pb-24 px-[6vw] z-[35] bg-[#0B0C0F] overflow-hidden"
    >
      <style>{`
        @keyframes fieldMarqueeLeft {
          0% { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes fieldMarqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        .field-marquee-left {
          animation-name: fieldMarqueeLeft;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .field-marquee-right {
          animation-name: fieldMarqueeRight;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Clean Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="tech-stack-heading mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase inline-flex items-center gap-2">
              <Sparkles size={14} />
              Tech Stack
            </span>
            <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-3 leading-[1.05]">
              Tools I <span className="text-gradient">work with.</span>
            </h2>
          </div>

          <span className="font-mono text-[11px] text-[#A7AFBA] self-start sm:self-auto">
            Hover any row to pause
          </span>
        </motion.div>

        {/* Field-Wise Animated Marquee Rows (Locked at 0.5x Speed) */}
        <div className="space-y-4">
          {TECH_FIELDS.map((field, index) => (
            <FieldMarqueeRow key={field.id} field={field} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
