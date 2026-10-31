import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Quote, Award } from 'lucide-react';
import { TESTIMONIAL, PERSONAL_INFO } from '../data/portfolioData';

export const TestimonialSection = () => {
  return (
    <section className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#0B0C0F] overflow-hidden">
      {/* Background radial ambient illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#C8A45C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-[rgba(200,164,92,0.3)] bg-gradient-to-br from-[rgba(20,24,32,0.85)] via-[rgba(16,19,25,0.85)] to-[rgba(12,14,19,0.9)] p-8 sm:p-12 backdrop-blur-2xl shadow-2xl shadow-black/80"
        >
          {/* Subtle Ambient Border Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C8A45C]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A45C]/15 border border-[#C8A45C]/30 text-[#E5C37A] text-xs font-mono mb-6">
                  <Sparkles size={13} />
                  <span>Peer Endorsement</span>
                </div>

                <div className="quote-mark text-4xl text-[#C8A45C] font-serif mb-2">"</div>

                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#F2F4F8] leading-snug tracking-tight">
                  {TESTIMONIAL.quote}
                </blockquote>

                <div className="w-12 h-1 bg-gradient-to-r from-[#C8A45C] to-transparent mt-6 rounded-full" />

                <div className="mt-4">
                  <p className="text-sm font-semibold text-[#F2F4F8]">
                    {TESTIMONIAL.author}
                  </p>
                  <p className="text-xs font-mono text-[#C8A45C] mt-0.5">
                    {TESTIMONIAL.badge}
                  </p>
                </div>
              </div>

              {/* Key Traits List */}
              <div className="flex flex-wrap gap-2 mt-8">
                {TESTIMONIAL.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-[#D1D5DB] bg-white/5 border border-white/5"
                  >
                    <Star size={11} className="text-[#C8A45C] fill-[#C8A45C]" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[rgba(200,164,92,0.2)] aspect-[4/3] w-full bg-black/60 shadow-xl group">
                <img
                  src={PERSONAL_INFO.assets.testimonial}
                  alt="Testimonial Showcase"
                  className="w-full h-full object-cover filter contrast-110 grayscale group-hover:filter-none transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E14] via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-2">
                  <Award size={16} className="text-[#C8A45C] shrink-0" />
                  <span className="text-[11px] font-mono text-[#F2F4F8] truncate">
                    Recognized in hackathons & collegiate leagues
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
