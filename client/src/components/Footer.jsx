import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer = ({ onNavigate = () => {} }) => {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setIstTime(new Date().toLocaleTimeString('en-IN', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[rgba(242,244,248,0.08)] bg-[#07080A] py-12 px-4 sm:px-6 lg:px-12 text-[#A7AFBA]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Rights */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-mono text-sm font-bold tracking-[0.16em] text-[#F2F4F8]">
              {PERSONAL_INFO.name.toUpperCase()}
            </span>
            <span className="text-xs text-[#C8A45C] font-mono">
              [B.Tech 4th Year · RIMT]
            </span>
          </div>

          <p className="text-xs text-[#A7AFBA] mt-1.5 font-light">
            © {new Date().getFullYear()} Yuvraj Singh. Crafted with Motion Dev, React & Care.
          </p>
        </div>

        {/* Live IST Clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#A7AFBA]">India (IST):</span>
          <span className="text-[#F2F4F8] font-semibold">{istTime || 'Loading...'}</span>
        </div>

        {/* Socials & Back To Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-xl bg-white/5 text-[#A7AFBA] hover:text-[#C8A45C] hover:bg-[#C8A45C]/10 transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-xl bg-white/5 text-[#A7AFBA] hover:text-[#C8A45C] hover:bg-[#C8A45C]/10 transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email"
              className="p-2 rounded-xl bg-white/5 text-[#A7AFBA] hover:text-[#C8A45C] hover:bg-[#C8A45C]/10 transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[rgba(242,244,248,0.12)] bg-[rgba(20,24,32,0.8)] text-xs font-mono text-[#F2F4F8] hover:border-[#C8A45C] hover:text-[#C8A45C] transition-all hover:-translate-y-0.5"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
