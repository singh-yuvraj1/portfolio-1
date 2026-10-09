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
} from 'lucide-react';

// =====================================================
// API CONFIGURATION
// =====================================================

// Set VITE_API_URL in your Vercel environment variables.
// Example: https://portfolio-1-qbv9.onrender.com
const API_URL = (import.meta.env.VITE_API_URL || 'https://portfolio-1-qbv9.onrender.com').replace(/\/+$/, '');

// =====================================================
// EMAILJS CONFIGURATION
// =====================================================

const EMAILJS_PUBLIC_KEY = 'OMNYautZyvKsGMrB5';
const EMAILJS_SERVICE_ID = 'service_zuy5n8q';
const EMAILJS_TEMPLATE_ID = 'template_y5gwzlo';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState(
    "I'll get back to you soon."
  );

  // ---------------------------------------------------
  // FORM INPUT HANDLER
  // ---------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ---------------------------------------------------
  // ERROR HANDLER
  // ---------------------------------------------------

  const showError = (message) => {
    setErrorMsg(message);
    setStatus('error');

    setTimeout(() => {
      setStatus((currentStatus) =>
        currentStatus === 'error' ? 'idle' : currentStatus
      );
    }, 5000);
  };

  // ---------------------------------------------------
  // FORM SUBMISSION
  // ---------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === 'sending') {
      return;
    }

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Basic validation
    if (!name || !email || !message) {
      showError('Please fill in all fields.');
      return;
    }

    if (name.length > 100) {
      showError('Name must not exceed 100 characters.');
      return;
    }

    if (email.length > 254) {
      showError('Email address is too long.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    if (message.length > 5000) {
      showError('Message must not exceed 5000 characters.');
      return;
    }

    // Make sure the production API URL is configured.
    if (!API_URL) {
      showError(
        'Contact form is not configured. Please try again later.'
      );

      console.error(
        'Missing VITE_API_URL. Configure it in your Vercel project settings.'
      );

      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      // ===============================================
      // STEP 1: SAVE MESSAGE TO MONGODB THROUGH BACKEND
      // ===============================================

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },

        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      // Read the response as text first.
      // This prevents JSON parsing errors when the server
      // returns HTML or plain text instead of JSON.
      const responseText = await response.text();

      let result = {};

      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText);
        } catch {
          console.error(
            'Backend returned a non-JSON response:',
            response.status,
            responseText.slice(0, 300)
          );

          if (response.status === 404) {
            throw new Error(
              'Contact API not found. Please check your backend URL and route.'
            );
          }

          if (response.status >= 500) {
            throw new Error(
              'The contact server encountered an error. Please try again later.'
            );
          }

          throw new Error(
            'The server returned an unexpected response. Please try again later.'
          );
        }
      }

      // Handle HTTP errors returned as valid JSON.
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(
            result.error || 'Please check your contact details.'
          );
        }

        if (response.status === 404) {
          throw new Error(
            result.error || 'Contact API endpoint was not found.'
          );
        }

        if (response.status >= 500) {
          throw new Error(
            result.error ||
              'Unable to save your message. Please try again later.'
          );
        }

        throw new Error(
          result.error || `Request failed with status ${response.status}.`
        );
      }

      // A successful HTTP status alone is not enough.
      // Confirm the backend sent the expected success message.
      if (result.message !== 'Contact message saved.') {
        console.error('Unexpected backend success response:', result);

        throw new Error(
          'The server response could not be verified. Please contact me another way.'
        );
      }

      // ===============================================
      // STEP 2: SEND EMAIL NOTIFICATION THROUGH EMAILJS
      // ===============================================

      let notificationSent = false;

      const formattedTime = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name,
            from_name: name,
            email,
            from_email: email,
            message,
            time: formattedTime,
            to_name: 'Navadeep',
          },
          EMAILJS_PUBLIC_KEY
        );

        notificationSent = true;
      } catch (emailError) {
        // The database save has already succeeded.
        // Do not report the entire submission as failed.
        console.error(
          'Message saved, but EmailJS notification failed:',
          emailError
        );
      }

      // ===============================================
      // STEP 3: SHOW SUCCESS
      // ===============================================

      setSuccessMessage(
        notificationSent
          ? "I'll get back to you soon."
          : 'Your message was saved, but the email notification could not be sent.'
      );

      setFormData({
        name: '',
        email: '',
        message: '',
      });

      setStatus('success');

      setTimeout(() => {
        setStatus((currentStatus) =>
          currentStatus === 'success' ? 'idle' : currentStatus
        );
      }, 5000);
    } catch (error) {
      console.error('Contact form submission failed:', error);

      showError(
        error.message ||
          'Unable to send your message. Please try again later.'
      );
    }
  };

  // ---------------------------------------------------
  // UI
  // ---------------------------------------------------

  return (
    <div className="contact-form-wrapper">
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
            Message saved successfully!
          </p>

          <p className="text-[#A7AFBA] text-sm mt-1">
            {successMessage}
          </p>
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
            Oops!
          </p>

          <p className="text-[#A7AFBA] text-sm mt-1">
            {errorMsg}
          </p>
        </div>
      )}

      {/* Contact form */}

      <form
        onSubmit={handleSubmit}
        className={`contact-form ${
          status === 'success' || status === 'error'
            ? 'contact-form--hidden'
            : ''
        }`}
      >
        <h3 className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase mb-6">
          Send a Message
        </h3>

        {/* Name */}

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
            maxLength={100}
            required
            disabled={status === 'sending'}
          />
        </div>

        {/* Email */}

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
            maxLength={254}
            required
            disabled={status === 'sending'}
          />
        </div>

        {/* Message */}

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
            maxLength={5000}
            required
            disabled={status === 'sending'}
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