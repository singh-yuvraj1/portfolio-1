import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  FolderGit2,
  User,
  Cpu,
  Award,
  Mail,
  Github,
  Linkedin,
  FileText,
  Copy,
  Check,
  ArrowUpRight,
  Terminal
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../../data/portfolioData';

export const CommandPalette = ({
  open,
  onOpenChange,
  onNavigate,
  onSelectProject
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const handleNav = (id) => {
    onOpenChange(false);
    onNavigate(id);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => {
        setCopiedEmail(false);
        onOpenChange(false);
      }, 900);
    } catch {
      onOpenChange(false);
    }
  };

  const handleOpenExternal = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onOpenChange(false);
  };

  const handleProjectSelect = (project) => {
    onOpenChange(false);
    onNavigate('projects');
    setTimeout(() => {
      onSelectProject(project);
    }, 220);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center pt-[14vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0E0F14]/95 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            <Command label="Developer Command Palette" className="w-full">
              {/* Search Header */}
              <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
                <Search size={16} className="text-[#FF5E2B] shrink-0" />
                <Command.Input
                  autoFocus
                  placeholder="Jump to section, inspect a build, or run action..."
                  className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none font-mono"
                />
                <kbd className="hidden sm:inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                  ESC
                </kbd>
              </div>

              {/* Command Items */}
              <Command.List className="max-h-[360px] overflow-y-auto p-2 space-y-1">
                <Command.Empty className="py-10 text-center font-mono text-xs text-zinc-500">
                  No matching commands or projects found.
                </Command.Empty>

                <Command.Group
                  heading="Navigation"
                  className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500"
                >
                  {[
                    { id: 'hero', label: 'Home / Overview', icon: Home, shortcut: 'G H' },
                    { id: 'projects', label: 'Selected Projects', icon: FolderGit2, shortcut: 'G P' },
                    { id: 'about', label: 'About & Philosophy', icon: User, shortcut: 'G A' },
                    { id: 'stack', label: 'Tech Stack & Systems', icon: Cpu, shortcut: 'G S' },
                    { id: 'certifications', label: 'Credentials & Honors', icon: Award, shortcut: 'G C' },
                    { id: 'contact', label: 'Initiate Contact', icon: Mail, shortcut: 'G M' }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Command.Item
                        key={item.id}
                        value={item.label}
                        onSelect={() => handleNav(item.id)}
                        className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-300 aria-selected:bg-[#FF5E2B]/15 aria-selected:text-white transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={15} className="text-[#FF5E2B]" />
                          <span>{item.label}</span>
                        </div>
                        <span className="font-mono text-[10px] text-zinc-500">{item.shortcut}</span>
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-white/[0.06]" />

                <Command.Group
                  heading="Inspect Builds"
                  className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500"
                >
                  {PROJECTS.map((project) => (
                    <Command.Item
                      key={project.id}
                      value={`${project.title} ${project.category} ${project.tags.join(' ')}`}
                      onSelect={() => handleProjectSelect(project)}
                      className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-300 aria-selected:bg-[#FF5E2B]/15 aria-selected:text-white transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Terminal size={14} className="text-zinc-400 shrink-0" />
                        <span className="truncate font-medium">{project.title}</span>
                        <span className="hidden sm:inline-block rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                          {project.category}
                        </span>
                      </div>
                      <ArrowUpRight size={14} className="text-zinc-500 shrink-0" />
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-white/[0.06]" />

                <Command.Group
                  heading="Quick Actions"
                  className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500"
                >
                  <Command.Item
                    value="Copy Email Address"
                    onSelect={handleCopyEmail}
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-300 aria-selected:bg-[#FF5E2B]/15 aria-selected:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {copiedEmail ? (
                        <Check size={15} className="text-emerald-400" />
                      ) : (
                        <Copy size={15} className="text-[#FF5E2B]" />
                      )}
                      <span>{copiedEmail ? 'Email copied to clipboard!' : `Copy ${PERSONAL_INFO.email}`}</span>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500">COPY</span>
                  </Command.Item>

                  <Command.Item
                    value="Open Resume PDF"
                    onSelect={() => handleOpenExternal(PERSONAL_INFO.resumeUrl)}
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-300 aria-selected:bg-[#FF5E2B]/15 aria-selected:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={15} className="text-[#FF5E2B]" />
                      <span>View Résumé</span>
                    </div>
                    <ArrowUpRight size={14} className="text-zinc-500" />
                  </Command.Item>

                  <Command.Item
                    value="Open GitHub Profile"
                    onSelect={() => handleOpenExternal(PERSONAL_INFO.github)}
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-300 aria-selected:bg-[#FF5E2B]/15 aria-selected:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Github size={15} className="text-zinc-300" />
                      <span>GitHub (@singh-yuvraj1)</span>
                    </div>
                    <ArrowUpRight size={14} className="text-zinc-500" />
                  </Command.Item>

                  <Command.Item
                    value="Open LinkedIn Profile"
                    onSelect={() => handleOpenExternal(PERSONAL_INFO.linkedin)}
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-300 aria-selected:bg-[#FF5E2B]/15 aria-selected:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin size={15} className="text-zinc-300" />
                      <span>LinkedIn</span>
                    </div>
                    <ArrowUpRight size={14} className="text-zinc-500" />
                  </Command.Item>
                </Command.Group>
              </Command.List>

              {/* Footer Hint */}
              <div className="flex items-center justify-between border-t border-white/[0.06] bg-black/30 px-4 py-2 font-mono text-[10px] text-zinc-500">
                <span>Use ↑↓ arrows to navigate · Enter to select</span>
                <span>⌘K / Ctrl+K</span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

