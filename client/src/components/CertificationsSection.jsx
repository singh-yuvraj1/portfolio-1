import React, { useState } from 'react';
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
  Copy,
  Check,
  Search,
  Filter,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { CERTIFICATION_CATEGORIES } from '../data/portfolioData';

export const CertificationsSection = () => {
  const [selectedCatId, setSelectedCatId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Flatten certificates for search or filter
  const allCertificates = CERTIFICATION_CATEGORIES.flatMap((cat) =>
    cat.certificates.map((cert) => ({
      ...cert,
      categoryTitle: cat.title,
      categoryColor: cat.color,
      categoryId: cat.id
    }))
  );

  const filteredCerts = allCertificates.filter((cert) => {
    const matchesCategory = selectedCatId === 'all' || cert.categoryId === selectedCatId;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.credentialId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyCredential = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'hackathon':
        return <Trophy size={14} />;
      case 'university':
        return <Award size={14} />;
      case 'geeksforgeeks':
        return <Code2 size={14} />;
      case 'cloud-web':
        return <Cloud size={14} />;
      case 'ai-ml':
        return <Brain size={14} />;
      default:
        return <Layers size={14} />;
    }
  };

  return (
    <section id="certifications" className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08090C]">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8A45C] uppercase mb-3">
              <ShieldCheck size={14} />
              <span>Verified Honors & Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#F2F4F8]">
              Proven Capabilities.
            </h2>
            <p className="text-sm sm:text-base text-[#A7AFBA] mt-3 max-w-xl font-light">
              20 verified achievements across hackathons, algorithmic leagues, cloud architectures, and machine learning specializations.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 md:mt-0 relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7AFBA]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certs or skills..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[rgba(20,24,32,0.8)] border border-[rgba(242,244,248,0.1)] text-xs font-mono text-[#F2F4F8] placeholder-[#A7AFBA]/60 focus:outline-none focus:border-[#C8A45C] transition-colors"
            />
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCatId('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 border ${
              selectedCatId === 'all'
                ? 'bg-[#C8A45C] text-[#0B0C0F] font-bold border-[#C8A45C] shadow-[0_0_15px_rgba(200,164,92,0.3)]'
                : 'bg-[rgba(18,22,29,0.7)] text-[#A7AFBA] border-white/5 hover:border-[#C8A45C]/40 hover:text-white'
            }`}
          >
            <Layers size={13} />
            <span>All Honors ({allCertificates.length})</span>
          </button>

          {CERTIFICATION_CATEGORIES.map((cat) => {
            const isSelected = selectedCatId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#C8A45C] text-[#0B0C0F] font-bold border-[#C8A45C] shadow-[0_0_15px_rgba(200,164,92,0.3)]'
                    : 'bg-[rgba(18,22,29,0.7)] text-[#A7AFBA] border-white/5 hover:border-[#C8A45C]/40 hover:text-white'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.title} ({cat.certificates.length})</span>
              </button>
            );
          })}
        </div>

        {/* Certificates Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <AnimatePresence>
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(242,244,248,0.08)] bg-[rgba(16,19,26,0.75)] p-6 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-[#C8A45C]/40 hover:-translate-y-1"
              >
                {/* Glow Accent Stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: cert.categoryColor || '#C8A45C' }}
                />

                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md bg-[#C8A45C]/15 text-[#E5C37A] border border-[#C8A45C]/30">
                      {cert.type}
                    </span>
                    <span className="text-[11px] font-mono text-[#A7AFBA] flex items-center gap-1">
                      <Calendar size={12} />
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#F2F4F8] group-hover:text-[#E5C37A] transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <p className="text-xs font-mono text-[#C8A45C] mt-1">
                    {cert.issuer}
                  </p>

                  <p className="text-xs text-[#A7AFBA] mt-3 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 text-[10px] font-mono text-[#D1D5DB] rounded bg-white/5 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Credential ID & Verify Link */}
                <div className="mt-5 pt-4 border-t border-[rgba(242,244,248,0.08)] flex items-center justify-between text-xs font-mono">
                  {/* Credential ID Copy Button */}
                  <button
                    onClick={() => handleCopyCredential(cert.credentialId)}
                    className="flex items-center gap-1.5 text-[#A7AFBA] hover:text-[#C8A45C] transition-colors group/copy"
                    title="Click to copy credential ID"
                  >
                    {copiedId === cert.credentialId ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span className="text-[11px] truncate max-w-[140px] sm:max-w-[200px]">
                          {cert.credentialId}
                        </span>
                      </>
                    )}
                  </button>

                  {/* Live Credential Link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#C8A45C] hover:text-[#F5DE9C] transition-colors font-medium text-[11px]"
                    >
                      <span>Verify</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-16 text-[#A7AFBA] font-mono text-sm">
            No certificates match "{searchQuery}". Try a different keyword or category.
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
