import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  ArrowUpRight,
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectModal } from './ui/ProjectModal';

// 3D Perspective Tilt Card with Mouse Radial Spotlight
const BentoProjectCard = ({ project, onOpenDetails }) => {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [spotlightPos, setSpotlightPos] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-out'
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(242,244,248,0.1)] bg-[rgba(15,18,24,0.75)] backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-[#C8A45C]/50 hover:shadow-2xl hover:shadow-[#C8A45C]/10"
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(200, 164, 92, 0.14), transparent 75%)`
        }}
      />

      {/* Card Visual Header */}
      <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-black/60">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1218] via-transparent to-transparent opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
          <span className="px-3 py-1 text-[11px] font-mono font-medium rounded-full bg-black/70 text-[#E5C37A] border border-[#C8A45C]/30 backdrop-blur-md">
            {project.category}
          </span>
          {project.stats && (
            <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-[#C8A45C] text-[#0B0C0F] font-semibold shadow-md">
              {project.stats}
            </span>
          )}
        </div>

        {/* Quick Expand Button on Hover */}
        <button
          onClick={() => onOpenDetails(project)}
          aria-label="View project details"
          className="absolute bottom-3 right-3 z-20 rounded-full bg-black/70 p-2 text-[#F2F4F8] hover:text-[#C8A45C] hover:bg-black/90 transition-all border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
        >
          <Maximize2 size={15} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex flex-col justify-between flex-grow z-20">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-[#F2F4F8] group-hover:text-[#E5C37A] transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-xs font-mono text-[#C8A45C] mt-0.5">
            {project.subtitle || project.category}
          </p>

          <p className="text-xs sm:text-sm text-[#A7AFBA] mt-3 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[11px] font-mono text-[#D1D5DB] rounded-md bg-[rgba(255,255,255,0.05)] border border-white/5"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-1 text-[10px] font-mono text-[#A7AFBA] rounded-md bg-white/5">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[rgba(242,244,248,0.08)] flex items-center justify-between">
          <button
            onClick={() => onOpenDetails(project)}
            className="text-xs font-mono text-[#A7AFBA] hover:text-[#C8A45C] flex items-center gap-1.5 transition-colors"
          >
            <span>Inspect Specs</span>
            <ArrowUpRight size={14} />
          </button>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub`}
                className="text-[#A7AFBA] hover:text-[#C8A45C] transition-colors p-1"
              >
                <Github size={17} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live demo for ${project.title}`}
                className="text-[#A7AFBA] hover:text-[#C8A45C] transition-colors p-1"
              >
                <ExternalLink size={17} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalProject, setModalProject] = useState(null);

  const categories = ['All', 'AI / ML', 'Full-Stack', 'Tools'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#0B0C0F]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8A45C] uppercase mb-3">
              <Sparkles size={14} />
              <span>Selected Builds & Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#F2F4F8]">
              Crafted With Purpose.
            </h2>
            <p className="text-sm sm:text-base text-[#A7AFBA] mt-3 max-w-xl font-light">
              Full-stack platforms, AI-driven solutions, and developer tools engineered for speed, utility, and user delight.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2 p-1 rounded-xl bg-[rgba(20,24,32,0.6)] border border-white/5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 text-xs font-mono tracking-wider rounded-lg transition-colors duration-200 ${
                    isSelected ? 'text-[#0B0C0F] font-bold' : 'text-[#A7AFBA] hover:text-[#F2F4F8]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                      className="absolute inset-0 bg-[#C8A45C] rounded-lg shadow-[0_0_12px_rgba(200,164,92,0.4)]"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <BentoProjectCard
                key={project.id}
                project={project}
                onOpenDetails={(p) => setModalProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Inspection */}
        <ProjectModal
          project={modalProject}
          isOpen={!!modalProject}
          onClose={() => setModalProject(null)}
        />
      </div>
    </section>
  );
};
