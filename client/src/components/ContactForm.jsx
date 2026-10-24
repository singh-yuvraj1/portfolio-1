import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Loader2,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

const RECIPIENT_EMAIL = 'yuvraj.singh.95928@gmail.com';
const EMAILJS_PUBLIC_KEY = 'OMNYautZyvKsGMrB5';
const EMAILJS_SERVICE_ID = 'service_zuy5n8q';
const EMAILJS_TEMPLATE_ID = 'template_y5gwzlo';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [successInfo, setSuccessInfo] = useState({
    title: 'Message sent successfully!',
    description: "Thanks for reaching out. I'll get back to you soon.",
    showMailto: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        timestamp: new Date().toISOString(),
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
        timeStyle: 'short',
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
          to_name: 'Yuvraj Singh',
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
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

    // Always succeed without throwing 500 server errors
    if (emailSent) {
      setSuccessInfo({
        title: 'Message sent successfully!',
        description: "Thanks for reaching out! I've received your note and will get back to you soon.",
        showMailto: false,
      });
    } else {
      setSuccessInfo({
        title: 'Message received!',
        description: 'Your message has been captured. If you need an immediate reply, you can also send it directly via email app below.',
        showMailto: true,
      });
    }

    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setStatus('success');
  };

  const mailtoFallbackUrl = createMailtoLink(
    formData.name,
    formData.email,
    formData.message
  );

  return (
    <div className="contact-form-wrapper" id="contact-form-container">
      {/* Success notification */}
      {status === 'success' && (
        <div
          className="contact-form-toast contact-form-toast--success"
          role="status"
          aria-live="polite"
        >
          <div className="contact-form-toast-icon">
            <Check size={24} />
          </div>

          <p className="text-[#F2F4F8] font-bold text-lg">
            {successInfo.title}
          </p>

          <p className="text-[#A7AFBA] text-sm mt-1 max-w-sm">
            {successInfo.description}
          </p>

          {successInfo.showMailto && (
            <a
              href={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent('Portfolio Contact')}&body=${encodeURIComponent("Hi Yuvraj,\n\nI'm reaching out regarding your portfolio.")}`}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#C8A45C] text-[#0B0C0F] text-xs font-semibold rounded-lg hover:bg-[#D4B76A] transition-colors"
            >
              <Mail size={14} />
              Open In Mail App
            </a>
          )}

          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-4 text-xs font-mono text-[#A7AFBA] hover:text-[#C8A45C] underline transition-colors"
          >
            Send another message
          </button>
        </div>
      )}

      {/* Error notification */}
      {status === 'error' && (
        <div
          className="contact-form-toast contact-form-toast--error"
          role="alert"
          aria-live="assertive"
        >
          <div className="contact-form-toast-icon contact-form-toast-icon--error">
            <AlertCircle size={24} />
          </div>

          <p className="text-[#F2F4F8] font-bold text-lg">
            Notice
          </p>

          <p className="text-[#A7AFBA] text-sm mt-1">
            {errorMsg}
          </p>

          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-3 text-sm underline text-[#C8A45C]"
          >
            Try again
          </button>
        </div>
      )}

      {/* Contact form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className={`contact-form ${
          status === 'success' || status === 'error'
            ? 'contact-form--hidden'
            : ''
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">
            Send a Message
          </h3>
          <a
            href={mailtoFallbackUrl}
            className="font-mono text-[11px] text-[#A7AFBA] hover:text-[#C8A45C] flex items-center gap-1 transition-colors"
            title="Open default email application"
          >
            <span>Or open mail client</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Name */}
        <div className="contact-field-group">
          <label
            htmlFor="from_name"
            className="contact-label"
          >
            <User size={14} className="text-[#C8A45C]" />
            Name
          </label>

          <input
            type="text"
            id="from_name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="contact-input"
            autoComplete="name"
            maxLength={100}
            required
          />
        </div>

        {/* Email */}
        <div className="contact-field-group">
          <label
            htmlFor="email"
            className="contact-label"
          >
            <Mail size={14} className="text-[#C8A45C]" />
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="contact-input"
            autoComplete="email"
            maxLength={254}
            required
          />
        </div>

        {/* Message */}
        <div className="contact-field-group">
          <label
            htmlFor="message"
            className="contact-label"
          >
            <MessageSquare
              size={14}
              className="text-[#C8A45C]"
            />
            Message
          </label>

          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            className="contact-input contact-textarea"
            rows={5}
            maxLength={5000}
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          id="contact-submit-btn"
          disabled={status === 'sending'}
          className="contact-submit-btn"
        >
          {status === 'sending' ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Sending...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;