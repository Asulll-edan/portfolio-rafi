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
    <footer style={{ 
      backgroundColor: '#001324', 
      position: 'relative',
      borderTop: '1px solid var(--border-color)',
    }}>
      <div style={{
        maxWidth: '1280px', 
        margin: '0 auto',
        padding: '60px clamp(20px, 5vw, 80px) 32px',
      }}>
        
        {/* Main footer content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '12px',
            }}>
              <span className="gradient-text">MSR</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: '280px',
            }}>
              Building modern web applications with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <motion.button
                  key={link}
                  onClick={() => {
                    const el = document.getElementById(link.toLowerCase());
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ x: 4, color: 'var(--accent-primary)' }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.2s ease',
                  }}
                >{link}</motion.button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>Connect</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'GitHub', href: 'https://github.com/Asulll-edan' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-sultan-rafi-6b263138a/' },
                { label: 'Instagram', href: 'https://instagram.com/msrfi_' },
                { label: 'Email', href: 'mailto:muhsulrafi32@gmail.com' },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4, color: 'var(--accent-primary)' }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                >{item.label}</motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'var(--border-color)',
          marginBottom: '24px',
        }} />

        {/* Bottom */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--text-muted)',
          }}>
            © 2025 Muhammad Sultan Rafi. All rights reserved.
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--text-muted)',
          }}>
            Made with Green day's song in Bandung
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '32px',
              width: '48px',
              height: '48px',
              background: 'var(--accent-primary)',
              border: 'none',
              borderRadius: '12px',
              color: '#001D3D',
              fontSize: '20px',
              cursor: 'pointer',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 195, 0, 0.3)',
            }}
          >↑</motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
