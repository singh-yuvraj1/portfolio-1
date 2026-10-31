import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const FloatingNavbar = ({
  activeSection = 'hero',
  onNavigate = () => {}
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
      setScrolled(currentScroll > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'stack', label: 'Stack' },
    { id: 'certifications', label: 'Credentials' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[90] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#C8A45C] via-[#F5DE9C] to-[#C8A45C] transition-all duration-100 ease-out shadow-[0_0_8px_rgba(200,164,92,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Island Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 py-4 transition-all duration-300 pointer-events-none ${
          scrolled ? 'pt-3' : 'pt-5'
        }`}
      >
        <div className="pointer-events-auto flex items-center justify-between w-full max-w-5xl rounded-full border border-[rgba(242,244,248,0.12)] bg-[#0C0F14]/80 px-4 sm:px-6 py-2.5 backdrop-blur-xl shadow-2xl shadow-black/50 transition-all duration-300 hover:border-[rgba(200,164,92,0.3)]">
          {/* Brand Logo & Live Status */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A45C] to-[#9E7B34] flex items-center justify-center font-bold text-[#0B0C0F] text-xs shadow-md shadow-[#C8A45C]/20 group-hover:scale-105 transition-transform">
              YS
            </div>
            <div className="hidden sm:block">
              <span className="font-mono text-xs font-bold tracking-[0.16em] text-[#F2F4F8] block leading-tight group-hover:text-[#C8A45C] transition-colors">
                {PERSONAL_INFO.name.toUpperCase()}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-[#A7AFBA] tracking-wide">
                  Available for work
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-[rgba(20,24,32,0.6)] p-1 border border-white/5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-colors duration-200 rounded-full ${
                    isActive ? 'text-[#0B0C0F] font-semibold' : 'text-[#A7AFBA] hover:text-[#F2F4F8]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                      className="absolute inset-0 bg-[#C8A45C] rounded-full shadow-[0_0_12px_rgba(200,164,92,0.5)]"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-[#C8A45C]/40 bg-[#C8A45C]/10 px-3.5 py-1.5 text-xs font-mono font-medium text-[#E5C37A] hover:bg-[#C8A45C] hover:text-[#0B0C0F] transition-all duration-300"
            >
              <FileText size={13} />
              Resume
              <ArrowUpRight size={13} />
            </a>

            <button
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#C8A45C] px-4 py-1.5 text-xs font-mono font-semibold text-[#0B0C0F] shadow-[0_0_15px_rgba(200,164,92,0.3)] hover:bg-[#D4B76A] hover:scale-105 transition-all duration-300"
            >
              <Sparkles size={13} />
              Let's Talk
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-[#F2F4F8] hover:text-[#C8A45C] transition-colors rounded-full"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0B0C0F]/95 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8 pt-20"
          >
            <div className="flex flex-col gap-5 text-center">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-xl font-mono tracking-widest py-2 transition-colors ${
                    activeSection === link.id
                      ? 'text-[#C8A45C] font-bold'
                      : 'text-[#A7AFBA] hover:text-white'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary py-3 text-center text-sm font-mono flex items-center justify-center gap-2"
                >
                  <FileText size={16} />
                  Download Resume
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="btn-primary py-3 text-center text-sm font-mono flex items-center justify-center gap-2"
                >
                  Email Directly
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
