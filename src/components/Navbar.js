// PATH: src/components/Navbar.js

'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #FFC300, #219EBC)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 10001,
          boxShadow: '0 0 8px rgba(255,195,0,0.6)',
        }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          top: scrolled ? '8px' : '0',
          left: scrolled ? '16px' : '0',
          right: scrolled ? '16px' : '0',
          zIndex: 10000,
          transition: 'all 0.4s cubic-bezier(0.76,0,0.24,1)',
          borderRadius: scrolled ? '16px' : '0',
          background: scrolled
            ? 'rgba(0,13,30,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(255,195,0,0.1)' : 'none',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
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
              fontFamily: "'Syne', sans-serif",
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: '#F0F4F8',
              textShadow: '0 0 20px rgba(255,195,0,0.4)',
              cursor: 'none',
            }}
          >
            <span style={{ color: 'var(--accent-gold)' }}>M</span>SR 
            {/* ganti sama logo */}
          </motion.button>

          {/* Desktop Links */}
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
            className="nav-desktop"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: isActive ? 'rgba(255,195,0,0.1)' : 'none',
                    border: isActive ? '1px solid rgba(255,195,0,0.3)' : '1px solid transparent',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-muted)',
                    cursor: 'none',
                    transition: 'all 0.2s',
                    textShadow: isActive ? '0 0 10px rgba(255,195,0,0.4)' : 'none',
                    letterSpacing: '0.02em',
                  }}
                >
                  {link.label}
                </motion.button>
              );
            })}

            <motion.button
              onClick={() => scrollTo('#intern-history')}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,195,0,0.4)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginLeft: '8px',
                background: 'linear-gradient(135deg, #FFC300, #FFD60A)',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: '#001D3D',
                cursor: 'none',
                letterSpacing: '0.02em',
              }}
            >
              Intern History
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            className="nav-mobile"
            style={{
              background: 'none',
              border: '1px solid rgba(255,195,0,0.2)',
              borderRadius: '8px',
              padding: '10px',
              cursor: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={menuOpen ? {
                  rotate: i === 1 ? 0 : i === 0 ? 45 : -45,
                  y: i === 1 ? 0 : i === 0 ? 7 : -7,
                  opacity: i === 1 ? 0 : 1,
                } : { rotate: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '20px',
                  height: '2px',
                  backgroundColor: 'var(--accent-gold)',
                  borderRadius: '2px',
                  display: 'block',
                }}
              />
            ))}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '16px',
              right: '16px',
              background: 'rgba(0,13,30,0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,195,0,0.15)',
              borderRadius: '16px',
              padding: '16px',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: activeSection === link.href.replace('#', '') ? 'rgba(255,195,0,0.1)' : 'none',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  textAlign: 'left',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '16px',
                  fontWeight: 500,
                  color: activeSection === link.href.replace('#', '') ? 'var(--accent-gold)' : 'var(--text-primary)',
                  cursor: 'auto',
                  width: '100%',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .nav-desktop {
          display: flex;
        }
        .nav-mobile {
          display: none;
        }
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}