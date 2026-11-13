import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Layers,
  User,
  Award,
  FileCheck2,
  Send,
  FileText,
  Menu,
  X
} from 'lucide-react';

/**
 * LiquidGlassNavbar
 * Inspired by Guglielmo Giannattasio's Liquid Glass Navbar.
 * Features a floating translucent liquid-glass capsule, an iridescent
 * pearlescent active pill, jelly squash-and-stretch transitions,
 * and falling water/jelly droplet physics.
 */
export const LiquidGlassNavbar = ({
  heroRef,
  workRef,
  aboutRef,
  experienceRef,
  certificationsRef,
  contactRef
}) => {
  const [activeTab, setActiveTab] = useState('home');
  const [droplets, setDroplets] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isUserClicking = useRef(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, ref: heroRef },
    { id: 'work', label: 'Work', icon: Layers, ref: workRef },
    { id: 'about', label: 'About', icon: User, ref: aboutRef },
    { id: 'experience', label: 'Experience', icon: Award, ref: experienceRef },
    { id: 'certifications', label: 'Certs', icon: FileCheck2, ref: certificationsRef },
    { id: 'contact', label: 'Contact', icon: Send, ref: contactRef },
    {
      id: 'resume',
      label: 'Resume',
      icon: FileText,
      isExternal: true,
      href: 'https://drive.google.com/file/d/1uYP4oG0wECtcAfMej1FFGQHrTrqD1PkY/view?usp=drivesdk'
    }
  ];

  // Spawn a falling jelly water droplet from the active tab position
  const triggerWaterDroplet = (element) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const navBarRect = element.closest('.liquid-glass-dock')?.getBoundingClientRect();
    if (!navBarRect) return;

    const x = rect.left - navBarRect.left + rect.width / 2;
    const newDroplet = {
      id: Date.now() + Math.random(),
      x
    };

    setDroplets((prev) => [...prev.slice(-3), newDroplet]);

    // Clean up after droplet finishes falling
    setTimeout(() => {
      setDroplets((prev) => prev.filter((d) => d.id !== newDroplet.id));
    }, 950);
  };

  const handleNavClick = (item, e) => {
    if (item.isExternal) return;

    e.preventDefault();
    isUserClicking.current = true;
    setActiveTab(item.id);
    setMobileMenuOpen(false);

    // Trigger the falling jelly water droplet from the clicked element
    triggerWaterDroplet(e.currentTarget);

    item.ref?.current?.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      isUserClicking.current = false;
    }, 800);
  };

  // Scrollspy to auto-track the section in view
  useEffect(() => {
    const handleScroll = () => {
      if (isUserClicking.current) return;

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      const sections = [
        { id: 'contact', ref: contactRef },
        { id: 'certifications', ref: certificationsRef },
        { id: 'experience', ref: experienceRef },
        { id: 'about', ref: aboutRef },
        { id: 'work', ref: workRef },
        { id: 'home', ref: heroRef }
      ];

      for (const section of sections) {
        const el = section.ref?.current;
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroRef, workRef, aboutRef, experienceRef, certificationsRef, contactRef]);

  // Ambient periodic pearl droplet (falls gently every ~6s from active tab)
  useEffect(() => {
    const interval = setInterval(() => {
      const activeEl = document.querySelector(`[data-nav-id="${activeTab}"]`);
      if (activeEl && document.visibilityState === 'visible') {
        triggerWaterDroplet(activeEl);
      }
    }, 6500);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <>
      {/* SVG Liquid Goo Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="liquid-goo-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Floating Centered Liquid Glass Navbar Dock */}
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center items-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass-dock pointer-events-auto relative rounded-full px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-[rgba(255,255,255,0.14)] bg-[rgba(14,18,26,0.76)] backdrop-blur-2xl transition-all duration-300"
        >
          {/* Subtle Iridescent Top Rim Reflection */}
          <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.4)] to-transparent pointer-events-none" />

          {/* Nav Items List */}
          <div className="flex items-center gap-1 sm:gap-1.5 relative z-10">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              if (item.isExternal) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs text-[#A7AFBA] hover:text-[#C8A45C] transition-colors duration-300 flex items-center gap-1.5 group select-none"
                    title="View Resume"
                  >
                    <Icon size={14} className="transition-transform group-hover:scale-110 text-[#C8A45C]" />
                    <span className="hidden md:inline font-semibold">Resume</span>
                  </a>
                );
              }

              return (
                <button
                  key={item.id}
                  data-nav-id={item.id}
                  type="button"
                  onClick={(e) => handleNavClick(item, e)}
                  className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs transition-colors duration-300 flex items-center gap-1.5 select-none ${
                    isActive ? 'text-[#F2F4F8] font-bold' : 'text-[#A7AFBA] hover:text-[#F2F4F8]'
                  }`}
                >
                  {/* Iridescent Jelly / Liquid Active Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="liquid-pill"
                      className="liquid-active-pill absolute inset-0 rounded-full z-[-1]"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 26,
                        mass: 0.8
                      }}
                    >
                      {/* Iridescent Liquid Edge Highlights */}
                      <span className="absolute inset-0 rounded-full border border-[rgba(255,255,255,0.35)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_0_16px_rgba(56,189,248,0.3)]" />
                      <span className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-[#A855F7]/25 via-[#38BDF8]/30 to-[#E5C37A]/25 blur-[1px] -z-10" />
                    </motion.div>
                  )}

                  <Icon
                    size={14}
                    className={`transition-all duration-300 ${
                      isActive ? 'text-[#38BDF8] scale-110 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]' : 'text-[#A7AFBA]'
                    }`}
                  />
                  <span className={`${isActive ? 'inline' : 'hidden sm:inline'} tracking-wider`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Falling Water & Jelly Droplets Overlay */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-visible">
            {droplets.map((drop) => (
              <div
                key={drop.id}
                className="absolute"
                style={{ left: `${drop.x}px`, bottom: '-4px' }}
              >
                {/* Falling Jelly Teardrop */}
                <div className="liquid-droplet-falling" />
                {/* Expanding Liquid Ripple Ring */}
                <div className="liquid-ripple-ring" />
              </div>
            ))}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="md:hidden pl-1">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F2F4F8] hover:text-[#C8A45C] transition-colors"
              aria-label="Toggle full menu"
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 p-5 rounded-3xl bg-[rgba(14,18,26,0.95)] border border-[rgba(255,255,255,0.12)] backdrop-blur-2xl shadow-2xl flex flex-col gap-2 md:hidden"
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8A45C] px-3 pb-2 border-b border-white/5 flex items-center justify-between">
              <span>Navigation</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              if (item.isExternal) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-sm text-[#C8A45C] bg-[#C8A45C]/10 border border-[#C8A45C]/20 font-semibold"
                  >
                    <Icon size={16} />
                    <span>View Resume &rarr;</span>
                  </a>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={(e) => handleNavClick(item, e)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-sm transition-all text-left ${
                    isActive
                      ? 'bg-white/10 text-[#F2F4F8] font-bold border border-white/15'
                      : 'text-[#A7AFBA] hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#38BDF8]' : 'text-[#A7AFBA]'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiquidGlassNavbar;
