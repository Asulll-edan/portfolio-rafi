// PATH: src/components/Footer.js

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

  return (
    <footer style={{ backgroundColor: 'var(--footer-void)', position: 'relative', overflow: 'hidden' }}>
      {/* Hand-drawn wavy top border */}
      <svg
        style={{ display: 'block', width: '100%', height: '30px', marginTop: '-1px' }}
        viewBox="0 0 1440 30" preserveAspectRatio="none" fill="none"
      >
        <path
          d="M0 20 Q180 5 360 20 Q540 35 720 20 Q900 5 1080 20 Q1260 35 1440 20 L1440 30 L0 30 Z"
          fill="#000B18"
        />
        <path
          d="M0 20 Q180 5 360 20 Q540 35 720 20 Q900 5 1080 20 Q1260 35 1440 20"
          stroke="rgba(255,195,0,0.2)" strokeWidth="2" strokeLinecap="round"
        />
      </svg>

      {/* Doodle scattered decorations */}
      <svg style={{ position: 'absolute', top: '20%', left: '5%', width: 40, height: 40, opacity: 0.12, pointerEvents: 'none' }} viewBox="0 0 40 40" fill="none">
        <path d="M20 4 L23 15 L34 15 L25 22 L28 33 L20 27 L12 33 L15 22 L6 15 L17 15 Z" stroke="#FFC300" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <svg style={{ position: 'absolute', top: '30%', right: '6%', width: 36, height: 36, opacity: 0.1, pointerEvents: 'none' }} viewBox="0 0 36 36" fill="none">
        <rect x="2" y="2" width="32" height="32" rx="4" stroke="#219EBC" strokeWidth="1.5" strokeDasharray="4 3" transform="rotate(15 18 18)" />
      </svg>

      {/* Doodle horizontal squiggle divider */}
      <svg style={{ display: 'block', width: '100%', height: '16px', margin: '0 auto' }} viewBox="0 0 1000 16" preserveAspectRatio="none" fill="none">
        <path
          d="M0 8 Q62.5 2 125 8 Q187.5 14 250 8 Q312.5 2 375 8 Q437.5 14 500 8 Q562.5 2 625 8 Q687.5 14 750 8 Q812.5 2 875 8 Q937.5 14 1000 8"
          stroke="rgba(255,195,0,0.12)" strokeWidth="1.5" strokeLinecap="round"
        />
      </svg>

      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '40px clamp(20px,5vw,80px) 32px',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between',
        gap: '24px',
      }}>
        {/* Logo */}
        <div>
          <div style={{
            fontFamily: "'Permanent Marker', Arial, sans-serif",
            fontSize: '32px', letterSpacing: '0.08em',
            lineHeight: 1, marginBottom: '6px',
            textShadow: '3px 3px 0 rgba(255,195,0,0.15)',
          }}>
            <span style={{ color: '#FFC300' }}>M</span>
            <span style={{ color: '#219EBC' }}>S</span>
            <span style={{ color: '#F0F4F8' }}>R</span>
          </div>
          {/* Scribble underline */}
          <svg style={{ width: '52px', height: '8px' }} viewBox="0 0 52 8" fill="none">
            <path d="M0 5 Q13 1 26 5 Q39 9 52 5" stroke="rgba(255,195,0,0.4)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <p style={{
            fontFamily: "'Kalam', Arial, sans-serif", fontSize: '12px',
            color: 'rgba(255,255,255,0.2)', marginTop: '4px',
          }}>Muhammad Sultan Rafi</p>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
            <motion.button
              key={link}
              onClick={() => {
                const el = document.getElementById(link.toLowerCase());
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ y: -2, rotate: -1, color: '#FFC300' }}
              style={{
                background: 'none', border: 'none',
                fontFamily: "'Kalam', Arial, sans-serif", fontSize: '14px',
                color: 'rgba(255,255,255,0.3)',
                cursor: 'none', transition: 'color 0.2s',
              }}
            >{link}</motion.button>
          ))}
        </div>

        {/* Copyright */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: "'Kalam', Arial, sans-serif", fontSize: '13px',
            color: 'rgba(255,255,255,0.2)',
          }}>
            © 2025 Muhammad Sultan Rafi · MSR
          </div>
          <div style={{
            fontFamily: "'Patrick Hand', Arial, sans-serif", fontSize: '11px',
            color: 'rgba(255,255,255,0.1)', marginTop: '3px',
          }}>
            Handcrafted with ❤️ Finger
          </div>
        </div>
      </div>

      {/* Back to top — doodle pencil button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 20, rotate: -10 }}
            whileHover={{ scale: 1.1, rotate: -5, boxShadow: '5px 5px 0 rgba(255,195,0,0.3)' }}
            whileTap={{ scale: 0.92 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed', bottom: '32px', right: '24px',
              width: '50px', height: '50px',
              background: '#FFC300',
              border: '2px solid rgba(255,195,0,0.8)',
              borderRadius: '8px',
              color: '#001D3D', fontSize: '22px',
              cursor: 'none', zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '4px 4px 0 rgba(255,195,0,0.25)',
              fontFamily: "'Kalam', Arial, sans-serif",
            }}
          >↑</motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}