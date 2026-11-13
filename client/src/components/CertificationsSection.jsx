import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Award,
  Code2,
  Cloud,
  Brain,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  X,
  ShieldCheck,
  Calendar,
  Building,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check
} from 'lucide-react';
import AnimatedHeading from './ui/AnimatedHeading';

// Category data with 4 certificates each (total 20 certificates)
const CERTIFICATION_CATEGORIES = [
  {
    id: 'hackathon',
    title: 'Hackathons',
    badge: 'University & National Level',
    icon: Trophy,
    highlight: '5 Major Hackathons',
    color: '#E5C37A',
    description:
      'Rapid prototyping, high-pressure problem solving, and building AI/full-stack MVPs under 24-48 hour deadlines.',
    certificates: [
      {
        id: 'hack-sih',
        title: '',
        issuer: 'Ministry of Education & AICTE',
        date: '2024',
        credentialId: 'SIH-2024-NAT-7749',
        credentialUrl: 'https://www.sih.gov.in/',
        type: 'National Finalist',
        description:
          'Selected as top finalist in nation-wide innovation hackathon for building an AI-powered automated attendance and anomaly detection platform.',
        skills: ['AI / Computer Vision', 'FastAPI', 'React', 'Problem Solving']
      },
      {
        id: 'hack-innovatex',
        title: 'InnovateX 36-Hour National AI Hackathon',
        issuer: 'InnovateX Tech Guild',
        date: '2024',
        credentialId: 'INX-AI-9921-RUNNERUP',
        credentialUrl: 'https://devpost.com',
        type: '1st Runner Up',
        description:
          'Developed TaskTitan-AI, an intelligent productivity coach with deadline-rescue mode, finishing 2nd out of 140+ participating engineering teams.',
        skills: ['Generative AI', 'Supabase', 'Python', 'System Architecture']
      },
      {
        id: 'hack-devpost',
        title: 'Global AI & Web Innovation Challenge',
        issuer: 'Devpost & Tech Community',
        date: '2023',
        credentialId: 'DEVPOST-GLB-5531',
        credentialUrl: 'https://devpost.com',
        type: 'Top 10 Global',
        description:
          'Engineered HireMind-AI, an intelligent ATS & interview simulation platform that prepares students for modern engineering hiring loops.',
        skills: ['NLP', 'React', 'Node.js', 'Tailwind CSS']
      },
      {
        id: 'hack-web-blitz',
        title: '24-Hour Web Blitz Hackathon',
        issuer: 'Developer Student Club',
        date: '2023',
        credentialId: 'DSC-BLITZ-2023-01',
        credentialUrl: 'https://github.com/singh-yuvraj1',
        type: 'Best UI/UX Award',
        description:
          'Awarded for extraordinary frontend aesthetics, smooth GSAP micro-interactions, and accessible UI in high-speed product sprint.',
        skills: ['GSAP Animations', 'UI/UX Design', 'Full-Stack Web']
      }
    ]
  },
  {
    id: 'university',
    title: 'University Competitions',
    badge: 'Campus & State Honors',
    icon: Award,
    highlight: 'Top Collegiate Finishes',
    color: '#C8A45C',
    description:
      'Technical fest championships, coding speed bowls, algorithmic showdowns, and project innovation expos.',
    certificates: [
      {
        id: 'univ-coding-champ',
        title: 'Annual Code Champion - 1st Place',
        issuer: 'RIMT University | Department of CSE',
        date: '2024',
        credentialId: 'RIMT-CSE-CHAMP-2024',
        credentialUrl: 'https://rimt.ac.in/',
        type: 'Gold Medalist',
        description:
          'Clinched 1st place in university-wide annual coding contest featuring rigorous algorithmic problem solving and time-constrained competitive programming.',
        skills: ['C++', 'Data Structures', 'Algorithms', 'Optimization']
      },
      {
        id: 'univ-expo',
        title: 'Technical Fest Project Expo Winner',
        issuer: 'State Inter-University Tech Fest',
        date: '2024',
        credentialId: 'TECHFEST-EXPO-1092',
        credentialUrl: 'https://rimt.ac.in/',
        type: 'Winner - Best Engineering Project',
        description:
          'Showcased real-world AI-driven attendance and analytics system to industry judges and academic leads.',
        skills: ['Full-Stack Engineering', 'Live Demonstration', 'Product Management']
      },
      {
        id: 'univ-dsa-bowl',
        title: 'Inter-University Algorithmic Bowl',
        issuer: 'Punjab Engineering Collegiate League',
        date: '2023',
        credentialId: 'PECL-DSA-BOWL-441',
        credentialUrl: 'https://rimt.ac.in/',
        type: 'Rank #2 Overall',
        description:
          'Competed among top 50 university coders in speed graph algorithms, dynamic programming, and memory-constrained puzzles.',
        skills: ['Dynamic Programming', 'Graph Theory', 'Time Complexity']
      },
      {
        id: 'univ-academic',
        title: 'Academic Excellence in Computer Science',
        issuer: 'Dean of Engineering, RIMT',
        date: '2023',
        credentialId: 'RIMT-DEAN-HONORS-2023',
        credentialUrl: 'https://rimt.ac.in/',
        type: "Dean's Honor Roll",
        description:
          'Awarded for outstanding academic consistency, active technical mentorship, and high GPA in B.Tech CSE core courses.',
        skills: ['Computer Science Fundamentals', 'DBMS', 'Operating Systems']
      }
    ]
  },
  {
    id: 'geeksforgeeks',
    title: 'GeeksforGeeks & Coding Platforms',
    badge: 'DSA & Competitive',
    icon: Code2,
    highlight: 'Institute Rank #1',
    color: '#34D399',
    description:
      'Extensive algorithmic practice, data structure mastery, and multi-month continuous problem solving streaks.',
    certificates: [
      {
        id: 'gfg-rank1',
        title: 'GeeksforGeeks Institute Rank #1',
        issuer: 'GeeksforGeeks',
        date: '2024',
        credentialId: 'GFG-INST-RIMT-R1',
        credentialUrl: 'https://www.geeksforgeeks.org/',
        type: 'Campus Leader Badge',
        description:
          'Achieved #1 ranking across the entire university campus on GeeksforGeeks for overall coding score, contest performances, and problems solved.',
        skills: ['Algorithms', 'Data Structures', 'Competitive Coding']
      },
      {
        id: 'gfg-160',
        title: 'GfG 160-Day Problem Solving Master',
        issuer: 'GeeksforGeeks',
        date: '2024',
        credentialId: 'GFG-160-STREAK-MASTER',
        credentialUrl: 'https://www.geeksforgeeks.org/',
        type: 'Master Certification',
        description:
          'Completed 160 consecutive days of advanced problem solving covering arrays, trees, dynamic programming, heaps, and graph algorithms.',
        skills: ['Tree Traversal', 'Recursion & Backtracking', 'Greedy Algorithms']
      },
      {
        id: 'lc-streak',
        title: 'LeetCode Problem Solving & Streak Badge',
        issuer: 'LeetCode',
        date: '2024',
        credentialId: 'LC-SOLVER-50D-GOLD',
        credentialUrl: 'https://leetcode.com',
        type: 'Consistent Solver',
        description:
          'Consistently tackled Medium/Hard algorithmic challenges, optimizing time and space complexity across high-frequency interview questions.',
        skills: ['Bit Manipulation', 'Binary Search', 'Sliding Window', 'Two Pointers']
      },
      {
        id: 'hr-gold',
        title: 'HackerRank 5-Star Problem Solving',
        issuer: 'HackerRank',
        date: '2023',
        credentialId: 'HR-PS-GOLD-5STAR',
        credentialUrl: 'https://www.hackerrank.com',
        type: '5-Star Gold Badge',
        description:
          'Earned the highest 5-star gold proficiency badge in core problem solving and algorithm analysis on HackerRank.',
        skills: ['Problem Solving', 'Data Structure Design', 'Complexity Analysis']
      }
    ]
  },
  {
    id: 'cloud-web',
    title: 'Cloud & Full-Stack Development',
    badge: 'Architecture & Platforms',
    icon: Cloud,
    highlight: 'Production Standards',
    color: '#60A5FA',
    description:
      'Enterprise web architecture, responsive modern design systems, REST API integration, and cloud deployment pipelines.',
    certificates: [
      {
        id: 'cloud-aws',
        title: 'AWS Cloud Practitioner & Foundations',
        issuer: 'Amazon Web Services / Training Partner',
        date: '2024',
        credentialId: 'AWS-FOUND-TR-8820',
        credentialUrl: 'https://aws.amazon.com/certification/',
        type: 'Cloud Verified',
        description:
          'Comprehensive validation of AWS core cloud services (EC2, S3, RDS, Lambda), security IAM, VPC networking, and cloud economics.',
        skills: ['AWS Cloud', 'Serverless', 'S3 & Storage', 'Cloud Architecture']
      },
      {
        id: 'meta-frontend',
        title: 'Meta Front-End Developer Specialization',
        issuer: 'Meta (via Coursera)',
        date: '2024',
        credentialId: 'META-FED-CERT-7729',
        credentialUrl: 'https://coursera.org',
        type: 'Professional Specialization',
        description:
          'Rigorous 9-course curriculum in modern React, JavaScript ES6+, UX principles, responsive UI systems, and unit testing.',
        skills: ['React 18/19', 'Advanced JavaScript', 'Tailwind CSS', 'Testing']
      },
      {
        id: 'fcc-fullstack',
        title: 'JavaScript Algorithms & Web Engineering',
        issuer: 'freeCodeCamp',
        date: '2023',
        credentialId: 'FCC-JS-ALGO-300HR',
        credentialUrl: 'https://www.freecodecamp.org',
        type: '300 Hours Verified',
        description:
          'Completed 300 hours of coursework, algorithmic labs, and 5 mandatory certification projects demonstrating production JavaScript mastery.',
        skills: ['Modern JavaScript', 'Functional Programming', 'DOM Manipulation']
      },
      {
        id: 'postman-expert',
        title: 'Postman API Fundamentals Student Expert',
        issuer: 'Postman',
        date: '2023',
        credentialId: 'POSTMAN-API-STUDENT-EXPERT',
        credentialUrl: 'https://badgr.com',
        type: 'Certified Student Expert',
        description:
          'Proficiency in testing RESTful endpoints, environment variables, authentication headers, script automation, and API contract design.',
        skills: ['REST APIs', 'API Testing', 'Postman Collections', 'HTTP Protocols']
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI, Machine Learning & Data Science',
    badge: 'Next-Gen Intelligence',
    icon: Brain,
    highlight: 'Applied AI & Models',
    color: '#A78BFA',
    description:
      'Neural networks, generative AI pipelines, prompt engineering, and integrating intelligent LLM layers into web applications.',
    certificates: [
      {
        id: 'dl-ai-ml',
        title: 'Machine Learning Specialization',
        issuer: 'DeepLearning.AI & Stanford Online',
        date: '2024',
        credentialId: 'DLAI-ML-STANFORD-9210',
        credentialUrl: 'https://www.deeplearning.ai/',
        type: 'Specialization Honor',
        description:
          'Taught by Andrew Ng. Covered supervised learning (linear regression, SVMs, neural networks) and unsupervised learning (clustering, anomaly detection).',
        skills: ['Supervised Learning', 'Neural Networks', 'Cost Optimization', 'PyTorch']
      },
      {
        id: 'google-genai',
        title: 'Google Cloud Generative AI Fundamentals',
        issuer: 'Google Cloud',
        date: '2024',
        credentialId: 'GCLOUD-GENAI-SKILL-441',
        credentialUrl: 'https://cloud.google.com/training',
        type: 'Skill Badge',
        description:
          'Practical training on LLMs, attention mechanisms, transformer models, prompt framing, and responsible AI guardrails.',
        skills: ['Large Language Models', 'Generative AI', 'Prompt Design', 'Google Cloud']
      },
      {
        id: 'kaggle-champ',
        title: 'Kaggle Python & Data Science Certified',
        issuer: 'Kaggle',
        date: '2023',
        credentialId: 'KAGGLE-PY-DS-CERT-832',
        credentialUrl: 'https://www.kaggle.com',
        type: 'Competency Certified',
        description:
          'Completed hands-on coding tracks in Python data manipulation, Pandas, feature engineering, and predictive modeling.',
        skills: ['Python', 'Pandas', 'NumPy', 'Data Analysis']
      },
      {
        id: 'ai-prompt-eng',
        title: 'Prompt Engineering for Developers',
        issuer: 'DeepLearning.AI / OpenAI Partner Track',
        date: '2023',
        credentialId: 'DLAI-PROMPT-DEV-2023',
        credentialUrl: 'https://www.deeplearning.ai/',
        type: 'Professional Credential',
        description:
          'Advanced techniques in chain-of-thought prompting, function calling, system prompt architecture, and embedding-based retrieval.',
        skills: ['Prompt Engineering', 'OpenAI APIs', 'Vector Embeddings', 'AI UX']
      }
    ]
  }
];

// Circular wrapped offset in [-2, -1, 0, 1, 2]
const getRelativeOffset = (index, activeIndex, total) => {
  let diff = index - activeIndex;
  const half = Math.floor(total / 2);
  if (diff > half) diff -= total;
  if (diff < -half) diff += total;
  return diff;
};

// Detailed Holographic Certificate Verification Modal
const CertificateModal = ({ certificate, category, onClose }) => {
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!certificate) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(certificate.credentialId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', damping: 28, stiffness: 360 }}
        className="relative w-full max-w-2xl card-glass rounded-2xl border border-[rgba(200,164,92,0.35)] p-6 sm:p-8 shadow-2xl shadow-black/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${category?.color || '#C8A45C'}, transparent)`
          }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-[rgba(242,244,248,0.12)] flex items-center justify-center text-[#A7AFBA] hover:text-[#F2F4F8] hover:border-[#C8A45C] transition-colors bg-[rgba(11,12,15,0.6)]"
        >
          <X size={18} />
        </button>

        <div className="flex flex-wrap items-center gap-3 mb-4 pr-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-[rgba(200,164,92,0.15)] text-[#C8A45C] border border-[#C8A45C]/30">
            <ShieldCheck size={14} />
            {certificate.type}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A7AFBA]">
            <Calendar size={13} className="text-[#C8A45C]" />
            Issued {certificate.date}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#F2F4F8] leading-tight">
          {certificate.title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-sm text-[#C8A45C] font-mono">
          <Building size={15} />
          <span>{certificate.issuer}</span>
        </div>

        <p className="mt-5 text-[#A7AFBA] text-sm sm:text-base leading-relaxed">
          {certificate.description}
        </p>

        <div className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#A7AFBA] mb-2.5">
            Validated Competencies
          </p>
          <div className="flex flex-wrap gap-2">
            {certificate.skills.map((skill, idx) => (
              <span key={idx} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-[rgba(242,244,248,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleCopy}
            className="text-left group/id"
            title="Copy Credential ID"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#A7AFBA]">
              Credential Verification ID (Click to Copy)
            </p>
            <p className="font-mono text-xs text-[#F2F4F8] mt-0.5 inline-flex items-center gap-1.5 group-hover/id:text-[#C8A45C] transition-colors">
              {copiedId ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>{certificate.credentialId}</span>
                  <Copy size={12} className="opacity-60" />
                </>
              )}
            </p>
          </button>

          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 text-xs font-mono tracking-wider"
            >
              <span>Verify Credential</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const CertificationsSection = ({ sectionRef }) => {
  const categories = CERTIFICATION_CATEGORIES;
  const total = categories.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleOpenModal = (cert, category) => {
    setSelectedCert(cert);
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
    setSelectedCategory(null);
  };

  const activeCategory = categories[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative w-full min-h-screen flex flex-col justify-center py-14 sm:py-16 px-[4vw] sm:px-[5vw] z-[45] bg-[#0B0C0F] overflow-hidden"
    >
      {/* Dynamic Ambient Glow Matching Active Card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72vw] h-[65vh] rounded-full blur-[160px] opacity-15 transition-colors duration-700"
        style={{ backgroundColor: activeCategory.color || '#C8A45C' }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Compact Top Bar so the Carousel Covers Most of the Page */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <AnimatedHeading
            eyebrow={
              <>
                <Sparkles size={14} className="text-[#C8A45C]" />
                Honors, Competitions &amp; Verified Credentials
              </>
            }
            title="Validated Proof *Of Execution.*"
          />

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="font-mono text-[11px] text-[#A7AFBA] hidden sm:inline">
              Drag card or click peeking decks
            </span>
            <span className="px-3 py-1.5 rounded-xl border border-[rgba(242,244,248,0.12)] bg-[rgba(20,23,28,0.7)] font-mono text-xs text-[#F2F4F8]">
              <span className="text-[#C8A45C] font-bold">0{activeIndex + 1}</span>
              <span className="text-[#A7AFBA]/50"> / </span>
              <span>0{total}</span>
            </span>
          </div>
        </div>

        {/* Full-Coverage Fanned 3D Stacked Card-Deck Carousel Stage */}
        <div className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px] flex items-center justify-center select-none">
          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous credential category"
            className="hidden sm:flex absolute left-0 lg:left-4 z-40 w-12 h-12 rounded-2xl border border-[rgba(242,244,248,0.14)] bg-[rgba(20,23,28,0.85)] backdrop-blur-xl items-center justify-center text-[#A7AFBA] hover:text-[#C8A45C] hover:border-[#C8A45C]/60 shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next credential category"
            className="hidden sm:flex absolute right-0 lg:right-4 z-40 w-12 h-12 rounded-2xl border border-[rgba(242,244,248,0.14)] bg-[rgba(20,23,28,0.85)] backdrop-blur-xl items-center justify-center text-[#A7AFBA] hover:text-[#C8A45C] hover:border-[#C8A45C]/60 shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ChevronRight size={22} />
          </button>

          {/* Stacked Fanned Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            {categories.map((category, index) => {
              const offset = getRelativeOffset(index, activeIndex, total);
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;
              const Icon = category.icon;

              // Fanned deck geometry matching the stacked fan visual
              const xOffset = isMobile ? offset * 32 : offset * 105;
              const yOffset = absOffset * (isMobile ? 8 : 10);
              const rotateDeg = offset * (isMobile ? 4 : 5.2);
              const scale = 1 - absOffset * 0.075;
              const zIndex = 30 - absOffset * 10;
              const opacity = isActive ? 1 : absOffset === 1 ? 0.88 : 0.6;

              return (
                <motion.div
                  key={category.id}
                  style={{
                    zIndex,
                    originX: 0.5,
                    originY: 0.85
                  }}
                  initial={false}
                  animate={{
                    x: xOffset,
                    y: yOffset,
                    rotate: rotateDeg,
                    scale,
                    opacity
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 26,
                    mass: 0.9
                  }}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.22}
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60 || info.velocity.x < -350) {
                      handleNext();
                    } else if (info.offset.x > 60 || info.velocity.x > 350) {
                      handlePrev();
                    }
                  }}
                  whileDrag={{ scale: 0.985, cursor: 'grabbing' }}
                  onClick={() => {
                    if (!isActive) setActiveIndex(index);
                  }}
                  className={`absolute w-[92vw] sm:w-[640px] md:w-[740px] lg:w-[820px] h-[520px] sm:h-[575px] lg:h-[600px] rounded-3xl border overflow-hidden shadow-[0_32px_95px_rgba(0,0,0,0.82)] transition-colors duration-300 ${
                    isActive
                      ? 'cursor-grab border-[rgba(200,164,92,0.35)] bg-[#13161C]'
                      : 'cursor-pointer border-[rgba(242,244,248,0.14)] bg-[#0F1116]'
                  }`}
                >
                  {/* Top Category Color Glow & Border Line */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-44 opacity-25"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${category.color}, transparent 75%)`
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ backgroundColor: category.color }}
                  />

                  {/* Subtle Veil over Background Peeking Cards */}
                  {!isActive && (
                    <div className="pointer-events-none absolute inset-0 z-30 bg-black/35 backdrop-blur-[1px]" />
                  )}

                  {/* Card Body */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-8 lg:p-9">
                    {/* Header */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3.5">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0"
                            style={{
                              backgroundColor: `${category.color}14`,
                              borderColor: `${category.color}40`,
                              color: category.color
                            }}
                          >
                            <Icon size={22} />
                          </div>
                          <div>
                            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#A7AFBA] block">
                              {category.badge}
                            </span>
                            <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#F2F4F8] leading-tight mt-0.5">
                              {category.title}
                            </h3>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider border border-[#C8A45C]/30 bg-[#C8A45C]/10 text-[#C8A45C] whitespace-nowrap shrink-0">
                          {category.certificates.length} Credentials
                        </span>
                      </div>

                      <p className="text-[#A7AFBA] text-xs sm:text-sm leading-relaxed line-clamp-2 max-w-2xl">
                        {category.description}
                      </p>
                    </div>

                    {/* 4 Interactive Credential Rows */}
                    <div className="my-4 space-y-2.5 sm:space-y-3 overflow-y-auto pr-1">
                      {category.certificates.map((cert) => (
                        <button
                          key={cert.id}
                          type="button"
                          onClick={(e) => {
                            if (!isActive) return;
                            e.stopPropagation();
                            handleOpenModal(cert, category);
                          }}
                          className="w-full text-left p-3.5 sm:p-4 rounded-2xl border border-[rgba(242,244,248,0.08)] bg-[rgba(11,12,15,0.55)] hover:bg-[rgba(200,164,92,0.08)] hover:border-[#C8A45C]/45 transition-all duration-200 flex items-center justify-between group/cert"
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-3">
                            <span
                              className="w-2 h-2 rounded-full shrink-0 group-hover/cert:scale-125 transition-transform"
                              style={{
                                backgroundColor: category.color || '#C8A45C',
                                boxShadow: `0 0 8px ${category.color || '#C8A45C'}`
                              }}
                            />
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm lg:text-[15px] font-semibold text-[#F2F4F8] group-hover/cert:text-[#C8A45C] transition-colors truncate">
                                {cert.title}
                              </p>
                              <p className="text-[11px] text-[#A7AFBA] font-mono mt-0.5 truncate">
                                {cert.issuer} • {cert.date}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0">
                            <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-lg bg-[rgba(242,244,248,0.06)] text-[#A7AFBA] group-hover/cert:text-[#C8A45C] group-hover/cert:bg-[#C8A45C]/12 transition-colors hidden sm:inline-block">
                              {cert.type}
                            </span>
                            <ChevronRight
                              size={16}
                              className="text-[#A7AFBA] group-hover/cert:text-[#C8A45C] group-hover/cert:translate-x-0.5 transition-all"
                            />
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-[rgba(242,244,248,0.08)] flex items-center justify-between text-xs font-mono text-[#A7AFBA]">
                      <span className="flex items-center gap-1.5" style={{ color: category.color }}>
                        <Sparkles size={13} />
                        {category.highlight}
                      </span>
                      <span className="text-[11px] underline underline-offset-4 text-[#A7AFBA]">
                        Click any credential to inspect
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Track Switcher & Mobile Nav */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex sm:hidden items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous card"
              className="w-10 h-10 rounded-xl border border-[rgba(242,244,248,0.14)] bg-[rgba(20,23,28,0.8)] flex items-center justify-center text-[#F2F4F8]"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-mono text-xs text-[#A7AFBA]">
              0{activeIndex + 1} / 0{total}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next card"
              className="w-10 h-10 rounded-xl border border-[rgba(242,244,248,0.14)] bg-[rgba(20,23,28,0.8)] flex items-center justify-center text-[#F2F4F8]"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl border border-[rgba(242,244,248,0.1)] bg-[rgba(20,23,28,0.65)] backdrop-blur-xl">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors duration-200 ${
                    isSelected ? 'text-[#0B0C0F] font-bold' : 'text-[#A7AFBA] hover:text-[#F2F4F8]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCertDeckTab"
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                      className="absolute inset-0 rounded-xl"
                      style={{ backgroundColor: cat.color || '#C8A45C' }}
                    />
                  )}
                  <Icon size={13} className="relative z-10" />
                  <span className="relative z-10 hidden md:inline">{cat.title}</span>
                  <span className="relative z-10 md:hidden">0{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Holographic Verification Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            certificate={selectedCert}
            category={selectedCategory}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSection;
