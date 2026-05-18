'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: 'var(--footer-void)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top border gradient */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,195,0,0.3), rgba(33,158,188,0.3), transparent)',
      }} />

      {/* Main footer content */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px clamp(20px, 5vw, 80px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
      }}>
        {/* Logo + tagline */}
        <div>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '28px',
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: '#F0F4F8',
            textShadow: '0 0 20px rgba(255,195,0,0.3)',
            marginBottom: '6px',
          }}>
            <span style={{ color: 'var(--accent-gold)' }}>M</span>SR
          </div>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.1em',
          }}>
            Muhammad Sultan Rafi
          </p>
        </div>

        {/* Navigation links */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
            <motion.button
              key={link}
              onClick={() => {
                const id = link.toLowerCase();
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ color: '#FFC300', y: -1 }}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                color: 'rgba(255,255,255,0.3)',
                cursor: 'none',
                transition: 'color 0.2s',
                letterSpacing: '0.02em',
              }}
            >
              {link}
            </motion.button>
          ))}
        </div>

        {/* Copyright */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.05em',
        }}>
          © 2025 Muhammad Sultan Rafi · MSR
        </div>
      </div>

      {/* Subtle grid bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,195,0,0.01) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,195,0,0.01) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,195,0,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '24px',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FFC300, #FFD60A)',
              border: 'none',
              color: '#001D3D',
              fontSize: '20px',
              cursor: 'none',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}