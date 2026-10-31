import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  GraduationCap,
  FileText,
  Linkedin,
  ExternalLink,
  MapPin,
  Sparkles,
  HeartHandshake,
  Compass,
  Cpu
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection = () => {
  return (
    <section id="about" className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08090C] overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C8A45C]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8A45C] uppercase mb-3">
            <Sparkles size={14} />
            <span>Behind The Code</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#F2F4F8]">
            I Build With Intention.
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Portrait & Persona Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative overflow-hidden rounded-3xl border border-[rgba(242,244,248,0.1)] bg-[rgba(16,19,26,0.7)] p-6 backdrop-blur-xl flex flex-col justify-between group shadow-xl"
          >
            {/* Ambient Gold Halo */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[rgba(200,164,92,0.2)] bg-black/40 shadow-inner">
              <img
                src={PERSONAL_INFO.assets.avatar}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-95 transition-all duration-700 group-hover:scale-105 group-hover:filter-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F15] via-transparent to-transparent opacity-75" />

              {/* Float Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <p className="text-xs font-mono font-semibold text-[#F2F4F8]">
                      {PERSONAL_INFO.name}
                    </p>
                    <p className="text-[10px] font-mono text-[#A7AFBA]">
                      B.Tech Final Year · 2025
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#C8A45C]">
                  <MapPin size={12} />
                  <span>India</span>
                </div>
              </div>
            </div>

            {/* Quick Persona Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-[#A7AFBA] uppercase block">University</span>
                <span className="text-xs font-semibold text-[#F2F4F8] mt-0.5 block truncate">
                  RIMT University
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-[#A7AFBA] uppercase block">Focus</span>
                <span className="text-xs font-semibold text-[#C8A45C] mt-0.5 block truncate">
                  Full-Stack & GenAI
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Story & Credentials Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-between gap-6"
          >
            {/* Story Card */}
            <div className="relative overflow-hidden rounded-3xl border border-[rgba(242,244,248,0.1)] bg-[rgba(16,19,26,0.7)] p-6 sm:p-8 backdrop-blur-xl shadow-xl flex-grow">
              <div className="quote-mark mb-2 font-serif text-3xl text-[#C8A45C]">"</div>
              <blockquote className="text-lg sm:text-xl font-medium text-[#F2F4F8] leading-relaxed">
                Where others see complexity, I see something waiting to be engineered.
              </blockquote>

              <div className="space-y-4 mt-6 text-sm text-[#A7AFBA] leading-relaxed">
                <p>
                  I'm Yuvraj Singh — a developer who bridges user experience and backend engineering.
                  My journey spans building scalable React web applications, designing RESTful APIs in Node & Python, and training custom AI solutions.
                </p>
                <p>
                  I thrive in fast-paced sprints, hackathons, and iterative problem solving.
                  Ranked #1 in my campus on GeeksforGeeks with a 160+ day continuous streak, I treat algorithmic thinking as the foundation for clean architecture.
                </p>
              </div>

              {/* Highlights Pill Row */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  'Clean Code Architecture',
                  'Algorithmic Optimization',
                  'SIH 2024 National Finalist',
                  'AI & LLM Integration',
                  'High-Performance UI'
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#E5C37A] bg-[#C8A45C]/10 border border-[#C8A45C]/25"
                  >
                    <Sparkles size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Dual Sub-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Education Banner */}
              <div className="rounded-2xl border border-[rgba(242,244,248,0.08)] bg-[rgba(16,19,26,0.7)] p-5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C8A45C]/15 text-[#C8A45C] border border-[#C8A45C]/30">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#F2F4F8]">
                      B.Tech in CSE
                    </h3>
                    <p className="text-xs text-[#A7AFBA] font-mono mt-0.5">
                      RIMT University, Punjab
                    </p>
                  </div>
                </div>
              </div>

              {/* Resume & LinkedIn Link */}
              <div className="flex gap-2">
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-2xl border border-[#C8A45C]/40 bg-[#C8A45C]/15 hover:bg-[#C8A45C] text-[#E5C37A] hover:text-[#0B0C0F] p-4 transition-all duration-300 flex items-center justify-center gap-2 text-xs font-mono font-bold"
                >
                  <FileText size={17} />
                  <span>Download CV</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="rounded-2xl border border-white/10 bg-white/5 hover:border-[#C8A45C] hover:text-[#C8A45C] p-4 transition-colors flex items-center justify-center text-[#A7AFBA]"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
