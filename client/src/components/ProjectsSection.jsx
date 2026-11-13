import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, Sparkles } from 'lucide-react';
import AnimatedHeading from './ui/AnimatedHeading';

import hiremindImg from '../assets/hiremind-ai.png';
import taskTitanImg from '../assets/task-titan.png';
import hungryBitesImg from '../assets/hungry_bites.png';
import aiAttendImg from '../assets/ai-attend.png';
import codeStudioImg from '../assets/code_studio.png';
import qrMakerImg from '../assets/qr-maker.png';
import sLabImg from '../assets/s-lab.png';

export const PROJECTS_DATA = [
  {
    id: 'hiremind',
    number: '01',
    title: 'HireMind-AI',
    description:
      'An AI-driven platform that evaluates candidate skills, recommends learning resources, and provides personalized interview preparation.',
    tags: ['AI interview', 'ATS Checker', 'Job Portal', 'Aptitude Training'],
    image: hiremindImg,
    github: 'https://github.com/singh-yuvraj1/hiremind-ai-new',
    live: 'https://hiremind-ai.vercel.app'
  },
  {
    id: 'tasktitan',
    number: '02',
    title: 'TaskTitan-AI',
    description:
      'An AI-powered productivity platform featuring an intelligent assistant (Kai AI) for natural-language task management, personalized planning, task prioritization, deadline-rescue mode, and AI-driven productivity coaching.',
    tags: ['Flask', 'Supabase', 'Security', 'Kai AI'],
    image: taskTitanImg,
    github: 'https://github.com/singh-yuvraj1/TaskTitan_AI',
    live: 'https://task-titan-ai.vercel.app'
  },
  {
    id: 'hungrybites',
    number: '03',
    title: 'Hungry Bites',
    description:
      'Transform any valid, reachable URL into a customizable QR code in seconds. Generate, personalize, and download with ease.',
    tags: ['React', 'Geofencing', 'Live Tracking'],
    image: hungryBitesImg,
    github: 'https://github.com/deepznavzz/safewalk',
    live: 'https://safewalk-y87y.onrender.com/'
  },
  {
    id: 'aiattend',
    number: '04',
    title: 'Ai attendance System',
    description:
      'Turn data into polished PDF reports in seconds. A powerful tool for generating professional reports from structured data.',
    tags: ['React', 'Node.js', 'PDF', 'Analytics'],
    image: aiAttendImg,
    github: 'https://github.com/projectsnavadeep/reportgenerator.in',
    live: 'https://reportgenerator.in'
  },
  {
    id: 'codestudio',
    number: '05',
    title: 'Code Studio',
    description:
      'Capture moments, lock them in time, share the key. An emotional platform for preserving memories digitally.',
    tags: ['Firebase', 'React', 'UX', 'Cloud'],
    image: codeStudioImg,
    github: 'https://github.com/deepznavzz/timecapsule',
    live: 'https://digital-time-capsule-ztsp.onrender.com'
  },
  {
    id: 'qrmaker',
    number: '06',
    title: 'Qr Maker',
    description:
      'Capture moments, lock them in time, share the key. An emotional platform for preserving memories digitally.',
    tags: ['Firebase', 'React', 'UX'],
    image: qrMakerImg,
    github: 'https://github.com/deepznavzz/timecapsule',
    live: 'https://digital-time-capsule-ztsp.onrender.com'
  },
  {
    id: 'sudukulab',
    number: '07',
    title: 'Suduko Lab',
    description:
      'Capture moments, lock them in time, share the key. An emotional platform for preserving memories digitally.',
    tags: ['Firebase', 'React', 'UX', 'Algorithms'],
    image: sLabImg,
    github: 'https://github.com/deepznavzz/timecapsule',
    live: 'https://digital-time-capsule-ztsp.onrender.com'
  }
];

