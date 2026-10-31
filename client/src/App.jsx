import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import { FloatingNavbar } from './components/ui/FloatingNavbar';
import { InteractiveCanvas } from './components/ui/InteractiveCanvas';
import { CustomCursor } from './components/ui/CustomCursor';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
import { CertificationsSection } from './components/CertificationsSection';
import { TestimonialSection } from './components/TestimonialSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Styles
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Track active section via IntersectionObserver
    const sectionIds = ['hero', 'projects', 'about', 'stack', 'certifications', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Preloader finish
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 900);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      observers.forEach((obs) => obs.disconnect());
      clearTimeout(timer);
    };
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sleek Minimal Preloader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99999] bg-[#07080A] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C8A45C] to-[#E5C37A] flex items-center justify-center font-bold text-[#0B0C0F] text-sm shadow-[0_0_20px_rgba(200,164,92,0.4)] animate-pulse">
                YS
              </div>
              <h1 className="font-mono text-xs tracking-[0.25em] text-[#F2F4F8] uppercase">
                S. Yuvraj Singh · Portfolio
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-[#08090C] text-[#F2F4F8] selection:bg-[#C8A45C]/30 selection:text-white">
        {/* Grain overlay for cinematic texture */}
        <div className="grain-overlay" />

        {/* Dynamic interactive particle canvas constellation */}
        <InteractiveCanvas />

        {/* Sleek Magnetic Cursor */}
        <CustomCursor />

        {/* Floating Island Navigation */}
        <FloatingNavbar
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        {/* Main Sections */}
        <main>
          <div id="hero">
            <HeroSection
              onExploreWork={() => handleNavigate('projects')}
              onContactClick={() => handleNavigate('contact')}
            />
          </div>

          <ProjectsSection />

          <AboutSection />

          <TechStackSection />

          <CertificationsSection />

          <TestimonialSection />

          <ContactSection />
        </main>

        {/* Modern Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </>
  );
}

export default App;
