import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  Layers,
  ChevronRight,
  Filter
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Category data with 4 certificates each (total 20 certificates)
const CERTIFICATION_CATEGORIES = [
  {
    id: 'hackathon',
    title: 'Hackathons & Sprints',
    badge: 'National & Global',
    icon: Trophy,
    highlight: '5 Major Hackathons',
    color: '#E5C37A',
    description: 'Rapid prototyping, high-pressure problem solving, and building AI/full-stack MVPs under 24-48 hour deadlines.',
    certificates: [
      {
        id: 'hack-sih',
        title: 'Smart India Hackathon (SIH) Finalist',
        issuer: 'Ministry of Education & AICTE',
        date: '2024',
        credentialId: 'SIH-2024-NAT-7749',
        credentialUrl: 'https://www.sih.gov.in/',
        type: 'National Finalist',
        description: 'Selected as top finalist in nation-wide innovation hackathon for building an AI-powered automated attendance and anomaly detection platform.',
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
        description: 'Developed TaskTitan-AI, an intelligent productivity coach with deadline-rescue mode, finishing 2nd out of 140+ participating engineering teams.',
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
        description: 'Engineered HireMind-AI, an intelligent ATS & interview simulation platform that prepares students for modern engineering hiring loops.',
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
        description: 'Awarded for extraordinary frontend aesthetics, smooth GSAP micro-interactions, and accessible UI in high-speed product sprint.',
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
    description: 'Technical fest championships, coding speed bowls, algorithmic showdowns, and project innovation expos.',
    certificates: [
      {
        id: 'univ-coding-champ',
        title: 'Annual Code Champion - 1st Place',
        issuer: 'RIMT University | Department of CSE',
        date: '2024',
        credentialId: 'RIMT-CSE-CHAMP-2024',
        credentialUrl: 'https://rimt.ac.in/',
        type: 'Gold Medalist',
        description: 'Clinched 1st place in university-wide annual coding contest featuring rigorous algorithmic problem solving and time-constrained competitive programming.',
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
        description: 'Showcased real-world AI-driven attendance and analytics system to industry judges and academic leads.',
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
        description: 'Competed among top 50 university coders in speed graph algorithms, dynamic programming, and memory-constrained puzzles.',
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
        description: 'Awarded for outstanding academic consistency, active technical mentorship, and high GPA in B.Tech CSE core courses.',
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
    description: 'Extensive algorithmic practice, data structure mastery, and multi-month continuous problem solving streaks.',
    certificates: [
      {
        id: 'gfg-rank1',
        title: 'GeeksforGeeks Institute Rank #1',
        issuer: 'GeeksforGeeks',
        date: '2024',
        credentialId: 'GFG-INST-RIMT-R1',
        credentialUrl: 'https://www.geeksforgeeks.org/',
        type: 'Campus Leader Badge',
        description: 'Achieved #1 ranking across the entire university campus on GeeksforGeeks for overall coding score, contest performances, and problems solved.',
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
        description: 'Completed 160 consecutive days of advanced problem solving covering arrays, trees, dynamic programming, heaps, and graph algorithms.',
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
        description: 'Consistently tackled Medium/Hard algorithmic challenges, optimizing time and space complexity across high-frequency interview questions.',
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
        description: 'Earned the highest 5-star gold proficiency badge in core problem solving and algorithm analysis on HackerRank.',
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
    description: 'Enterprise web architecture, responsive modern design systems, REST API integration, and cloud deployment pipelines.',
    certificates: [
      {
        id: 'cloud-aws',
        title: 'AWS Cloud Practitioner & Foundations',
        issuer: 'Amazon Web Services / Training Partner',
        date: '2024',
        credentialId: 'AWS-FOUND-TR-8820',
        credentialUrl: 'https://aws.amazon.com/certification/',
        type: 'Cloud Verified',
        description: 'Comprehensive validation of AWS core cloud services (EC2, S3, RDS, Lambda), security IAM, VPC networking, and cloud economics.',
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
        description: 'Rigorous 9-course curriculum in modern React, JavaScript ES6+, UX principles, responsive UI systems, and unit testing.',
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
        description: 'Completed 300 hours of coursework, algorithmic labs, and 5 mandatory certification projects demonstrating production JavaScript mastery.',
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
        description: 'Proficiency in testing RESTful endpoints, environment variables, authentication headers, script automation, and API contract design.',
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
    description: 'Neural networks, generative AI pipelines, prompt engineering, and integrating intelligent LLM layers into web applications.',
    certificates: [
      {
        id: 'dl-ai-ml',
        title: 'Machine Learning Specialization',
        issuer: 'DeepLearning.AI & Stanford Online',
        date: '2024',
        credentialId: 'DLAI-ML-STANFORD-9210',
        credentialUrl: 'https://www.deeplearning.ai/',
        type: 'Specialization Honor',
        description: 'Taught by Andrew Ng. Covered supervised learning (linear regression, SVMs, neural networks) and unsupervised learning (clustering, anomaly detection).',
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
        description: 'Practical training on LLMs, attention mechanisms, transformer models, prompt framing, and responsible AI guardrails.',
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
        description: 'Completed hands-on coding tracks in Python data manipulation, Pandas, feature engineering, and predictive modeling.',
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
        description: 'Advanced techniques in chain-of-thought prompting, function calling, system prompt architecture, and embedding-based retrieval.',
        skills: ['Prompt Engineering', 'OpenAI APIs', 'Vector Embeddings', 'AI UX']
      }
    ]
  }
];

// Interactive 3D Three.js WebGL Trophy/Crystal Core Component
const ThreeAchievementCore = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for combined rotations
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Wireframe Icosahedron (Gold Geometry)
    const outerGeo = new THREE.IcosahedronGeometry(1.25, 0);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xC8A45C,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x5a441e,
      emissiveIntensity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // 2. Inner Golden Diamond Core (Dodecahedron)
    const innerGeo = new THREE.DodecahedronGeometry(0.72, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0xE8C87C,
      roughness: 0.1,
      metalness: 0.85,
      transmission: 0.6,
      opacity: 0.85,
      transparent: true,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 3. Orbiting Sparkle Ring
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xE5C37A,
      size: 0.045,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xC8A45C, 2.5, 10);
    goldLight.position.set(3, 3, 3);
    scene.add(goldLight);

    const cyanLight = new THREE.PointLight(0x38BDF8, 1.2, 10);
    cyanLight.position.set(-3, -2, -2);
    scene.add(cyanLight);

    // Mouse tracking for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.6;
      targetY = y * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let reqId;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Autonomous rotation
      outerMesh.rotation.x += 0.25 * delta;
      outerMesh.rotation.y += 0.35 * delta;

      innerMesh.rotation.x -= 0.4 * delta;
      innerMesh.rotation.y -= 0.5 * delta;

      particles.rotation.y += 0.15 * delta;
      particles.rotation.z += 0.08 * delta;

      // Mouse inertia damping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = mouseX;
      mainGroup.rotation.x = -mouseY;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[260px] md:min-h-[340px] flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    />
  );
};

// 3D Perspective Tilt Card Component for each Major Category
const CategoryCard = ({ category, onSelectCert }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const Icon = category.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(200, 164, 92, 0.12), rgba(20, 23, 28, 0.85) 65%)`,
      transition: 'transform 0.1s ease-out, background 0.2s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      background: 'rgba(20, 23, 28, 0.72)',
      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.5s ease-out'
    });
  };

  return (
    <div
      ref={cardRef}
      className="cert-category-card relative rounded-2xl p-6 lg:p-7 border border-[rgba(242,244,248,0.12)] hover:border-[#C8A45C]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl shadow-black/40"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top accent light bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-75 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${category.color || '#C8A45C'}, transparent)`
        }}
      />

      {/* Subtle corner badge glow */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full pointer-events-none blur-2xl transition-opacity duration-500 opacity-20 group-hover:opacity-45"
        style={{ background: category.color || '#C8A45C' }}
      />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: 'rgba(200, 164, 92, 0.08)',
                borderColor: 'rgba(200, 164, 92, 0.25)',
                color: category.color || '#C8A45C'
              }}
            >
              <Icon size={22} />
            </div>
            <div>
              <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#A7AFBA]">
                {category.badge}
              </span>
              <h3 className="text-xl font-bold text-[#F2F4F8] leading-tight mt-0.5">
                {category.title}
              </h3>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider border border-[#C8A45C]/30 bg-[#C8A45C]/10 text-[#C8A45C] whitespace-nowrap">
            {category.certificates.length} Credentials
          </span>
        </div>

        {/* Description */}
        <p className="text-[#A7AFBA] text-sm leading-relaxed mb-6">
          {category.description}
        </p>

        {/* Certificate Item List inside this category */}
        <div className="space-y-3">
          {category.certificates.map((cert) => (
            <button
              key={cert.id}
              onClick={() => onSelectCert(cert, category)}
              className="w-full text-left p-3.5 rounded-xl border border-[rgba(242,244,248,0.08)] bg-[rgba(11,12,15,0.45)] hover:bg-[rgba(200,164,92,0.08)] hover:border-[#C8A45C]/40 transition-all duration-300 flex items-center justify-between group/cert"
            >
              <div className="flex items-start gap-3 min-w-0 pr-2">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#C8A45C] shrink-0 group-hover/cert:scale-125 transition-transform" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#F2F4F8] group-hover/cert:text-[#C8A45C] transition-colors truncate">
                    {cert.title}
                  </p>
                  <p className="text-xs text-[#A7AFBA] font-mono mt-0.5 truncate">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[rgba(242,244,248,0.06)] text-[#A7AFBA] group-hover/cert:text-[#C8A45C] group-hover/cert:bg-[#C8A45C]/10 transition-colors hidden sm:inline-block">
                  {cert.type}
                </span>
                <ChevronRight size={15} className="text-[#A7AFBA] group-hover/cert:text-[#C8A45C] group-hover/cert:translate-x-0.5 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Card Footer highlight */}
      <div className="mt-6 pt-4 border-t border-[rgba(242,244,248,0.08)] flex items-center justify-between text-xs font-mono text-[#A7AFBA]">
        <span className="flex items-center gap-1.5 text-[#C8A45C]">
          <Sparkles size={13} />
          {category.highlight}
        </span>
        <span className="text-[11px] underline underline-offset-4 text-[#A7AFBA] group-hover:text-[#F2F4F8] transition-colors">
          Click any credential to inspect
        </span>
      </div>
    </div>
  );
};

// Detailed Holographic Certificate Verification Modal
const CertificateModal = ({ certificate, category, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl card-glass rounded-2xl border border-[rgba(200,164,92,0.35)] p-6 sm:p-8 shadow-2xl shadow-black/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#C8A45C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-[rgba(242,244,248,0.15)] flex items-center justify-center text-[#A7AFBA] hover:text-[#F2F4F8] hover:border-[#C8A45C] bg-[rgba(11,12,15,0.6)] transition-all z-10"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Badge & Category */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#C8A45C]/15 border border-[#C8A45C]/30 text-[#C8A45C]">
            {category?.title || 'Certification'}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 size={12} />
            Verified Credential
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F2F4F8] mt-2 leading-tight">
          {certificate.title}
        </h2>

        {/* Metadata Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6 p-4 rounded-xl bg-[rgba(11,12,15,0.6)] border border-[rgba(242,244,248,0.08)]">
          <div className="flex items-center gap-3">
            <Building size={16} className="text-[#C8A45C] shrink-0" />
            <div>
              <p className="text-[11px] font-mono text-[#A7AFBA] uppercase">Issuer</p>
              <p className="text-sm font-semibold text-[#F2F4F8]">{certificate.issuer}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-[#C8A45C] shrink-0" />
            <div>
              <p className="text-[11px] font-mono text-[#A7AFBA] uppercase">Issue Date</p>
              <p className="text-sm font-semibold text-[#F2F4F8]">{certificate.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-[#C8A45C] shrink-0" />
            <div>
              <p className="text-[11px] font-mono text-[#A7AFBA] uppercase">Credential ID</p>
              <p className="text-xs font-mono text-[#C8A45C] truncate max-w-[180px] sm:max-w-none">
                {certificate.credentialId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Trophy size={16} className="text-[#C8A45C] shrink-0" />
            <div>
              <p className="text-[11px] font-mono text-[#A7AFBA] uppercase">Achievement Level</p>
              <p className="text-sm font-semibold text-[#F2F4F8]">{certificate.type}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#A7AFBA] mb-2 flex items-center gap-2">
            <Layers size={13} className="text-[#C8A45C]" />
            Accomplishment Summary
          </h4>
          <p className="text-[#F2F4F8] text-sm leading-relaxed font-light">
            {certificate.description}
          </p>
        </div>

        {/* Skills Tagged */}
        {certificate.skills && (
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#A7AFBA] mb-2.5">
              Skills & Competencies Validated
            </h4>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-mono text-[#C8A45C] rounded-lg bg-[rgba(200,164,92,0.1)] border border-[rgba(200,164,92,0.22)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[rgba(242,244,248,0.1)]">
          <p className="text-xs text-[#A7AFBA] font-mono">
            Issued to <span className="text-[#F2F4F8] font-bold">Yuvraj Singh</span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-[#C8A45C] text-[#0B0C0F] text-xs font-bold tracking-wide hover:bg-[#D4B76A] transition-colors flex items-center gap-2 shadow-lg shadow-[#C8A45C]/20"
            >
              <span>Verify / View Online</span>
              <ExternalLink size={14} />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-[rgba(242,244,248,0.15)] text-[#A7AFBA] hover:text-[#F2F4F8] text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Exported Certifications Section
const CertificationsSection = ({ sectionRef }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const containerRef = useRef(null);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo('.cert-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.7
          }
        }
      );

      // Stat counters reveal
      gsap.fromTo('.cert-stat-badge',
        { y: 35, opacity: 0, scale: 0.94 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cert-stats-container',
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.6
          }
        }
      );

      // Cards staggered entrance
      gsap.fromTo('.cert-category-card',
        { y: 70, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cert-grid-container',
            start: 'top 88%',
            end: 'top 40%',
            scrub: 0.7
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpenModal = (cert, category) => {
    setSelectedCert(cert);
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
    setSelectedCategory(null);
  };

  // Filter categories
  const filteredCategories = activeFilter === 'all'
    ? CERTIFICATION_CATEGORIES
    : CERTIFICATION_CATEGORIES.filter((c) => c.id === activeFilter);

  const totalCertificates = CERTIFICATION_CATEGORIES.reduce(
    (acc, c) => acc + c.certificates.length,
    0
  );

  return (
    <section
      ref={sectionRef || containerRef}
      id="certifications"
      className="relative w-full min-h-screen py-24 z-40 bg-[#0B0C0F] overflow-hidden"
    >
      <div ref={containerRef} className="px-[6vw]">
        {/* Top Header Row with 3D Core Visual */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8 cert-heading">
            <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase flex items-center gap-2">
              <Sparkles size={14} className="text-[#C8A45C]" />
              Honors, Competitions & Verified Credentials
            </span>
            <h2 className="text-[clamp(28px,3.8vw,52px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-3 leading-[1.05]">
              Validated Proof <span className="block text-gradient">Of Relentless Execution.</span>
            </h2>
            <p className="text-[#A7AFBA] text-sm md:text-base mt-4 max-w-2xl leading-relaxed font-light">
              A comprehensive showcase of {totalCertificates}+ verified certifications, national hackathon podium finishes,
              collegiate championships, and competitive algorithmic problem solving milestones.
            </p>

            {/* Quick Metrics Bar */}
            <div className="cert-stats-container grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {[
                { number: `${totalCertificates}+`, label: 'Total Certificates' },
                { number: '5+', label: 'Hackathon Awards' },
                { number: 'Rank #1', label: 'GeeksforGeeks Campus' },
                { number: '100%', label: 'Verified Issuers' }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="cert-stat-badge p-3.5 rounded-xl border border-[rgba(242,244,248,0.1)] bg-[rgba(20,23,28,0.65)] backdrop-blur-sm"
                >
                  <p className="font-mono text-xl sm:text-2xl font-bold text-[#C8A45C]">
                    {stat.number}
                  </p>
                  <p className="text-xs text-[#A7AFBA] font-mono mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Three.js Interactive 3D Achievement Core */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              <ThreeAchievementCore />
              <div className="absolute -bottom-2 text-center pointer-events-none">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C8A45C]/80 px-3 py-1 rounded-full border border-[#C8A45C]/20 bg-[rgba(11,12,15,0.7)] backdrop-blur-md">
                  Interactive 3D Achievement Core
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#A7AFBA] mr-2">
            <Filter size={14} className="text-[#C8A45C]" />
            Filter:
          </div>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-[#C8A45C] text-[#0B0C0F] font-bold shadow-lg shadow-[#C8A45C]/20'
                : 'border border-[rgba(242,244,248,0.12)] text-[#A7AFBA] hover:text-[#F2F4F8] hover:border-[#C8A45C]/50 bg-[rgba(20,23,28,0.5)]'
            }`}
          >
            All Categories ({CERTIFICATION_CATEGORIES.length})
          </button>
          {CERTIFICATION_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-[#C8A45C] text-[#0B0C0F] font-bold shadow-lg shadow-[#C8A45C]/20'
                  : 'border border-[rgba(242,244,248,0.12)] text-[#A7AFBA] hover:text-[#F2F4F8] hover:border-[#C8A45C]/50 bg-[rgba(20,23,28,0.5)]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="cert-grid-container grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelectCert={handleOpenModal}
            />
          ))}
        </div>
      </div>

      {/* Holographic Verification Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          category={selectedCategory}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default CertificationsSection;
