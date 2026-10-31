import hiremindImg from '../assets/hiremind-ai.png';
import taskTitanImg from '../assets/task-titan.png';
import hungryBitesImg from '../assets/hungry_bites.png';
import aiAttendImg from '../assets/ai-attend.png';
import codeStudioImg from '../assets/code_studio.png';
import qrMakerImg from '../assets/qr-maker.png';
import sLabImg from '../assets/s-lab.png';
import editYuvImg from '../assets/edityuv.jpg';
import testimonialImg from '../assets/testimonial.png';
import heroBgImg from '../assets/hero-bg.jpg';

export const PERSONAL_INFO = {
  name: 'S. Yuvraj Singh',
  shortName: 'Yuvraj',
  role: 'Creative Full-Stack Developer & AI Builder',
  roles: [
    'Creative Developer',
    'Full-Stack Engineer',
    'AI System Architect',
    'Problem Solver'
  ],
  bio: `I'm Yuvraj Singh — a full-stack developer who enjoys turning ideas into practical, intelligent digital experiences. I work across modern web technologies, building clean interfaces, scalable applications, and AI-powered solutions that solve real problems. When I'm not building, I'm sharpening my skills in DSA, exploring new technologies, and constantly finding better ways to build for the web.`,
  education: {
    degree: 'B.Tech in Computer Science & Engineering (4th Year)',
    institution: 'RIMT University | Punjab, India',
    period: '2021 – 2025',
    status: 'Graduating Soon'
  },
  availability: 'Available for Full-time Roles & Freelance',
  email: 'yuvraj.singh.95928@gmail.com',
  resumeUrl: 'https://drive.google.com/file/d/1uYP4oG0wECtcAfMej1FFGQHrTrqD1PkY/view?usp=drivesdk',
  github: 'https://github.com/singh-yuvraj1',
  linkedin: 'https://www.linkedin.com/in/singh-yuvraj2131/',
  location: 'Punjab, India (Working Worldwide)',
  stats: [
    { label: 'Projects Built', value: '7+', suffix: '', detail: 'Production & MVPs' },
    { label: 'Certifications', value: '20', suffix: '+', detail: 'National & Global' },
    { label: 'Campus GfG Rank', value: '#1', suffix: '', detail: 'RIMT University' },
    { label: 'DSA Problem Streak', value: '160', suffix: '+ Days', detail: 'Consistent Practice' }
  ],
  assets: {
    avatar: editYuvImg,
    heroBg: heroBgImg,
    testimonial: testimonialImg
  }
};

