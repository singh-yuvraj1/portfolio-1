import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Layers } from 'lucide-react';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[rgba(200,164,92,0.3)] bg-[#0F1218] shadow-2xl shadow-black/80 z-10 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header Image */}
            <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-black">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1218] via-[#0F1218]/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-[#F2F4F8] hover:text-[#C8A45C] hover:bg-black/80 transition-all border border-white/10"
              >
                <X size={20} />
              </button>

              {/* Project Badge */}
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-[#C8A45C]/20 text-[#E5C37A] border border-[#C8A45C]/40 backdrop-blur-md">
                  {project.category}
                </span>
                {project.stats && (
                  <span className="px-3 py-1 text-xs font-mono rounded-full bg-white/10 text-white/90 border border-white/10 backdrop-blur-md">
                    {project.stats}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F2F4F8] tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm font-mono text-[#C8A45C] mt-1">
                  {project.subtitle || project.category}
                </p>
                <p className="text-[#A7AFBA] text-sm sm:text-base leading-relaxed mt-4">
                  {project.description}
                </p>
              </div>

              {/* Key Technical Highlights */}
              {project.highlights && (
                <div className="rounded-xl border border-[rgba(242,244,248,0.08)] bg-[rgba(20,24,32,0.6)] p-5">
                  <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#C8A45C] mb-3 flex items-center gap-2">
                    <Sparkles size={14} /> Key Innovations & Architectural Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D1D5DB]">
                        <CheckCircle2 size={16} className="text-[#C8A45C] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Tags */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#A7AFBA] mb-3 flex items-center gap-2">
                  <Layers size={14} /> Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-mono text-[#F2F4F8] rounded-lg border border-[rgba(242,244,248,0.1)] bg-[rgba(25,29,38,0.7)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-[rgba(242,244,248,0.08)] flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <ExternalLink size={15} />
                      Launch Live App
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <Github size={15} />
                      Inspect Code
                    </a>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="text-xs font-mono text-[#A7AFBA] hover:text-[#F2F4F8] transition-colors"
                >
                  Close Window [Esc]
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
