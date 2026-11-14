import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  MapPin,
  Clock,
  Sparkles,
  Github,
  Linkedin,
  ArrowUpRight,
  ArrowUp,
  MessageSquareCode
} from 'lucide-react';
import ContactForm from './ContactForm';
import AnimatedHeading from './ui/AnimatedHeading';

export const ContactSection = ({ sectionRef }) => {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live ticking IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yuvraj.singh.95928@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen pt-28 pb-16 px-[4vw] md:px-[6vw] z-[70] bg-[#0A0D12] overflow-hidden flex flex-col justify-between"
    >
      {/* Cool Animated Aurora Glow Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        {/* Animated Gold Orb */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-32 -left-32 w-[580px] h-[580px] rounded-full bg-[#C8A45C]/14 blur-[140px]"
        />

        {/* Animated Cyber Blue Orb */}
        <motion.div
          animate={{
            scale: [1.1, 0.9, 1.1],
            x: [0, -50, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-1/3 -right-24 w-[520px] h-[520px] rounded-full bg-[#C8A45C]/10 blur-[150px]"
        />

        {/* Deep Violet Center Ambient Halo */}
        <motion.div
          animate={{
            opacity: [0.15, 0.28, 0.15]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-10 left-1/3 w-[640px] h-[400px] rounded-full bg-[#8B5CF6]/10 blur-[160px]"
        />

        {/* Subtle Cyber Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(200,164,92,0.22) 1px, transparent 0)',
            backgroundSize: '28px 28px',
            maskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />

        {/* Elegant Top & Bottom Fade */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#0B0C0F] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#080A0E] to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Kinetic Info & Direct Connect Hub */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[rgba(34,197,94,0.35)] bg-[rgba(34,197,94,0.08)] backdrop-blur-md mb-6 w-fit shadow-[0_0_20px_rgba(34,197,94,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs text-emerald-300 font-medium tracking-wide">
                Available for Freelance &amp; New Opportunities
              </span>
            </div>

            {/* Kinetic Heading */}
            <AnimatedHeading
              eyebrow={
                <>
                  <MessageSquareCode size={14} className="text-[#C8A45C]" />
                  Get In Touch
                </>
              }
              title="Let's build something *great.*"
              subtitle="Have a vision, an ambitious project, or an engineering role? Drop me a line or send a quick note—I'll respond within 24 hours."
              className="mb-8 max-w-lg"
            />

            {/* Quick Contact Cards */}
            <div className="space-y-3.5 mb-8 max-w-lg">
              {/* Email Quick Card with Copy Action */}
              <div className="group flex items-center justify-between gap-4 p-4 rounded-2xl border border-[rgba(242,244,248,0.09)] bg-[rgba(16,19,26,0.6)] backdrop-blur-md transition-all duration-300 hover:border-[rgba(200,164,92,0.4)] hover:bg-[rgba(200,164,92,0.06)]">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#C8A45C]/15 border border-[#C8A45C]/30 flex items-center justify-center text-[#E5C37A] shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#A7AFBA] block">
                      Direct Email
                    </span>
                    <a
                      href="mailto:yuvraj.singh.95928@gmail.com"
                      className="font-mono text-xs sm:text-sm text-[#F2F4F8] hover:text-[#C8A45C] transition-colors truncate block"
                    >
                      yuvraj.singh.95928@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[rgba(242,244,248,0.12)] bg-[#0B0C0F]/80 text-[#A7AFBA] hover:text-[#C8A45C] hover:border-[#C8A45C] transition-all text-xs font-mono shrink-0 active:scale-95"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location & Live Clock Card */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-[rgba(242,244,248,0.09)] bg-[rgba(16,19,26,0.6)] backdrop-blur-md">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#C8A45C]/15 border border-[#C8A45C]/30 flex items-center justify-center text-[#C8A45C] shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#A7AFBA] block">
                      Location
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-[#F2F4F8] truncate block">
                      Punjab / Chandigarh, India
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[rgba(242,244,248,0.08)] bg-[#0B0C0F]/80 text-xs font-mono text-[#A7AFBA] shrink-0">
                  <Clock size={13} className="text-[#C8A45C]" />
                  <span>{currentTime || 'IST'}</span>
                </div>
              </div>
            </div>

            {/* Social Connection Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/singh-yuvraj1"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[rgba(242,244,248,0.1)] bg-[rgba(16,19,26,0.6)] font-mono text-xs text-[#F2F4F8] hover:border-[#C8A45C] hover:text-[#C8A45C] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Github size={15} />
                <span>GitHub</span>
                <ArrowUpRight size={13} className="text-[#A7AFBA] group-hover:text-[#C8A45C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/singh-yuvraj2131/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[rgba(242,244,248,0.1)] bg-[rgba(16,19,26,0.6)] font-mono text-xs text-[#F2F4F8] hover:border-[#C8A45C] hover:text-[#C8A45C] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} className="text-[#A7AFBA] group-hover:text-[#C8A45C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="mailto:yuvraj.singh.95928@gmail.com"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#C8A45C]/50 bg-[#C8A45C]/15 font-mono text-xs text-[#F2F4F8] hover:bg-[#C8A45C]/25 hover:border-[#C8A45C] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Sparkles size={14} className="text-[#C8A45C]" />
                <span className="font-semibold text-[#E5C37A]">Email Directly</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: High-End Framed Glassmorphic Form */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            {/* Glowing Backdrop Frame */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#C8A45C]/25 via-transparent to-[#E5C37A]/20 blur-xl opacity-60" />

            <div className="relative rounded-2xl md:rounded-3xl border border-[rgba(200,164,92,0.3)] bg-[rgba(14,17,23,0.85)] p-2 sm:p-3 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-20 pt-8 border-t border-[rgba(242,244,248,0.08)] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6 order-2 md:order-1">
          <p className="text-xs text-[#A7AFBA]">
            © {new Date().getFullYear()} Yuvraj Singh. Built with Passion, Clean Code &amp; Care.
          </p>
          <div className="hidden md:flex items-center gap-4 text-[#A7AFBA]">
            <a
              href="https://github.com/singh-yuvraj1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8A45C] transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/singh-yuvraj2131/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8A45C] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:yuvraj.singh.95928@gmail.com"
              className="hover:text-[#C8A45C] transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-6 order-1 md:order-2">
          <p className="text-xs text-[#A7AFBA] font-mono">
            B.Tech 4th Year [RIMT University]
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full border border-[rgba(242,244,248,0.12)] flex items-center justify-center text-[#A7AFBA] hover:text-[#C8A45C] hover:border-[#C8A45C] transition-all duration-300 hover:-translate-y-1 bg-[rgba(20,23,28,0.7)] shadow-lg shadow-black/40"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
