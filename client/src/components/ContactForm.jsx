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
    "Thanks for reaching out. I'll get back to you soon."
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === 'sending') return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Validate required fields
    if (!name || !email || !message) {
      setErrorMsg('Please fill in all fields.');
      setStatus('error');
      return;
    }

    // Validate name
    if (name.length > 100) {
      setErrorMsg('Name cannot exceed 100 characters.');
      setStatus('error');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email) || email.length > 254) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    // Validate message
    if (message.length > 5000) {
      setErrorMsg('Message cannot exceed 5000 characters.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      // Step 1: Save the message using the deployed API.
      // This assumes client/api/contact.js is deployed on Vercel.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      // Read the response safely.
      const responseText = await response.text();

      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(
          response.status === 404
            ? 'Contact API not found. Check your Vercel API deployment.'
            : `The server returned an invalid response (${response.status}).`
        );
      }

      if (!response.ok) {
        throw new Error(
          result.error || 'Unable to submit your message. Please try again.'
        );
      }

      // Step 2: Send an email notification through EmailJS.
      let emailSent = false;

      try {
        const now = new Date();

        const formattedTime = now.toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        });

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
          {
            publicKey: EMAILJS_PUBLIC_KEY,
          }
        );

        emailSent = true;
      } catch (emailError) {
        console.error('EmailJS notification failed:', emailError);
      }

      // Step 3: Show the correct result.
      if (emailSent) {
        setSuccessMessage(
          "Thanks for reaching out. I'll get back to you soon."
        );
      } else {
        setSuccessMessage(
          'Your message was received and saved successfully. Email notification could not be sent, but your message has been recorded.'
        );
      }

      setFormData({
        name: '',
        email: '',
        message: '',
      });

      setStatus('success');

      // Reset the form message after 5 seconds.
      window.setTimeout(() => {
        setStatus((current) =>
          current === 'success' ? 'idle' : current
        );
      }, 5000);
    } catch (error) {
      console.error('Contact form submission failed:', error);

      setErrorMsg(
        error.message ||
          'Failed to send your message. Please try again.'
      );

      setStatus('error');
    }
  };

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
            Message sent successfully!
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

          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-3 text-sm underline"
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
        <h3 className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase mb-6">
          Send a Message
        </h3>

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