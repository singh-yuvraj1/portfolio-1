import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, User, Mail, MessageSquare, Loader2, Check, AlertCircle } from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// EmailJS credentials
// Public Key (User ID): provided by user
// Service ID & Template ID: user must create these in EmailJS dashboard
//   1. Go to https://dashboard.emailjs.com
//   2. Add an Email Service (e.g. Gmail) → copy the Service ID
//   3. Create an Email Template → copy the Template ID
//      Template variables: {{from_name}}, {{from_email}}, {{message}}
// ──────────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY = 'OMNYautZyvKsGMrB5';
const EMAILJS_SERVICE_ID = 'service_zuy5n8q'; // From user screenshot
const EMAILJS_TEMPLATE_ID = 'template_y5gwzlo'; // Reverted as requested

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState("I'll get back to you soon.");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all fields.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Unable to save your message. Please try again.');
      }

      let notificationSent = true;
      const now = new Date();
      const formattedTime = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: formData.name,
            from_name: formData.name,
            email: formData.email,
            message: formData.message,
            time: formattedTime,
            to_name: 'Navadeep',
          },
          EMAILJS_PUBLIC_KEY
        );
      } catch (err) {
        notificationSent = false;
        console.error('EmailJS notification failed:', err);
      }

      setSuccessMessage(
        notificationSent
          ? "I'll get back to you soon."
          : 'Your message was saved, but the email notification could not be sent.'
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset after 4 seconds
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setErrorMsg(err.message || 'Failed to save your message. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="contact-form-wrapper">
      {/* Success overlay */}
      {status === 'success' && (
        <div className="contact-form-toast contact-form-toast--success">
          <div className="contact-form-toast-icon">
            <Check size={24} />
          </div>
          <p className="text-[#F2F4F8] font-bold text-lg">Message saved successfully!</p>
          <p className="text-[#A7AFBA] text-sm mt-1">{successMessage}</p>
        </div>
      )}

      {/* Error overlay */}
      {status === 'error' && (
        <div className="contact-form-toast contact-form-toast--error">
          <div className="contact-form-toast-icon contact-form-toast-icon--error">
            <AlertCircle size={24} />
          </div>
          <p className="text-[#F2F4F8] font-bold text-lg">Oops!</p>
          <p className="text-[#A7AFBA] text-sm mt-1">{errorMsg}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`contact-form ${status === 'success' || status === 'error' ? 'contact-form--hidden' : ''}`}
      >
        <h3 className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase mb-6">
          Send a Message
        </h3>

        {/* Name field */}
        <div className="contact-field-group">
          <label htmlFor="from_name" className="contact-label">
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
          />
        </div>

        {/* Email field */}
        <div className="contact-field-group">
          <label htmlFor="email" className="contact-label">
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
          />
        </div>

        {/* Message field */}
        <div className="contact-field-group">
          <label htmlFor="message" className="contact-label">
            <MessageSquare size={14} className="text-[#C8A45C]" />
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
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="contact-submit-btn"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={18} className="animate-spin" />
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
