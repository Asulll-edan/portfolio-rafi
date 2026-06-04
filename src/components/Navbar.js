// PATH: src/components/Navbar.js

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

/* Squiggly SVG underline for active link */
const Squiggle = ({ color = '#FFC300' }) => (
  <svg
    style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '6px' }}
    viewBox="0 0 60 6" preserveAspectRatio="none" fill="none"
  >
    <path
      d="M0 3 Q7.5 0 15 3 Q22.5 6 30 3 Q37.5 0 45 3 Q52.5 6 60 3"
      stroke={color} strokeWidth="2" strokeLinecap="round"
    />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

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
    setMenuOpen(false);
  };

  return (
    <>
      {/* Doodle progress bar — hand-drawn style */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '6px', zIndex: 10001, overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #FFC300, #219EBC)',
            transformOrigin: '0%',
            scaleX,
            borderRadius: '0 3px 3px 0',
            boxShadow: '0 0 10px rgba(255,195,0,0.7)',
          }}
        />
        {/* Doodle dash overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.15) 6px, rgba(0,0,0,0.15) 8px)',
          pointerEvents: 'none',
        }} />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          top: scrolled ? '12px' : '6px',
          left: scrolled ? '20px' : '0',
          right: scrolled ? '20px' : '0',
          zIndex: 10000,
          transition: 'all 0.4s',
          borderRadius: scrolled ? '12px' : '0',
          background: scrolled ? 'rgba(0,11,24,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          /* doodle border when scrolled */
          border: scrolled ? '2px solid rgba(255,195,0,0.25)' : 'none',
          boxShadow: scrolled ? '4px 4px 0 rgba(255,195,0,0.08), -1px -1px 0 rgba(255,195,0,0.05)' : 'none',
        }}
      >
        {/* Hand-drawn corner ticks when scrolled */}
        {scrolled && (
          <>
            {[{ tl: true }, { tr: true }, { bl: true }, { br: true }].map((pos, i) => (
              <svg key={i} style={{
                position: 'absolute', width: 14, height: 14,
                top: pos.tl || pos.tr ? -1 : undefined,
                bottom: pos.bl || pos.br ? -1 : undefined,
                left: pos.tl || pos.bl ? -1 : undefined,
                right: pos.tr || pos.br ? -1 : undefined,
                transform: pos.tr ? 'scaleX(-1)' : pos.br ? 'scale(-1)' : pos.bl ? 'scaleY(-1)' : 'none',
              }} viewBox="0 0 14 14" fill="none">
                <path d="M1 7 L1 1 L7 1" stroke="#FFC300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
            ))}
          </>
        )}

        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '14px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <motion.button
  onClick={() => scrollTo('#home')}
  whileHover={{ rotate: -2, scale: 1.08 }}
  whileTap={{ scale: 0.93 }}
  style={{
    background: 'none', border: 'none',
    cursor: 'none', position: 'relative',
    padding: 0,
  }}
>
  <motion.div
    initial={{ filter: 'brightness(0.7) drop-shadow(0 0 0px #FFC300)' }}
    whileHover={{
      filter: 'brightness(1.3) drop-shadow(0 0 12px #FFC300)',
    }}
    animate={{
      filter: [
        'brightness(0.85) drop-shadow(0 0 4px rgba(255,195,0,0.3))',
        'brightness(1.15) drop-shadow(0 0 10px rgba(255,195,0,0.7))',
        'brightness(0.85) drop-shadow(0 0 4px rgba(255,195,0,0.3))',
      ],
    }}
    transition={{
      animate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      whileHover: { duration: 0.3 },
    }}
    style={{ display: 'flex', alignItems: 'center' }}
  >
    <img
      src="/assets/images/msr.png"
      alt="MSR"
      style={{
        width: '56px',
height: '56px',
        objectFit: 'contain',
      }}
    />
  </motion.div>

  {/* Glow ring animasi di belakang logo */}
  <motion.div
    animate={{
      opacity: [0.3, 0.7, 0.3],
      scale: [0.9, 1.15, 0.9],
    }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    style={{
      position: 'absolute',
      inset: '-6px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,195,0,0.15) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: -1,
    }}
  />
</motion.button>

          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="nav-desktop">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  whileHover={{ y: -2, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: isActive ? 'rgba(255,195,0,0.08)' : 'none',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 18px',
                    fontFamily: "'Kalam', cursive",
                    fontSize: '16px',
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? '#FFC300' : 'rgba(240,244,248,0.7)',
                    cursor: 'none',
                    position: 'relative',
                    transition: 'all 0.15s',
                  }}
                >
                  {link.label}
                  {isActive && <Squiggle />}
                </motion.button>
              );
            })}

            <motion.button
              onClick={() => scrollTo('#intern-history')}
              whileHover={{ rotate: 1, scale: 1.04, boxShadow: '5px 5px 0 rgba(255,195,0,0.3)' }}
              whileTap={{ scale: 0.94 }}
              style={{
                marginLeft: '12px',
                background: '#FFC300',
                border: '2px solid rgba(255,195,0,0.8)',
                borderRadius: '6px',
                padding: '10px 22px',
                fontFamily: "'Kalam', cursive",
                fontSize: '16px',
                fontWeight: 700,
                color: '#001D3D',
                cursor: 'none',
                /* offset shadow = doodle button effect */
                boxShadow: '3px 3px 0 rgba(255,195,0,0.3)',
                transition: 'all 0.15s',
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
              border: '2px solid rgba(255,195,0,0.3)',
              borderRadius: '8px',
              width: '44px', height: '44px',
              cursor: 'auto',
              display: 'flex', flexDirection: 'column',
              gap: '5px', alignItems: 'center', justifyContent: 'center',
              boxShadow: '2px 2px 0 rgba(255,195,0,0.1)',
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span key={i}
                animate={menuOpen ? {
                  rotate: i === 1 ? 0 : i === 0 ? 45 : -45,
                  y: i === 1 ? 0 : i === 0 ? 7 : -7,
                  opacity: i === 1 ? 0 : 1,
                } : { rotate: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  /* each line slightly imperfect length */
                  width: i === 1 ? '14px' : i === 0 ? '20px' : '16px',
                  height: '2px',
                  backgroundColor: '#FFC300',
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
            initial={{ opacity: 0, y: -16, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: '80px', left: '20px', right: '20px',
              background: 'rgba(0,11,24,0.96)',
              backdropFilter: 'blur(16px)',
              border: '2px solid rgba(255,195,0,0.25)',
              borderRadius: '12px',
              padding: '16px',
              zIndex: 9999,
              display: 'flex', flexDirection: 'column', gap: '4px',
              boxShadow: '4px 4px 0 rgba(255,195,0,0.1)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: activeSection === link.href.replace('#', '') ? 'rgba(255,195,0,0.1)' : 'none',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px 16px', textAlign: 'left',
                  fontFamily: "'Kalam', cursive",
                  fontSize: '18px',
                  fontWeight: activeSection === link.href.replace('#', '') ? 700 : 400,
                  color: activeSection === link.href.replace('#', '') ? '#FFC300' : '#F0F4F8',
                  cursor: 'auto', width: '100%',
                }}
              >
                {activeSection === link.href.replace('#', '') ? '→ ' : '   '}{link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}