export const PROJECTS = [
  {
    id: 'hiremind-ai',
    title: 'HireMind-AI',
    subtitle: 'AI-Powered Hiring & Interview Prep Platform',
    category: 'AI / ML',
    description: 'An AI-driven platform that evaluates candidate skills, conducts simulated AI mock interviews, analyzes resume ATS compatibility, and provides tailored learning roadmaps.',
    tags: ['AI Interview', 'ATS Checker', 'Job Portal', 'React', 'Node.js', 'NLP'],
    image: hiremindImg,
    github: 'https://github.com/singh-yuvraj1/hiremind-ai-new',
    live: 'https://hiremind-ai.vercel.app',
    featured: true,
    stats: 'Top 10 Global Challenge',
    highlights: [
      'Automated resume ATS scoring and keyword gap analysis',
      'Interactive voice & text AI mock interview simulator',
      'Personalized aptitude recommendations based on score breakdowns'
    ]
  },
  {
    id: 'tasktitan-ai',
    title: 'TaskTitan-AI',
    subtitle: 'Intelligent Productivity Engine with Kai AI',
    category: 'AI / ML',
    description: 'An AI-powered productivity platform featuring Kai AI for natural-language task planning, dynamic task prioritization, deadline-rescue mode, and behavioral coaching.',
    tags: ['Flask', 'Supabase', 'Python', 'Security', 'GenAI', 'Tailwind'],
    image: taskTitanImg,
    github: 'https://github.com/singh-yuvraj1/TaskTitan_AI',
    live: 'https://task-titan-ai.vercel.app',
    featured: true,
    stats: '1st Runner Up (InnovateX)',
    highlights: [
      'Kai AI: natural-language scheduling and task decomposition',
      'Deadline-Rescue algorithm dynamically recalculating priorities',
      'Multi-tenant authentication & secure row-level access'
    ]
  },
  {
    id: 'ai-attend',
    title: 'AI Attendance System',
    subtitle: 'Computer Vision & Automated Reporting System',
    category: 'AI / ML',
    description: 'Smart automated attendance and anomaly detection platform designed for large institutes, generating instant compliance reports and visual audit trails.',
    tags: ['React', 'Computer Vision', 'FastAPI', 'PDF Generation', 'Node.js'],
    image: aiAttendImg,
    github: 'https://github.com/projectsnavadeep/reportgenerator.in',
    live: 'https://reportgenerator.in',
    featured: true,
    stats: 'SIH 2024 National Finalist',
    highlights: [
      'High-speed face recognition and anomaly flagging',
      'Automated executive PDF reporting engine',
      'Scalable backend designed for enterprise rosters'
    ]
  },
  {
    id: 'hungry-bites',
    title: 'Hungry Bites',
    subtitle: 'Smart QR-Powered Dining & Live Order System',
    category: 'Full-Stack',
    description: 'A contactless food ordering and live tracking platform with geofenced delivery alerts, real-time kitchen status sync, and streamlined mobile checkout.',
    tags: ['React', 'Geofencing', 'Live Tracking', 'Node.js', 'Tailwind'],
    image: hungryBitesImg,
    github: 'https://github.com/deepznavzz/safewalk',
    live: 'https://safewalk-y87y.onrender.com/',
    featured: false,
    stats: 'Full-Stack MVP',
    highlights: [
      'Instant table-side QR code ordering',
      'Live kitchen status tracking with websockets',
      'Geofenced pickup notifications'
    ]
  },
  {
    id: 'code-studio',
    title: 'Code Studio',
    subtitle: 'Collaborative Developer Code & Snippet Vault',
    category: 'Full-Stack',
    description: 'A sleek cloud-based developer canvas for creating, tagging, testing, and sharing reusable code snippets and algorithmic recipes in real-time.',
    tags: ['Firebase', 'React', 'Monaco Editor', 'UX', 'Vite'],
    image: codeStudioImg,
    github: 'https://github.com/deepznavzz/timecapsule',
    live: 'https://digital-time-capsule-ztsp.onrender.com',
    featured: false,
    stats: 'Developer Utility',
    highlights: [
      'Syntax highlighting for 20+ programming languages',
      'Real-time cloud backup & instant shareable links',
      'Clean keyboard-driven UI'
    ]
  },
  {
    id: 'qr-maker',
    title: 'QR Maker Studio',
    subtitle: 'Custom Vector QR Generator with Dynamic Styling',
    category: 'Tools',
    description: 'Generate high-resolution customizable vector QR codes with customized color palettes, embedded icons, corner presets, and instant SVG/PNG exports.',
    tags: ['React', 'SVG Canvas', 'Vite', 'Client-side Utility'],
    image: qrMakerImg,
    github: 'https://github.com/deepznavzz/timecapsule',
    live: 'https://digital-time-capsule-ztsp.onrender.com',
    featured: false,
    stats: 'Micro-Tool',
    highlights: [
      'Zero-latency client-side generation',
      'Custom gradient palettes and brand logos',
      'High-DPI SVG and PNG download formats'
    ]
  },
  {
    id: 'sudoku-lab',
    title: 'Sudoku Lab',
    subtitle: 'Algorithmic Visualizer & Backtracking Engine',
    category: 'Tools',
    description: 'An interactive algorithm simulator that visualizes constraint satisfaction and recursive backtracking in action with adjustable speed and step-by-step logs.',
    tags: ['Algorithms', 'Backtracking', 'React', 'Visualization'],
    image: sLabImg,
    github: 'https://github.com/deepznavzz/timecapsule',
    live: 'https://digital-time-capsule-ztsp.onrender.com',
    featured: false,
    stats: 'Algorithmic Lab',
    highlights: [
      'Step-by-step recursion visualizer',
      'Algorithmic complexity & call-stack metrics',
      'Instant solver with puzzle difficulty generator'
    ]
  }
];

