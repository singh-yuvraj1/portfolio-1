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
import ContactForm from './components/ContactForm';
import './App.css';

gsap.registerPlugin(ScrollTrigger);


// 3D Tilt Card Component for Projects
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation of 4 degrees
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <div
      ref={cardRef}
      className="project-card group card-glass rounded-xl overflow-hidden"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col lg:flex-row h-full">
        <div className="lg:w-2/5 image-gold-tint overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 lg:h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
        </div>
        <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#F2F4F8] mb-2">{project.title}</h3>
            <p className="text-[#A7AFBA] text-sm leading-relaxed mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 relative z-10">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#A7AFBA] hover:text-[#C8A45C] transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#A7AFBA] hover:text-[#C8A45C] transition-colors"
              >
                <ExternalLink size={16} />
                Live Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const processRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  const glitterRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('projects.navadeep@gmail.com');
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

  // Preloader logic
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Lock scroll during loading

    const ctx = gsap.context(() => {
      gsap.fromTo('.preloader-text',
        { opacity: 0, scale: 0.95, filter: 'blur(12px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out', delay: 0.2 }
      );
    });

    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.style.overflow = ''; // Unlock scroll
    }, 1800);

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

      heroTl.fromTo('.hero-headline span',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' },
        '-=0.8'
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

  // Work section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-title',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: workRef.current,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.7
          }
        }
      );

      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1,
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 55%',
              scrub: 0.7
            }
          }
        );
      });
    }, workRef);

    return () => ctx.revert();
  }, []);

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

      gsap.fromTo('.about-content',
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            end: 'top 30%',
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

  // Tech Stack section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tech-stack-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: techStackRef.current,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.7
          }
        }
      );

      gsap.utils.toArray('.tech-stack-group').forEach((group, i) => {
        gsap.fromTo(group,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: group,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 0.7
            }
          }
        );
      });
    }, techStackRef);

    return () => ctx.revert();
  }, []);

  // Process section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.7
          }
        }
      );

      gsap.utils.toArray('.process-card-anim').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1,
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'top 60%',
              scrub: 0.7
            }
          }
        );
      });
    }, processRef);

    return () => ctx.revert();
  }, []);



  // Testimonials section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-quote',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.8
          }
        }
      );

      gsap.fromTo('.testimonial-image',
        { x: 60, opacity: 0, scale: 0.97 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1.2,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.8
          }
        }
      );

      gsap.fromTo('.attribution-bar',
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 55%',
            end: 'top 35%',
            scrub: 0.6
          }
        }
      );
    }, testimonialsRef);

    return () => ctx.revert();
  }, []);

  // Contact section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.7
          }
        }
      );

      gsap.fromTo('.contact-right',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.7
          }
        }
      );

      gsap.fromTo('.footer-bottom',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: {
            trigger: '.footer-bottom',
            start: 'top 95%',
            end: 'top 80%',
            scrub: 0.6
          }
        }
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'HireMind-AI',
      description: 'An AI-driven platform that evaluates candidate skills, recommends learning resources, and provides personalized interview preparation',
      tags: ['AI interview' , 'ATS Checker', 'Job Portal' , 'Aptitude Training ' ],
      image: '/public/hiremind-ai.png',
      github: 'https://github.com/singh-yuvraj1/hiremind-ai-new',
      live: 'https://hiremind-ai.vercel.app'
    },
    
    {
      title: 'TaskTitan-AI',
      description: 'an AI-powered productivity platform featuring an intelligent assistant (Kai AI) for natural-language task management, personalized planning, task prioritization, deadline-rescue mode, and AI-driven productivity coaching.',
      tags: ['Flask', 'Supabase', 'Security'],
      image: '/public/task-titan.png',
      github: 'https://github.com/singh-yuvraj1/TaskTitan_AI',
      live: 'https://task-titan-ai.vercel.app'
    },
    {
      title: 'Hungry Bites ',
      description: 'Transform any valid, reachable URL into a customizable QR code in seconds. Generate, personalize, and download with ease.',
      tags: ['React', 'Geofencing', 'Live Tracking'],
      image: '/public/hungry_bites.png',
      github: 'https://github.com/deepznavzz/safewalk',
      live: 'https://safewalk-y87y.onrender.com/'
    },
    {
      title: 'Ai attendance System',
      description: 'Turn data into polished PDF reports in seconds. A powerful tool for generating professional reports from structured data.',
      tags: ['React', 'Node.js', 'PDF'],
      image: '/public/ai-attend.png',
      github: 'https://github.com/projectsnavadeep/reportgenerator.in',
      live: 'https://reportgenerator.in'
    },
    {
      title: 'Code Studio',
      description: 'Capture moments, lock them in time, share the key. An emotional platform for preserving memories digitally.',
      tags: ['Firebase', 'React', 'UX'],
      image: '/public/code_studio.png',
      github: 'https://github.com/deepznavzz/timecapsule',
      live: 'https://digital-time-capsule-ztsp.onrender.com'
    },
   {
      title: 'Qr Maker',
      description: 'Capture moments, lock them in time, share the key. An emotional platform for preserving memories digitally.',
      tags: ['Firebase', 'React', 'UX'],
      image: '/public/qr-maker.png',
      github: 'https://github.com/deepznavzz/timecapsule',
      live: 'https://digital-time-capsule-ztsp.onrender.com'
    }, {
      title: 'Suduko Lab',
      description: 'Capture moments, lock them in time, share the key. An emotional platform for preserving memories digitally.',
      tags: ['Firebase', 'React', 'UX'],
      image: '/public/s-lab.png',
      github: 'https://github.com/deepznavzz/timecapsule',
      live: 'https://digital-time-capsule-ztsp.onrender.com'
    },
  ];

  return (
    <>
      {/* Figma-style Minimal Preloader */}
      <div
        className={`fixed inset-0 z-[9999] bg-[#0B0C0F] flex flex-col items-center justify-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoaded ? '-translate-y-full' : 'translate-y-0'
          }`}
      >
        <div className="overflow-hidden">
          <h1 className="preloader-text font-serif text-[clamp(36px,10vw,40px)] tracking-[0.2em] font-light text-[#F2F4F8] uppercase">
            S.YUVRAJ SINGH
          </h1>
        </div>
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
              { label: 'Process', ref: processRef },
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
            { label: 'Process', ref: processRef },
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
            href="https://drive.google.com/file/d/1uYP4oG0wECtcAfMej1FFGQHrTrqD1PkY/view?usp=drivesdkesume.pdf"
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
                src="/images/hero-bg.jpg"
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
                <span className="block">Creative</span>
                <span className="block text-gradient">Developer</span>
              </h1>
              <p className="text-[#A7AFBA] text-sm md:text-base mt-4 max-w-md leading-relaxed font-light">
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
                href="https://mail.google.com/mail/?view=cm&fs=1&to=projects.navadeep@gmail.com"
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

        {/* Section 2: Selected Work */}
        <section ref={workRef} className="relative w-full min-h-screen py-24 z-20 bg-[#0B0C0F]">
          <div className="px-[6vw]">
            <div className="work-title mb-16">
              <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">Selected Work</span>
              <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-4">
                A few builds I'm proud of.
              </h2>
              <p className="text-[#A7AFBA] mt-4 max-w-xl">
                Products, landing pages, and tools—designed for clarity and engineered for performance.
              </p>
            </div>

            <div className="space-y-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: About */}
        <section ref={aboutRef} className="relative w-full min-h-screen py-24 z-30 bg-[#0B0C0F]">
          <div className="px-[6vw]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="about-image image-gold-tint rounded-2xl overflow-hidden aspect-square sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[2/3] w-full shadow-lg shadow-black/30">
                <img
                  src="/public/edityuv.jpg"
                  alt="About portrait"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
                />
              </div>

              <div className="about-content">
                <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">About</span>
                <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-4">
                  I build with intention.
                </h2>

                <div className="quote-mark-anim quote-mark mt-6">"</div>

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
        </section>

        {/* Section 3.5: Tech Stack */}
        <section ref={techStackRef} className="relative w-full py-24 z-[35] bg-[#0B0C0F]">
          <div className="px-[6vw]">
            <div className="tech-stack-heading mb-16">
              <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">Tech Stack</span>
              <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-4">
                Tools I work with.
              </h2>
            </div>

            <div className="space-y-10">
              {[
                {
                  category: 'Programming Languages',
                  skills: ['Python', 'JavaScript', 'Java', 'C++']
                },
                {
                  category: 'Frontend',
                  skills: ['React', 'Tailwind CSS', 'GSAP', 'HTML/CSS']
                },
                {
                  category: 'Backend',
                  skills: ['Node.js', 'Flask', 'Express', 'REST APIs']
                },
                {
                  category: 'Tools & Platforms',
                  skills: ['Git', 'Figma', 'Vite', 'Vercel', 'Render', 'GitHub Actions']
                },
                {
                  category: 'Currently Learning',
                  skills: ['Rust', 'Three.js', 'WebGL', 'PostgreSQL', 'Next.js',]
                }
              ].map((group, groupIndex) => (
                <div key={groupIndex} className="tech-stack-group">
                  <h3 className="font-mono text-xs tracking-[0.18em] text-[#A7AFBA] uppercase mb-4 flex items-center gap-2">
                    <Layers size={14} className="text-[#C8A45C]" />
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="skill-chip px-4 py-2 text-sm font-mono text-[#F2F4F8] rounded-full border border-[rgba(242,244,248,0.12)] bg-[rgba(20,23,28,0.6)] hover:border-[#C8A45C] hover:text-[#C8A45C] hover:bg-[rgba(200,164,92,0.08)] transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={processRef} className="relative w-full min-h-screen py-24 z-40 bg-[#0B0C0F]">
          <div className="px-[6vw]">
            <div className="process-heading mb-16">
              <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">Process</span>
              <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-4">
                How I turn ideas into shipped work.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  number: '01',
                  title: 'Discover',
                  description: 'Define the problem, the user, and the constraints. No guessing.',
                  icon: <Globe size={24} />
                },
                {
                  number: '02',
                  title: 'Design',
                  description: 'Wireframes to high-fidelity. Fast iteration, clear feedback loops.',
                  icon: <Zap size={24} />
                },
                {
                  number: '03',
                  title: 'Deliver',
                  description: 'Clean codebase, real performance, and a smooth handoff.',
                  icon: <Code2 size={24} />
                }
              ].map((step, index) => (
                <div key={index} className="process-card-anim process-card">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl text-[#C8A45C]">{step.number}</span>
                    <div className="text-[#C8A45C]">{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-[#F2F4F8] mb-2">{step.title}</h3>
                  <p className="text-[#A7AFBA] text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Section 6: Testimonials */}
        <section ref={testimonialsRef} className="relative w-full min-h-screen py-24 z-[60] bg-[#0B0C0F]">
          <div className="px-[6vw]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="testimonial-quote">
                <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">Testimonials</span>

                <div className="quote-mark mt-6">"</div>

                <blockquote className="text-xl md:text-2xl text-[#F2F4F8] leading-relaxed mt-4">
                  Where others see complexity, I see something waiting to be engineered.
                </blockquote>

                <div className="attribution-bar w-10 h-[3px] bg-[#C8A45C] mt-6 origin-left" />

                <p className="text-sm text-[#A7AFBA] mt-4">— Collaborator, Product Team</p>

                <p className="text-xs text-[#A7AFBA] mt-8 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#C8A45C]" />
                  Featured on product showcases and dev communities.
                </p>
              </div>

              <div className="testimonial-image image-gold-tint rounded-xl overflow-hidden h-[40vh] lg:h-[50vh]">
                <img
                  src="/public/testimonial.png"
                  alt="Testimonials"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Contact / Footer */}
        <section ref={contactRef} className="relative w-full min-h-screen py-24 z-[70] bg-[#14171C]">
          <div className="px-[6vw]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="contact-left">
                <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">Contact</span>
                <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-4">
                  Let's build something great.
                </h2>
                <p className="text-[#A7AFBA] mt-4 max-w-md">
                  Tell me what you're making. I'll reply within 1–2 business days.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  <a
                    href="mailto:yuvraj.singh.95928@gmail.com"
                    className="btn-primary flex items-center gap-2"
                  >
                    <Mail size={16} />
                    Email Me
                  </a>
                  
                </div>
              </div>

              <div className="contact-right">
                <ContactForm />
              </div>
            </div>

            <div className="footer-bottom mt-24 pt-8 border-t border-[rgba(242,244,248,0.1)] flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6 order-2 md:order-1">
                <p className="text-xs text-[#A7AFBA]">
                  © Yuvraj Singh. Built with Passion and Care.
                </p>
                <div className="hidden md:flex items-center gap-4 text-[#A7AFBA]">
                  <a href="https://github.com/singh-yuvraj1" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A45C] transition-colors" aria-label="GitHub">
                    <Github size={16} />
                  </a>
                  <a href="https://www.linkedin.com/in/singh-yuvraj2131/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A45C] transition-colors" aria-label="LinkedIn">
                    <Linkedin size={16} />
                  </a>
                  <a href="mailto:yuvraj.singh.95928@gmail.com" className="hover:text-[#C8A45C] transition-colors" aria-label="Email">
                    <Mail size={16} />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 order-1 md:order-2">
                <p className="text-xs text-[#A7AFBA] font-mono">
                  B.Tech 4th year [RIMT University..]
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-10 h-10 rounded-full border border-[rgba(242,244,248,0.1)] flex items-center justify-center text-[#A7AFBA] hover:text-[#C8A45C] hover:border-[#C8A45C] transition-all duration-300 hover:-translate-y-1 bg-[rgba(20,23,28,0.5)]"
                  aria-label="Back to top"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
