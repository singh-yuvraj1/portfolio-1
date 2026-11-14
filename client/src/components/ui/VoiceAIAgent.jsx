import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Compass,
  CornerDownLeft,
  FolderGit2,
  Briefcase,
  Layers,
  Award,
  User,
  Mail,
  FileText,
  ArrowUp,
  ArrowDown,
  ShieldCheck
} from 'lucide-react';

/**
 * VoiceAIAgent
 * An ultra-reliable, responsive AI Voice Navigator for Yuvraj's portfolio.
 * Listens to speech commands via Web Speech API (SpeechRecognition / webkitSpeechRecognition),
 * provides instant visual and audio feedback, smoothly scrolls to sections,
 * and includes one-tap quick action buttons and text input fallbacks.
 */
export const VoiceAIAgent = ({
  heroRef,
  workRef,
  aboutRef,
  experienceRef,
  techStackRef,
  certificationsRef,
  testimonialsRef,
  contactRef,
  resumeUrl = "https://drive.google.com/file/d/1uYP4oG0wECtcAfMej1FFGQHrTrqD1PkY/view?usp=drivesdk"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState('Ready for your command');
  const [lastAction, setLastAction] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);

  // Mutable refs to prevent stale closure bugs inside Web Speech callbacks
  const isListeningRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const restartTimeoutRef = useRef(null);
  const lastActionTimeRef = useRef(0);

  // Quick navigation chips configuration
  const QUICK_COMMANDS = [
    { label: 'Projects', icon: FolderGit2, command: 'open projects' },
    { label: 'Experience', icon: Briefcase, command: 'go to experience' },
    { label: 'Skills', icon: Layers, command: 'show tech stack' },
    { label: 'Certifications', icon: Award, command: 'show certifications' },
    { label: 'Badges', icon: ShieldCheck, command: 'show badges' },
    { label: 'About', icon: User, command: 'about me' },
    { label: 'Contact', icon: Mail, command: 'contact yuvraj' },
    { label: 'Resume', icon: FileText, command: 'download resume' },
    { label: 'Top', icon: ArrowUp, command: 'scroll to top' }
  ];

  // Voice synthesis audio feedback with anti-echo protection
  const speakResponse = useCallback((text) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      // Prevent garbage collection in Chrome mid-speech
      window.__voice_utterance = utterance;

      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(v =>
        v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David'))
      );
      if (naturalVoice) utterance.voice = naturalVoice;

      isSpeakingRef.current = true;
      setIsSpeaking(true);

      const finishSpeech = () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
      };

      utterance.onend = finishSpeech;
      utterance.onerror = finishSpeech;

      // Safety timeout in case onend doesn't trigger
      setTimeout(finishSpeech, 4000);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      isSpeakingRef.current = false;
      setIsSpeaking(false);
    }
  }, [isMuted]);

  // Smooth scroll with fixed navbar offset
  const scrollToRef = useCallback((ref, sectionName, spokenText) => {
    if (ref && ref.current) {
      const navOffset = 75;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });

      setStatusMessage(`Navigating to ${sectionName}...`);
      setLastAction(`Opened ${sectionName}`);
      speakResponse(spokenText || `Opening ${sectionName}.`);
      return true;
    }
    return false;
  }, [speakResponse]);

  // Main Command & Natural Language Intent Parser
  const executeCommand = useCallback((commandText, shouldSpeakFallback = true) => {
    const raw = (commandText || '').toLowerCase().trim();
    if (!raw) return false;

    // 1. Projects Section
    if (
      raw.includes('project') ||
      raw.includes('work') ||
      raw.includes('portfolio') ||
      raw.includes('app') ||
      raw.includes('build') ||
      raw.includes('case study') ||
      raw.includes('hiremind') ||
      raw.includes('tasktitan') ||
      raw.includes('safewalk') ||
      raw.includes('hungry')
    ) {
      return scrollToRef(workRef, 'Selected Projects', 'Opening Selected Projects.');
    }

    // 2. Experience & Leadership
    if (
      raw.includes('experience') ||
      raw.includes('intern') ||
      raw.includes('training') ||
      raw.includes('career') ||
      raw.includes('leadership') ||
      raw.includes('job') ||
      raw.includes('ansh') ||
      raw.includes('gfg') ||
      raw.includes('geeksforgeeks') ||
      raw.includes('ambassador') ||
      raw.includes('mantri')
    ) {
      return scrollToRef(experienceRef, 'Experience & Leadership', 'Taking you to Experience and Leadership.');
    }

    // 3. Tech Stack & Skills
    if (
      raw.includes('tech stack') ||
      raw.includes('stack') ||
      raw.includes('skill') ||
      raw.includes('technolog') ||
      raw.includes('language') ||
      raw.includes('tools') ||
      raw.includes('framework')
    ) {
      return scrollToRef(techStackRef, 'Tech Stack', 'Displaying Tech Stack and Skills.');
    }

    // 4. Badges & Milestones
    if (raw.includes('badge') || raw.includes('milestone')) {
      if (testimonialsRef && testimonialsRef.current) {
        return scrollToRef(testimonialsRef, 'Badges & Milestones', 'Opening Badges and Milestones.');
      } else {
        return scrollToRef(certificationsRef, 'Certifications', 'Opening Certifications.');
      }
    }

    // 5. Certifications & Credentials
    if (
      raw.includes('certif') ||
      raw.includes('credential') ||
      raw.includes('award') ||
      raw.includes('achievement') ||
      raw.includes('aws')
    ) {
      return scrollToRef(certificationsRef, 'Certifications', 'Opening Certifications and Credentials.');
    }

    // 6. About Section
    if (
      raw.includes('about') ||
      raw.includes('who are you') ||
      raw.includes('who is yuvraj') ||
      raw.includes('bio') ||
      raw.includes('background') ||
      raw.includes('introduce') ||
      raw.includes('story') ||
      raw.includes('profile')
    ) {
      return scrollToRef(aboutRef, 'About Section', 'Here is the About section and background.');
    }

    // 7. Contact & Hiring
    if (
      raw.includes('contact') ||
      raw.includes('hire') ||
      raw.includes('email') ||
      raw.includes('reach') ||
      raw.includes('touch') ||
      raw.includes('message') ||
      raw.includes('talk') ||
      raw.includes('say hi')
    ) {
      return scrollToRef(contactRef, 'Contact Hub', 'Navigating to Contact Hub.');
    }

    // 8. Resume
    if (
      raw.includes('resume') ||
      raw.includes('cv') ||
      raw.includes('curriculum')
    ) {
      setStatusMessage('Opening Yuvraj’s Resume...');
      setLastAction('Opened Resume');
      speakResponse('Opening Yuvraj’s resume.');
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
      return true;
    }

    // 9. Scroll to Top / Hero
    if (
      raw.includes('top') ||
      raw.includes('home') ||
      raw.includes('start') ||
      raw.includes('begin') ||
      raw.includes('back to top')
    ) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setStatusMessage('Scrolled to Top');
      setLastAction('Scrolled to Top');
      speakResponse('Scrolling back to the top.');
      return true;
    }

    // 10. Scroll Down
    if (raw.includes('scroll down') || raw.includes('go down') || raw.includes('page down')) {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      setStatusMessage('Scrolling down...');
      speakResponse('Scrolling down.');
      return true;
    }

    // 11. Scroll Up
    if (raw.includes('scroll up') || raw.includes('go up') || raw.includes('page up')) {
      window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
      setStatusMessage('Scrolling up...');
      speakResponse('Scrolling up.');
      return true;
    }

    // 12. GitHub / Socials
    if (raw.includes('github') || raw.includes('repo')) {
      setStatusMessage('Opening GitHub Profile...');
      speakResponse('Opening GitHub profile.');
      window.open('https://github.com/singh-yuvraj1', '_blank', 'noopener,noreferrer');
      return true;
    }

    if (raw.includes('linkedin')) {
      setStatusMessage('Opening LinkedIn Profile...');
      speakResponse('Opening LinkedIn profile.');
      window.open('https://www.linkedin.com/in/singh-yuvraj2131/', '_blank', 'noopener,noreferrer');
      return true;
    }

    // 13. Close / Minimize
    if (raw.includes('close') || raw.includes('minimize') || raw.includes('hide')) {
      setIsOpen(false);
      speakResponse('Minimizing voice navigator.');
      return true;
    }

    // 14. Mute / Unmute
    if (raw.includes('mute') || raw.includes('quiet') || raw.includes('silent')) {
      setIsMuted(true);
      setStatusMessage('Audio feedback muted');
      return true;
    }

    if (raw.includes('unmute')) {
      setIsMuted(false);
      setStatusMessage('Audio feedback enabled');
      speakResponse('Audio feedback enabled.');
      return true;
    }

    // Fallback if triggered via explicit submit or final result
    if (shouldSpeakFallback) {
      setStatusMessage(`Heard: "${commandText}" • Try "open projects" or "skills"`);
      speakResponse("I didn't recognize that section. Try saying 'open projects' or 'skills'.");
    }

    return false;
  }, [
    workRef,
    experienceRef,
    techStackRef,
    certificationsRef,
    testimonialsRef,
    aboutRef,
    contactRef,
    resumeUrl,
    scrollToRef,
    speakResponse
  ]);

  // Initialize Speech Recognition once
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasSpeechSupport(false);
      setStatusMessage('Voice recognition not supported. Use shortcuts or text input below.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        isListeningRef.current = true;
        setStatusMessage('Listening... Speak a command');
      };

      recognition.onresult = (event) => {
        // Prevent feedback loop when agent is speaking aloud
        if (isSpeakingRef.current) return;

        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const textChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += textChunk;
          } else {
            interimText += textChunk;
          }
        }

        const activeText = (finalText || interimText).trim();
        if (activeText) {
          setTranscript(activeText);

          // Fast-path intent matching: execute immediately when command keyword heard
          const now = Date.now();
          if (now - lastActionTimeRef.current > 1300) {
            const matched = executeCommand(activeText, false);
            if (matched) {
              lastActionTimeRef.current = now;
              setTimeout(() => setTranscript(''), 2200);
            }
          }
        }
      };

      recognition.onerror = (event) => {
        if (event.error === 'not-allowed') {
          setStatusMessage('Microphone access blocked. Allow mic in browser address bar.');
          setIsListening(false);
          isListeningRef.current = false;
        } else if (event.error === 'no-speech') {
          // Normal silence, keep listening
        } else if (event.error === 'audio-capture') {
          setStatusMessage('Microphone not detected or in use by another app.');
        }
      };

      recognition.onend = () => {
        // Asynchronous safe restart using mutable ref to bypass stale closures
        if (isListeningRef.current) {
          if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
          restartTimeoutRef.current = setTimeout(() => {
            if (isListeningRef.current && recognitionRef.current) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                // Ignore already-started errors
              }
            }
          }, 250);
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('SpeechRecognition init error:', err);
      setHasSpeechSupport(false);
    }

    return () => {
      isListeningRef.current = false;
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, [executeCommand]);

  // Toggle listening button handler
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListeningRef.current) {
      isListeningRef.current = false;
      setIsListening(false);
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setStatusMessage('Mic paused • Click mic to speak');
    } else {
      isListeningRef.current = true;
      setIsListening(true);
      setStatusMessage('Starting microphone...');
      try {
        recognitionRef.current.start();
      } catch (err) {
        // In case start was already called
        console.warn('Recognition start warning:', err);
      }
    }
  };

  // Text input submit fallback
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    executeCommand(textInput, true);
    setTextInput('');
  };

  return (
    <>
      {/* ========================================================
          FLOATING AI AGENT TRIGGER (Gold Luxury Glass Capsule)
          ======================================================== */}
      <div className="fixed bottom-5 sm:bottom-7 right-5 sm:right-7 z-50 flex flex-col items-end pointer-events-auto select-none">
        
        {/* Floating Quick Action Toast */}
        <AnimatePresence>
          {lastAction && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="mb-3 px-3.5 py-1.5 rounded-full bg-[rgba(14,18,26,0.95)] border border-[#C8A45C]/40 text-[#E5C37A] font-mono text-[11px] shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-2"
            >
              <Sparkles size={12} className="text-[#C8A45C] animate-pulse" />
              <span>{lastAction}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => {
              setIsOpen(true);
              if (hasSpeechSupport && !isListeningRef.current) {
                toggleListening();
              }
            }}
            className="group relative flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-[rgba(14,18,26,0.92)] border border-[rgba(200,164,92,0.4)] shadow-[0_15px_45px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300 hover:border-[#C8A45C] hover:shadow-[0_15px_45px_rgba(200,164,92,0.3)]"
            title="Open AI Voice Navigator"
          >
            {/* Luminous Glow Halo */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C8A45C]/25 via-[#E5C37A]/35 to-[#C8A45C]/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity -z-10" />

            {/* Glowing AI Voice Orb */}
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A45C] to-[#8C6A28] p-[1.5px] shadow-[0_0_15px_rgba(200,164,92,0.5)] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0B0C0F] flex items-center justify-center">
                {isListening ? (
                  <div className="flex items-center gap-0.5">
                    <span className="w-1 h-3 rounded-full bg-[#E5C37A] animate-pulse" />
                    <span className="w-1 h-4 rounded-full bg-[#C8A45C] animate-pulse delay-75" />
                    <span className="w-1 h-2 rounded-full bg-[#E5C37A] animate-pulse delay-150" />
                  </div>
                ) : (
                  <Mic size={15} className="text-[#E5C37A] group-hover:scale-110 transition-transform" />
                )}
              </div>
            </div>

            {/* Label & Status */}
            <div className="flex flex-col text-left pr-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C8A45C] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45C] animate-pulse" />
                AI Agent
              </span>
              <span className="font-mono text-xs font-bold text-[#F2F4F8] tracking-wide">
                Voice Navigator
              </span>
            </div>
          </motion.button>
        )}

        {/* ========================================================
            EXPANDED AI VOICE ASSISTANT CARD / TERMINAL
            ======================================================== */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-[92vw] sm:w-[380px] max-w-[420px] rounded-3xl bg-[rgba(14,18,26,0.97)] border border-[rgba(200,164,92,0.4)] shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-5 flex flex-col gap-3.5 text-[#F2F4F8] relative overflow-hidden"
            >
              {/* Top Atmospheric Aura */}
              <div className="pointer-events-none absolute -top-20 -right-20 w-44 h-44 rounded-full bg-[#C8A45C]/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-[#E5C37A]/10 blur-3xl" />

              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C8A45C]/15 border border-[#C8A45C]/35 flex items-center justify-center text-[#E5C37A]">
                    <Compass size={16} />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#F2F4F8] tracking-wider uppercase flex items-center gap-1.5">
                      AI Voice Navigator
                      <span className="px-1.5 py-0.2 rounded bg-[#C8A45C]/20 text-[#E5C37A] text-[9px] font-mono">
                        Active
                      </span>
                    </h4>
                    <span className="font-mono text-[10px] text-[#A7AFBA] block">
                      Speak or tap any section below
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Mute Speech Synthesis Audio */}
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#A7AFBA] hover:text-[#C8A45C] hover:bg-white/10 transition-colors"
                    title={isMuted ? "Unmute voice responses" : "Mute voice responses"}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>

                  {/* Close Expanded Card */}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#A7AFBA] hover:text-[#F2F4F8] hover:bg-white/10 transition-colors"
                    title="Minimize"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Live Waveform & Listening State Visualizer */}
              <div className="relative z-10 p-4 rounded-2xl bg-[#0B0C0F]/90 border border-white/5 flex flex-col items-center justify-center gap-2.5">
                {/* Visualizer Pulsing Core */}
                <div className="relative flex items-center justify-center py-1">
                  {isListening && (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute w-20 h-20 rounded-full border border-[#C8A45C]/40"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0.2, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                        className="absolute w-16 h-16 rounded-full bg-[#C8A45C]/10"
                      />
                    </>
                  )}

                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                      isListening
                        ? 'bg-gradient-to-br from-[#C8A45C] to-[#997633] text-[#0B0C0F] scale-105 shadow-[0_0_25px_rgba(200,164,92,0.6)]'
                        : 'bg-white/10 text-[#A7AFBA] hover:text-[#F2F4F8] hover:bg-white/15'
                    }`}
                    title={isListening ? "Click to stop listening" : "Click to speak"}
                  >
                    {isListening ? (
                      <Mic size={22} className="animate-pulse text-[#0B0C0F]" />
                    ) : (
                      <MicOff size={20} />
                    )}
                  </button>
                </div>

                {/* Animated Vocal Bars */}
                {isListening ? (
                  <div className="flex items-center gap-1 h-4">
                    {[10, 16, 22, 14, 18, 24, 12, 16].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: [4, h, 4] }}
                        transition={{
                          duration: 0.55 + (i * 0.08),
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'easeInOut'
                        }}
                        className="w-1 rounded-full bg-[#E5C37A]"
                      />
                    ))}
                  </div>
                ) : (
                  <span className="font-mono text-[10px] text-[#A7AFBA] uppercase tracking-wider">
                    Mic paused • Click to start
                  </span>
                )}

                {/* Status Message & Live Hearing Subtitle */}
                <div className="text-center px-2 w-full">
                  <p className="font-mono text-xs text-[#E5C37A] font-medium leading-relaxed">
                    {statusMessage}
                  </p>
                  {transcript && isListening && (
                    <div className="mt-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45C] animate-ping" />
                      <span className="font-mono text-[11px] text-[#F2F4F8] truncate max-w-[280px]">
                        "{transcript}"
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* One-Tap Navigation Shortcuts */}
              <div className="relative z-10 flex flex-col gap-1.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#A7AFBA]/80 block px-1">
                  Instant Navigation Shortcuts
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {QUICK_COMMANDS.map((cmd, idx) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => executeCommand(cmd.command, true)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-[#C8A45C]/15 hover:border-[#C8A45C]/40 text-[#F2F4F8] hover:text-[#E5C37A] font-mono text-[11px] transition-all duration-200"
                      >
                        <Icon size={12} className="text-[#C8A45C] shrink-0" />
                        <span className="truncate">{cmd.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text Input Fallback Bar */}
              <form onSubmit={handleTextSubmit} className="relative z-10 flex items-center gap-2 pt-2 border-t border-white/10">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Or type 'open projects'..."
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#F2F4F8] placeholder-[#A7AFBA]/60 focus:outline-none focus:border-[#C8A45C] focus:bg-white/10 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!textInput.trim()}
                  className="px-3 py-2 rounded-xl bg-[#C8A45C] text-[#0B0C0F] font-mono text-xs font-bold hover:bg-[#E5C37A] disabled:opacity-40 disabled:hover:bg-[#C8A45C] transition-all flex items-center justify-center shrink-0"
                  title="Execute command"
                >
                  <CornerDownLeft size={14} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default VoiceAIAgent;
