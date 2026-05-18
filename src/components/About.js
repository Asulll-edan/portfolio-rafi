'use client';

import Image from "next/image";

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = 20;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TiltCard({ children }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.15s ease', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

const stats = [
  { label: 'Projects Completed', value: 24, suffix: '+' },
  { label: 'Years Experience', value: 3, suffix: '+' },
  { label: 'Happy Clients', value: 15, suffix: '+' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        backgroundColor: 'var(--bg-section)',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG decoration */}
      <div style={{
        position: 'absolute', top: '-200px', right: '-200px',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,195,0,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-150px', left: '-150px',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(33,158,188,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '60px' }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}>01 / About Me</span>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            color: '#F0F4F8',
            marginTop: '8px',
            letterSpacing: '-0.02em',
          }}>
            The Person Behind{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FFC300, #219EBC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>the Code</span>
          </h2>
        </motion.div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}>
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <TiltCard>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                margin: '0 auto',
              }}>
                {/* Photo frame */}
                <div style={{
                  aspectRatio: '4/5',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backdropFilter: 'blur(12px)',
                  position: 'relative',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 0 30px rgba(255,195,0,0.05)',
                }}>
                  {/* Placeholder photo with initials */}
                <Image src="/assets/images/rafi.jpg" alt="Muhammad Sultan Rafi" layout="fill" objectFit="cover" />

                  {/* Corner glow */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                    background: 'linear-gradient(to top, rgba(0,29,61,0.8), transparent)',
                    pointerEvents: 'none',
                  }} />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '-16px',
                    background: 'rgba(0,13,30,0.9)',
                    border: '1px solid rgba(255,195,0,0.3)',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(255,195,0,0.1)',
                  }}
                >
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: 'var(--accent-gold)',
                    letterSpacing: '0.1em',
                    marginBottom: '2px',
                  }}>STATUS</div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#F0F4F8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <span style={{
                      width: '8px', height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#219EBC',
                      display: 'inline-block',
                      animation: 'pulse-glow-cyan 2s infinite',
                    }} />
                    Open to Work
                  </div>
                </motion.div>

                {/* Location badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '-16px',
                    background: 'rgba(0,13,30,0.9)',
                    border: '1px solid rgba(33,158,188,0.3)',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: 'var(--accent-cyan)',
                  }}>📍 Based in Indonesia</span>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.p variants={itemVariants} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(15px, 2vw, 17px)',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              marginBottom: '24px',
            }}>
              I'm a passionate Frontend Developer and UI Designer crafting digital experiences
              that live at the intersection of{' '}
              <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>clean code</span>{' '}
              and{' '}
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>stunning design</span>.
            </motion.p>

            <motion.p variants={itemVariants} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(15px, 2vw, 17px)',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              marginBottom: '40px',
            }}>
              With expertise in modern web technologies and a keen eye for visual details,
              I build products that aren't just functional — they're memorable experiences
              users enjoy interacting with.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '40px',
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    padding: '20px 12px',
                    textAlign: 'center',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    fontWeight: 800,
                    color: 'var(--accent-gold)',
                    textShadow: '0 0 20px rgba(255,195,0,0.3)',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                    lineHeight: 1.3,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Download CV */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="/assets/cv.pdf"
                download
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(255,195,0,0.3)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--accent-gold)',
                  textDecoration: 'none',
                  backdropFilter: 'blur(12px)',
                  cursor: 'none',
                }}
              >
                <span>↓</span> Download CV
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}