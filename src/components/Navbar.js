// PATH: src/components/Navbar.js

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10000,
            transition: 'all 0.3s ease',
            background: scrolled ? 'rgba(0, 29, 61, 0.9)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
          }}
      >
        <div style={{
          maxWidth: '1280px', 
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('#home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'none', 
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <img
              src="/assets/images/msr.png"
              alt="MSR"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
              }}
            />
          </motion.button>

          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="nav-desktop">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: isActive ? 'rgba(255, 195, 0, 0.1)' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'var(--accent-primary)',
                      }}
                    />
                  )}
                </motion.button>
              );
            })}

            <motion.button
              onClick={() => scrollTo('#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginLeft: '8px',
                background: 'var(--accent-primary)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 20px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                color: '#001D3D',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Get in Touch
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
