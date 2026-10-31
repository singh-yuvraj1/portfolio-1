import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  FileText,
  Mail,
  ChevronDown,
  ArrowRight,
  Copy,
  Check,
  Code2,
  Terminal,
  Trophy,
  Flame,
  Award
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Spotlight } from './ui/Spotlight';
import { FlipWords } from './ui/FlipWords';

export const HeroSection = ({
  onExploreWork = () => {},
  onContactClick = () => {}
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-12 bg-[#08090C]">
      {/* Ambient Spotlight from Skipper UI */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#E5C37A" />

      {/* Background Graphic & Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center filter grayscale contrast-125"
          style={{ backgroundImage: `url(${PERSONAL_INFO.assets.heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090C]/60 via-[#08090C]/90 to-[#08090C]" />
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(200,164,92,0.35)] bg-[rgba(20,24,32,0.7)] px-4 py-1.5 backdrop-blur-xl shadow-lg shadow-black/40 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono font-medium tracking-wider text-[#F2F4F8]">
            {PERSONAL_INFO.availability}
          </span>
          <span className="text-[11px] font-mono text-[#C8A45C] border-l border-white/10 pl-2">
            Q1/Q2 2025
          </span>
        </motion.div>

        {/* Hero Title with Motion Dev FlipWords */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F2F4F8] leading-[1.08] uppercase font-sans">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-mono font-normal tracking-[0.2em] text-[#C8A45C] mb-3">
              YUVRAJ SINGH
            </span>
            I Build High-Performance
            <span className="block mt-1">
              <FlipWords words={PERSONAL_INFO.roles} duration={2600} />
            </span>
            & Intelligent Web Systems
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#A7AFBA] max-w-2xl mx-auto font-light leading-relaxed">
            From algorithmic problem solving and AI agents to slick reactive frontends.
            Engineering products that balance speed, aesthetics, and rock-solid architecture.
          </p>
        </motion.div>

        {/* Action Button Row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 relative z-20"
        >
          {/* Explore Projects Button */}
          <button
            onClick={onExploreWork}
            className="group relative inline-flex items-center gap-2 rounded-xl bg-[#C8A45C] px-7 py-3.5 text-sm font-semibold text-[#0B0C0F] transition-all duration-300 hover:bg-[#D4B76A] hover:scale-105 shadow-[0_0_25px_rgba(200,164,92,0.35)]"
          >
            <Sparkles size={16} />
            <span>Explore Builds</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>

          {/* View Resume Button */}
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[rgba(242,244,248,0.2)] bg-[rgba(20,24,32,0.6)] px-6 py-3.5 text-sm font-medium text-[#F2F4F8] backdrop-blur-md transition-all duration-300 hover:border-[#C8A45C] hover:text-[#C8A45C] hover:scale-105"
          >
            <FileText size={16} />
            <span>View Resume</span>
          </a>

          {/* Quick Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 rounded-xl border border-[rgba(242,244,248,0.12)] bg-[rgba(16,19,25,0.6)] px-5 py-3.5 text-xs font-mono text-[#A7AFBA] backdrop-blur-md transition-all duration-300 hover:border-[#C8A45C] hover:text-[#F2F4F8]"
            title="Click to copy email address"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>{PERSONAL_INFO.email}</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Live Metrics Floating Bento */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
        >
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-[rgba(242,244,248,0.08)] bg-[rgba(16,19,25,0.7)] p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(200,164,92,0.35)] hover:-translate-y-1 group text-left"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#C8A45C] tracking-tight group-hover:scale-105 transition-transform inline-block">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-xs font-mono text-[#E5C37A]">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#F2F4F8] mt-1 font-semibold">
                {stat.label}
              </h2>
              <p className="text-[11px] text-[#A7AFBA] mt-0.5 font-light">
                {stat.detail}
              </p>
              <div className="absolute top-3 right-3 text-[rgba(200,164,92,0.25)] group-hover:text-[#C8A45C] transition-colors">
                {idx === 0 && <Code2 size={16} />}
                {idx === 1 && <Award size={16} />}
                {idx === 2 && <Trophy size={16} />}
                {idx === 3 && <Flame size={16} />}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-14 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={onExploreWork}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A7AFBA] group-hover:text-[#C8A45C] transition-colors">
            Scroll To Explore
          </span>
          <ChevronDown
            size={18}
            className="text-[#C8A45C] animate-bounce"
          />
        </motion.div>
      </div>
    </section>
  );
};
