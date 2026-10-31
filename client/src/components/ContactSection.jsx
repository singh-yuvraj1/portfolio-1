import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Sparkles,
  Copy,
  Check,
  ArrowUpRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactForm } from './ContactForm';

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08090C] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C8A45C]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8A45C] uppercase mb-3">
                <Sparkles size={14} />
                <span>Initiate Contact</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#F2F4F8]">
                Let's Build Something Great.
              </h2>

              <p className="text-sm sm:text-base text-[#A7AFBA] mt-4 max-w-md font-light leading-relaxed">
                Have a project in mind, an engineering role opening, or want to discuss full-stack & AI architecture? My inbox is always open.
              </p>
            </div>

            {/* Quick Contact Info Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-[rgba(242,244,248,0.08)] bg-[rgba(16,19,26,0.7)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C8A45C]/10 text-[#C8A45C] border border-[#C8A45C]/20">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A7AFBA] uppercase block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-mono text-[#F2F4F8] hover:text-[#C8A45C] transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-white/5 hover:bg-[#C8A45C]/20 text-[#A7AFBA] hover:text-[#C8A45C] transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {/* Location & Status Card */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl border border-[rgba(242,244,248,0.08)] bg-[rgba(16,19,26,0.7)] backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-[#C8A45C] mb-1">
                    <MapPin size={14} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">
                      Location
                    </span>
                  </div>
                  <p className="text-xs text-[#F2F4F8] font-medium">
                    Punjab, India
                  </p>
                  <p className="text-[10px] text-[#A7AFBA] font-mono mt-0.5">
                    Available Worldwide
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[rgba(242,244,248,0.08)] bg-[rgba(16,19,26,0.7)] backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-[#C8A45C] mb-1">
                    <Clock size={14} />
                    <span className="text-[10px] font-mono uppercase tracking-wider">
                      Response Time
                    </span>
                  </div>
                  <p className="text-xs text-[#F2F4F8] font-medium">
                    &lt; 24-48 Hours
                  </p>
                  <p className="text-[10px] text-[#A7AFBA] font-mono mt-0.5">
                    Reliable Follow-up
                  </p>
                </div>
              </div>
            </div>

            {/* Social Network Channels */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#A7AFBA] block mb-3">
                Connect on Social Channels
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-mono text-[#F2F4F8] hover:border-[#C8A45C] hover:text-[#C8A45C] transition-all"
                >
                  <Github size={15} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-mono text-[#F2F4F8] hover:border-[#C8A45C] hover:text-[#C8A45C] transition-all"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
