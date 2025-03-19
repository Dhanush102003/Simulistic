import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        'service_7jal3uy',
        'template_sq4wlb7',
        form.current,
        '0sgHDqNUREnhCmp70'
      );
      setSubmitStatus('success');
      form.current.reset();
    } catch (error) {
      setSubmitStatus('error');
      console.error('Email error:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <motion.form
      ref={form}
      onSubmit={handleSubmit}
      className="max-w-2xl w-full mx-auto space-y-8 bg-white/5 p-8 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="from_name"
          required
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-transparent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="from_email"
          required
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-transparent"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={8}
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-transparent resize-none"
          placeholder="Your message"
        />
      </div>

      <input 
        type="hidden" 
        name="to_email" 
        value="dhanushbalakrishnan1102003@gmail.com"
      />

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="rainbow-button w-full bg-black text-white py-5 px-8 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors text-lg font-medium"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
        <Send size={20} />
      </motion.button>

      {submitStatus === 'success' && (
        <p className="text-green-600 text-center">Message sent successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
      )}
    </motion.form>
  );
};

export default ContactForm;