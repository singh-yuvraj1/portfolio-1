import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Code,
  Server,
  Terminal,
  Database,
  Cpu,
  Sparkles,
  Zap
} from 'lucide-react';
import { TECH_STACK, MARQUEE_ITEMS } from '../data/portfolioData';
import { Marquee } from './ui/Marquee';

export const TechStackSection = () => {
  return (
    <section id="stack" className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#0B0C0F]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8A45C] uppercase mb-3">
            <Zap size={14} />
            <span>Tools & Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#F2F4F8]">
            Built With Modern Tech.
          </h2>
          <p className="text-sm sm:text-base text-[#A7AFBA] mt-3 font-light">
            A battle-tested stack spanning systems programming, scalable cloud backends, reactive frontends, and generative AI.
          </p>
        </div>

        {/* Dual Infinite Velocity Marquee */}
        <div className="mb-16 space-y-4">
          <Marquee items={MARQUEE_ITEMS} direction="left" />
          <Marquee
            items={[...MARQUEE_ITEMS].reverse()}
            direction="right"
          />
        </div>

        {/* Categorized Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_STACK.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.08 }}
              className="relative overflow-hidden rounded-2xl border border-[rgba(242,244,248,0.08)] bg-[rgba(16,19,25,0.7)] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#C8A45C]/40 hover:-translate-y-1 shadow-lg group"
            >
              {/* Category Top Banner */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#E5C37A] font-semibold flex items-center gap-2">
                  <Layers size={14} className="text-[#C8A45C]" />
                  <span>{group.category}</span>
                </h3>
                <span className="text-[10px] font-mono text-[#A7AFBA] px-2 py-0.5 rounded bg-white/5">
                  {group.skills.length} Skills
                </span>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5 transition-all duration-200 hover:bg-[#C8A45C]/10 hover:border-[#C8A45C]/30"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C8A45C]" />
                      <span className="text-xs sm:text-sm font-medium text-[#F2F4F8]">
                        {skill.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#C8A45C] bg-[#C8A45C]/10 px-2 py-0.5 rounded border border-[#C8A45C]/20">
                        {skill.highlight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