export const TECH_STACK = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', level: 'Advanced', icon: 'Code', highlight: 'AI / Backend' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', icon: 'Code', highlight: 'Frontend / Fullstack' },
      { name: 'C++', level: 'Proficient', icon: 'Terminal', highlight: 'DSA / Competitive' },
      { name: 'Java', level: 'Proficient', icon: 'Coffee', highlight: 'OOP / Enterprise' },
      { name: 'HTML5 & CSS3', level: 'Expert', icon: 'Layout', highlight: 'Semantic & Responsive' }
    ]
  },
  {
    category: 'Frontend Engineering',
    skills: [
      { name: 'React 19', level: 'Advanced', icon: 'Layers', highlight: 'Hooks, Suspense, State' },
      { name: 'Tailwind CSS', level: 'Expert', icon: 'Palette', highlight: 'Design Systems' },
      { name: 'Motion Dev / Framer', level: 'Advanced', icon: 'Sparkles', highlight: 'Physics Animations' },
      { name: 'GSAP & ScrollTrigger', level: 'Proficient', icon: 'Zap', highlight: 'Timeline Scrubbing' },
      { name: 'Three.js & Canvas', level: 'Learning', icon: 'Globe', highlight: '3D Interactions' }
    ]
  },
  {
    category: 'Backend & Cloud',
    skills: [
      { name: 'Node.js & Express', level: 'Advanced', icon: 'Server', highlight: 'RESTful Architecture' },
      { name: 'Flask / FastAPI', level: 'Advanced', icon: 'Cpu', highlight: 'Microservices & AI' },
      { name: 'Supabase & PostgreSQL', level: 'Proficient', icon: 'Database', highlight: 'Relational & Auth' },
      { name: 'Firebase', level: 'Proficient', icon: 'Flame', highlight: 'Realtime Database' },
      { name: 'AWS Foundations', level: 'Certified', icon: 'Cloud', highlight: 'S3, EC2, Lambda' }
    ]
  },
  {
    category: 'DevOps & Tools',
    skills: [
      { name: 'Git & GitHub Actions', level: 'Advanced', icon: 'GitBranch', highlight: 'CI/CD Pipelines' },
      { name: 'Vite & Build Tools', level: 'Expert', icon: 'Zap', highlight: 'Bundling Optimization' },
      { name: 'Postman & REST Testing', level: 'Certified', icon: 'CheckCircle', highlight: 'API Contracts' },
      { name: 'Figma', level: 'Proficient', icon: 'Figma', highlight: 'UI Wireframing' },
      { name: 'Vercel & Render', level: 'Advanced', icon: 'Send', highlight: 'Production Deployments' }
    ]
  },
  {
    category: 'AI & Next-Gen',
    skills: [
      { name: 'Generative AI & LLMs', level: 'Advanced', icon: 'Brain', highlight: 'Prompt Engineering' },
      { name: 'OpenAI & Claude APIs', level: 'Advanced', icon: 'Cpu', highlight: 'Tool Calling / RAG' },
      { name: 'Computer Vision', level: 'Intermediate', icon: 'Eye', highlight: 'Facial Analysis' },
      { name: 'Rust (Exploring)', level: 'Learning', icon: 'Shield', highlight: 'Systems Memory Safety' }
    ]
  }
];

export const MARQUEE_ITEMS = [
  { name: 'React 19', color: '#61DAFB' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Tailwind CSS', color: '#06B6D4' },
  { name: 'Node.js', color: '#339933' },
  { name: 'C++', color: '#00599C' },
  { name: 'Flask', color: '#F2F4F8' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'Framer Motion', color: '#FF0055' },
  { name: 'GSAP', color: '#88CE02' },
  { name: 'AWS Cloud', color: '#FF9900' },
  { name: 'Generative AI', color: '#C8A45C' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Vite', color: '#646CFF' },
  { name: 'Three.js', color: '#FFFFFF' }
];

export const CERTIFICATION_CATEGORIES = [
  {
    id: 'hackathon',
    title: 'Hackathons & Sprints',
    badge: 'National & Global',
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
        description: 'Awarded for extraordinary frontend aesthetics, smooth micro-interactions, and accessible UI in high-speed product sprint.',
        skills: ['GSAP Animations', 'UI/UX Design', 'Full-Stack Web']
      }
    ]
  },
  {
    id: 'university',
    title: 'University Competitions',
    badge: 'Campus & State Honors',
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

export const TESTIMONIAL = {
  quote: "Where others see complexity, I see something waiting to be engineered.",
  author: "Collaborator, Product Team",
  badge: "Featured on product showcases & dev communities",
  highlights: [
    "Clean & Scalable Code",
    "Lightning Fast Problem Solving",
    "Exceptional Motion & Design Taste"
  ]
};
