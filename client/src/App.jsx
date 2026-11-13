import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Copy,
  Check,
  FileText,
  Code2,
  Sparkles,
  Zap,
  Globe,
  Menu,
  X,
  ArrowUp,
  Layers
} from 'lucide-react';
import CertificationsSection from './components/CertificationsSection';
import TechStackSection from './components/TechStackSection';
import BadgesShowcaseSection from './components/BadgesShowcaseSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import AnimatedHeading from './components/ui/AnimatedHeading';
import './App.css';

// Production-safe image asset imports
import heroBgImg from './assets/hero-bg.jpg';
import editYuvImg from './assets/edityuv.jpg';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToSectionMobile = (ref) => {
    setMobileMenuOpen(false);
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth' }), 300);
  };
  const heroRef = useRef(null);
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const techStackRef = useRef(null);
  const certificationsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  const glitterRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('yuvraj.singh.95928@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Preloader logic — cinematic quote displayed for 4.8s with smooth exit transition
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Lock scroll during loading

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Smooth entrance with subtle blur dissolve
      tl.fromTo(
        '.preloader-badge',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      )
      .fromTo(
        '.preloader-quote',
        { opacity: 0, y: 24, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        '.preloader-author',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.preloader-progress',
        { scaleX: 0 },
        { scaleX: 1, duration: 2.8, ease: 'power1.inOut' },
        '-=0.6'
      )
      // Gentle text outro dissolve before curtain slides away
      .to(['.preloader-badge', '.preloader-quote', '.preloader-author', '.preloader-progress-track'], {
        opacity: 0,
        y: -16,
        filter: 'blur(8px)',
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.3
      });
    });

    // Stays visible for ~4.8 seconds then triggers the smooth curtain transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.style.overflow = ''; // Unlock scroll
    }, 4800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  // Glitter effect
  useEffect(() => {
    if (!glitterRef.current) return;

    const container = glitterRef.current;
    const particles = [];

    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      particle.className = 'glitter-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.4 + 0.15}`;
      particle.style.transform = `scale(${Math.random() * 0.6 + 0.4})`;
      container.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        y: `-=${Math.random() * 120 + 60}`,
        x: `+=${(Math.random() - 0.5) * 40}`,
        opacity: 0,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        ease: 'sine.inOut',
        delay: Math.random() * 4
      });
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  // Hero animations
  useEffect(() => {
    if (!isLoaded) return; // Wait until preloader finishes

    const ctx = gsap.context(() => {
      // Hero entrance animation – cinematic & smooth
      const heroTl = gsap.timeline({ delay: 0.1 }); // Reduced delay since preloader slide takes time

      heroTl.fromTo('.hero-bg',
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power2.out' }
      );

      heroTl.fromTo('.hero-word',
        { y: '125%', opacity: 0, rotateZ: 2 },
        { y: '0%', opacity: 1, rotateZ: 0, duration: 1.25, stagger: 0.38, ease: 'power3.out' },
        '-=0.8'
      );

      heroTl.fromTo('.hero-description',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        '-=0.5'
      );

      heroTl.fromTo('.hero-card',
        { x: 120, opacity: 0, rotate: 3 },
        { x: 0, opacity: 1, rotate: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.7'
      );

      heroTl.fromTo('.hero-cta',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        '-=0.5'
      );

      heroTl.fromTo('.hero-microcopy',
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: 'power1.out' },
        '-=0.3'
      );

      heroTl.fromTo('.scroll-cue',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power1.out' },
        '-=0.2'
      );

      // Hero scroll animation
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.hero-headline', {
              x: -18 * exitProgress + 'vw',
              opacity: 1 - exitProgress * 0.75
            });
            gsap.set('.hero-card', {
              x: 10 * exitProgress + 'vw',
              y: -6 * exitProgress + 'vh',
              opacity: 1 - exitProgress * 0.75
            });
            gsap.set('.hero-cta', {
              y: 10 * exitProgress + 'vh',
              opacity: 1 - exitProgress * 0.8
            });
            gsap.set('.hero-bg', {
              scale: 1 + 0.06 * exitProgress,
              y: -6 * exitProgress + 'vh'
            });
          }
        },
        onLeaveBack: () => {
          gsap.set('.hero-headline', { x: 0, opacity: 1 });
          gsap.set('.hero-card', { x: 0, y: 0, opacity: 1 });
          gsap.set('.hero-cta', { y: 0, opacity: 1 });
          gsap.set('.hero-bg', { scale: 1, y: 0 });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // About section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-image',
        { x: -60, opacity: 0, scale: 0.95 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.8
          }
        }
      );

      gsap.fromTo('.about-body',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 0.8
          }
        }
      );

      gsap.fromTo('.quote-mark-anim',
        { y: -20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 60%',
            end: 'top 40%',
            scrub: 0.6
          }
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  // Tech Stack, Badges & Contact sections handle their own entrance & interactive animations cleanly

  return (
    <>
      {/* Cinematic Quote Preloader Screen */}
      <div
        className={`fixed inset-0 z-[9999] bg-[#0B0C0F] flex flex-col items-center justify-center px-6 transition-all duration-1200 ease-smooth-out select-none ${
          isLoaded ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        {/* Subtle Ambient Radial Gold Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[560px] h-[280px] rounded-full bg-[#C8A45C]/10 blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Subtle Eyebrow Badge */}
          <div className="preloader-badge inline-flex items-center gap-2 mb-6 sm:mb-8 px-3.5 py-1 rounded-full border border-[rgba(200,164,92,0.25)] bg-[rgba(200,164,92,0.06)] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45C] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#C8A45C] uppercase">
              Developer Manifesto
            </span>
          </div>

          {/* Main Requested Quote */}
          <blockquote className="preloader-quote text-[clamp(22px,3.4vw,40px)] font-medium leading-[1.3] tracking-[-0.01em] text-[#F2F4F8] max-w-3xl">
            <span className="text-[#C8A45C] font-serif text-[1.25em] mr-1.5">“</span>
            A developer who knows how to build, not just those who know how to code
            <span className="text-[#C8A45C] font-serif text-[1.25em] ml-1.5">”</span>
          </blockquote>

          {/* Author Attribution */}
          <p className="preloader-author font-mono text-xs sm:text-sm md:text-base text-[#A7AFBA] mt-6 sm:mt-7 tracking-[0.16em] uppercase flex items-center justify-center gap-3">
            <span className="w-8 sm:w-12 h-[1px] bg-[#C8A45C]/50" />
            <span className="text-[#E5C37A] font-semibold">S. Yuvraj Singh</span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#C8A45C]/50" />
          </p>

          {/* Minimal Elegant Timer / Progress Bar */}
          <div className="preloader-progress-track w-40 sm:w-52 h-[2px] bg-[rgba(242,244,248,0.08)] rounded-full mt-8 sm:mt-10 overflow-hidden">
            <div className="preloader-progress w-full h-full bg-gradient-to-r from-[#C8A45C]/40 via-[#E5C37A] to-[#C8A45C]/40 origin-left" />
          </div>
        </div>

        {/* Skip button for quick testing */}
        <button
          type="button"
          onClick={() => setIsLoaded(true)}
          className="absolute bottom-6 right-6 font-mono text-[11px] tracking-[0.15em] uppercase text-[#A7AFBA]/60 hover:text-[#C8A45C] transition-colors duration-300"
        >
          Skip &rarr;
        </button>
      </div>

      {/* Main Content wrapper */}
      <div className={`relative transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Grain overlay */}
        <div className="grain-overlay" />

        {/* Glitter particles */}
        <div ref={glitterRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden" />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-[6vw] py-6 flex justify-between items-center bg-gradient-to-b from-[#0B0C0F] to-transparent">
          <div className="font-mono text-xs tracking-[0.18em] text-[#F2F4F8]">
            S.YUVRAJ SINGH
          </div>
          <div className="hidden md:flex gap-8">
            {[
              { label: 'Work', ref: workRef },
              { label: 'About', ref: aboutRef },
              { label: 'Certifications', ref: certificationsRef },
              { label: 'Contact', ref: contactRef }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.ref)}
                className="font-mono text-xs tracking-[0.18em] text-[#A7AFBA] hover:text-[#C8A45C] transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://drive.google.com/file/d/1uYP4oG0wECtcAfMej1FFGQHrTrqD1PkY/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-[0.18em] text-[#A7AFBA] hover:text-[#C8A45C] transition-colors duration-300"
            >
              RESUME
            </a>
          </div>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F2F4F8] hover:text-[#C8A45C] transition-colors z-[60]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-[55] bg-[#0B0C0F]/98 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}>
          {[
            { label: 'Work', ref: workRef },
            { label: 'About', ref: aboutRef },
            { label: 'Certifications', ref: certificationsRef },
            { label: 'Contact', ref: contactRef }
          ].map((item, i) => (
            <button
              key={item.label}
              onClick={() => scrollToSectionMobile(item.ref)}
              className="font-mono text-lg tracking-[0.18em] text-[#A7AFBA] hover:text-[#C8A45C] transition-all duration-300"
              style={{ transitionDelay: mobileMenuOpen ? `${i * 80}ms` : '0ms', transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: mobileMenuOpen ? 1 : 0 }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://drive.google.com/file/d/1uYP4oG0wECtcAfMej1FFGQHrTrqD1PkY/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-lg tracking-[0.18em] text-[#C8A45C] hover:text-[#D4B76A] transition-all duration-300"
            style={{ transitionDelay: mobileMenuOpen ? '320ms' : '0ms', transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: mobileMenuOpen ? 1 : 0 }}
          >
            RESUME
          </a>
        </div>

        {/* Section 1: Hero */}
        <section ref={heroRef} className="relative w-full h-screen overflow-hidden z-10">
          <div className="absolute inset-0 hero-bg">
            <div className="absolute inset-0 image-gold-tint">
              <img
                src={heroBgImg}
                alt="Hero background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F] via-[#0B0C0F]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-transparent to-[#0B0C0F]/50" />
          </div>

          <div className="section-inner flex flex-col justify-center">
            {/* Headline */}
            <div className="hero-headline relative z-20 max-w-[62vw] mt-[8vh]">
              <h1 className="text-[clamp(36px,5.2vw,78px)] font-bold uppercase tracking-[0.08em] leading-[0.95] text-[#F2F4F8]">
                <span className="block overflow-hidden py-0.5">
                  <span className="hero-word block">Creative</span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span className="hero-word block text-gradient">Developer</span>
                </span>
              </h1>
              <p className="hero-description text-[#A7AFBA] text-sm md:text-base mt-4 max-w-md leading-relaxed font-light">
                From pixels to production, I build seamless digital experiences that blend creativity and clean code.
              </p>
            </div>

            {/* CTA Row */}
            <div className="hero-cta flex flex-wrap gap-4 mt-8 relative z-20">
              <button
                onClick={() => scrollToSection(workRef)}
                className="btn-primary flex items-center gap-2"
              >
                <Sparkles size={16} />
                Explore Work
              </button>
              <a
                href="https://drive.google.com/file/d/1uYP4oG0wECtcAfMej1FFGQHrTrqD1PkY/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <FileText size={16} />
                View Resume
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=yuvraj.singh.95928@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <Mail size={16} />
                Email Me
              </a>
            </div>

            {/* Right Card */}
            <div className="hero-card absolute right-[6vw] top-[18vh] w-[90vw] md:w-[26vw] card-glass rounded-xl p-6 z-20">
              <p className="text-[#A7AFBA] text-sm leading-relaxed">
                I craft websites, interactions, and systems—clean, fast, and memorable.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-[#A7AFBA]">Available for work</span>
              </div>
            </div>

            {/* Bottom Microcopy */}
            <div className="hero-microcopy absolute left-[6vw] bottom-[8vh] max-w-[34vw] z-20 hidden md:block">
              <p className="text-xs font-mono text-[#A7AFBA] leading-relaxed">
                Available for freelance & collaborations. Based in India, working worldwide.
              </p>
            </div>

            {/* Scroll Cue */}
            <div className="scroll-cue absolute right-[6vw] bottom-[8vh] flex flex-col items-center gap-2 z-20">
              <span className="text-xs font-mono text-[#A7AFBA]">Scroll</span>
              <ChevronDown size={20} className="text-[#C8A45C] scroll-indicator" />
            </div>
          </div>
        </section>

        {/* Section 2: Selected Work (Alternating Layout & Animated Scroll Timeline) */}
        <ProjectsSection sectionRef={workRef} />

        {/* Section 3: About */}
        <section ref={aboutRef} className="relative w-full min-h-screen py-24 z-30 bg-[#0B0C0F]">
          <div className="px-[6vw]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="about-image relative w-full max-w-[500px] lg:max-w-[530px] mx-auto lg:mx-0">
                {/* Subtle Ambient Gold Glow Behind Photo */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#C8A45C]/20 via-transparent to-[#38BDF8]/10 blur-xl opacity-75" />

                <div className="relative rounded-3xl p-2.5 border border-[rgba(200,164,92,0.28)] bg-[rgba(16,19,26,0.6)] backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
                  <div className="image-gold-tint rounded-2xl overflow-hidden w-full h-[470px] sm:h-[540px] lg:h-[600px]">
                    <img
                      src={editYuvImg}
                      alt="About portrait"
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>
              </div>

              <div className="about-content">
                <AnimatedHeading
                  eyebrow="About"
                  title="I build with *intention.*"
                  className="mb-4"
                />

                <div className="about-body">
                  <div className="quote-mark-anim quote-mark mt-4">"</div>

                  <div className="space-y-4 mt-4">
                    <p className="text-[#A7AFBA] leading-relaxed">
                      I'm Yuvraj Singh — a full-stack developer who enjoys turning ideas into
                      practical, intelligent digital experiences.
                    </p>

                    <p className="text-[#A7AFBA] leading-relaxed">
                      I work across modern web technologies, building clean interfaces,
                      scalable applications, and AI-powered solutions that solve real problems.
                    </p>

                    <p className="text-[#A7AFBA] leading-relaxed">
                      When I'm not building, I'm sharpening my skills in DSA, exploring new
                      technologies, and constantly finding better ways to build for the web.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <div className="flex-1 min-w-[200px] p-4 bg-[rgba(200,164,92,0.08)] rounded-lg border border-[rgba(200,164,92,0.2)]">
                      <div className="flex items-center gap-3">
                        <Code2 size={20} className="text-[#C8A45C]" />
                        <div>
                          <p className="text-sm text-[#F2F4F8]">B.Tech 4th Year</p>
                          <p className="text-xs text-[#A7AFBA]">RIMT University | Panjab </p>
                        </div>
                      </div>
                    </div>
                    <a
                      href="https://drive.google.com/file/d/1uYP4oG0wECtcAfMej1FFGQHrTrqD1PkY/view?usp=drivesdk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-[rgba(200,164,92,0.15)] hover:bg-[rgba(200,164,92,0.25)] transition-colors rounded-lg border border-[#C8A45C]"
                    >
                      <FileText size={20} className="text-[#C8A45C]" />
                      <span className="text-sm font-bold text-[#F2F4F8]">Download Resume</span>
                    </a>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/singh-yuvraj2131/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 link-gold text-sm"
                  >
                    Read more on LinkedIn
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3.5: Tech Stack */}
        <TechStackSection sectionRef={techStackRef} />

        {/* Section 4: Certifications & Competitions */}
        <CertificationsSection sectionRef={certificationsRef} />



        {/* Section 6: Badges & Milestones Accordion Showcase */}
        <BadgesShowcaseSection sectionRef={testimonialsRef} />

        {/* Section 7: Animated Contact Hub & Footer */}
        <ContactSection sectionRef={contactRef} />
      </div>
    </>
  );
}

export default App;