// Interactive 3D Tilt Project Card with Alternating Layout & Direction-Aware Entrance Animation
const ProjectCard = ({ project, index, total }) => {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  // 0, 2, 4, 6 => Image LEFT, Details RIGHT (enters from left)
  // 1, 3, 5    => Image RIGHT, Details LEFT (enters from right)
  const isImageOnLeft = index % 2 === 0;
  const initialX = isImageOnLeft ? -70 : 70;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    setTiltStyle({
      transform: `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.008, 1.008, 1.008)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, x: initialX, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative z-10"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className="group relative rounded-2xl md:rounded-3xl border border-[rgba(242,244,248,0.1)] bg-[rgba(16,19,24,0.75)] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[rgba(200,164,92,0.45)] hover:shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
      >
        <div
          className={`flex flex-col ${
            isImageOnLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } items-stretch min-h-[360px] sm:min-h-[420px] lg:min-h-[460px]`}
        >
          {/* Project Image Half (Alternates Left / Right - Wide & Cinematic) */}
          <div className="lg:w-[52%] relative min-h-[260px] sm:min-h-[340px] lg:min-h-[460px] bg-[#0E1116] overflow-hidden flex items-center justify-center p-6 sm:p-8 lg:p-12">
            {/* Subtle Gradient Glow Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45C]/12 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Corner Project Index Tag */}
            <div
              className={`absolute top-5 ${
                isImageOnLeft ? 'left-5' : 'right-5'
              } z-20 px-3.5 py-1.5 rounded-full border border-[rgba(242,244,248,0.14)] bg-[#0B0C0F]/85 backdrop-blur-md font-mono text-xs text-[#C8A45C] font-semibold`}
            >
              PROJECT {project.number}
            </div>

            <img
              src={project.image}
              alt={project.title}
              className="relative z-10 w-full h-full max-h-[380px] lg:max-h-[420px] object-contain rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Project Details Half (Alternates Right / Left - Spacious Padding) */}
          <div className="lg:w-[48%] p-6 sm:p-8 lg:p-12 xl:p-14 flex flex-col justify-between">
            <div>
              {/* Eyebrow / Counter */}
              <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
                <span className="font-mono text-xs tracking-[0.2em] text-[#C8A45C] uppercase inline-flex items-center gap-2">
                  <Sparkles size={13} />
                  Featured Build
                </span>
                <span className="font-mono text-xs text-[#A7AFBA]/60">
                  {project.number} / 0{total}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F2F4F8] tracking-tight group-hover:text-[#E5C37A] transition-colors duration-300">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[#A7AFBA] text-sm sm:text-base leading-relaxed mt-4 sm:mt-5 font-light">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-6 sm:mt-8">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs px-3.5 py-1.5 rounded-full border border-[rgba(242,244,248,0.1)] bg-[rgba(242,244,248,0.04)] text-[#F2F4F8]/85 group-hover:border-[rgba(200,164,92,0.3)] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 mt-8 sm:mt-10 pt-6 border-t border-[rgba(242,244,248,0.08)]">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#A7AFBA] hover:text-[#C8A45C] transition-colors"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#F2F4F8] hover:text-[#C8A45C] transition-colors font-medium"
                >
                  <ExternalLink size={16} />
                  <span className="underline underline-offset-4 decoration-[#C8A45C]/50">
                    Live Demo
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Animated Connecting Line Between Projects (Grows Downward While Scrolling)
const ConnectingLine = ({ nextNumber }) => {
  return (
    <div className="relative py-6 sm:py-8 flex flex-col items-center justify-center select-none">
      {/* Background Track Line */}
      <div className="relative w-[2px] h-20 sm:h-28 bg-[rgba(242,244,248,0.08)] overflow-hidden rounded-full">
        {/* Animated Gold Beam that extends downward as user scrolls */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full bg-gradient-to-b from-[#C8A45C] via-[#E5C37A] to-[#C8A45C] origin-top shadow-[0_0_12px_#C8A45C]"
        />
      </div>

      {/* Floating Center Badge on the Connecting Line */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[rgba(200,164,92,0.4)] bg-[#0B0C0F] text-[#C8A45C] shadow-[0_0_20px_rgba(200,164,92,0.3)] backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45C] animate-pulse" />
        <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E5C37A]">
          {nextNumber}
        </span>
        <ChevronDown size={12} className="text-[#C8A45C]" />
      </motion.div>
    </div>
  );
};

export const ProjectsSection = ({ sectionRef }) => {
  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full min-h-screen py-24 sm:py-28 px-[3vw] sm:px-[5vw] lg:px-[6vw] z-20 bg-[#0B0C0F] overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1380px] mx-auto">
        {/* Section Heading with Staggered Kinetic Words */}
        <div className="mb-14 sm:mb-20">
          <AnimatedHeading
            eyebrow="Selected Work"
            title="A few builds I'm *proud of.*"
            subtitle="Products, landing pages, and tools—designed for clarity and engineered for performance."
            className="max-w-xl"
          />
        </div>

        {/* Projects List with Alternating (Zig-Zag) Layout & Animated Scroll Lines */}
        <div className="relative flex flex-col">
          {PROJECTS_DATA.map((project, index) => {
            const hasNext = index < PROJECTS_DATA.length - 1;
            const nextProject = hasNext ? PROJECTS_DATA[index + 1] : null;

            return (
              <div key={project.id} className="w-full flex flex-col items-center">
                {/* 1. Project Card (Alternating Pic Left / Pic Right) */}
                <ProjectCard
                  project={project}
                  index={index}
                  total={PROJECTS_DATA.length}
                />

                {/* 2. Scroll-Triggered Animated Line Leading to the Next Project */}
                {hasNext && (
                  <ConnectingLine nextNumber={nextProject.number} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
