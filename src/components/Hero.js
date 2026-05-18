'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import Three.js canvas - SSR false
const ThreeCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

const subtitles = ['Frontend Developer', 'UI Designer', 'Creative Coder'];

function TypewriterGlitch({ text }) {
  const [displayed, setDisplayed] = useState('');
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let i = 0;
    const chars = text.split('');
    const timer = setInterval(() => {
      if (i < chars.length) {
        setDisplayed(chars.slice(0, i + 1).join(''));
        i++;
      } else {
        clearInterval(timer);
        // Periodic glitch
        const glitchTimer = setInterval(() => {
          setGlitching(true);
          setTimeout(() => setGlitching(false), 200);
        }, 4000);
        return () => clearInterval(glitchTimer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {glitching && (
        <>
          <span style={{
            position: 'absolute', inset: 0,
            color: 'var(--accent-cyan)',
            clipPath: 'inset(30% 0 50% 0)',
            transform: 'translateX(-3px)',
            fontFamily: "'Syne', sans-serif",
          }}>{displayed}</span>
          <span style={{
            position: 'absolute', inset: 0,
            color: 'var(--accent-gold)',
            clipPath: 'inset(60% 0 10% 0)',
            transform: 'translateX(3px)',
            fontFamily: "'Syne', sans-serif",
          }}>{displayed}</span>
        </>
      )}
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        style={{ color: 'var(--accent-gold)', marginLeft: '2px' }}
      >|</motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setSpotlight({ x, y });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  const subtitleVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 1.5 }
    }
  };
  const subtitleItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section
      id="home"
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#001D3D',
      }}
    >
      {/* Three.js Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ThreeCanvas />
      </div>

      {/* Mouse spotlight (desktop only) */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,195,0,0.06) 0%, transparent 60%)`,
          pointerEvents: 'none',
          transition: 'background 0.1s',
        }}
      />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: `
          linear-gradient(rgba(33,158,188,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(33,158,188,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <motion.div
        style={{ y, opacity, position: 'relative', zIndex: 2, textAlign: 'center', padding: '24px' }}
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(33,158,188,0.1)',
            border: '1px solid rgba(33,158,188,0.3)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '32px',
          }}
        >
          <span style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            backgroundColor: '#219EBC',
            animation: 'pulse-glow-cyan 2s infinite',
            display: 'inline-block',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.1em',
          }}>Available for work</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(36px, 8vw, 88px)',
            fontWeight: 800,
            color: '#F0F4F8',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            textShadow: '0 0 40px rgba(255,195,0,0.15)',
          }}
        >
          <TypewriterGlitch text="Muhammad Sultan Rafi" />
        </motion.h1>

        {/* Subtitles */}
        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '48px',
          }}
        >
          {subtitles.map((sub, i) => (
            <motion.span key={sub} variants={subtitleItem}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(14px, 2.5vw, 20px)',
                fontWeight: i % 2 === 0 ? 600 : 400,
                color: i === 0 ? 'var(--accent-gold)' : i === 1 ? 'var(--accent-cyan)' : 'var(--text-muted)',
                letterSpacing: '0.02em',
              }}>
                {sub}
              </span>
              {i < subtitles.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 4px' }}>·</span>
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,195,0,0.5)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #FFC300, #FFD60A)',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 32px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '15px',
              fontWeight: 600,
              color: '#001D3D',
              cursor: 'none',
              letterSpacing: '0.02em',
            }}
          >
            View My Work →
          </motion.button>
          <motion.button
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,195,0,0.6)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(0,53,102,0.3)',
              border: '1px solid rgba(255,195,0,0.2)',
              borderRadius: '12px',
              padding: '14px 32px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              color: '#F0F4F8',
              cursor: 'none',
              backdropFilter: 'blur(12px)',
              letterSpacing: '0.02em',
            }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{
            width: '20px', height: '32px',
            border: '1.5px solid rgba(255,195,0,0.3)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px',
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{
              width: '4px', height: '4px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-gold)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}