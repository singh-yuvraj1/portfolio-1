import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Loader2,
  Check,
  AlertCircle,
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const RECIPIENT_EMAIL = 'yuvraj.singh.95928@gmail.com';
const EMAILJS_PUBLIC_KEY = 'OMNYautZyvKsGMrB5';
const EMAILJS_SERVICE_ID = 'service_zuy5n8q';
const EMAILJS_TEMPLATE_ID = 'template_y5gwzlo';

const triggerCelebrationConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#C8A45C', '#E5C37A', '#F5DE9C', '#ffffff']
    });
  } catch (err) {
    // Non-critical confetti fallback
  }
};

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [successInfo, setSuccessInfo] = useState({
    title: 'Message sent successfully!',
    description: "Thanks for reaching out! I've received your note and will get back to you soon.",
    showMailto: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const createMailtoLink = (name, email, message) => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Yuvraj,\n\n${message || ''}\n\nBest regards,\n${name || ''}\nEmail: ${email || ''}`
    );
    return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Client-side validations
    if (!name || !email || !message) {
      setErrorMsg('Please fill in all fields.');
      setStatus('error');
      return;
    }

    if (name.length > 100) {
      setErrorMsg('Name cannot exceed 100 characters.');
      setStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 254) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    if (message.length > 5000) {
      setErrorMsg('Message cannot exceed 5000 characters.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    // Save message locally to preserve contact history in pure frontend mode
    try {
      const existing = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      existing.push({
        id: Date.now(),
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('portfolio_messages', JSON.stringify(existing));
    } catch {
      // LocalStorage access non-critical
    }

    // Try sending email via EmailJS with a 6-second timeout
    let emailSent = false;
    try {
      const now = new Date();
      const formattedTime = now.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const sendPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          from_name: name,
          email,
          from_email: email,
          message,
          time: formattedTime,
          to_name: 'Yuvraj Singh'
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY
        }
      );

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email service timed out')), 6000)
      );

      await Promise.race([sendPromise, timeoutPromise]);
      emailSent = true;
    } catch (sendError) {
      console.warn('Frontend email service note:', sendError?.message || sendError);
    }

    if (emailSent) {
      setSuccessInfo({
        title: 'Message delivered!',
        description: "Thanks for reaching out! I've received your note and will get back to you within 24-48 hours.",
        showMailto: false
      });
    } else {
      setSuccessInfo({
        title: 'Message captured!',
        description: 'Your note is saved locally. You can also send directly using your mail application below.',
        showMailto: true
      });
    }

    triggerCelebrationConfetti();
    setFormData({ name: '', email: '', message: '' });
    setStatus('success');
  };

  const mailtoFallbackUrl = createMailtoLink(
    formData.name,
    formData.email,
    formData.message
  );

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-[rgba(200,164,92,0.25)] bg-[rgba(16,19,26,0.85)] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
      <AnimatePresence mode="wait">
        {/* Success State */}
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-[#C8A45C]/20 border border-[#C8A45C] flex items-center justify-center text-[#C8A45C] mb-5 shadow-[0_0_25px_rgba(200,164,92,0.4)]">
              <Check size={32} />
            </div>

            <h3 className="text-2xl font-bold text-[#F2F4F8]">
              {successInfo.title}
            </h3>

            <p className="text-sm text-[#A7AFBA] max-w-md mt-2 leading-relaxed">
              {successInfo.description}
            </p>

            {successInfo.showMailto && (
              <a
                href={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent('Portfolio Contact')}&body=${encodeURIComponent("Hi Yuvraj,\n\nI'm reaching out regarding your portfolio.")}`}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C8A45C] px-5 py-2.5 text-xs font-semibold text-[#0B0C0F] hover:bg-[#D4B76A] transition-all"
              >
                <Mail size={14} />
                Open In Mail Client
              </a>
            )}

            <button
              onClick={() => setStatus('idle')}
              className="mt-6 text-xs font-mono text-[#C8A45C] hover:text-[#E5C37A] underline transition-colors"
            >
              Send another note
            </button>
          </motion.div>
        ) : status === 'error' ? (
          /* Error State */
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 mb-5">
              <AlertCircle size={32} />
            </div>

            <h3 className="text-xl font-bold text-[#F2F4F8]">
              Submission Error
            </h3>

            <p className="text-sm text-[#A7AFBA] max-w-sm mt-2">
              {errorMsg || 'Something went wrong. Please check the fields.'}
            </p>

            <button
              onClick={() => setStatus('idle')}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C8A45C] px-6 py-2.5 text-xs font-semibold text-[#0B0C0F]"
            >
              Try Again
            </button>
          </motion.div>
        ) : (
          /* Interactive Form */
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono tracking-[0.16em] uppercase text-[#C8A45C] font-semibold flex items-center gap-1.5">
                <Sparkles size={13} /> Send Direct Message
              </h3>
              <a
                href={mailtoFallbackUrl}
                className="text-[11px] font-mono text-[#A7AFBA] hover:text-[#C8A45C] flex items-center gap-1 transition-colors"
              >
                <span>External Mail</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="text-xs font-mono text-[#A7AFBA] mb-1.5 flex items-center gap-1.5"
              >
                <User size={13} className="text-[#C8A45C]" />
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={100}
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Morgan"
                className="w-full rounded-xl bg-[rgba(24,28,36,0.7)] border border-[rgba(242,244,248,0.1)] px-4 py-3 text-xs sm:text-sm text-[#F2F4F8] placeholder-[#A7AFBA]/50 focus:outline-none focus:border-[#C8A45C] focus:ring-1 focus:ring-[#C8A45C] transition-all"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-xs font-mono text-[#A7AFBA] mb-1.5 flex items-center gap-1.5"
              >
                <Mail size={13} className="text-[#C8A45C]" />
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="w-full rounded-xl bg-[rgba(24,28,36,0.7)] border border-[rgba(242,244,248,0.1)] px-4 py-3 text-xs sm:text-sm text-[#F2F4F8] placeholder-[#A7AFBA]/50 focus:outline-none focus:border-[#C8A45C] focus:ring-1 focus:ring-[#C8A45C] transition-all"
              />
            </div>

            {/* Message Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-mono text-[#A7AFBA] flex items-center gap-1.5"
                >
                  <MessageSquare size={13} className="text-[#C8A45C]" />
                  Project Brief or Message
                </label>
                <span className="text-[10px] font-mono text-[#A7AFBA]/60">
                  {formData.message.length}/5000
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                maxLength={5000}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about what you're building, timelines, or role details..."
                className="w-full rounded-xl bg-[rgba(24,28,36,0.7)] border border-[rgba(242,244,248,0.1)] px-4 py-3 text-xs sm:text-sm text-[#F2F4F8] placeholder-[#A7AFBA]/50 focus:outline-none focus:border-[#C8A45C] focus:ring-1 focus:ring-[#C8A45C] transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-xl bg-[#C8A45C] py-3.5 text-xs sm:text-sm font-semibold text-[#0B0C0F] transition-all duration-300 hover:bg-[#D4B76A] hover:shadow-[0_0_20px_rgba(200,164,92,0.4)] disabled:opacity-60 flex items-center justify-center gap-2 group cursor-pointer"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={16} className="animate-spin text-[#0B0C0F]" />
                  <span>Transmitting Note...</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Send Direct Message</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;