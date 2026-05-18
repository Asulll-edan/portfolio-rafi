'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {Instagram, Linkedin, Github, Mail} from 'lucide-react';

const socials = [
  { label: 'GitHub', icon: <Github size={18}/>, href: 'https://github.com/Asulll-edan', color: '#F0F4F8' },
  { label: 'LinkedIn', icon: <Linkedin size={18}/>, href: 'https://www.linkedin.com/in/muhammad-sultan-rafi-6b263138a/', color: '#0A66C2' },
  { label: 'Instagram', icon: <Instagram size={18}/>, href: 'https://instagram.com/msrfi_', color: '#E4405F' },
  { label: 'Email', icon: <Mail size={18}/>, href: 'mailto:muhsulrafi32@gmail.com', color: '#FFC300' },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [ripple, setRipple] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleButtonClick = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y });
    setTimeout(() => setRipple(null), 600);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(0,29,61,0.5)',
    border: '1px solid rgba(255,195,0,0.12)',
    borderRadius: '10px',
    padding: '14px 16px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    color: '#F0F4F8',
    outline: 'none',
    backdropFilter: 'blur(8px)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    resize: 'none',
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        backgroundColor: 'var(--bg-main)',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG glow */}
      <div style={{
        position: 'absolute', bottom: '0', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(255,195,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}>04 / Contact</span>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            color: '#F0F4F8',
            marginTop: '8px',
            letterSpacing: '-0.02em',
          }}>
            Let's{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FFC300, #219EBC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Build Together</span>
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(14px, 2vw, 16px)',
            color: 'var(--text-muted)',
            marginTop: '16px',
            maxWidth: '500px',
            margin: '16px auto 0',
            lineHeight: 1.7,
          }}>
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something remarkable together.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Muhammad Sultan Rafi"
                  required
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(255,195,0,0.4)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255,195,0,0.08)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,195,0,0.12)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(255,195,0,0.4)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255,195,0,0.08)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,195,0,0.12)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={6}
                  style={{ ...inputStyle }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(255,195,0,0.4)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255,195,0,0.08)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,195,0,0.12)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                onClick={handleButtonClick}
                whileHover={status !== 'loading' ? { scale: 1.02, boxShadow: '0 0 30px rgba(255,195,0,0.4)' } : {}}
                whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                disabled={status === 'loading'}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: status === 'success'
                    ? 'rgba(34,197,94,0.2)'
                    : status === 'error'
                      ? 'rgba(239,68,68,0.2)'
                      : 'linear-gradient(135deg, #FFC300, #FFD60A)',
                  border: status === 'success'
                    ? '1px solid rgba(34,197,94,0.4)'
                    : status === 'error'
                      ? '1px solid rgba(239,68,68,0.4)'
                      : 'none',
                  borderRadius: '10px',
                  padding: '16px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '15px',
                  fontWeight: 600,
                  color: status === 'idle' || status === 'loading' ? '#001D3D' : '#F0F4F8',
                  cursor: status === 'loading' ? 'not-allowed' : 'none',
                  marginTop: '8px',
                  width: '100%',
                  transition: 'all 0.3s',
                }}
              >
                {/* Ripple */}
                {ripple && (
                  <span style={{
                    position: 'absolute',
                    left: ripple.x,
                    top: ripple.y,
                    width: '10px', height: '10px',
                    marginLeft: '-5px', marginTop: '-5px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.3)',
                    animation: 'ripple 0.6s linear',
                    pointerEvents: 'none',
                  }} />
                )}

                <AnimatePresence mode="wait">
                  {status === 'loading' && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin-slow 0.8s linear infinite' }}>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="40" strokeLinecap="round" />
                      </svg>
                      Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ color: '#4ade80' }}>
                      ✓ Pesan terkirim!
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ color: '#f87171' }}>
                      ✕ Gagal kirim, coba lagi
                    </motion.span>
                  )}
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Send Message →
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

          {/* Social & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            {/* Quick info */}
            <div style={{
              background: 'rgba(0,53,102,0.2)',
              border: '1px solid rgba(255,195,0,0.1)',
              borderRadius: '16px',
              padding: '28px',
              backdropFilter: 'blur(12px)',
            }}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '20px',
                fontWeight: 700,
                color: '#F0F4F8',
                marginBottom: '20px',
                letterSpacing: '-0.01em',
              }}>Quick Info</h3>

              {[
                { icon: '📍', label: 'Location', value: 'Indonesia' },
                { icon: '📧', label: 'Email', value: 'msultan@example.com' },
                { icon: '⚡', label: 'Response Time', value: 'Within 24 hours' },
                { icon: '🟢', label: 'Availability', value: 'Open to Work' },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>{item.label}</div>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '13px',
                      color: '#F0F4F8',
                      fontWeight: 500,
                    }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <h3 style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>Find me on</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(0,53,102,0.25)',
                      border: '1px solid rgba(255,195,0,0.08)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      textDecoration: 'none',
                      cursor: 'none',
                      backdropFilter: 'blur(8px)',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <span style={{ color:social.color}}>{social.icon}</span>
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#F0F4F8',
                    }}>{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}